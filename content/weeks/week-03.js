DARIJA.addWeek({
  id: 3,
  title: 'Food, the kitchen and the dinner table',
  canDo: 'say what you want and what you like, accept and politely refuse food, and get through a meal with his family.',

  vocabulary: [
    {
      title: 'Food and drink',
      words: [
        { dar: 'lmakla', ar: 'الماكلة', en: 'food' },
        { dar: 'lftour / lghda / l3cha', ar: 'الفطور / الغدا / العشا', en: 'breakfast / lunch / dinner' },
        { dar: 'khobz', ar: 'خبز', en: 'bread', note: 'sacred at the table, never thrown away' },
        { dar: 'lma', ar: 'الما', en: 'water' },
        { dar: 'atay (b na3na3)', ar: 'أتاي بالنعناع', en: '(mint) tea' },
        { dar: '9hwa', ar: 'قهوة', en: 'coffee' },
        { dar: '7lib', ar: 'حليب', en: 'milk' },
        { dar: 'zit l3oud / zitoun', ar: 'زيت العود / زيتون', en: 'olive oil / olives' },
        { dar: 'lmel7 / sokkar', ar: 'الملح / السكر', en: 'salt / sugar' },
        { dar: 'l7em / djaj / l7out', ar: 'اللحم / الدجاج / الحوت', en: 'meat / chicken / fish' },
        { dar: 'lkhodra / lfakya', ar: 'الخضرة / الفاكية', en: 'vegetables / fruit' },
        { dar: 'lbid', ar: 'البيض', en: 'eggs' },
      ],
    },
    {
      title: 'Wanting and liking',
      words: [
        { dar: 'bghit...', ar: 'بغيت', en: 'I want...', note: '*bghit atay* = I want tea' },
        { dar: 'bghiti...?', ar: 'بغيتي؟', en: 'do you want...?' },
        { dar: 'kanbghi... / ma kanbghich...', ar: 'كنبغي / ما كنبغيش', en: 'I like... / I don\'t like...' },
        { dar: 'kanbghik', ar: 'كنبغيك', en: 'I love you' },
      ],
    },
    {
      title: 'At the table',
      words: [
        { dar: 'jy3ana / 3tchana', ar: 'جيعانة / عطشانة', en: 'hungry / thirsty (f)', note: '*ana jy3ana* = I\'m hungry' },
        { dar: 'bnin!', ar: 'بنين!', en: 'delicious!' },
        { dar: 'chb3t', ar: 'شبعت', en: 'I\'m full' },
        { dar: 'zid / zidi', ar: 'زيد / زيدي', en: 'more / have more (to a woman)' },
        { dar: 'safi', ar: 'صافي', en: 'enough, that\'s it' },
        { dar: 'bismillah', ar: 'بسم الله', en: 'in the name of God', note: 'said before eating' },
        { dar: 'bsse7tek', ar: 'بالصحة ديالك', en: 'enjoy, cheers, bon appétit' },
      ],
    },
  ],

  grammar: {
    title: '"bghit" + noun or verb',
    paragraphs: [
      '**bghit** works for "I want" and also "I would like": *bghit 9hwa* (I\'d like a coffee), *bghit nakul* (I want to eat). Negative: *ma bghitch* (I don\'t want).',
      'To be polite, add **3afak** at the end: *bghit lma, 3afak*.',
    ],
    examples: [
      { dar: 'bghit 9hwa', ar: 'بغيت قهوة', en: 'I\'d like a coffee' },
      { dar: 'bghit nakul', ar: 'بغيت ناكل', en: 'I want to eat' },
      { dar: 'ma bghitch', ar: 'ما بغيتش', en: 'I don\'t want' },
      { dar: 'bghit lma, 3afak', ar: 'بغيت الما، عافاك', en: 'I\'d like water, please' },
    ],
    relatedWords: ['bghit...', 'bghiti...?', '3afak'],
  },

  dialogue: {
    title: 'Dinner with his mother',
    lines: [
      { speaker: 'Mama', dar: 'Bismillah, kuli, kuli!', ar: 'بسم الله، كولي، كولي!', en: 'In the name of God, eat, eat!' },
      { speaker: 'Lea', dar: 'Chokran. Mmm, bnin bzaf!', ar: 'شكرا. ممم، بنين بزاف!', en: 'Thank you. Mmm, very delicious!' },
      { speaker: 'Mama', dar: 'Zidi chwiya!', ar: 'زيدي شوية!', en: 'Have a little more!' },
      { speaker: 'Lea', dar: 'La, chokran, chb3t, l7amdulillah.', ar: 'لا، شكرا، شبعت، الحمد لله.', en: 'No, thank you, I\'m full, thank God.' },
      { speaker: 'Mama', dar: 'Zidi, zidi!', ar: 'زيدي، زيدي!', en: 'More, more!' },
      { speaker: 'Lea', dar: 'Wakha, chwiya safi.', ar: 'واخا، شوية صافي.', en: 'Okay, just a little.' },
      { speaker: 'Mama', dar: 'Bghiti atay?', ar: 'بغيتي أتاي؟', en: 'Do you want tea?' },
      { speaker: 'Lea', dar: 'Iyeh, 3afak, b chwiya d sokkar.', ar: 'إيه، عافاك، بشوية د السكر.', en: 'Yes, please, with a little sugar.' },
      { speaker: 'Mama', dar: 'Bsse7tek!', ar: 'بالصحة!', en: 'Enjoy!' },
    ],
    glossary: [{ dar: 'kuli', en: 'eat (to a woman)' }, { dar: 'chwiya', en: 'a little' }],
    culture: 'Expect to be offered more food several times. A first "no" is often read as politeness. *Chb3t, l7amdulillah* with a hand on your heart is the clear, friendly way to stop.',
  },

  exercises: [
    { title: 'Cook and narrate', text: 'Make a meal and name every ingredient out loud as you use it.' },
    { title: 'Shopping list', text: 'Write your next grocery list in Darija and read it aloud in the shop.' },
    { title: 'Like / don\'t like', text: 'Say 5 things you like and 5 you don\'t: *kanbghi atay, ma kanbghich l7out...*' },
  ],

  mission: {
    text: '**One dinner this week in Darija only.** Order from him like he\'s a waiter (*bghit lma, 3afak*), compliment the food and refuse seconds politely.',
    phrases: [
      { dar: 'bghit lma, 3afak', ar: 'بغيت الما، عافاك', en: 'I\'d like water, please' },
      { dar: 'bnin bzaf!', ar: 'بنين بزاف!', en: 'very delicious!' },
      { dar: 'chb3t, l7amdulillah', ar: 'شبعت، الحمد لله', en: 'I\'m full, thank God' },
    ],
  },

  quiz: [
    { q: 'Say: "I\'d like coffee, please."', a: '', dar: 'bghit 9hwa, 3afak', ar: 'بغيت قهوة، عافاك' },
    { q: 'What do you say before eating?', a: '', dar: 'bismillah', ar: 'بسم الله' },
    { q: 'His mother says *zidi!* What does she want?', a: 'for you to have more' },
    { q: 'Say: "I\'m full, thank God."', a: '', dar: 'chb3t, l7amdulillah', ar: 'شبعت، الحمد لله' },
    { q: 'What\'s the difference between *kanbghi atay* and *kanbghik*?', a: '"I like tea" vs "I love you"' },
    { q: 'Say: "Delicious!"', a: '', dar: 'bnin!', ar: 'بنين!' },
  ],
});
