LEARN.lesson('python', 59, `
@@chapterRef python-tute-3
@@difficulty:zh 综合
@@difficulty:en Comprehensive
@@intro:zh
<p class="lead"><strong>凯撒密码</strong>是历史上最古老的加密方式之一，相传由古罗马统帅凯撒用于军事通信。它的原理极其简单：把每个字母在字母表中向后移动固定位数（位移量），解密时向前移回来。</p>
<p>例如位移量为 3：A→D，B→E，…，Z→C（到达末尾后回绕）。"Hello" 加密后变成 "Khoor"。</p>
<p><strong>在 Python 中实现的关键</strong>：<code>ord(c)</code> 把字符转成 ASCII 数字，<code>chr(n)</code> 把数字转回字符，取余 <code>% 26</code> 实现回绕：</p>
<pre><code>base = ord('A') if c.isupper() else ord('a')
new_c = chr((ord(c) - base + shift) % 26 + base)
# 大小写分开处理，保证各自在 A-Z / a-z 范围内回绕</code></pre>
<p><strong>需要处理的细节</strong>：</p>
<ul>
<li>大写字母和小写字母分别回绕（A-Z 和 a-z 是独立区间）</li>
<li>空格、标点、数字等非字母字符<strong>原样保留</strong>，不加密</li>
<li>解密 = 加密时位移取 <code>26 - shift</code>（也可以直接传负的 shift，Python 的 % 对负数也能正确处理）</li>
</ul>
<p>实现完成后用 3 条消息做完整的 加密 → 解密 → 验证 测试。</p>
@@intro:en
<p class="lead">The <strong>Caesar cipher</strong> is one of the oldest known encryption techniques, reportedly used by Julius Caesar for military communications. The idea is simple: shift every letter forward by a fixed number of positions in the alphabet, and reverse the shift to decrypt.</p>
<p>For example, with a shift of 3: A→D, B→E, …, Z→C (wrapping at the end). "Hello" becomes "Khoor".</p>
<p><strong>The Python key</strong>: <code>ord(c)</code> converts a character to its ASCII number, <code>chr(n)</code> converts back, and <code>% 26</code> handles the wraparound:</p>
<pre><code>base = ord('A') if c.isupper() else ord('a')
new_c = chr((ord(c) - base + shift) % 26 + base)
# handle uppercase and lowercase separately so each wraps within its own A-Z / a-z range</code></pre>
<p><strong>Details to get right</strong>:</p>
<ul>
<li>Uppercase and lowercase letters wrap independently (A-Z and a-z are separate ranges)</li>
<li>Spaces, punctuation, digits, and other non-letter characters must <strong>pass through unchanged</strong></li>
<li>Decryption = encryption with shift replaced by <code>26 - shift</code> (or negative shift — Python's % works correctly on negatives)</li>
</ul>
<p>Once implemented, run a full encrypt → decrypt → verify test on 3 messages.</p>
@@task:zh
实现 <code>caesar_encrypt(text, shift)</code> 和 <code>caesar_decrypt(text, shift)</code>。用 shift=7 测试三条消息，每条消息输出两行：<code>原文 -> 密文 -> 解密文</code> 和 <code>OK</code> 或 <code>FAIL</code>。
@@task:en
Implement <code>caesar_encrypt(text, shift)</code> and <code>caesar_decrypt(text, shift)</code>. Test three messages with shift=7; for each print two lines: <code>original -> cipher -> decrypted</code> and <code>OK</code> or <code>FAIL</code>.
@@hint:zh base = ord("A") if c.isupper() else ord("a")；解密 shift 换成 26-shift。
@@hint:en base = ord("A") if c.isupper() else ord("a"); for decryption use 26-shift.
@@starter:zh
def caesar_encrypt(text, shift):
    # 对每个字母移位，非字母原样保留
    pass

def caesar_decrypt(text, shift):
    # 反向移位
    pass

shift = 7
cases = ["Hello, World!", "The Quick Brown Fox", "AaBbZz"]
for msg in cases:
    enc = caesar_encrypt(msg, shift)
    dec = caesar_decrypt(enc, shift)
    print(f"{msg} -> {enc} -> {dec}")
    print("OK" if dec == msg else "FAIL")

@@starter:en
def caesar_encrypt(text, shift):
    # shift each letter, pass non-letters unchanged
    pass

def caesar_decrypt(text, shift):
    # reverse the shift
    pass

shift = 7
cases = ["Hello, World!", "The Quick Brown Fox", "AaBbZz"]
for msg in cases:
    enc = caesar_encrypt(msg, shift)
    dec = caesar_decrypt(enc, shift)
    print(f"{msg} -> {enc} -> {dec}")
    print("OK" if dec == msg else "FAIL")

@@answer
def caesar_encrypt(text, shift):
    result = []
    for c in text:
        if c.isalpha():
            base = ord("A") if c.isupper() else ord("a")
            result.append(chr((ord(c) - base + shift) % 26 + base))
        else:
            result.append(c)
    return "".join(result)

def caesar_decrypt(text, shift):
    return caesar_encrypt(text, 26 - shift)

shift = 7
cases = ["Hello, World!", "The Quick Brown Fox", "AaBbZz"]
for msg in cases:
    enc = caesar_encrypt(msg, shift)
    dec = caesar_decrypt(enc, shift)
    print(f"{msg} -> {enc} -> {dec}")
    print("OK" if dec == msg else "FAIL")

@@expectedOutput
Hello, World! -> Olssv, Dvysk! -> Hello, World!
OK
The Quick Brown Fox -> Aol Xbpjr Iyvdu Mve -> The Quick Brown Fox
OK
AaBbZz -> HhIiGg -> AaBbZz
OK
`);
