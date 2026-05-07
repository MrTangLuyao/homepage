LEARN.lesson('python', 66, `
@@chapterRef python-tute-3
@@difficulty:zh Boss
@@difficulty:en Boss
@@intro:zh
<p class="lead"><strong>维吉尼亚密码</strong>（Vigenère Cipher）是对凯撒密码的重大升级，16 世纪提出，曾被称为"无法破解的密码"。它不使用固定位移，而是用一个<strong>关键词</strong>循环控制每个字母的位移量：</p>
<pre><code>明文:  A t t a c k  a t  D a w n
关键词: K E Y K E Y  K E  Y K E Y
位移:  10 4 24 10 4 24 10 4 24 10 4 24</code></pre>
<p>关键词 "KEY" 中，K=10，E=4，Y=24（对应字母在字母表中的位置，从 0 计数）。关键词循环重复使用，直到覆盖所有字母。<strong>非字母字符原样保留，且不消耗关键词的位置计数</strong>。</p>
<p>实现要点：</p>
<ul>
<li>用独立计数器 <code>ki</code> 追踪关键词位置，<strong>只在遇到字母时</strong> <code>ki += 1</code>（空格标点不推进 ki）</li>
<li>位移量：<code>shift = ord(key[ki % len(key)].upper()) - ord('A')</code></li>
<li>关键词校验：空字符串或含非字母字符时 raise <code>ValueError</code></li>
</ul>
<p>本题还需要实现<strong>频率分析</strong>：统计密文中每个字母出现的次数和百分比，输出最高频的 Top-3。历史上，密码分析者正是通过分析密文字母频率来破解密码的。</p>
@@intro:en
<p class="lead">The <strong>Vigenère cipher</strong> is a major upgrade on Caesar's cipher, proposed in the 16th century and once called "the indecipherable cipher." Instead of a fixed shift, it uses a <strong>keyword</strong> that cycles through shifts for each letter:</p>
<pre><code>plaintext: A t t a c k  a t  D a w n
keyword:   K E Y K E Y  K E  Y K E Y
shifts:    10 4 24 10 4 24 10 4 24 10 4 24</code></pre>
<p>In "KEY": K=10, E=4, Y=24 (zero-indexed positions in the alphabet). The keyword repeats cyclically. <strong>Non-letter characters pass through unchanged and do not advance the keyword position.</strong></p>
<p>Implementation notes:</p>
<ul>
<li>Use a separate counter <code>ki</code> to track the keyword position — <strong>only increment <code>ki</code> when the current character is a letter</strong> (spaces and punctuation don't advance it)</li>
<li>Shift amount: <code>shift = ord(key[ki % len(key)].upper()) - ord('A')</code></li>
<li>Validate the key: raise <code>ValueError</code> if it's empty or contains non-letter characters</li>
</ul>
<p>The problem also requires <strong>frequency analysis</strong>: count each letter's occurrences in the ciphertext and output the Top-3 by frequency. Historically, cryptanalysts cracked ciphers exactly this way.</p>
@@task:zh
实现 <code>vigenere_encrypt</code>、<code>vigenere_decrypt</code>、<code>freq_analysis</code>；用 key="KEY"、text="Attack at Dawn!" 运行，输出加密结果、验证信息和 Top-3 频率。
@@task:en
Implement <code>vigenere_encrypt</code>, <code>vigenere_decrypt</code>, <code>freq_analysis</code>; run with key="KEY" and text="Attack at Dawn!", print the encrypted result, verification, and Top-3 letter frequencies.
@@hint:zh
ki 只在 c.isalpha() 时递增；解密用 -shift（Python 的 % 对负数也正确工作）；freq_analysis 用 sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:3]。
@@hint:en
ki only increments when c.isalpha(); decryption uses -shift (Python % works correctly on negatives); freq_analysis uses sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:3].
@@starter:zh
def vigenere_encrypt(text, key):
    if not key or not key.isalpha():
        raise ValueError(f"Invalid key: '{key}'")
    key = key.upper()
    result = []
    ki = 0
    for c in text:
        if c.isalpha():
            # 计算位移并加密
            ki += 1
        else:
            result.append(c)
    return "".join(result)

def vigenere_decrypt(text, key):
    pass  # 与加密相同，但位移取反

def freq_analysis(text, top_n=3):
    freq = {}
    for c in text:
        if c.isalpha():
            lc = c.lower()
            freq[lc] = freq.get(lc, 0) + 1
    total = sum(freq.values())
    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:top_n]
    return [(ch, cnt, cnt / total * 100) for ch, cnt in ranked]

key = "KEY"
text = "Attack at Dawn!"
try:
    enc = vigenere_encrypt(text, key)
    dec = vigenere_decrypt(enc, key)
    print("=== Encryption ===")
    print(f"key      : {key}")
    print(f"original : {text}")
    print(f"encrypted: {enc}")
    print(f"decrypted: {dec}")
    print(f"verified : {dec == text}")
except ValueError as e:
    print(f"Error: {e}")
print()
print("=== Top-3 Cipher Letter Frequency ===")
for ch, cnt, pct in freq_analysis(enc):
    print(f"  {ch}: {cnt} occurrences ({pct:.1f}%)")

@@starter:en
def vigenere_encrypt(text, key):
    if not key or not key.isalpha():
        raise ValueError(f"Invalid key: '{key}'")
    key = key.upper()
    result = []
    ki = 0
    for c in text:
        if c.isalpha():
            # compute shift and encrypt
            ki += 1
        else:
            result.append(c)
    return "".join(result)

def vigenere_decrypt(text, key):
    pass  # same as encrypt but negate the shift

def freq_analysis(text, top_n=3):
    freq = {}
    for c in text:
        if c.isalpha():
            lc = c.lower()
            freq[lc] = freq.get(lc, 0) + 1
    total = sum(freq.values())
    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:top_n]
    return [(ch, cnt, cnt / total * 100) for ch, cnt in ranked]

key = "KEY"
text = "Attack at Dawn!"
try:
    enc = vigenere_encrypt(text, key)
    dec = vigenere_decrypt(enc, key)
    print("=== Encryption ===")
    print(f"key      : {key}")
    print(f"original : {text}")
    print(f"encrypted: {enc}")
    print(f"decrypted: {dec}")
    print(f"verified : {dec == text}")
except ValueError as e:
    print(f"Error: {e}")
print()
print("=== Top-3 Cipher Letter Frequency ===")
for ch, cnt, pct in freq_analysis(enc):
    print(f"  {ch}: {cnt} occurrences ({pct:.1f}%)")

@@answer
def vigenere_encrypt(text, key):
    if not key or not key.isalpha():
        raise ValueError(f"Invalid key: '{key}'")
    key = key.upper()
    result = []
    ki = 0
    for c in text:
        if c.isalpha():
            shift = ord(key[ki % len(key)]) - ord("A")
            base = ord("A") if c.isupper() else ord("a")
            result.append(chr((ord(c) - base + shift) % 26 + base))
            ki += 1
        else:
            result.append(c)
    return "".join(result)

def vigenere_decrypt(text, key):
    if not key or not key.isalpha():
        raise ValueError(f"Invalid key: '{key}'")
    key = key.upper()
    result = []
    ki = 0
    for c in text:
        if c.isalpha():
            shift = ord(key[ki % len(key)]) - ord("A")
            base = ord("A") if c.isupper() else ord("a")
            result.append(chr((ord(c) - base - shift) % 26 + base))
            ki += 1
        else:
            result.append(c)
    return "".join(result)

def freq_analysis(text, top_n=3):
    freq = {}
    for c in text:
        if c.isalpha():
            lc = c.lower()
            freq[lc] = freq.get(lc, 0) + 1
    total = sum(freq.values())
    ranked = sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:top_n]
    return [(ch, cnt, cnt / total * 100) for ch, cnt in ranked]

key = "KEY"
text = "Attack at Dawn!"
try:
    enc = vigenere_encrypt(text, key)
    dec = vigenere_decrypt(enc, key)
    print("=== Encryption ===")
    print(f"key      : {key}")
    print(f"original : {text}")
    print(f"encrypted: {enc}")
    print(f"decrypted: {dec}")
    print(f"verified : {dec == text}")
except ValueError as e:
    print(f"Error: {e}")
print()
print("=== Top-3 Cipher Letter Frequency ===")
for ch, cnt, pct in freq_analysis(enc):
    print(f"  {ch}: {cnt} occurrences ({pct:.1f}%)")

@@expectedOutput
=== Encryption ===
key      : KEY
original : Attack at Dawn!
encrypted: Kxrkgi kx Bkal!
decrypted: Attack at Dawn!
verified : True

=== Top-3 Cipher Letter Frequency ===
  k: 4 occurrences (33.3%)
  x: 2 occurrences (16.7%)
  a: 1 occurrences (8.3%)
`);
