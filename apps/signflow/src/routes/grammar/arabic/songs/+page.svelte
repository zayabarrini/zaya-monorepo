<script>
  // Words data
  const wordsData = [
    // Nouns (الأسماء)
    {
      arabic: "قلب",
      translation: "heart",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "قلب المحب يخفق بسرعة"
    },
    {
      arabic: "عيون",
      translation: "eyes",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عيونها كالبحر العميق"
    },
    {
      arabic: "وقت",
      translation: "time",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الوقت كالسيف إن لم تقطعه قطعك"
    },
    {
      arabic: "طريقة",
      translation: "way, method",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "هذه طريقة جديدة للتعلم"
    },
    {
      arabic: "روح",
      translation: "soul",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الروح متعطشة للمعرفة"
    },
    {
      arabic: "إيدين",
      translation: "hands",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "بيدي أبني مستقبلي"
    },
    {
      arabic: "قد",
      translation: "stature",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "قدها كالنخلة المديدة"
    },
    {
      arabic: "ضفاير",
      translation: "braids",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "ضفايرها السوداء تتمايل مع الريح"
    },
    {
      arabic: "خصر",
      translation: "waist",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "خصرها نحيل كالغصن"
    },
    {
      arabic: "حرفية",
      translation: "craftsmanship",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حرفية النجار واضحة في عمله"
    },
    {
      arabic: "ناس",
      translation: "people",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الناس سواسية كأسنان المشط"
    },
    {
      arabic: "نظرات",
      translation: "glances",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نظرات العيون تعبر عن الكثير"
    },
    {
      arabic: "أنوثة",
      translation: "femininity",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أنوثتها تملأ المكان جمالاً"
    },
    {
      arabic: "جمال",
      translation: "beauty",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "جمال الطبيعة يسرّ الناظرين"
    },
    {
      arabic: "عصير",
      translation: "juice",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عصير البرتقال منعش في الصيف"
    },
    {
      arabic: "ليمون",
      translation: "lemon",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الليمون مفيد للصحة"
    },
    {
      arabic: "تليفون",
      translation: "telephone",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "التليفون وسيلة اتصال سريعة"
    },
    {
      arabic: "شباب",
      translation: "young men",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "شباب اليوم طموحون"
    },
    {
      arabic: "مصاري",
      translation: "money",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "المصاري تحتاج إلى تدبير"
    },
    {
      arabic: "كون",
      translation: "universe",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الكون مليء بالأسرار"
    },
    {
      arabic: "عيني",
      translation: "my eye",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عيني على أولادي"
    },
    {
      arabic: "روحي",
      translation: "my soul",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "روحي فداء لك"
    },
    {
      arabic: "خاتم",
      translation: "ring",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "خاتم الزواج رمز للارتباط"
    },
    {
      arabic: "ذهب",
      translation: "gold",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الذهب معدن ثمين"
    },
    {
      arabic: "فضة",
      translation: "silver",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الفضة تستخدم في الحلي"
    },
    {
      arabic: "مينا",
      translation: "harbor",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "المينا مكان رسو السفن"
    },
    {
      arabic: "بابور",
      translation: "ship",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "البابور يبحر في البحر"
    },
    {
      arabic: "حضن",
      translation: "lap, embrace",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حضن الأم دافئ"
    },
    {
      arabic: "غربة",
      translation: "exile",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الغربة صعبة على النفس"
    },
    {
      arabic: "عين",
      translation: "eye",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "العين ترى والقلب يحس"
    },
    {
      arabic: "حساب",
      translation: "account",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حساب البنك يحتاج إلى متابعة"
    },
    {
      arabic: "ألماس",
      translation: "diamonds",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "الألماس حجر كريم"
    },

    // Proper Nouns (أعلام)
    {
      arabic: "ريف العين",
      translation: "Reef Al Ain",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "ريف العين منطقة جميلة"
    },
    {
      arabic: "ألماس",
      translation: "diamond",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "الألماس ملك الأحجار الكريمة"
    },
    {
      arabic: "هيرميس",
      translation: "Hermes",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "هيرميس علامة تجارية فرنسية"
    },
    {
      arabic: "لويس فويتون",
      translation: "Louis Vuitton",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "لويس فويتون في عالم الأزياء"
    },
    {
      arabic: "باريس",
      translation: "Paris",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "باريس مدينة النور"
    },
    {
      arabic: "دبي",
      translation: "Dubai",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "دبي مدينة المستقبل"
    },
    {
      arabic: "محمد رمضان",
      translation: "Mohamed Ramadan",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "محمد رمضان ممثل مصري"
    },
    {
      arabic: "فلسطين",
      translation: "Palestine",
      category: "nouns",
      subcategory: "Proper Nouns",
      example: "فلسطين أرض مقدسة"
    },

    // Verbal Nouns (مصادر)
    {
      arabic: "غازلة",
      translation: "flirting",
      category: "nouns",
      subcategory: "Verbal Nouns",
      example: "الغازلة فن من فنون الكلام"
    },
    {
      arabic: "فرق",
      translation: "separating",
      category: "nouns",
      subcategory: "Verbal Nouns",
      example: "الفرق بين الحلم والواقع كبير"
    },
    {
      arabic: "منحوت",
      translation: "sculpted",
      category: "nouns",
      subcategory: "Verbal Nouns",
      example: "التمثال منحوت بدقة"
    },
    {
      arabic: "تسحر",
      translation: "enchanting",
      category: "nouns",
      subcategory: "Verbal Nouns",
      example: "تسحر القلوب بجمالها"
    },
    {
      arabic: "دوخني",
      translation: "made me dizzy",
      category: "nouns",
      subcategory: "Verbal Nouns",
      example: "جمالها دوخني"
    },

    // Verbs (أفعال)
    {
      arabic: "خجلتي",
      translation: "you blushed",
      category: "verbs",
      subcategory: "Past Tense",
      example: "خجلتي عندما رأيتني"
    },
    {
      arabic: "احمّروا",
      translation: "reddened",
      category: "verbs",
      subcategory: "Past Tense",
      example: "خدودها احمّروا من الحياء"
    },
    {
      arabic: "قدرتي",
      translation: "I was able",
      category: "verbs",
      subcategory: "Past Tense",
      example: "قدرت على إكمال المهمة"
    },
    {
      arabic: "تتخطى",
      translation: "surpasses",
      category: "verbs",
      subcategory: "Past Tense",
      example: "تتخطى كل الصعاب"
    },
    {
      arabic: "تحتلي",
      translation: "you conquer",
      category: "verbs",
      subcategory: "Past Tense",
      example: "تحتلي قلبي بسهولة"
    },
    {
      arabic: "خلق",
      translation: "created",
      category: "verbs",
      subcategory: "Past Tense",
      example: "الله خلق الكون"
    },
    {
      arabic: "صف",
      translation: "arranged",
      category: "verbs",
      subcategory: "Past Tense",
      example: "صف الكتب على الرف"
    },
    {
      arabic: "بتسحر",
      translation: "enchants",
      category: "verbs",
      subcategory: "Past Tense",
      example: "صوتها بتسحر القلوب"
    },
    {
      arabic: "يسأل",
      translation: "asks",
      category: "verbs",
      subcategory: "Past Tense",
      example: "يسأل عن حالك"
    },
    {
      arabic: "اسمع",
      translation: "listen",
      category: "verbs",
      subcategory: "Past Tense",
      example: "اسمع ما أقول لك"
    },
    {
      arabic: "بدي",
      translation: "I want",
      category: "verbs",
      subcategory: "Past Tense",
      example: "بدي أتعلم العربية"
    },
    {
      arabic: "خليك",
      translation: "be",
      category: "verbs",
      subcategory: "Past Tense",
      example: "خليك قوي في المواقف الصعبة"
    },
    {
      arabic: "جاوَبتني",
      translation: "you answered me",
      category: "verbs",
      subcategory: "Past Tense",
      example: "جاوَبتني بسرعة"
    },
    {
      arabic: "صاير",
      translation: "I have become",
      category: "verbs",
      subcategory: "Past Tense",
      example: "صاير أفهم العربية أكثر"
    },

    // Present/Future Tense
    {
      arabic: "أسهل",
      translation: "I make easy",
      category: "verbs",
      subcategory: "Present/Future",
      example: "أسهل الأمور الصعبة"
    },
    {
      arabic: "يهون",
      translation: "it becomes easy",
      category: "verbs",
      subcategory: "Present/Future",
      example: "كل شيء يهون مع الصبر"
    },
    {
      arabic: "يزيد",
      translation: "it increases",
      category: "verbs",
      subcategory: "Present/Future",
      example: "الحب يزيد كل يوم"
    },
    {
      arabic: "بكتم",
      translation: "I suppress",
      category: "verbs",
      subcategory: "Present/Future",
      example: "بكتم همومي في صدري"
    },
    {
      arabic: "طل",
      translation: "may it visit",
      category: "verbs",
      subcategory: "Present/Future",
      example: "طل علي بالخير"
    },
    {
      arabic: "سهرانة",
      translation: "staying awake",
      category: "verbs",
      subcategory: "Present/Future",
      example: "سهرانة حتى الفجر"
    },
    {
      arabic: "بفكر",
      translation: "I think",
      category: "verbs",
      subcategory: "Present/Future",
      example: "بفكر في المستقبل"
    },
    {
      arabic: "أدوق",
      translation: "I taste",
      category: "verbs",
      subcategory: "Present/Future",
      example: "أدوق طعم الحرية"
    },
    {
      arabic: "أضيع",
      translation: "I lose",
      category: "verbs",
      subcategory: "Present/Future",
      example: "أضيع وقتي بلا فائدة"
    },
    {
      arabic: "أتوه",
      translation: "I get lost",
      category: "verbs",
      subcategory: "Present/Future",
      example: "أتوه في شوارع المدينة"
    },
    {
      arabic: "أعيش",
      translation: "I live",
      category: "verbs",
      subcategory: "Present/Future",
      example: "أعيش حياتي بكاملها"
    },

    // Imperative
    {
      arabic: "اسمع",
      translation: "listen",
      category: "verbs",
      subcategory: "Imperative",
      example: "اسمع كلام والديك"
    },
    {
      arabic: "خليك",
      translation: "be",
      category: "verbs",
      subcategory: "Imperative",
      example: "خليك إيجابي"
    },
    {
      arabic: "بلغوني",
      translation: "inform me",
      category: "verbs",
      subcategory: "Imperative",
      example: "بلغوني بأي جديد"
    },
    {
      arabic: "فهموني",
      translation: "make me understand",
      category: "verbs",
      subcategory: "Imperative",
      example: "فهموني هذه المسألة"
    },
    {
      arabic: "إفتحوا",
      translation: "open",
      category: "verbs",
      subcategory: "Imperative",
      example: "إفتحوا الباب من فضلكم"
    },

    // Particles (حروف)
    {
      arabic: "في",
      translation: "in",
      category: "particles",
      subcategory: "Prepositions",
      example: "الكتاب في الحقيبة"
    },
    {
      arabic: "على",
      translation: "on",
      category: "particles",
      subcategory: "Prepositions",
      example: "الطائر على الشجرة"
    },
    {
      arabic: "من",
      translation: "from",
      category: "particles",
      subcategory: "Prepositions",
      example: "جئت من البيت"
    },
    {
      arabic: "إلى",
      translation: "to",
      category: "particles",
      subcategory: "Prepositions",
      example: "أذهب إلى المدرسة"
    },
    {
      arabic: "عن",
      translation: "about, from",
      category: "particles",
      subcategory: "Prepositions",
      example: "تحدث عن السفر"
    },
    {
      arabic: "بين",
      translation: "between",
      category: "particles",
      subcategory: "Prepositions",
      example: "الفرق بين الحق والباطل"
    },
    {
      arabic: "تحت",
      translation: "under",
      category: "particles",
      subcategory: "Prepositions",
      example: "القط تحت الطاولة"
    },

    // Conjunctions
    {
      arabic: "و",
      translation: "and",
      category: "particles",
      subcategory: "Conjunctions",
      example: "السماء والأرض"
    },
    {
      arabic: "أو",
      translation: "or",
      category: "particles",
      subcategory: "Conjunctions",
      example: "شاي أو قهوة"
    },
    {
      arabic: "لكن",
      translation: "but",
      category: "particles",
      subcategory: "Conjunctions",
      example: "جميل لكن غالي"
    },
    {
      arabic: "حتى",
      translation: "even",
      category: "particles",
      subcategory: "Conjunctions",
      example: "حتى الأطفال يعرفونه"
    },
    {
      arabic: "بس",
      translation: "but, only",
      category: "particles",
      subcategory: "Conjunctions",
      example: "بس دقيقة واحدة"
    },

    // Interrogative Particles
    {
      arabic: "شو",
      translation: "what",
      category: "particles",
      subcategory: "Interrogative",
      example: "شو اسمك؟"
    },
    {
      arabic: "ليه",
      translation: "why",
      category: "particles",
      subcategory: "Interrogative",
      example: "ليه متأخر؟"
    },
    {
      arabic: "إزاي",
      translation: "how",
      category: "particles",
      subcategory: "Interrogative",
      example: "إزاي حالك؟"
    },
    {
      arabic: "إيه",
      translation: "what",
      category: "particles",
      subcategory: "Interrogative",
      example: "إيه اللي حصل؟"
    },
    {
      arabic: "وين",
      translation: "where",
      category: "particles",
      subcategory: "Interrogative",
      example: "وين البيت؟"
    },

    // Adjectives (صفات)
    {
      arabic: "خجلان",
      translation: "bashful",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "ولد خجلان"
    },
    {
      arabic: "محمر",
      translation: "reddened",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "وجه محمر من الشمس"
    },
    {
      arabic: "بريئة",
      translation: "innocent",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "طفلة بريئة"
    },
    {
      arabic: "مدروسة",
      translation: "studied, deliberate",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "خطة مدروسة"
    },
    {
      arabic: "مهووس",
      translation: "obsessed",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "مهووس بالعمل"
    },
    {
      arabic: "حلو",
      translation: "beautiful/sweet",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "حلو المنظر"
    },
    {
      arabic: "مهضوم",
      translation: "indigestible",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "طعام مهضوم"
    },
    {
      arabic: "مجنون",
      translation: "crazy",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "رجل مجنون"
    },
    {
      arabic: "ضايع",
      translation: "lost",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "رجل ضايع في الطريق"
    },
    {
      arabic: "جميلة",
      translation: "beautiful",
      category: "adjectives",
      subcategory: "Descriptive",
      example: "فتاة جميلة"
    },

    // Adverbs (ظروف)
    {
      arabic: "وقت",
      translation: "when",
      category: "adverbs",
      subcategory: "Time",
      example: "وقت المغرب"
    },
    {
      arabic: "دقيقة",
      translation: "minute",
      category: "adverbs",
      subcategory: "Time",
      example: "انتظر دقيقة واحدة"
    },
    {
      arabic: "اليوم",
      translation: "today",
      category: "adverbs",
      subcategory: "Time",
      example: "اليوم يوم جميل"
    },
    {
      arabic: "بكرة",
      translation: "tomorrow",
      category: "adverbs",
      subcategory: "Time",
      example: "سأذهب بكرة"
    },
    {
      arabic: "بليل",
      translation: "at night",
      category: "adverbs",
      subcategory: "Time",
      example: "أحب المشي بليل"
    },
    {
      arabic: "دايمًا",
      translation: "always",
      category: "adverbs",
      subcategory: "Time",
      example: "دايمًا متفائل"
    },
    {
      arabic: "هون",
      translation: "here",
      category: "adverbs",
      subcategory: "Place",
      example: "تعال هون"
    },
    {
      arabic: "هناك",
      translation: "there",
      category: "adverbs",
      subcategory: "Place",
      example: "الكتاب هناك"
    },
    {
      arabic: "كيف",
      translation: "how",
      category: "adverbs",
      subcategory: "Manner",
      example: "كيف حالك؟"
    },
    {
      arabic: "سهلة",
      translation: "easily",
      category: "adverbs",
      subcategory: "Manner",
      example: "المسألة سهلة"
    },

    // Pronouns (ضمائر)
    {
      arabic: "أنا",
      translation: "I",
      category: "pronouns",
      subcategory: "Separate",
      example: "أنا طالب"
    },
    {
      arabic: "إنتَ",
      translation: "you (masc)",
      category: "pronouns",
      subcategory: "Separate",
      example: "إنتَ رجل طيب"
    },
    {
      arabic: "إنتِ",
      translation: "you (fem)",
      category: "pronouns",
      subcategory: "Separate",
      example: "إنتِ جميلة"
    },
    {
      arabic: "هو",
      translation: "he",
      category: "pronouns",
      subcategory: "Separate",
      example: "هو ذكي"
    },
    {
      arabic: "هي",
      translation: "she",
      category: "pronouns",
      subcategory: "Separate",
      example: "هي مجتهدة"
    },
    {
      arabic: "نحنا",
      translation: "we",
      category: "pronouns",
      subcategory: "Separate",
      example: "نحنا أصدقاء"
    },
    {
      arabic: "هم",
      translation: "they",
      category: "pronouns",
      subcategory: "Separate",
      example: "هم يلعبون"
    },

    // Phrases
    {
      arabic: "آه",
      translation: "Ah",
      category: "phrases",
      subcategory: "Interjections",
      example: "آه، كم أنا متعب"
    },
    {
      arabic: "يا ويلي",
      translation: "Woe is me",
      category: "phrases",
      subcategory: "Interjections",
      example: "يا ويلي من هذا المصاب"
    },
    {
      arabic: "يلا",
      translation: "come on",
      category: "phrases",
      subcategory: "Interjections",
      example: "يلا، لنبدأ العمل"
    },
    {
      arabic: "وعد ودين",
      translation: "a promise and a faith",
      category: "phrases",
      subcategory: "Phrases",
      example: "وعد ودين سأعود"
    },
    {
      arabic: "ربي يوفقك",
      translation: "God grant you success",
      category: "phrases",
      subcategory: "Phrases",
      example: "ربي يوفقك في امتحانك"
    },
    {
      arabic: "إن شاء الله",
      translation: "God willing",
      category: "phrases",
      subcategory: "Phrases",
      example: "سأزورك غدًا إن شاء الله"
    },
    {
      arabic: "يا ريت",
      translation: "I wish",
      category: "phrases",
      subcategory: "Phrases",
      example: "يا ريت الوقت يعود"
    },
    {
      arabic: "كِلي أنوثة",
      translation: "you are all femininity",
      category: "phrases",
      subcategory: "Phrases",
      example: "كِلي أنوثة وجمال"
    },

    // More nouns to reach 100+
    {
      arabic: "بيوت إزاز",
      translation: "glass houses",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "بيوت إزاز جميلة المنظر"
    },
    {
      arabic: "عالم",
      translation: "world",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عالم واسع"
    },
    {
      arabic: "دلالي",
      translation: "my coquettish one",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "دلالي تعشق الجمال"
    },
    {
      arabic: "هوى",
      translation: "love, passion",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "هوى العشق"
    },
    {
      arabic: "إدمان",
      translation: "addiction",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "إدمان الإنترنت"
    },
    {
      arabic: "ثواني",
      translation: "seconds",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "انتظر ثواني قليلة"
    },
    {
      arabic: "حمل",
      translation: "burden",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حمل ثقيل"
    },
    {
      arabic: "ليل",
      translation: "night",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "ليل هادئ"
    },
    {
      arabic: "نهاري",
      translation: "my days",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نهاري معك جميل"
    },
    {
      arabic: "شوق",
      translation: "longing",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "شوق إلى الوطن"
    },
    {
      arabic: "نوم",
      translation: "sleep",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نوم عميق"
    },
    {
      arabic: "حب",
      translation: "love",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حب الحياة"
    },
    {
      arabic: "حظ",
      translation: "luck, fortune",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حظ سعيد"
    },
    {
      arabic: "مكان",
      translation: "place",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مكان جميل"
    },
    {
      arabic: "طريق",
      translation: "path",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "طريق طويل"
    },
    {
      arabic: "مشوار",
      translation: "journey",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مشوار الحياة"
    },
    {
      arabic: "كلام",
      translation: "words",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "كلام معسول"
    },
    {
      arabic: "مسار",
      translation: "path",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مسار النجوم"
    },
    {
      arabic: "سهرات",
      translation: "evening gatherings",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سهرات رمضان"
    },
    {
      arabic: "بيت",
      translation: "house",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "بيت العائلة"
    },
    {
      arabic: "يوم",
      translation: "day",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "يوم مشمس"
    },
    {
      arabic: "لون",
      translation: "color",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "لون السماء"
    },
    {
      arabic: "حياة",
      translation: "life",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حياة كريمة"
    },
    {
      arabic: "بلد",
      translation: "country",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "بلد الأمجاد"
    },
    {
      arabic: "ريح",
      translation: "wind",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "ريح عاتية"
    },
    {
      arabic: "مشاعر",
      translation: "feelings",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مشاعر صادقة"
    },
    {
      arabic: "أهرامات",
      translation: "pyramids",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أهرامات الجيزة"
    },
    {
      arabic: "سر",
      translation: "secret",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سر محفوظ"
    },
    {
      arabic: "أبويا",
      translation: "my father",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أبويا قدوتي"
    },
    {
      arabic: "آثار",
      translation: "antiques",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "آثار الحضارات"
    },
    {
      arabic: "قصور",
      translation: "palaces",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "قصور الملوك"
    },
    {
      arabic: "كحل",
      translation: "kohl",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "كحل العيون"
    },
    {
      arabic: "ثانية",
      translation: "second",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "انتظر ثانية واحدة"
    },
    {
      arabic: "مدينة",
      translation: "city",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مدينة كبيرة"
    },
    {
      arabic: "أرض",
      translation: "land",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أرض خصبة"
    },
    {
      arabic: "نهر",
      translation: "river",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نهر النيل"
    },
    {
      arabic: "جبال",
      translation: "mountains",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "جبال شاهقة"
    },
    {
      arabic: "شط",
      translation: "shore",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "شط البحر"
    },
    {
      arabic: "رمال",
      translation: "sand",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "رمال الصحراء"
    },
    {
      arabic: "بداية",
      translation: "beginning",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "بداية الطريق"
    },
    {
      arabic: "وطن",
      translation: "homeland",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حب الوطن"
    },
    {
      arabic: "فرحة",
      translation: "joy",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "فرحة العيد"
    },
    {
      arabic: "مآسي",
      translation: "tragedies",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مآسي التاريخ"
    },
    {
      arabic: "أحلام",
      translation: "dreams",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أحلام اليقظة"
    },
    {
      arabic: "جناحين",
      translation: "wings",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "جناحين الطائر"
    },
    {
      arabic: "عمر",
      translation: "life, age",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عمر طويل"
    },
    {
      arabic: "سنيين",
      translation: "years",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سنيين طويلة"
    },
    {
      arabic: "سنوات",
      translation: "years",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سنوات المجد"
    },
    {
      arabic: "عام",
      translation: "year",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عام جديد"
    },
    {
      arabic: "خاطر",
      translation: "heart, feelings",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "خاطر مرهف"
    },
    {
      arabic: "سيف",
      translation: "sword",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سيف البطل"
    },
    {
      arabic: "قراب",
      translation: "scabbard",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "قراب السيف"
    },
    {
      arabic: "غيمات",
      translation: "clouds",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "غيمات بيضاء"
    },
    {
      arabic: "خيام",
      translation: "tents",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "خيام البدو"
    },
    {
      arabic: "نجم",
      translation: "star",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نجم ساطع"
    },
    {
      arabic: "جراح",
      translation: "wounds",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "جراح الماضي"
    },
    {
      arabic: "فراش",
      translation: "bed",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "فراش مريح"
    },
    {
      arabic: "سبع",
      translation: "lion",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سبع الغابة"
    },
    {
      arabic: "ذئاب",
      translation: "wolves",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "ذئاب البرية"
    },
    {
      arabic: "تراب",
      translation: "dirt",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "تراب الوطن"
    },
    {
      arabic: "أصحاب",
      translation: "friends",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أصحاب الوفاء"
    },
    {
      arabic: "سما",
      translation: "sky",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "سما صافية"
    },
    {
      arabic: "وفا",
      translation: "loyalty",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "وفا الأصدقاء"
    },
    {
      arabic: "غراب",
      translation: "crow",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "غراب أسود"
    },
    {
      arabic: "عقاب",
      translation: "eagle",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عقاب شامخ"
    },
    {
      arabic: "وعد",
      translation: "promise",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "وعد صادق"
    },
    {
      arabic: "درب",
      translation: "path",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "درب التحدي"
    },
    {
      arabic: "ضيف",
      translation: "guest",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "ضيف كريم"
    },
    {
      arabic: "ورود",
      translation: "roses",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "ورود حمراء"
    },
    {
      arabic: "دار",
      translation: "house",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "دار العائلة"
    },
    {
      arabic: "أهل",
      translation: "family",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أهل الخير"
    },
    {
      arabic: "نار",
      translation: "fire",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نار الدفء"
    },
    {
      arabic: "بير",
      translation: "well",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "بير الماء"
    },
    {
      arabic: "أسرار",
      translation: "secrets",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "أسرار الكون"
    },
    {
      arabic: "حبيب",
      translation: "beloved",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حبيب القلب"
    },
    {
      arabic: "دروب",
      translation: "paths",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "دروب الحياة"
    },
    {
      arabic: "برد",
      translation: "cold",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "برد الشتاء"
    },
    {
      arabic: "صدري",
      translation: "my chest",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "صدري ضيق"
    },
    {
      arabic: "جماعة",
      translation: "group",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "جماعة العمل"
    },
    {
      arabic: "خصلة",
      translation: "trait",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "خصلة طيبة"
    },
    {
      arabic: "دنيا",
      translation: "world",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "دنيا فانية"
    },
    {
      arabic: "غياب",
      translation: "absence",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "غياب مؤلم"
    },
    {
      arabic: "عشق",
      translation: "passionate love",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عشق خالد"
    },
    {
      arabic: "جنون",
      translation: "madness",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "جنون الحب"
    },
    {
      arabic: "موال",
      translation: "traditional song",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "موال حزين"
    },
    {
      arabic: "حبيبي",
      translation: "my beloved",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "حبيبي غالي"
    },
    {
      arabic: "نصيب",
      translation: "fate, share",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "نصيب كل إنسان"
    },
    {
      arabic: "عيب",
      translation: "flaw",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "عيب بسيط"
    },
    {
      arabic: "صبح",
      translation: "morning",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "صبح الخير"
    },
    {
      arabic: "زهايمر",
      translation: "Alzheimer's",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مرض الزهايمر"
    },
    {
      arabic: "هدية",
      translation: "gift",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "هدية قيمة"
    },
    {
      arabic: "مفاجأة",
      translation: "surprise",
      category: "nouns",
      subcategory: "Common Nouns",
      example: "مفاجأة سارة"
    }
  ];

  // Reactive variables
  let currentFilter = "all";
  let filteredWords = [...wordsData];
  let searchTerm = "";

  // Get nouns count
  $: nounsCount = wordsData.filter(
    (word) => word.category === "nouns"
  ).length;

  // Get verbs count
  $: verbsCount = wordsData.filter(
    (word) => word.category === "verbs"
  ).length;

  // Get particles count
  $: particlesCount = wordsData.filter(
    (word) => word.category === "particles"
  ).length;

  // Get adjectives count
  $: adjectivesCount = wordsData.filter(
    (word) => word.category === "adjectives"
  ).length;

  // Reactive filter and search
  $: {
    if (searchTerm === "") {
      if (currentFilter === "all") {
        filteredWords = [...wordsData];
      } else {
        filteredWords = wordsData.filter(
          (word) => word.category === currentFilter
        );
      }
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      filteredWords = wordsData.filter(
        (word) =>
          word.arabic.includes(searchTerm) ||
          word.translation
            .toLowerCase()
            .includes(searchLower) ||
          word.example.toLowerCase().includes(searchLower)
      );
    }
  }

  // Get Arabic category name
  function getCategoryArabic(category) {
    const categories = {
      nouns: "اسم",
      verbs: "فعل",
      particles: "حرف",
      adjectives: "صفة",
      adverbs: "ظرف",
      pronouns: "ضمير",
      phrases: "عبارة"
    };
    return categories[category] || category;
  }

  // Filter by category
  function filterCategory(category) {
    currentFilter = category;
  }

  // Show all words
  function showAll() {
    currentFilter = "all";
  }
