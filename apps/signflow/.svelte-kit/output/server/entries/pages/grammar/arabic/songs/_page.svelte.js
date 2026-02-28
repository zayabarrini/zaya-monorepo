import { h as head, e as attr, i as escape_html, j as ensure_array_like, a as attr_class, d as stringify, l as attr_style } from "../../../../../chunks/vendor-svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let nounsCount, verbsCount, particlesCount, adjectivesCount;
    const wordsData = [
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
    let filteredWords = [...wordsData];
    let searchTerm = "";
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
    nounsCount = wordsData.filter((word) => word.category === "nouns").length;
    verbsCount = wordsData.filter((word) => word.category === "verbs").length;
    particlesCount = wordsData.filter((word) => word.category === "particles").length;
    adjectivesCount = wordsData.filter((word) => word.category === "adjectives").length;
    {
      {
        {
          filteredWords = [...wordsData];
        }
      }
    }
    head("1nw1lu4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>قاموس المفردات العربية - Visual Arabic Dictionary</title>`);
      });
      $$renderer3.push(`<meta charset="UTF-8" class="svelte-1nw1lu4"/> <meta name="viewport" content="width=device-width, initial-scale=1.0" class="svelte-1nw1lu4"/> <link rel="preconnect" href="https://fonts.googleapis.com" class="svelte-1nw1lu4"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" class="svelte-1nw1lu4"/> <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&amp;family=Open+Sans:ital,wght@0,300..800;1,300..800&amp;family=Satisfy&amp;display=swap&amp;subset=arabic" rel="stylesheet" class="svelte-1nw1lu4"/>`);
    });
    $$renderer2.push(`<div class="container mainpage svelte-1nw1lu4"><header class="header svelte-1nw1lu4"><h1 class="svelte-1nw1lu4">قاموس المفردات العربية</h1> <p class="svelte-1nw1lu4">مجموعة شاملة من الكلمات والعبارات العربية مع الترجمة
      والتصنيف - Visual Arabic Dictionary</p></header> <nav class="category-nav svelte-1nw1lu4"><button class="category-btn nouns-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">📚</span> <span class="svelte-1nw1lu4">الأسماء</span></button> <button class="category-btn verbs-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">✍️</span> <span class="svelte-1nw1lu4">الأفعال</span></button> <button class="category-btn particles-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">🔣</span> <span class="svelte-1nw1lu4">الحروف</span></button> <button class="category-btn adjectives-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">🎨</span> <span class="svelte-1nw1lu4">الصفات</span></button> <button class="category-btn adverbs-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">⏰</span> <span class="svelte-1nw1lu4">الظروف</span></button> <button class="category-btn pronouns-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">👥</span> <span class="svelte-1nw1lu4">الضمائر</span></button> <button class="category-btn phrases-btn svelte-1nw1lu4"><span class="svelte-1nw1lu4">💬</span> <span class="svelte-1nw1lu4">العبارات</span></button> <button class="category-btn svelte-1nw1lu4" style="background: linear-gradient(135deg, #4a5568, #718096);"><span class="svelte-1nw1lu4">🌟</span> <span class="svelte-1nw1lu4">عرض الكل</span></button></nav> <div class="search-container svelte-1nw1lu4"><div class="search-icon svelte-1nw1lu4">🔍</div> <input type="text" class="search-input svelte-1nw1lu4" placeholder="ابحث عن كلمة أو معنى..."${attr("value", searchTerm)}/></div> <div class="stats-container svelte-1nw1lu4"><div class="stat-item stat-nouns svelte-1nw1lu4"><div class="stat-number svelte-1nw1lu4">${escape_html(nounsCount)}</div> <div class="stat-label svelte-1nw1lu4">اسم</div></div> <div class="stat-item stat-verbs svelte-1nw1lu4"><div class="stat-number svelte-1nw1lu4">${escape_html(verbsCount)}</div> <div class="stat-label svelte-1nw1lu4">فعل</div></div> <div class="stat-item stat-particles svelte-1nw1lu4"><div class="stat-number svelte-1nw1lu4">${escape_html(particlesCount)}</div> <div class="stat-label svelte-1nw1lu4">حرف</div></div> <div class="stat-item stat-adjectives svelte-1nw1lu4"><div class="stat-number svelte-1nw1lu4">${escape_html(adjectivesCount)}</div> <div class="stat-label svelte-1nw1lu4">صفة</div></div></div> <main class="main-content svelte-1nw1lu4" id="wordsContainer"><!--[-->`);
    const each_array = ensure_array_like(filteredWords);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let word = each_array[index];
      $$renderer2.push(`<div${attr_class(`word-card ${stringify(word.category)}-card`, "svelte-1nw1lu4")}${attr_style(`animation-delay: ${stringify(index * 0.05)}s`)}><div class="word-category svelte-1nw1lu4">${escape_html(getCategoryArabic(word.category))}</div> <div class="word-arabic svelte-1nw1lu4">${escape_html(word.arabic)}</div> <div class="word-translation svelte-1nw1lu4">${escape_html(word.translation)}</div> <div class="word-subcategory svelte-1nw1lu4">${escape_html(word.subcategory)}</div> <div class="word-example svelte-1nw1lu4">${escape_html(word.example)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></main> <footer class="footer svelte-1nw1lu4"><p class="svelte-1nw1lu4">قاموس المفردات العربية - Visual Arabic Dictionary</p> <p class="svelte-1nw1lu4">© 2024 - جميع الحقوق محفوظة</p> <div class="footer-icons svelte-1nw1lu4"><div class="icon svelte-1nw1lu4" style="background: var(--deep-blue);">📘</div> <div class="icon svelte-1nw1lu4" style="background: var(--gold);">✨</div> <div class="icon svelte-1nw1lu4" style="background: var(--terracotta);">❤️</div> <div class="icon svelte-1nw1lu4" style="background: var(--sage-green);">🌿</div> <div class="icon svelte-1nw1lu4" style="background: var(--plum);">🎯</div></div></footer></div>`);
  });
}
export {
  _page as default
};
