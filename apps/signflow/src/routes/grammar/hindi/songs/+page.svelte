<script lang="ts">
  // Define types for our vocabulary
  type Word = {
    hindi: string;
    translit: string;
    english: string;
  };

  type VocabularyCategory = {
    abstract: Word[];
    concrete: Word[];
    other: Word[];
  };

  type PronounsCategory = {
    personal: Word[];
    interrogative: Word[];
    relative: Word[];
  };

  type VerbsCategory = {
    main: Word[];
    auxiliary: Word[];
  };

  type LoanwordsCategory = {
    french: Word[];
    english: Word[];
    persian: Word[];
    musical: Word[];
  };

  // Vocabulary data organized by categories
  const vocabulary = {
    nouns: {
      abstract: [
        {
          hindi: "इश्क़",
          translit: "ishq",
          english: "love/passion"
        },
        {
          hindi: "मोहब्बत",
          translit: "mohabbat",
          english: "love/affection"
        },
        {
          hindi: "इबादत",
          translit: "ibādat",
          english: "worship/prayer"
        },
        {
          hindi: "आशिक़ी",
          translit: "āshiqī",
          english: "romantic love"
        },
        {
          hindi: "दुआ",
          translit: "duā",
          english: "prayer/blessing"
        },
        {
          hindi: "जन्नत",
          translit: "jannat",
          english: "heaven/paradise"
        },
        {
          hindi: "चाहत",
          translit: "chāhat",
          english: "desire/longing"
        },
        {
          hindi: "ख़्वाब",
          translit: "khwāb",
          english: "dream"
        },
        {
          hindi: "दर्द",
          translit: "dard",
          english: "pain/sorrow"
        },
        {
          hindi: "ग़म",
          translit: "ġham",
          english: "grief/sadness"
        },
        {
          hindi: "तक़दीर",
          translit: "taqdīr",
          english: "fate/destiny"
        },
        {
          hindi: "जोग",
          translit: "jog",
          english: "union/yoga"
        },
        {
          hindi: "संजोग",
          translit: "sañjog",
          english: "coincidence/fate"
        },
        {
          hindi: "रोग",
          translit: "rog",
          english: "disease/illness"
        },
        {
          hindi: "कलंक",
          translit: "kalaṅk",
          english: "stain/blot"
        },
        {
          hindi: "रौनक़",
          translit: "raunaq",
          english: "splendor/liveliness"
        },
        {
          hindi: "बेताबी",
          translit: "betābī",
          english: "restlessness/impatience"
        },
        {
          hindi: "निशाना",
          translit: "niśānā",
          english: "target/mark"
        },
        {
          hindi: "फ़साना",
          translit: "fasānā",
          english: "story/tale"
        },
        {
          hindi: "रुसवाई",
          translit: "rusvāī",
          english: "disgrace/humiliation"
        },
        {
          hindi: "क़ुसूर",
          translit: "qusūr",
          english: "fault/shortcoming"
        },
        {
          hindi: "फ़िदा",
          translit: "fidā",
          english: "sacrifice/devotion"
        },
        {
          hindi: "बेवफ़ाई",
          translit: "bewafāī",
          english: "unfaithfulness"
        },
        {
          hindi: "बेरुख़ी",
          translit: "berukhī",
          english: "indifference/coldness"
        },
        {
          hindi: "अंगड़ाई",
          translit: "aṅgṛāī",
          english: "stretching/yawning"
        },
        {
          hindi: "दीवानापन",
          translit: "dīvānāpan",
          english: "madness/infatuation"
        },
        {
          hindi: "पागलपन",
          translit: "pāgalpan",
          english: "madness/insanity"
        }
      ] as Word[],
      concrete: [
        { hindi: "दिल", translit: "dil", english: "heart" },
        {
          hindi: "जहाँ",
          translit: "jahā̃",
          english: "world"
        },
        {
          hindi: "राह",
          translit: "rāh",
          english: "path/way"
        },
        {
          hindi: "हवा",
          translit: "havā",
          english: "wind/air"
        },
        {
          hindi: "उजाला",
          translit: "ujālā",
          english: "light"
        },
        {
          hindi: "आसमाँ",
          translit: "āsmā̃",
          english: "sky"
        },
        {
          hindi: "फ़रिश्ता",
          translit: "fariśtā",
          english: "angel"
        },
        {
          hindi: "जाँ",
          translit: "jā̃",
          english: "life/soul"
        },
        {
          hindi: "ज़माना",
          translit: "zamānā",
          english: "era/time"
        },
        {
          hindi: "दुनिया",
          translit: "duniyā",
          english: "world"
        },
        {
          hindi: "रब",
          translit: "rab",
          english: "God/Lord"
        },
        {
          hindi: "शहर",
          translit: "śahar",
          english: "city"
        },
        {
          hindi: "मौसम",
          translit: "mausam",
          english: "weather/season"
        },
        {
          hindi: "शाम",
          translit: "śām",
          english: "evening"
        },
        {
          hindi: "सीना",
          translit: "sīnā",
          english: "chest/heart"
        },
        {
          hindi: "दरिया",
          translit: "dariyā",
          english: "river"
        },
        { hindi: "बाँह", translit: "bā̃h", english: "arm" },
        {
          hindi: "पलक",
          translit: "palak",
          english: "eyelid"
        },
        {
          hindi: "रंग",
          translit: "raṅg",
          english: "color"
        },
        {
          hindi: "चाँद",
          translit: "chā̃d",
          english: "moon"
        },
        {
          hindi: "रास्ता",
          translit: "rāstā",
          english: "path/road"
        },
        {
          hindi: "सवेरा",
          translit: "saverā",
          english: "morning"
        },
        {
          hindi: "जंगल",
          translit: "jaṅgal",
          english: "forest"
        },
        {
          hindi: "जुगनू",
          translit: "jugnū",
          english: "firefly"
        },
        {
          hindi: "शम्मा",
          translit: "śammā",
          english: "lamp/flame"
        },
        {
          hindi: "परवाना",
          translit: "parvānā",
          english: "moth"
        },
        {
          hindi: "काजल",
          translit: "kājal",
          english: "kohl"
        },
        {
          hindi: "घटा",
          translit: "ghaṭā",
          english: "cloud"
        },
        {
          hindi: "बरखा",
          translit: "barkhā",
          english: "rain"
        },
        {
          hindi: "बादल",
          translit: "bādal",
          english: "cloud"
        },
        {
          hindi: "राँझा",
          translit: "rā̃jhā",
          english: "Ranjha (lover in folklore)"
        },
        {
          hindi: "हीर",
          translit: "hīr",
          english: "Heer (beloved in folklore)"
        },
        {
          hindi: "ज़िंदगानी",
          translit: "zindagānī",
          english: "life"
        },
        {
          hindi: "कहानी",
          translit: "kahānī",
          english: "story"
        },
        {
          hindi: "मोड़",
          translit: "moṛ",
          english: "turn/bend"
        },
        {
          hindi: "नैना",
          translit: "nainā",
          english: "eyes"
        },
        {
          hindi: "मुसाफ़िर",
          translit: "musāfir",
          english: "traveler"
        },
        {
          hindi: "बसेरा",
          translit: "baserā",
          english: "shelter/nest"
        },
        {
          hindi: "तमस",
          translit: "tamas",
          english: "darkness"
        },
        {
          hindi: "नज़र",
          translit: "nazar",
          english: "sight/glance"
        },
        { hindi: "आँख", translit: "ā̃kh", english: "eye" },
        {
          hindi: "बात",
          translit: "bāt",
          english: "word/talk"
        },
        {
          hindi: "साँस",
          translit: "sā̃s",
          english: "breath"
        },
        {
          hindi: "धड़कन",
          translit: "dhaṛkan",
          english: "heartbeat"
        },
        {
          hindi: "इत्र",
          translit: "itr",
          english: "perfume"
        },
        {
          hindi: "क़ातिल",
          translit: "qātil",
          english: "killer/murderer"
        },
        {
          hindi: "दीदार",
          translit: "dīdār",
          english: "sight/vision"
        },
        {
          hindi: "नज़दीकी",
          translit: "nazdīkī",
          english: "closeness/proximity"
        },
        {
          hindi: "मर्तबा",
          translit: "martabā",
          english: "time/occasion"
        }
      ] as Word[],
      other: [
        {
          hindi: "इंक़लाब",
          translit: "inqilāb",
          english: "revolution"
        },
        {
          hindi: "जलना",
          translit: "jalnā",
          english: "burning"
        },
        {
          hindi: "ढलना",
          translit: "ḍhalnā",
          english: "setting/declining"
        },
        {
          hindi: "तड़पना",
          translit: "taṛapnā",
          english: "agonizing"
        },
        {
          hindi: "बहकाना",
          translit: "bahakānā",
          english: "misleading"
        },
        {
          hindi: "भुलाना",
          translit: "bhulānā",
          english: "forgetting"
        },
        {
          hindi: "मिटाना",
          translit: "miṭānā",
          english: "erasing"
        }
      ] as Word[]
    } as VocabularyCategory,

    pronouns: {
      personal: [
        { hindi: "मैं", translit: "maiṁ", english: "I" },
        {
          hindi: "तू",
          translit: "tū",
          english: "you (intimate)"
        },
        {
          hindi: "तेरा/तेरी/तेरे",
          translit: "terā/terī/tere",
          english: "your/yours (intimate)"
        },
        {
          hindi: "मेरा/मेरी/मेरे",
          translit: "merā/merī/mere",
          english: "my/mine"
        },
        { hindi: "हम", translit: "ham", english: "we/us" },
        {
          hindi: "हमें",
          translit: "hamẽ",
          english: "to us"
        },
        {
          hindi: "अपना",
          translit: "apnā",
          english: "own/oneself"
        },
        {
          hindi: "उस",
          translit: "us",
          english: "he/she/that"
        },
        {
          hindi: "उसको",
          translit: "usko",
          english: "to him/her"
        },
        {
          hindi: "कोई",
          translit: "koī",
          english: "someone/anyone"
        },
        {
          hindi: "किसी",
          translit: "kisī",
          english: "to someone"
        }
      ] as Word[],
      interrogative: [
        { hindi: "क्यूँ", translit: "kyū̃", english: "why" },
        { hindi: "क्या", translit: "kyā", english: "what" },
        {
          hindi: "कहाँ",
          translit: "kahā̃",
          english: "where"
        },
        { hindi: "कैसे", translit: "kaise", english: "how" }
      ] as Word[],
      relative: [
        {
          hindi: "ये",
          translit: "ye",
          english: "these/this"
        },
        {
          hindi: "वो",
          translit: "vo",
          english: "those/that"
        },
        {
          hindi: "जिस",
          translit: "jis",
          english: "who/which (relative)"
        },
        {
          hindi: "ऐसा",
          translit: "aisā",
          english: "such/like this"
        },
        { hindi: "इस", translit: "is", english: "this" }
      ] as Word[]
    } as PronounsCategory,

    verbs: {
      main: [
        {
          hindi: "होना",
          translit: "honā",
          english: "to be/to happen"
        },
        {
          hindi: "चाहना",
          translit: "chāhnā",
          english: "to want"
        },
        {
          hindi: "कहना",
          translit: "kahnā",
          english: "to say/tell"
        },
        {
          hindi: "रहना",
          translit: "rahnā",
          english: "to stay/live"
        },
        {
          hindi: "देखना",
          translit: "dekhnā",
          english: "to see/look"
        },
        {
          hindi: "जलना",
          translit: "jalnā",
          english: "to burn"
        },
        {
          hindi: "बचना",
          translit: "bachnā",
          english: "to escape/survive"
        },
        {
          hindi: "चलना",
          translit: "chalnā",
          english: "to walk/move"
        },
        {
          hindi: "बदलना",
          translit: "badalnā",
          english: "to change"
        },
        {
          hindi: "ढलना",
          translit: "ḍhalnā",
          english: "to set/decline"
        },
        {
          hindi: "तकना",
          translit: "taknā",
          english: "to stare/gaze"
        },
        {
          hindi: "लगना",
          translit: "lagnā",
          english: "to seem/feel"
        },
        {
          hindi: "समाना",
          translit: "samānā",
          english: "to contain/accommodate"
        },
        {
          hindi: "बसाना",
          translit: "basānā",
          english: "to settle/establish"
        },
        {
          hindi: "भुलाना",
          translit: "bhulānā",
          english: "to make forget"
        },
        {
          hindi: "रुलाना",
          translit: "rulānā",
          english: "to make cry"
        },
        {
          hindi: "सोना",
          translit: "sonā",
          english: "to sleep"
        },
        {
          hindi: "जागना",
          translit: "jāgnā",
          english: "to wake"
        },
        {
          hindi: "लगाना",
          translit: "lagānā",
          english: "to apply/attach"
        },
        {
          hindi: "बहना",
          translit: "bahnā",
          english: "to flow"
        },
        {
          hindi: "बनना",
          translit: "bannā",
          english: "to become"
        },
        {
          hindi: "सौंपना",
          translit: "saumpnā",
          english: "to hand over/entrust"
        },
        {
          hindi: "छीनना",
          translit: "chīnnā",
          english: "to snatch"
        },
        {
          hindi: "मिलना",
          translit: "milnā",
          english: "to meet/get"
        },
        {
          hindi: "चुराना",
          translit: "churānā",
          english: "to steal"
        },
        {
          hindi: "उठना",
          translit: "uṭhnā",
          english: "to get up"
        },
        {
          hindi: "जानना",
          translit: "jānnā",
          english: "to know"
        },
        {
          hindi: "मोड़ना",
          translit: "moṛnā",
          english: "to turn/bend"
        },
        {
          hindi: "जोड़ना",
          translit: "joṛnā",
          english: "to join/add"
        },
        {
          hindi: "भटकना",
          translit: "bhaṭaknā",
          english: "to wander/lost"
        },
        {
          hindi: "चमकना",
          translit: "chamaknā",
          english: "to shine/sparkle"
        },
        {
          hindi: "घोलना",
          translit: "gholnā",
          english: "to dissolve/mix"
        },
        {
          hindi: "बोलना",
          translit: "bolnā",
          english: "to speak"
        }
      ] as Word[],
      auxiliary: [
        {
          hindi: "लगे",
          translit: "lage",
          english: "start to (auxiliary)"
        },
        {
          hindi: "सकना",
          translit: "saknā",
          english: "to be able to"
        },
        {
          hindi: "चुकना",
          translit: "chuknā",
          english: "to have completed"
        },
        {
          hindi: "पाना",
          translit: "pānā",
          english: "to get/obtain"
        }
      ] as Word[]
    } as VerbsCategory,

    adjectives: [
      { hindi: "गहरा", translit: "gahrā", english: "deep" },
      {
        hindi: "सारा",
        translit: "sārā",
        english: "whole/all"
      },
      {
        hindi: "बेताब",
        translit: "betāb",
        english: "restless/impatient"
      },
      {
        hindi: "सुहाना",
        translit: "suhānā",
        english: "pleasant/beautiful"
      },
      { hindi: "बुरा", translit: "burā", english: "bad" },
      {
        hindi: "ख़फ़ा",
        translit: "khafā",
        english: "angry/upset"
      },
      { hindi: "दुखी", translit: "dukhī", english: "sad" },
      {
        hindi: "घनेरा",
        translit: "ghanerā",
        english: "dense/thick"
      },
      {
        hindi: "सुनहरा",
        translit: "sunahrā",
        english: "golden"
      },
      {
        hindi: "दीवाना",
        translit: "dīvānā",
        english: "mad/infatuated"
      },
      {
        hindi: "शुरू",
        translit: "śurū",
        english: "beginning"
      },
      {
        hindi: "ख़तम",
        translit: "khatam",
        english: "finished/ended"
      },
      { hindi: "सौ", translit: "sau", english: "hundred" },
      {
        hindi: "हर",
        translit: "har",
        english: "each/every"
      },
      { hindi: "एक", translit: "ek", english: "one" },
      {
        hindi: "सच्चा",
        translit: "saccā",
        english: "true/truthful"
      },
      {
        hindi: "पूरा",
        translit: "pūrā",
        english: "complete/full"
      },
      {
        hindi: "अकेला",
        translit: "akelā",
        english: "alone"
      }
    ] as Word[],

    adverbs: [
      { hindi: "अब", translit: "ab", english: "now" },
      {
        hindi: "भी",
        translit: "bhī",
        english: "also/even"
      },
      { hindi: "कैसे", translit: "kaise", english: "how" },
      {
        hindi: "यूँ",
        translit: "yū̃",
        english: "like this/thus"
      },
      {
        hindi: "बार-बार",
        translit: "bār-bār",
        english: "again and again"
      },
      {
        hindi: "शायद",
        translit: "śāyad",
        english: "perhaps/maybe"
      },
      {
        hindi: "पहले से ही",
        translit: "pahle se hī",
        english: "already"
      },
      {
        hindi: "कभी",
        translit: "kabhī",
        english: "sometimes/ever"
      },
      {
        hindi: "बाद",
        translit: "bād",
        english: "after/later"
      },
      {
        hindi: "इस तरह",
        translit: "is tarah",
        english: "in this way"
      }
    ] as Word[],

    postpositions: [
      { hindi: "में", translit: "mẽ", english: "in" },
      {
        hindi: "का/की/के",
        translit: "kā/kī/ke",
        english: "of (possessive)"
      },
      {
        hindi: "से",
        translit: "se",
        english: "from/with/by"
      },
      { hindi: "पर", translit: "par", english: "on/upon" },
      {
        hindi: "को",
        translit: "ko",
        english: "to (object marker)"
      },
      { hindi: "अगर", translit: "agar", english: "if" },
      { hindi: "तो", translit: "to", english: "then/so" },
      {
        hindi: "ना/न",
        translit: "nā/na",
        english: "no/not"
      },
      {
        hindi: "ही",
        translit: "hī",
        english: "only/emphatic"
      },
      {
        hindi: "भी",
        translit: "bhī",
        english: "also/even"
      },
      {
        hindi: "सा/से",
        translit: "sā/se",
        english: "like/similar to"
      },
      { hindi: "ओ", translit: "o", english: "oh/vocative" },
      {
        hindi: "रे",
        translit: "re",
        english: "hey/vocative"
      },
      {
        hindi: "पिया",
        translit: "piyā",
        english: "beloved/dear"
      }
    ] as Word[],

    conjunctions: [
      { hindi: "और", translit: "aur", english: "and" },
      { hindi: "या", translit: "yā", english: "or" },
      { hindi: "कि", translit: "ki", english: "that" },
      {
        hindi: "अगर-तो",
        translit: "agar-to",
        english: "if-then"
      }
    ] as Word[],

    interjections: [
      { hindi: "ओ", translit: "o", english: "oh" },
      {
        hindi: "पिया",
        translit: "piyā",
        english: "beloved/dear"
      },
      { hindi: "रे", translit: "re", english: "hey" },
      {
        hindi: "शावटी",
        translit: "śāvṭī",
        english: "shawty (English loan)"
      },
      {
        hindi: "मामी",
        translit: "māmī",
        english: "aunty/mami"
      },
      { hindi: "अरे", translit: "are", english: "hey/oh" },
      {
        hindi: "ओ ज़ालिमा",
        translit: "o zālimā",
        english: "oh cruel one"
      }
    ] as Word[],

    loanwords: {
      french: [
        {
          hindi: "s'il te plaît",
          translit: "sil te ple",
          english: "please (French)"
        },
        {
          hindi: "tu",
          translit: "tu",
          english: "you (French)"
        },
        {
          hindi: "il",
          translit: "il",
          english: "he (French)"
        },
        {
          hindi: "Mami",
          translit: "mami",
          english: "aunty (French)"
        },
        {
          hindi: "dey",
          translit: "de",
          english: "say (French: 'dis')"
        },
        {
          hindi: "ça va aller",
          translit: "sa va ale",
          english: "it will be okay (French)"
        },
        {
          hindi: "allez",
          translit: "ale",
          english: "go/come on (French)"
        }
      ] as Word[],
      english: [
        {
          hindi: "shawty",
          translit: "śāvṭī",
          english: "shawty (slang)"
        },
        {
          hindi: "move on",
          translit: "mav on",
          english: "move on"
        },
        {
          hindi: "nobody",
          translit: "noḅoḍī",
          english: "nobody"
        },
        {
          hindi: "forced",
          translit: "forseḍ",
          english: "forced"
        },
        {
          hindi: "anything",
          translit: "eṇīthīṅg",
          english: "anything"
        },
        {
          hindi: "life",
          translit: "lāif",
          english: "life"
        },
        {
          hindi: "thing",
          translit: "thīṅg",
          english: "thing"
        },
        {
          hindi: "blind",
          translit: "blāinḍ",
          english: "blind"
        },
        {
          hindi: "own way",
          translit: "on ve",
          english: "own way"
        },
        { hindi: "yeah", translit: "yeā", english: "yeah" }
      ] as Word[],
      persian: [
        {
          hindi: "इंक़लाब",
          translit: "inqilāb",
          english: "revolution (Persian)"
        },
        {
          hindi: "ख़्वाब",
          translit: "khwāb",
          english: "dream (Persian)"
        },
        {
          hindi: "जन्नत",
          translit: "jannat",
          english: "paradise (Arabic)"
        },
        {
          hindi: "ज़माना",
          translit: "zamānā",
          english: "era/time (Persian)"
        },
        {
          hindi: "क़सम",
          translit: "qasam",
          english: "oath (Arabic)"
        },
        {
          hindi: "हक़",
          translit: "haq",
          english: "right/truth (Arabic)"
        },
        {
          hindi: "रब",
          translit: "rab",
          english: "Lord (Arabic)"
        },
        {
          hindi: "क़दम",
          translit: "qadam",
          english: "step (Arabic)"
        },
        {
          hindi: "ख़ता",
          translit: "khatā",
          english: "mistake (Arabic)"
        },
        {
          hindi: "फ़िदा",
          translit: "fidā",
          english: "sacrifice (Arabic)"
        },
        {
          hindi: "बेवफ़ा",
          translit: "bewafā",
          english: "unfaithful (Persian)"
        },
        {
          hindi: "तक़दीर",
          translit: "taqdīr",
          english: "fate (Arabic)"
        },
        {
          hindi: "मरहबा",
          translit: "marhabā",
          english: "welcome (Arabic)"
        },
        {
          hindi: "इत्र",
          translit: "itr",
          english: "perfume (Arabic)"
        },
        {
          hindi: "फ़साना",
          translit: "fasānā",
          english: "story (Persian)"
        },
        {
          hindi: "निशाना",
          translit: "niśānā",
          english: "target (Persian)"
        },
        {
          hindi: "दीदार",
          translit: "dīdār",
          english: "sight (Persian)"
        }
      ] as Word[],
      musical: [
        {
          hindi: "नि",
          translit: "ni",
          english: "musical note (ni)"
        },
        {
          hindi: "सा",
          translit: "sā",
          english: "musical note (sa)"
        },
        {
          hindi: "गा",
          translit: "gā",
          english: "musical note (ga)"
        },
        {
          hindi: "मा",
          translit: "mā",
          english: "musical note (ma)"
        },
        {
          hindi: "पा",
          translit: "pā",
          english: "musical note (pa)"
        },
        {
          hindi: "रे",
          translit: "re",
          english: "musical note (re)"
        },
        {
          hindi: "Ymih",
          translit: "ymih",
          english: "vocalization"
        },
        {
          hindi: "ooh",
          translit: "ūh",
          english: "vocalization"
        },
        {
          hindi: "ah",
          translit: "ā",
          english: "vocalization"
        },
        {
          hindi: "mm",
          translit: "mm",
          english: "vocalization"
        }
      ] as Word[]
    } as LoanwordsCategory
  };

  // Calculate total words
  const totalNouns =
    vocabulary.nouns.abstract.length +
    vocabulary.nouns.concrete.length +
    vocabulary.nouns.other.length;
  const totalPronouns =
    vocabulary.pronouns.personal.length +
    vocabulary.pronouns.interrogative.length +
    vocabulary.pronouns.relative.length;
  const totalVerbs =
    vocabulary.verbs.main.length +
    vocabulary.verbs.auxiliary.length;
  const totalAdjectives = vocabulary.adjectives.length;
  const totalAdverbs = vocabulary.adverbs.length;
  const totalPostpositions =
    vocabulary.postpositions.length;
  const totalConjunctions = vocabulary.conjunctions.length;
  const totalInterjections =
    vocabulary.interjections.length;
  const totalLoanwords =
    vocabulary.loanwords.french.length +
    vocabulary.loanwords.english.length +
    vocabulary.loanwords.persian.length +
    vocabulary.loanwords.musical.length;

  const totalWords =
    totalNouns +
    totalPronouns +
    totalVerbs +
    totalAdjectives +
    totalAdverbs +
    totalPostpositions +
    totalConjunctions +
    totalInterjections +
    totalLoanwords;

  // Current section state
  let currentSection = "nouns";
  let searchTerm = "";

  // Define section types
  type Section =
    | "nouns"
    | "pronouns"
    | "verbs"
    | "adjectives"
    | "adverbs"
    | "postpositions"
    | "conjunctions"
    | "interjections"
    | "loanwords";

  // Function to show section
  function showSection(section: Section) {
    currentSection = section;
  }

  // Handle keyup for search
  function handleKeyup(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    searchWords(target.value);
  }

  // Search functionality
  type SearchWord = Word & {
    category: string;
    subcategory?: string;
  };

  let searchResults: SearchWord[] = [];

  function searchWords(term: string) {
    searchTerm = term.toLowerCase();

    if (!searchTerm) {
      searchResults = [];
      return;
    }

    const allWords: SearchWord[] = [];

    // Collect nouns
    Object.keys(vocabulary.nouns).forEach((subcat) => {
      const words =
        vocabulary.nouns[
          subcat as keyof VocabularyCategory
        ];
      words.forEach((word) => {
        allWords.push({
          ...word,
          category: "noun",
          subcategory: subcat
        });
      });
    });

    // Collect pronouns
    Object.keys(vocabulary.pronouns).forEach((subcat) => {
      const words =
        vocabulary.pronouns[
          subcat as keyof PronounsCategory
        ];
      words.forEach((word) => {
        allWords.push({
          ...word,
          category: "pronoun",
          subcategory: subcat
        });
      });
    });

    // Collect verbs
    Object.keys(vocabulary.verbs).forEach((subcat) => {
      const words =
        vocabulary.verbs[subcat as keyof VerbsCategory];
      words.forEach((word) => {
        allWords.push({
          ...word,
          category: "verb",
          subcategory: subcat
        });
      });
    });

    // Collect adjectives
    vocabulary.adjectives.forEach((word) => {
      allWords.push({
        ...word,
        category: "adjective"
      });
    });

    // Collect adverbs
    vocabulary.adverbs.forEach((word) => {
      allWords.push({
        ...word,
        category: "adverb"
      });
    });

    // Collect postpositions
    vocabulary.postpositions.forEach((word) => {
      allWords.push({
        ...word,
        category: "postposition"
      });
    });

    // Collect conjunctions
    vocabulary.conjunctions.forEach((word) => {
      allWords.push({
        ...word,
        category: "conjunction"
      });
    });

    // Collect interjections
    vocabulary.interjections.forEach((word) => {
      allWords.push({
        ...word,
        category: "interjection"
      });
    });

    // Collect loanwords
    Object.keys(vocabulary.loanwords).forEach((subcat) => {
      const words =
        vocabulary.loanwords[
          subcat as keyof LoanwordsCategory
        ];
      words.forEach((word) => {
        allWords.push({
          ...word,
          category: "loanword",
          subcategory: subcat
        });
      });
    });

    // Filter words
    searchResults = allWords.filter(
      (word) =>
        word.hindi.toLowerCase().includes(searchTerm) ||
        word.translit.toLowerCase().includes(searchTerm) ||
        word.english.toLowerCase().includes(searchTerm)
    );
  }