</script>

<svelte:head>
  <title
    >قاموس المفردات العربية - Visual Arabic Dictionary</title
  > <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <!-- FIXED: Added Arabic subset and specific font for diacritics -->
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Satisfy&display=swap&subset=arabic"
    rel="stylesheet"
  />
</svelte:head>

<div class="container mainpage">
  <!-- Header -->
  <header class="header">
    <h1>قاموس المفردات العربية</h1>
    <p>
      مجموعة شاملة من الكلمات والعبارات العربية مع الترجمة
      والتصنيف - Visual Arabic Dictionary
    </p>
  </header>

  <!-- Category Navigation -->
  <nav class="category-nav">
    <button
      class="category-btn nouns-btn"
      on:click={() => filterCategory("nouns")}
    >
      <span>📚</span>
      <span>الأسماء</span>
    </button>
    <button
      class="category-btn verbs-btn"
      on:click={() => filterCategory("verbs")}
    >
      <span>✍️</span>
      <span>الأفعال</span>
    </button>
    <button
      class="category-btn particles-btn"
      on:click={() => filterCategory("particles")}
    >
      <span>🔣</span>
      <span>الحروف</span>
    </button>
    <button
      class="category-btn adjectives-btn"
      on:click={() => filterCategory("adjectives")}
    >
      <span>🎨</span>
      <span>الصفات</span>
    </button>
    <button
      class="category-btn adverbs-btn"
      on:click={() => filterCategory("adverbs")}
    >
      <span>⏰</span>
      <span>الظروف</span>
    </button>
    <button
      class="category-btn pronouns-btn"
      on:click={() => filterCategory("pronouns")}
    >
      <span>👥</span>
      <span>الضمائر</span>
    </button>
    <button
      class="category-btn phrases-btn"
      on:click={() => filterCategory("phrases")}
    >
      <span>💬</span>
      <span>العبارات</span>
    </button>
    <button
      class="category-btn"
      on:click={showAll}
      style="background: linear-gradient(135deg, #4a5568, #718096);"
    >
      <span>🌟</span>
      <span>عرض الكل</span>
    </button>
  </nav>

  <!-- Search -->
  <div class="search-container">
    <div class="search-icon">🔍</div>
    <input
      type="text"
      class="search-input"
      placeholder="ابحث عن كلمة أو معنى..."
      bind:value={searchTerm}
    />
  </div>

  <!-- Stats -->
  <div class="stats-container">
    <div class="stat-item stat-nouns">
      <div class="stat-number">{nounsCount}</div>
      <div class="stat-label">اسم</div>
    </div>
    <div class="stat-item stat-verbs">
      <div class="stat-number">{verbsCount}</div>
      <div class="stat-label">فعل</div>
    </div>
    <div class="stat-item stat-particles">
      <div class="stat-number">{particlesCount}</div>
      <div class="stat-label">حرف</div>
    </div>
    <div class="stat-item stat-adjectives">
      <div class="stat-number">{adjectivesCount}</div>
      <div class="stat-label">صفة</div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="main-content" id="wordsContainer">
    {#each filteredWords as word, index}
      <div
        class="word-card {word.category}-card"
        style="animation-delay: {index * 0.05}s"
      >
        <div class="word-category">
          {getCategoryArabic(word.category)}
        </div>
        <div class="word-arabic">{word.arabic}</div>
        <div class="word-translation">
          {word.translation}
        </div>
        <div class="word-subcategory">
          {word.subcategory}
        </div>
        <div class="word-example">{word.example}</div>
      </div>
    {/each}
  </main>

  <!-- Footer -->
  <footer class="footer">
    <p>قاموس المفردات العربية - Visual Arabic Dictionary</p>
    <p>© 2024 - جميع الحقوق محفوظة</p>
    <div class="footer-icons">
      <div
        class="icon"
        style="background: var(--deep-blue);"
      >
        📘
      </div>
      <div class="icon" style="background: var(--gold);">
        ✨
      </div>
      <div
        class="icon"
        style="background: var(--terracotta);"
      >
        ❤️
      </div>
      <div
        class="icon"
        style="background: var(--sage-green);"
      >
        🌿
      </div>
      <div class="icon" style="background: var(--plum);">
        🎯
      </div>
    </div>
  </footer>
</div>

<style>
  :root {
    /* Beautiful Moroccan-inspired color palette */
    --deep-blue: #1a365d;
    --royal-blue: #2d3748;
    --gold: #d69e2e;
    --warm-gold: #b7791f;
    --sage-green: #48bb78;
    --olive-green: #38a169;
    --terracotta: #c53030;
    --warm-red: #9b2c2c;
    --sand: #edf2f7;
    --cream: #f7fafc;
    --dark-sand: #e2e8f0;
    --copper: #dd6b20;
    --plum: #805ad5;
    --rose: #d53f8c;
    --teal: #319795;
    --text-dark: #2d3748;
    --text-light: #4a5568;
    --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Header */
  .header {
    text-align: center;
    padding: 3rem 1rem;
    background: linear-gradient(
      135deg,
      var(--deep-blue),
      var(--plum)
    );
    color: white;
    border-radius: 20px;
    margin-bottom: 3rem;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
  }

  .header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  .header h1 {
    font-family: "Noto Naskh Arabic", serif;
    font-size: 3.5rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .header p {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Category Navigation */
  .category-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
  }

  .category-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 50px;
    font-family: "Cairo", sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
  }

  .category-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }

  .nouns-btn {
    background: linear-gradient(
      135deg,
      var(--deep-blue),
      var(--royal-blue)
    );
  }
  .verbs-btn {
    background: linear-gradient(
      135deg,
      var(--terracotta),
      var(--warm-red)
    );
  }
  .particles-btn {
    background: linear-gradient(
      135deg,
      var(--sage-green),
      var(--olive-green)
    );
  }
  .adjectives-btn {
    background: linear-gradient(
      135deg,
      var(--gold),
      var(--copper)
    );
  }
  .adverbs-btn {
    background: linear-gradient(
      135deg,
      var(--plum),
      #6b46c1
    );
  }
  .pronouns-btn {
    background: linear-gradient(
      135deg,
      var(--teal),
      #2c7a7b
    );
  }
  .phrases-btn {
    background: linear-gradient(
      135deg,
      var(--rose),
      #b83280
    );
  }

  /* Search */
  .search-container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    margin-bottom: 3rem;
    box-shadow: var(--shadow);
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 1.2rem 1.2rem 1.2rem 4rem;
    font-size: 1.3rem;
    border: 2px solid var(--dark-sand);
    border-radius: 12px;
    font-family: "Cairo", sans-serif;
    transition: var(--transition);
    background: var(--cream);
    color: var(--text-dark);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.2);
  }

  .search-icon {
    position: absolute;
    left: 3rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gold);
    font-size: 1.5rem;
  }

  /* Main Content Grid */
  .main-content {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(350px, 1fr)
    );
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .word-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border-top: 5px solid;
    position: relative;
    overflow: hidden;
  }

  .word-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .word-card::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: currentColor;
    opacity: 0.1;
    border-radius: 0 0 0 100%;
  }

  .nouns-card {
    border-color: var(--deep-blue);
    color: var(--deep-blue);
  }
  .verbs-card {
    border-color: var(--terracotta);
    color: var(--terracotta);
  }
  .particles-card {
    border-color: var(--sage-green);
    color: var(--sage-green);
  }
  .adjectives-card {
    border-color: var(--gold);
    color: var(--gold);
  }
  .adverbs-card {
    border-color: var(--plum);
    color: var(--plum);
  }
  .pronouns-card {
    border-color: var(--teal);
    color: var(--teal);
  }
  .phrases-card {
    border-color: var(--rose);
    color: var(--rose);
  }

  .word-arabic {
    font-family: "Noto Naskh Arabic", serif;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 1.2;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .word-translation {
    font-size: 1.3rem;
    color: var(--text-light);
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 500;
    padding: 0.5rem;
    background: var(--cream);
    border-radius: 8px;
  }

  .word-category {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    background: currentColor;
    color: white;
  }

  .word-example {
    font-size: 1.1rem;
    color: var(--text-dark);
    font-style: italic;
    padding: 1rem;
    background: var(--sand);
    border-radius: 8px;
    border-right: 3px solid currentColor;
    margin-top: 1rem;
  }

  .word-subcategory {
    font-size: 0.9rem;
    color: var(--text-light);
    margin-top: 0.5rem;
    font-weight: 500;
  }

  /* Stats */
  .stats-container {
    background: white;
    padding: 2.5rem;
    border-radius: 15px;
    margin-bottom: 4rem;
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 2rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.5rem;
    border-radius: 10px;
    transition: var(--transition);
  }

  .stat-item:hover {
    transform: translateY(-5px);
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    font-family: "Noto Naskh Arabic", serif;
  }

  .stat-label {
    font-size: 1.1rem;
    color: var(--text-light);
    font-weight: 600;
  }

  .stat-nouns {
    background: linear-gradient(
      135deg,
      rgba(26, 54, 93, 0.1),
      rgba(45, 55, 72, 0.1)
    );
    color: var(--deep-blue);
  }
  .stat-verbs {
    background: linear-gradient(
      135deg,
      rgba(197, 48, 48, 0.1),
      rgba(155, 44, 44, 0.1)
    );
    color: var(--terracotta);
  }
  .stat-particles {
    background: linear-gradient(
      135deg,
      rgba(72, 187, 120, 0.1),
      rgba(56, 161, 105, 0.1)
    );
    color: var(--sage-green);
  }
  .stat-adjectives {
    background: linear-gradient(
      135deg,
      rgba(214, 158, 46, 0.1),
      rgba(183, 121, 31, 0.1)
    );
    color: var(--gold);
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-light);
    font-size: 1.1rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
    margin-top: 3rem;
  }

  .footer p {
    margin-bottom: 1rem;
  }

  .footer-icons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    transition: var(--transition);
  }

  .icon:hover {
    transform: scale(1.1);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2.5rem;
    }

    .main-content {
      grid-template-columns: 1fr;
    }

    .word-arabic {
      font-size: 2.8rem;
      min-height: 100px;
    }

    .category-nav {
      flex-direction: column;
      align-items: stretch;
    }

    .category-btn {
      justify-content: center;
    }

    .stats-container {
      grid-template-columns: 1fr;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .word-card {
    animation: fadeIn 0.6s ease-out forwards;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--sand);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gold);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--warm-gold);
  }
</style>
