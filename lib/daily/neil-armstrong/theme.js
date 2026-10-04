/* lib/daily/neil-armstrong — every year on 07-20. */
LouieDaily.define({
  name: 'Neil Armstrong',
  born: 1930, died: 2012,
  event: { year: 1969, zh: '今天，纪念人类第一次登上月球{n}周年', en: 'Today, {n} years since the first Moon landing' },
  lines: [
    { zh: '这是一个人的一小步，却是人类的一大步。',
      en: 'That\'s one small step for (a) man, one giant leap for mankind.' },
    { zh: '我想，我们去月球，是因为人天生就要去面对挑战。',
      en: 'I think we\'re going to the moon because it\'s in the nature of the human being to face challenges.' }
  ],
  cover: { portrait: 'portrait.jpg', ratio: 960 / 1200, mono: true },
  credit: {
    title: 'Neil Armstrong, 1969',
    author: 'Unknown author',
    license: 'Public domain',
    licenseUrl: '',
    source: 'https://commons.wikimedia.org/wiki/File:Neil_Armstrong_pose_(cropped).jpg'
  }
});
