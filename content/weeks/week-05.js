DARIJA.addWeek({
  id: 5,
  title: 'Daily routine, time and your first verbs',
  canDo: 'describe your normal day, say the time and days, and use about 12 verbs in the present tense.',

  vocabulary: [
    {
      title: 'Verbs for your day',
      words: [
        { dar: 'kanfi9', ar: 'كنفيق', en: 'I wake up' },
        { dar: 'kandouch', ar: 'كندوش', en: 'I shower' },
        { dar: 'kanakul / kanchreb', ar: 'كناكل / كنشرب', en: 'I eat / I drink' },
        { dar: 'kanmchi', ar: 'كنمشي', en: 'I go', note: '*kanmchi l lkhedma* = I go to work' },
        { dar: 'kankhdem', ar: 'كنخدم', en: 'I work' },
        { dar: 'kan9elleb 3la khedma', ar: 'كنقلب على خدمة', en: 'I\'m looking for a job' },
        { dar: 'kanteyyeb', ar: 'كنطيب', en: 'I cook' },
        { dar: 'kanchouf', ar: 'كنشوف', en: 'I see, I watch' },
        { dar: 'kan9ra', ar: 'كنقرا', en: 'I read, I study' },
        { dar: 'kanrje3', ar: 'كنرجع', en: 'I come back' },
        { dar: 'kanmchi n3es', ar: 'كنمشي نعس', en: 'I go to sleep' },
      ],
    },
    {
      title: 'Time and days',
      words: [
        { dar: 'daba / men b3d', ar: 'دابا / من بعد', en: 'now / later' },
        { dar: 'lyoum / ghedda / lbare7', ar: 'اليوم / غدا / البارح', en: 'today / tomorrow / yesterday' },
        { dar: 'sba7 / l3chiya / llil', ar: 'الصباح / العشية / الليل', en: 'morning / afternoon-evening / night' },
        { dar: 'dima / mrra mrra', ar: 'ديما / مرة مرة', en: 'always / sometimes' },
        { dar: 'fo9ach?', ar: 'فوقاش؟', en: 'when?' },
        { dar: 'chhal f sa3a?', ar: 'شحال ف الساعة؟', en: 'what time is it?' },
        { dar: 'm3a sb3a', ar: 'مع السبعة', en: 'at seven' },
        { dar: 'u nss / u rb3 / lla rb3', ar: 'و نص / و ربع / لا ربع', en: 'half past / quarter past / quarter to', note: '*m3a tmnya u nss* = at 8:30' },
        { dar: 'letnin, tlat, larb3, lkhmis', ar: 'الاتنين، التلات، الاربع، الخميس', en: 'Monday, Tuesday, Wednesday, Thursday' },
        { dar: 'ljem3a, ssebt, l7ed', ar: 'الجمعة، السبت، الحد', en: 'Friday, Saturday, Sunday' },
      ],
    },
  ],

  grammar: {
    title: 'The present tense with "ka-"',
    paragraphs: [
      'Present = **ka-** + a person marker + the verb. Learn this one verb (*khdem*, to work) and copy the pattern for everything.',
      'Negative: wrap it in **ma...ch**: *makankhdemch* (I don\'t work), *makanakulch l7em* (I don\'t eat meat).',
    ],
    table: {
      head: ['Person', 'Darija', 'English'],
      rows: [
        ['ana', { dar: 'kankhdem', ar: 'كنخدم' }, 'I work'],
        ['nta', { dar: 'katkhdem', ar: 'كتخدم' }, 'you work (m)'],
        ['nti', { dar: 'katkhdmi', ar: 'كتخدمي' }, 'you work (f)'],
        ['howa', { dar: 'kaykhdem', ar: 'كيخدم' }, 'he works'],
        ['hiya', { dar: 'katkhdem', ar: 'كتخدم' }, 'she works'],
        ['7na', { dar: 'kankhdmu', ar: 'كنخدمو' }, 'we work'],
        ['ntoma', { dar: 'katkhdmu', ar: 'كتخدمو' }, 'you work (pl)'],
        ['homa', { dar: 'kaykhdmu', ar: 'كيخدمو' }, 'they work'],
      ],
    },
    examples: [
      { dar: 'makankhdemch', ar: 'ماكنخدمش', en: 'I don\'t work' },
      { dar: 'makanakulch l7em', ar: 'ماكناكلش اللحم', en: 'I don\'t eat meat' },
    ],
    relatedWords: ['kanfi9', 'kankhdem', 'kanakul / kanchreb', 'kanmchi'],
  },

  dialogue: {
    title: '"What\'s your day like?"',
    lines: [
      { speaker: 'Boyfriend', dar: 'Fo9ach katfi9i f sba7?', ar: 'فوقاش كتفيقي ف الصباح؟', en: 'When do you wake up in the morning?' },
      { speaker: 'Lea', dar: 'Kanfi9 m3a sb3a. Kanchreb 9hwa u kan9elleb 3la khedma.', ar: 'كنفيق مع السبعة. كنشرب قهوة و كنقلب على خدمة.', en: 'I wake up at seven. I drink coffee and look for a job.' },
      { speaker: 'Boyfriend', dar: 'U f l3chiya?', ar: 'و ف العشية؟', en: 'And in the afternoon?' },
      { speaker: 'Lea', dar: 'Kanmchi l sport, men b3d kanteyyeb.', ar: 'كنمشي للسبور، من بعد كنطيب.', en: 'I go to sport, then I cook.' },
      { speaker: 'Boyfriend', dar: 'U fo9ach katn3si?', ar: 'و فوقاش كتنعسي؟', en: 'And when do you go to sleep?' },
      { speaker: 'Lea', dar: 'Dima m3a l7dach. U nta?', ar: 'ديما مع الحداش. و نتا؟', en: 'Always at eleven. And you?' },
      { speaker: 'Boyfriend', dar: 'Ana kankhdem bzaf, kanrje3 m3a stta.', ar: 'أنا كنخدم بزاف، كنرجع مع الستة.', en: 'I work a lot, I come back at six.' },
      { speaker: 'Lea', dar: 'Allah y3awnek!', ar: 'الله يعاونك!', en: 'God help you!' },
    ],
    glossary: [
      { dar: 'katfi9i', en: 'you wake up (f)' }, { dar: 'katn3si', en: 'you sleep (f)' }, { dar: 'l7dach', en: 'eleven' },
    ],
  },

  exercises: [
    { title: 'Narrate live', text: 'For one morning, say everything you do as you do it: *kanfi9, kandouch, kanchreb 9hwa...*' },
    { title: 'Conjugation drill', text: 'Run *kla* (*kanakul / katakul / katakli...*), *mcha* (*kanmchi / katmchi / katmchi...*) and *chaf* (*kanchouf / katchouf / katchoufi...*) through all persons. Check with your boyfriend.' },
    { title: 'Week planner', text: 'Say what you do each day this week: *letnin kanmchi l sport, tlat...*' },
  ],

  mission: {
    text: '**Every evening this week**, tell him three things about your day in Darija, and ask him *u nta?* He answers in simple Darija too.',
    phrases: [{ dar: 'u nta?', ar: 'و نتا؟', en: 'and you?' }],
  },

  quiz: [
    { q: 'Say: "I wake up at seven."', a: '', dar: 'kanfi9 m3a sb3a', ar: 'كنفيق مع السبعة' },
    { q: 'Conjugate *khdem* for "she".', a: '', dar: 'katkhdem', ar: 'كتخدم' },
    { q: 'How do you make *kanchreb* negative?', a: '', dar: 'makanchrebch', ar: 'ماكنشربش' },
    { q: 'What does *ghedda* mean?', a: 'tomorrow' },
    { q: 'Ask: "What time is it?"', a: '', dar: 'chhal f sa3a?', ar: 'شحال ف الساعة؟' },
    { q: 'Say: "Sometimes I cook."', a: '', dar: 'mrra mrra kanteyyeb', ar: 'مرة مرة كنطيب' },
  ],
});
