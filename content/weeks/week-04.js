DARIJA.addWeek({
  id: 4,
  title: 'Family, in-laws and describing people',
  canDo: 'talk about your family and his, ask about siblings and age, describe people simply, and use the blessings Moroccans use all the time.',

  vocabulary: [
    {
      title: 'Family',
      words: [
        { dar: 'l3a2ila', ar: 'العائلة', en: 'the family' },
        { dar: 'mama / baba', ar: 'ماما / بابا', en: 'mom / dad', note: '*lwalida / lwalid* is more formal' },
        { dar: 'khouya / khti', ar: 'خويا / ختي', en: 'my brother / my sister' },
        { dar: 'khout', ar: 'خوت', en: 'siblings', note: '*3ndek khout?* = do you have siblings?' },
        { dar: 'jeddi / jedda', ar: 'جدي / جدة', en: 'grandpa / grandma' },
        { dar: '3mmi / 3mmti', ar: 'عمي / عمتي', en: 'uncle / aunt (father\'s side)' },
        { dar: 'khali / khalti', ar: 'خالي / خالتي', en: 'uncle / aunt (mother\'s side)' },
        { dar: 'wlad 3mmi', ar: 'ولاد عمي', en: 'cousins (father\'s side)' },
        { dar: 'drari', ar: 'دراري', en: 'kids' },
        { dar: 'sa7bi / sa7bti', ar: 'صاحبي / صاحبتي', en: 'my boyfriend / my girlfriend', note: 'also: friend' },
      ],
    },
    {
      title: 'Describing people',
      words: [
        { dar: 'kbir / kbira', ar: 'كبير / كبيرة', en: 'big, older' },
        { dar: 'sghir / sghira', ar: 'صغير / صغيرة', en: 'small, younger' },
        { dar: 'zwin / zwina', ar: 'زوين / زوينة', en: 'beautiful, nice' },
        { dar: 'twil / 9sir', ar: 'طويل / قصير', en: 'tall / short' },
        { dar: 'drif / drifa', ar: 'ظريف / ظريفة', en: 'kind, sweet' },
        { dar: 'chhal f 3mrek?', ar: 'شحال ف عمرك؟', en: 'how old are you?' },
        { dar: '3ndi ... 3am', ar: 'عندي ... عام', en: 'I\'m ... years old' },
      ],
    },
    {
      title: 'Blessings',
      words: [
        { dar: 'Allah y3awnek', ar: 'الله يعاونك', en: 'God help you', note: 'to someone working or busy' },
        { dar: 'Allah ybarek fik', ar: 'الله يبارك فيك', en: 'God bless you', note: 'a warm "thank you" or reply to compliments' },
        { dar: 'slmi 3la...', ar: 'سلمي على', en: 'say hi to... (to a woman)', note: '*slm 3la...* to a man' },
        { dar: 'a benti', ar: 'آ بنتي', en: 'my daughter', note: 'what his mother may call you' },
      ],
    },
    {
      title: 'Numbers 20–100',
      grammarLink: true,
      words: [
        { dar: '3chrin', ar: 'عشرين', en: '20' },
        { dar: 'tlatin', ar: 'تلاتين', en: '30' },
        { dar: 'rb3in', ar: 'ربعين', en: '40' },
        { dar: 'khamsin', ar: 'خمسين', en: '50' },
        { dar: 'sttin', ar: 'ستين', en: '60' },
        { dar: 'sb3in', ar: 'سبعين', en: '70' },
        { dar: 'tmanin', ar: 'تمانين', en: '80' },
        { dar: 'ts3in', ar: 'تسعين', en: '90' },
        { dar: 'mya', ar: 'مية', en: '100' },
      ],
    },
  ],

  grammar: {
    title: 'Numbers 20–100 and "3ndi"',
    paragraphs: [
      '*3chrin* (20) · *tlatin* (30) · *rb3in* (40) · *khamsin* (50) · *sttin* (60) · *sb3in* (70) · *tmanin* (80) · *ts3in* (90) · *mya* (100)',
      'In-between numbers put the **small number first**, like German: 32 = *tnin u tlatin* ("two and thirty").',
      'Age uses **3ndi** (I have), like "I have 30 years" in French: *3ndi tlatin 3am*.',
    ],
    examples: [
      { dar: 'tnin u tlatin', ar: 'تنين و تلاتين', en: '32 ("two and thirty")' },
      { dar: '3ndi tlatin 3am', ar: 'عندي تلاتين عام', en: 'I\'m 30 years old' },
      { dar: 'khamsa u rb3in', ar: 'خمسة و ربعين', en: '45' },
    ],
    relatedWords: ['chhal f 3mrek?', '3ndi ... 3am', '3chrin … mya'],
  },

  dialogue: {
    title: 'Video call with his mother',
    lines: [
      { speaker: 'Mama', dar: 'Salam a benti, kidayra?', ar: 'السلام آ بنتي، كيدايرة؟', en: 'Hello my daughter, how are you?' },
      { speaker: 'Lea', dar: 'Labas, l7amdulillah. U nti, kidayra? Kidayrin l3a2ila?', ar: 'لاباس، الحمد لله. و نتي، كيدايرة؟ كيدايرين العائلة؟', en: 'Fine, thank God. And you, how are you? How is the family?' },
      { speaker: 'Mama', dar: 'Kolchi bikhir, l7amdulillah. Fin howa?', ar: 'كلشي بخير، الحمد لله. فين هو؟', en: 'Everyone is well, thank God. Where is he?' },
      { speaker: 'Lea', dar: 'Howa f lkhedma.', ar: 'هو ف الخدمة.', en: 'He\'s at work.' },
      { speaker: 'Mama', dar: 'Allah y3awnou.', ar: 'الله يعاونو.', en: 'God help him.' },
      { speaker: 'Lea', dar: 'Amin. Slmi 3la baba u 3la khtou!', ar: 'آمين. سلمي على بابا و على ختو!', en: 'Amen. Say hi to dad and to his sister!' },
      { speaker: 'Mama', dar: 'Allah ybarek fik, a benti. Nti drifa bzaf!', ar: 'الله يبارك فيك، آ بنتي. نتي ظريفة بزاف!', en: 'God bless you, my daughter. You\'re very sweet!' },
      { speaker: 'Lea', dar: 'Chokran, Allah ybarek fik!', ar: 'شكرا، الله يبارك فيك!', en: 'Thank you, God bless you!' },
    ],
    glossary: [
      { dar: 'kolchi', en: 'everyone, everything' }, { dar: 'lkhedma', en: 'work' },
      { dar: 'y3awnou', en: 'help him' }, { dar: 'khtou', en: 'his sister' },
    ],
  },

  exercises: [
    { title: 'Family tree', text: 'Draw his family tree with him, labelling everyone in Darija (*khalto Fatima, 3mmo Ahmed...*). Add yours next to it.' },
    { title: 'Photo talk', text: 'Pick 3 family photos and describe each person aloud: *hadi khti, hiya twila u zwina, 3ndha 27 3am*.' },
    { title: 'Questions to ask', text: 'Prepare 5 questions for his mother or siblings and practice asking them with him.' },
  ],

  mission: {
    text: 'Have a **short call or voice message with someone from his family**, even 2 minutes. Greet them, ask how everyone is and use *Allah ybarek fik* at least once. He can sit next to you as backup.',
    phrases: [
      { dar: 'kidayrin l3a2ila?', ar: 'كيدايرين العائلة؟', en: 'how is the family?' },
      { dar: 'Allah ybarek fik', ar: 'الله يبارك فيك', en: 'God bless you' },
    ],
  },

  quiz: [
    { q: 'What is *khali*: your mother\'s or father\'s brother?', a: 'mother\'s brother' },
    { q: 'Say: "I\'m 30 years old."', a: '', dar: '3ndi tlatin 3am', ar: 'عندي تلاتين عام' },
    { q: 'Someone tells you he\'s busy at work. What blessing do you say?', a: '', dar: 'Allah y3awnek', ar: 'الله يعاونك' },
    { q: 'Say: "Do you have siblings?"', a: '', dar: '3ndek khout?', ar: 'عندك خوت؟' },
    { q: 'How do you say 45?', a: '', dar: 'khamsa u rb3in', ar: 'خمسة و ربعين' },
    { q: 'What\'s the feminine of *zwin*?', a: '', dar: 'zwina', ar: 'زوينة' },
  ],
});
