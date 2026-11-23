DARIJA.addWeek({
  id: 2,
  title: 'Your home, numbers, this and that',
  canDo: 'name 30+ things in your apartment, say what\'s here or missing, ask where something is, and count to 10.',
  notes: ['This is **sticky-note week**: put up the full list from "Sticky notes for your home" (in the menu) on Monday.'],

  vocabulary: [
    {
      title: 'This, that, here, there',
      words: [
        { dar: 'hada / hadi', ar: 'هادا / هادي', en: 'this (m / f)', note: '*hada lbab* = this is the door' },
        { dar: 'hadak / hadik', ar: 'هاداك / هاديك', en: 'that (m / f)' },
        { dar: 'hna / temma', ar: 'هنا / تما', en: 'here / there' },
        { dar: 'fin...?', ar: 'فين؟', en: 'where is...?', note: '*fin sarout?* = where\'s the key?' },
        { dar: 'kayn / kayna', ar: 'كاين / كاينة', en: 'there is (m / f)' },
        { dar: 'makaynch', ar: 'ماكاينش', en: 'there isn\'t' },
        { dar: '3ndi / ma 3ndich', ar: 'عندي / ما عنديش', en: 'I have / I don\'t have' },
        { dar: 'dyali / dyalek', ar: 'ديالي / ديالك', en: 'my, mine / your, yours', note: '*sarout dyali* = my key' },
        { dar: 'dyalo / dyalha', ar: 'ديالو / ديالها', en: 'his / her' },
        { dar: 'ha huwa! / ha hiya!', ar: 'ها هو! / ها هي!', en: 'here it is! (m / f)' },
        { dar: 'chi', ar: 'شي', en: 'some, a', note: '*chi kas* = a glass' },
      ],
    },
    {
      title: 'Numbers 1–10',
      words: [
        { dar: 'wa7ed', ar: 'واحد', en: 'one' },
        { dar: 'jouj', ar: 'جوج', en: 'two' },
        { dar: 'tlata', ar: 'تلاتة', en: 'three' },
        { dar: 'rb3a', ar: 'ربعة', en: 'four' },
        { dar: 'khamsa', ar: 'خمسة', en: 'five' },
        { dar: 'stta', ar: 'ستة', en: 'six' },
        { dar: 'sb3a', ar: 'سبعة', en: 'seven' },
        { dar: 'tmnya', ar: 'تمنية', en: 'eight' },
        { dar: 'ts3oud', ar: 'تسعود', en: 'nine' },
        { dar: '3chra', ar: 'عشرة', en: 'ten' },
      ],
    },
  ],

  grammar: {
    title: '"l-", gender and "dyal"',
    paragraphs: [
      '"The" is just **l-** in front of the word: *lbab* (the door). Before some sounds it doubles the next letter instead: *t-tebla* (the table), *ch-cherjem* (the window). Just copy how you hear it.',
      'Words ending in **-a** are usually feminine, so they take *hadi*: *hadi tebla*, but *hada kursi*.',
      'To say "my", put **dyali** after the word: *tilifoun dyali* (my phone). Two is *jouj*, and you can say **jouj d + noun**: *jouj d lkisan* (two glasses).',
    ],
    examples: [
      { dar: 'hada lbab', ar: 'هادا الباب', en: 'this is the door' },
      { dar: 'hadi t-tebla', ar: 'هادي الطبلة', en: 'this is the table' },
      { dar: 'hada kursi', ar: 'هادا كرسي', en: 'this is a chair' },
      { dar: 'tilifoun dyali', ar: 'التيليفون ديالي', en: 'my phone' },
      { dar: 'jouj d lkisan', ar: 'جوج د الكيسان', en: 'two glasses' },
    ],
    relatedWords: ['hada / hadi', 'dyali / dyalek', 'jouj'],
  },

  dialogue: {
    title: 'Where are my keys?',
    lines: [
      { speaker: 'Lea', dar: 'Fin sarout dyali?', ar: 'فين الساروت ديالي؟', en: 'Where is my key?' },
      { speaker: 'Boyfriend', dar: 'Ma3reftch. Chefti f lkuzina?', ar: 'ما عرفتش. شفتي ف الكوزينة؟', en: 'I don\'t know. Did you look in the kitchen?' },
      { speaker: 'Lea', dar: 'Iyeh, makaynch temma.', ar: 'إيه، ماكاينش تما.', en: 'Yes, it\'s not there.' },
      { speaker: 'Boyfriend', dar: 'U hadak f t-tebla?', ar: 'و هاداك ف الطبلة؟', en: 'And that one on the table?' },
      { speaker: 'Lea', dar: 'La, hadak tilifoun dyalek!', ar: 'لا، هاداك التيليفون ديالك!', en: 'No, that\'s your phone!' },
      { speaker: 'Boyfriend', dar: 'Hhh... sme7 li. Ah, ha huwa! Hna, f sak dyalek.', ar: 'ههه... سمح لي. آه، ها هو! هنا، ف الساك ديالك.', en: 'Haha... sorry. Ah, here it is! Here, in your bag.' },
      { speaker: 'Lea', dar: 'Chokran!', ar: 'شكرا!', en: 'Thanks!' },
    ],
    glossary: [
      { dar: 'ma3reftch', en: 'I don\'t know' }, { dar: 'chefti', en: 'did you look / see' },
      { dar: 'lkuzina', en: 'the kitchen' }, { dar: 'sak', en: 'bag' },
    ],
  },

  exercises: [
    { title: 'Touch and say', text: 'Walk through your apartment, touch 20 objects and say *hada* / *hadi* + the word. Time yourself and try to beat it on Sunday.' },
    { title: 'Hide and seek', text: 'Your boyfriend hides 3 things. You ask *fin...?*, he answers only *hna*, *temma* or *makaynch*.' },
    { title: 'Count everything', text: 'Stairs, eggs, groceries. Say your phone number in Darija, digit by digit.' },
  ],

  mission: {
    text: 'Give him a **tour of your apartment** in Darija: *hada lbab, hadi t-tebla, hada tilifoun dyali, kayn jouj d lkursiyat...* He corrects your pronunciation.',
    phrases: [
      { dar: 'hada lbab', ar: 'هادا الباب', en: 'this is the door' },
      { dar: 'hadi t-tebla', ar: 'هادي الطبلة', en: 'this is the table' },
      { dar: 'kayn jouj d lkursiyat', ar: 'كاين جوج د الكورسيات', en: 'there are two chairs' },
    ],
  },

  quiz: [
    { q: 'Is it *hada* or *hadi tebla*?', a: '*tebla* ends in -a', dar: 'hadi', ar: 'هادي' },
    { q: 'Say: "Where is my phone?"', a: '', dar: 'fin tilifoun dyali?', ar: 'فين التيليفون ديالي؟' },
    { q: 'What does *makaynch* mean?', a: 'there isn\'t' },
    { q: 'Count from 6 to 10.', a: '', dar: 'stta, sb3a, tmnya, ts3oud, 3chra', ar: 'ستة، سبعة، تمنية، تسعود، عشرة' },
    { q: 'Say: "This is your key."', a: '', dar: 'hada sarout dyalek', ar: 'هادا الساروت ديالك' },
    { q: 'How do you say "I don\'t have"?', a: '', dar: 'ma 3ndich', ar: 'ما عنديش' },
  ],
});