</script>

<svelte:head>
  <title>Comprehensive Hindi Vocabulary Dictionary</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>

<div class="container mainpage">
  <h1>Comprehensive Hindi Vocabulary Dictionary</h1>
  <p class="subtitle">
    Color-coded word classes with translations,
    transliterations, and grammatical categories
  </p>

  <div class="search-container">
    <input
      type="text"
      id="wordSearch"
      placeholder="Search for Hindi words or English translations..."
      on:keyup={handleKeyup}
      bind:value={searchTerm}
    />
  </div>

  <div class="stats">
    <div class="stat-item">
      <span class="stat-number">{totalNouns}</span>
      <span class="stat-label">Nouns</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{totalVerbs}</span>
      <span class="stat-label">Verbs</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{totalAdjectives}</span>
      <span class="stat-label">Adjectives</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{totalWords}</span>
      <span class="stat-label">Total Words</span>
    </div>
  </div>

  <div class="color-legend">
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--noun);"
      ></div>
      <span>Nouns (संज्ञा)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--pronoun);"
      ></div>
      <span>Pronouns (सर्वनाम)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--verb);"
      ></div>
      <span>Verbs (क्रिया)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--adjective);"
      ></div>
      <span>Adjectives (विशेषण)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--adverb);"
      ></div>
      <span>Adverbs (क्रिया विशेषण)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--postposition);"
      ></div>
      <span>Postpositions & Particles</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--conjunction);"
      ></div>
      <span>Conjunctions (संयोजक)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--interjection);"
      ></div>
      <span>Interjections (विस्मयादिबोधक)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--loanword);"
      ></div>
      <span>Loanwords & Onomatopoeia</span>
    </div>
  </div>

  <div class="category-tabs">
    <button
      class="category-tab noun {currentSection === 'nouns'
        ? 'active'
        : ''}"
      on:click={() => showSection("nouns")}
    >
      Nouns (संज्ञा)
    </button>
    <button
      class="category-tab pronoun {currentSection ===
      'pronouns'
        ? 'active'
        : ''}"
      on:click={() => showSection("pronouns")}
    >
      Pronouns (सर्वनाम)
    </button>
    <button
      class="category-tab verb {currentSection === 'verbs'
        ? 'active'
        : ''}"
      on:click={() => showSection("verbs")}
    >
      Verbs (क्रिया)
    </button>
    <button
      class="category-tab adjective {currentSection ===
      'adjectives'
        ? 'active'
        : ''}"
      on:click={() => showSection("adjectives")}
    >
      Adjectives (विशेषण)
    </button>
    <button
      class="category-tab adverb {currentSection ===
      'adverbs'
        ? 'active'
        : ''}"
      on:click={() => showSection("adverbs")}
    >
      Adverbs (क्रिया विशेषण)
    </button>
    <button
      class="category-tab postposition {currentSection ===
      'postpositions'
        ? 'active'
        : ''}"
      on:click={() => showSection("postpositions")}
    >
      Postpositions & Particles
    </button>
    <button
      class="category-tab conjunction {currentSection ===
      'conjunctions'
        ? 'active'
        : ''}"
      on:click={() => showSection("conjunctions")}
    >
      Conjunctions (संयोजक)
    </button>
    <button
      class="category-tab interjection {currentSection ===
      'interjections'
        ? 'active'
        : ''}"
      on:click={() => showSection("interjections")}
    >
      Interjections & Vocatives
    </button>
    <button
      class="category-tab loanword {currentSection ===
      'loanwords'
        ? 'active'
        : ''}"
      on:click={() => showSection("loanwords")}
    >
      Loanwords & Onomatopoeia
    </button>
  </div>

  {#if searchTerm}
    <!-- Search Results Section -->
    <div
      id="search-results"
      class="vocabulary-section active"
    >
      <h2
        class="section-title"
        style="color: var(--accent);"
      >
        Search Results
      </h2>
      <div class="word-grid">
        {#if searchResults.length === 0}
          <div
            style="text-align: center; padding: 40px; color: var(--text-secondary);"
          >
            No words found matching your search.
          </div>
        {:else}
          {#each searchResults as word}
            <div class="word-card {word.category}">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
              <div
                style="margin-top: 8px; font-size: 0.9rem; color: var(--text-secondary);"
              >
                Category: {word.category
                  .charAt(0)
                  .toUpperCase() + word.category.slice(1)}
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <!-- Regular Vocabulary Sections -->

    <!-- Nouns Section -->
    {#if currentSection === "nouns"}
      <div id="nouns" class="vocabulary-section active">
        <h2 class="section-title noun">Nouns (संज्ञा)</h2>

        <h3 class="subcategory">Abstract & Emotional</h3>
        <div class="word-grid">
          {#each vocabulary.nouns.abstract as word}
            <div class="word-card noun">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">Concrete & People</h3>
        <div class="word-grid">
          {#each vocabulary.nouns.concrete as word}
            <div class="word-card noun">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">Other</h3>
        <div class="word-grid">
          {#each vocabulary.nouns.other as word}
            <div class="word-card noun">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Pronouns Section -->
    {#if currentSection === "pronouns"}
      <div id="pronouns" class="vocabulary-section">
        <h2 class="section-title pronoun">
          Pronouns (सर्वनाम)
        </h2>

        <h3 class="subcategory">Personal Pronouns</h3>
        <div class="word-grid">
          {#each vocabulary.pronouns.personal as word}
            <div class="word-card pronoun">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">Interrogative Pronouns</h3>
        <div class="word-grid">
          {#each vocabulary.pronouns.interrogative as word}
            <div class="word-card pronoun">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">
          Relative & Demonstrative Pronouns
        </h3>
        <div class="word-grid">
          {#each vocabulary.pronouns.relative as word}
            <div class="word-card pronoun">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Verbs Section -->
    {#if currentSection === "verbs"}
      <div id="verbs" class="vocabulary-section">
        <h2 class="section-title verb">Verbs (क्रिया)</h2>

        <h3 class="subcategory">Main Verbs</h3>
        <div class="word-grid">
          {#each vocabulary.verbs.main as word}
            <div class="word-card verb">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">
          Auxiliary/Compound Verbs
        </h3>
        <div class="word-grid">
          {#each vocabulary.verbs.auxiliary as word}
            <div class="word-card verb">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Adjectives Section -->
    {#if currentSection === "adjectives"}
      <div id="adjectives" class="vocabulary-section">
        <h2 class="section-title adjective">
          Adjectives (विशेषण)
        </h2>
        <div class="word-grid">
          {#each vocabulary.adjectives as word}
            <div class="word-card adjective">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Adverbs Section -->
    {#if currentSection === "adverbs"}
      <div id="adverbs" class="vocabulary-section">
        <h2 class="section-title adverb">
          Adverbs (क्रिया विशेषण)
        </h2>
        <div class="word-grid">
          {#each vocabulary.adverbs as word}
            <div class="word-card adverb">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Postpositions Section -->
    {#if currentSection === "postpositions"}
      <div id="postpositions" class="vocabulary-section">
        <h2 class="section-title postposition">
          Postpositions & Particles
        </h2>
        <div class="word-grid">
          {#each vocabulary.postpositions as word}
            <div class="word-card postposition">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Conjunctions Section -->
    {#if currentSection === "conjunctions"}
      <div id="conjunctions" class="vocabulary-section">
        <h2 class="section-title conjunction">
          Conjunctions (संयोजक)
        </h2>
        <div class="word-grid">
          {#each vocabulary.conjunctions as word}
            <div class="word-card conjunction">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Interjections Section -->
    {#if currentSection === "interjections"}
      <div id="interjections" class="vocabulary-section">
        <h2 class="section-title interjection">
          Interjections & Vocatives
        </h2>
        <div class="word-grid">
          {#each vocabulary.interjections as word}
            <div class="word-card interjection">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Loanwords Section -->
    {#if currentSection === "loanwords"}
      <div id="loanwords" class="vocabulary-section">
        <h2 class="section-title loanword">
          Loanwords & Onomatopoeia
        </h2>

        <h3 class="subcategory">French Loanwords</h3>
        <div class="word-grid">
          {#each vocabulary.loanwords.french as word}
            <div class="word-card loanword">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">English Loanwords</h3>
        <div class="word-grid">
          {#each vocabulary.loanwords.english as word}
            <div class="word-card loanword">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">
          Persian/Arabic Loanwords
        </h3>
        <div class="word-grid">
          {#each vocabulary.loanwords.persian as word}
            <div class="word-card loanword">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>

        <h3 class="subcategory">
          Musical Notes & Vocalizations
        </h3>
        <div class="word-grid">
          {#each vocabulary.loanwords.musical as word}
            <div class="word-card loanword">
              <div class="hindi-word">{word.hindi}</div>
              <div class="transliteration">
                {word.translit}
              </div>
              <div class="translation">{word.english}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}

  <footer>
    <p>
      Comprehensive Hindi Vocabulary Dictionary |
      Color-coded by word classes
    </p>
    <p>
      Includes translations, transliterations, and
      grammatical categorization for language learning
    </p>
    <p>Total vocabulary count: {totalWords} words</p>
  </footer>
</div>

<style>
  :root {
    --noun: #3f51b5;
    --pronoun: #9c27b0;
    --verb: #f44336;
    --adjective: #4caf50;
    --adverb: #ff9800;
    --postposition: #795548;
    --conjunction: #607d8b;
    --interjection: #e91e63;
    --loanword: #009688;
    --bg-light: #f5f7fa;
    --bg-card: #ffffff;
    --text-primary: #2c3e50;
    --text-secondary: #546e7a;
    --accent: #2196f3;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .container {
    background-color: var(--bg-light);
    color: var(--text-primary);
    margin-top: 6rem;
    line-height: 1.6;
    padding: 20px;
    max-width: 1400px;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 2.8rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 1.3rem;
    opacity: 0.95;
    max-width: 900px;
    text-align: center;
    margin: 0 auto 30px;
    line-height: 1.5;
    color: var(--text-secondary);
  }

  .color-legend {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    );
    gap: 15px;
    margin: 40px 0;
    padding: 25px;
    background-color: var(--bg-card);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e0e0e0;
  }

  .color-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .color-box {
    width: 24px;
    height: 24px;
    margin-right: 15px;
    border-radius: 5px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 0;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .category-tab {
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    background: none;
    color: inherit;
    font-size: inherit;
  }

  .category-tab:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .category-tab.active {
    border: 2px solid currentColor;
  }

  .vocabulary-section {
    background-color: var(--bg-card);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    border: 1px solid #e0e0e0;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 3px solid;
  }

  .word-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    );
    gap: 20px;
    margin-top: 20px;
  }

  .word-card {
    padding: 20px;
    background: white;
    border-radius: 8px;
    border-left: 5px solid;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }

  .word-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .hindi-word {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
    direction: ltr;
  }

  .transliteration {
    color: var(--text-secondary);
    font-style: italic;
    margin-bottom: 8px;
    font-size: 1.1rem;
  }

  .translation {
    color: var(--text-primary);
    font-weight: 500;
    padding: 8px 0;
    border-top: 1px solid #eee;
    margin-top: 8px;
  }

  .subcategory {
    font-size: 1.3rem;
    color: var(--text-secondary);
    margin: 30px 0 15px;
    padding-bottom: 10px;
    border-bottom: 2px dashed #ddd;
  }

  .search-container {
    margin: 30px 0;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  #wordSearch {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: border 0.3s;
  }

  #wordSearch:focus {
    border-color: var(--accent);
    outline: none;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin: 40px 0;
    padding: 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }

  .stat-item {
    text-align: center;
    padding: 15px;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    display: block;
  }

  .stat-label {
    color: var(--text-secondary);
    margin-top: 5px;
  }

  footer {
    text-align: center;
    padding: 40px 20px;
    margin-top: 50px;
    color: var(--text-secondary);
    border-top: 2px solid #e0e0e0;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .word-grid {
      grid-template-columns: 1fr;
    }

    .color-legend {
      grid-template-columns: repeat(
        auto-fill,
        minmax(180px, 1fr)
      );
    }

    h1 {
      font-size: 2.2rem;
    }

    .section-title {
      font-size: 1.7rem;
    }
  }

  .noun {
    color: var(--noun);
    border-color: var(--noun);
  }
  .pronoun {
    color: var(--pronoun);
    border-color: var(--pronoun);
  }
  .verb {
    color: var(--verb);
    border-color: var(--verb);
  }
  .adjective {
    color: var(--adjective);
    border-color: var(--adjective);
  }
  .adverb {
    color: var(--adverb);
    border-color: var(--adverb);
  }
  .postposition {
    color: var(--postposition);
    border-color: var(--postposition);
  }
  .conjunction {
    color: var(--conjunction);
    border-color: var(--conjunction);
  }
  .interjection {
    color: var(--interjection);
    border-color: var(--interjection);
  }
  .loanword {
    color: var(--loanword);
    border-color: var(--loanword);
  }
</style>
