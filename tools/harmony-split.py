"""Split HarmonyOS Sans SC into web font files for this site.

    python tools/harmony-split.py <HarmonyOS_Sans_SC.ttf> [--weight 500] [--jobs N]

Takes the official variable font (HarmonyOS Sans SC 2.x, from Huawei's
developer site) and writes lib/design/harmony/:

  site.woff2    every Han character and CJK punctuation mark the site
                shows (index.html, lib/daily), plus the "Aa" the licences
                list draws in this face. A normal visit loads only this
                file.
  4e00.woff2 …  the rest of U+4E00-9FFF in 512 code point windows, so
                text added later still renders before the next run, at
                the cost of one window per new character.
  misc.woff2    the rest of the CJK punctuation, the compatibility
                ideographs and the full-width forms.

Each file is fixed at one weight (500, Medium, as before) with the
overlapping strokes of the variable outlines merged, as a static font
expects. Outlines are otherwise left exactly as drawn: subset, instanced
and packed straight from the TTF, never through another format. Every
name record (copyright included) is kept, and the licence goes next to
the files.

It then rewrites the HarmonyOS block in lib/design/louie.css between the
/* harmony:start */ and /* harmony:end */ markers. Rerun it whenever the
site gains new Chinese text. The work is spread over every CPU core.

Needs fontTools with brotli and skia-pathops:
    pip install "fonttools[woff]" skia-pathops
"""
import argparse
import os
import re
import shutil
import sys
import time
from concurrent.futures import ProcessPoolExecutor, as_completed

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'lib', 'design', 'harmony')
CSS = os.path.join(ROOT, 'lib', 'design', 'louie.css')
FAMILY = 'HarmonyOS Sans SC'

# What the HarmonyOS files cover; Latin and everything else is left to
# JetBrains Mono.
RANGES = [(0x3000, 0x303F), (0x4E00, 0x9FFF), (0xF900, 0xFAFF), (0xFF00, 0xFFEF)]
WINDOW = 512
# The licences list shows each typeface's own "Aa"; HarmonyOS draws its
# pair from site.woff2 (the page's text still takes Latin from JetBrains
# Mono, which comes first in the stack).
SAMPLE = 'Aa'


def site_text():
    """All text the page can show in the HarmonyOS family."""
    files = [os.path.join(ROOT, 'index.html')]
    for base, _, names in os.walk(os.path.join(ROOT, 'lib', 'daily')):
        files += [os.path.join(base, n) for n in names if n.endswith('.js')]
    text = ''
    for p in sorted(files):
        with open(p, encoding='utf-8') as f:
            text += f.read()
    return text


def covered(cp):
    return any(a <= cp <= b for a, b in RANGES)


def ranges_css(cps):
    """[0x4E00, 0x4E01, 0x4E03] -> 'U+4E00-4E01, U+4E03'"""
    out, cps = [], sorted(cps)
    i = 0
    while i < len(cps):
        j = i
        while j + 1 < len(cps) and cps[j + 1] == cps[j] + 1:
            j += 1
        out.append('U+%X' % cps[i] if i == j else 'U+%X-%X' % (cps[i], cps[j]))
        i = j + 1
    return ', '.join(out)


def plan(src):
    from fontTools.ttLib import TTFont
    cmap = TTFont(src, lazy=True).getBestCmap()
    have = {cp for cp in cmap if covered(cp)}
    site = sorted(({ord(c) for c in site_text()} & have) | {ord(c) for c in SAMPLE if ord(c) in cmap})
    rest = have - set(site)
    jobs = [('site', site)]
    for start in range(0x4E00, 0xA000, WINDOW):
        cps = sorted(cp for cp in rest if start <= cp < start + WINDOW)
        if cps:
            jobs.append(('%x' % start, cps))
    misc = sorted(cp for cp in rest if not 0x4E00 <= cp <= 0x9FFF)
    if misc:
        jobs.append(('misc', misc))
    return jobs


def build(src, name, cps, weight, out):
    """One file: subset, fix the weight, merge overlaps, pack as WOFF2."""
    from fontTools import subset
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    font = TTFont(src)
    opt = subset.Options()
    opt.name_IDs = ['*']
    opt.name_languages = ['*']
    opt.name_legacy = True
    opt.layout_features = ['*']
    opt.notdef_outline = True
    opt.hinting = True            # keeps prep and any glyph instructions
    sub = subset.Subsetter(opt)
    sub.populate(unicodes=cps)
    sub.subset(font)
    font = instancer.instantiateVariableFont(
        font, {'wght': weight}, overlap=instancer.OverlapMode.REMOVE,
        updateFontNames=True)
    font.flavor = 'woff2'
    path = os.path.join(out, name + '.woff2')
    font.save(path)
    return name, len(cps), os.path.getsize(path)


def write_css(jobs):
    rules = []
    for name, cps in jobs:
        rules.append(
            "@font-face { font-family: '%s'; font-weight: 100 900; "
            "font-display: swap; src: url('harmony/%s.woff2') format('woff2'); "
            "unicode-range: %s; }" % (FAMILY, name, ranges_css(cps)))
    block = '/* harmony:start (written by tools/harmony-split.py) */\n' + \
        '\n'.join(rules) + '\n/* harmony:end */'
    with open(CSS, encoding='utf-8', newline='') as f:
        css = f.read()
    pat = re.compile(r'/\* harmony:start.*?harmony:end \*/', re.S)
    if not pat.search(css):
        sys.exit('louie.css has no harmony:start / harmony:end markers')
    css = pat.sub(lambda m: block, css, count=1)
    with open(CSS, 'w', encoding='utf-8', newline='') as f:
        f.write(css)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('src', help='HarmonyOS_Sans_SC.ttf (the variable font)')
    ap.add_argument('--weight', type=float, default=500)
    ap.add_argument('--jobs', type=int, default=os.cpu_count())
    a = ap.parse_args()

    t0 = time.time()
    jobs = plan(a.src)
    os.makedirs(OUT, exist_ok=True)
    keep = {n + '.woff2' for n, _ in jobs} | {'LICENSE.txt'}
    for f in os.listdir(OUT):
        if f not in keep:
            os.remove(os.path.join(OUT, f))
    site = jobs[0][1]
    print('%d site characters; %d files on %d processes' % (len(site), len(jobs), a.jobs))

    sizes = {}
    # Biggest first, so the last process to finish is not stuck on a big one.
    order = sorted(jobs, key=lambda j: -len(j[1]))
    with ProcessPoolExecutor(max_workers=a.jobs) as pool:
        futs = [pool.submit(build, a.src, n, cps, a.weight, OUT) for n, cps in order]
        for f in as_completed(futs):
            name, count, size = f.result()
            sizes[name] = size
            print('  %-6s %5d chars %8.1f KB' % (name, count, size / 1024))

    lic = os.path.join(os.path.dirname(os.path.abspath(a.src)), 'LICENSE-update.txt')
    if os.path.exists(lic):
        shutil.copyfile(lic, os.path.join(OUT, 'LICENSE.txt'))
    else:
        print('note: no LICENSE-update.txt beside the font; copy the licence into %s yourself' % OUT)
    write_css(jobs)
    print('site.woff2 %.1f KB, all files %.1f KB, %.0f s' % (
        sizes['site'] / 1024, sum(sizes.values()) / 1024, time.time() - t0))


if __name__ == '__main__':
    main()
