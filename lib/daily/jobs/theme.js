/* ============================================================
 * lib/daily/jobs — every year on 10-05.
 * Remembering Steve Jobs (1955 – 2011), in his own words.
 *
 * Cover: "Steve Jobs Headshot 2010-CROP2.jpg" by Matthew Yohe,
 * WWDC 2010, CC BY-SA 3.0 — shown in black and white.
 * https://commons.wikimedia.org/wiki/File:Steve_Jobs_Headshot_2010-CROP2.jpg
 * ============================================================ */
(function () {
  const years = LouieDaily.year - 2011;
  const zhNum = n => {
    const d = '零一二三四五六七八九';
    if (n < 10) return d[n];
    return (n < 20 ? '' : d[Math.floor(n / 10)]) + '十' + (n % 10 ? d[n % 10] : '');
  };

  LouieDaily.define({
    cover: {
      portrait: 'jobs-wwdc-2010.jpg',
      ratio: 1280 / 2046,
      mono: true
    },

    /* One quiet line under the hero buttons. */
    note: {
      zh: `今天，纪念 Steve Jobs（1955 – 2011）逝世${zhNum(years)}周年`,
      en: `Today, remembering Steve Jobs (1955 – 2011), ${years} years on`
    },

    /* The day's lines, between "致那唯一的一个。" and
       "这个世界从不缺「之一」，它一直在等「唯一」。"
       Only his own words, from the 2005 Stanford commencement address. */
    lines: [
      { zh: '你的时间有限，不要活成别人的样子。',
        en: 'Your time is limited, so don’t waste it living someone else’s life.' },
      { zh: '别让别人的声音，淹没你内心的声音。',
        en: 'Don’t let the noise of others’ opinions drown out your own inner voice.' },
      { cls: 'mf-cite',
        zh: '— Steve Jobs（1955 – 2011）',
        en: '— Steve Jobs (1955 – 2011)' }
    ],

    credit: {
      zh: '今日封面 <em>Steve Jobs，WWDC 2010</em>，摄影 Matthew Yohe，以 <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a> 授权，转载自 <a href="https://commons.wikimedia.org/wiki/File:Steve_Jobs_Headshot_2010-CROP2.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>，经黑白处理。',
      en: 'Today’s cover: <em>Steve Jobs, WWDC 2010</em> by Matthew Yohe, licensed <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Steve_Jobs_Headshot_2010-CROP2.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, shown in black and white.'
    }
  });
})();
