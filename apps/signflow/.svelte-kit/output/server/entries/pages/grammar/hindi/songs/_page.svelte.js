import { h as head, e as attr, i as escape_html, a as attr_class, j as ensure_array_like, d as stringify } from "../../../../../chunks/vendor-svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const vocabulary = {
      nouns: {
        abstract: [
          { hindi: "इश्क़", translit: "ishq", english: "love/passion" },
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
          { hindi: "दुआ", translit: "duā", english: "prayer/blessing" },
          {
            hindi: "जन्नत",
            translit: "jannat",
            english: "heaven/paradise"
          },
          { hindi: "चाहत", translit: "chāhat", english: "desire/longing" },
          { hindi: "ख़्वाब", translit: "khwāb", english: "dream" },
          { hindi: "दर्द", translit: "dard", english: "pain/sorrow" },
          { hindi: "ग़म", translit: "ġham", english: "grief/sadness" },
          { hindi: "तक़दीर", translit: "taqdīr", english: "fate/destiny" },
          { hindi: "जोग", translit: "jog", english: "union/yoga" },
          {
            hindi: "संजोग",
            translit: "sañjog",
            english: "coincidence/fate"
          },
          { hindi: "रोग", translit: "rog", english: "disease/illness" },
          { hindi: "कलंक", translit: "kalaṅk", english: "stain/blot" },
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
          { hindi: "निशाना", translit: "niśānā", english: "target/mark" },
          { hindi: "फ़साना", translit: "fasānā", english: "story/tale" },
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
        ],
        concrete: [
          { hindi: "दिल", translit: "dil", english: "heart" },
          { hindi: "जहाँ", translit: "jahā̃", english: "world" },
          { hindi: "राह", translit: "rāh", english: "path/way" },
          { hindi: "हवा", translit: "havā", english: "wind/air" },
          { hindi: "उजाला", translit: "ujālā", english: "light" },
          { hindi: "आसमाँ", translit: "āsmā̃", english: "sky" },
          { hindi: "फ़रिश्ता", translit: "fariśtā", english: "angel" },
          { hindi: "जाँ", translit: "jā̃", english: "life/soul" },
          { hindi: "ज़माना", translit: "zamānā", english: "era/time" },
          { hindi: "दुनिया", translit: "duniyā", english: "world" },
          { hindi: "रब", translit: "rab", english: "God/Lord" },
          { hindi: "शहर", translit: "śahar", english: "city" },
          { hindi: "मौसम", translit: "mausam", english: "weather/season" },
          { hindi: "शाम", translit: "śām", english: "evening" },
          { hindi: "सीना", translit: "sīnā", english: "chest/heart" },
          { hindi: "दरिया", translit: "dariyā", english: "river" },
          { hindi: "बाँह", translit: "bā̃h", english: "arm" },
          { hindi: "पलक", translit: "palak", english: "eyelid" },
          { hindi: "रंग", translit: "raṅg", english: "color" },
          { hindi: "चाँद", translit: "chā̃d", english: "moon" },
          { hindi: "रास्ता", translit: "rāstā", english: "path/road" },
          { hindi: "सवेरा", translit: "saverā", english: "morning" },
          { hindi: "जंगल", translit: "jaṅgal", english: "forest" },
          { hindi: "जुगनू", translit: "jugnū", english: "firefly" },
          { hindi: "शम्मा", translit: "śammā", english: "lamp/flame" },
          { hindi: "परवाना", translit: "parvānā", english: "moth" },
          { hindi: "काजल", translit: "kājal", english: "kohl" },
          { hindi: "घटा", translit: "ghaṭā", english: "cloud" },
          { hindi: "बरखा", translit: "barkhā", english: "rain" },
          { hindi: "बादल", translit: "bādal", english: "cloud" },
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
          { hindi: "ज़िंदगानी", translit: "zindagānī", english: "life" },
          { hindi: "कहानी", translit: "kahānī", english: "story" },
          { hindi: "मोड़", translit: "moṛ", english: "turn/bend" },
          { hindi: "नैना", translit: "nainā", english: "eyes" },
          { hindi: "मुसाफ़िर", translit: "musāfir", english: "traveler" },
          { hindi: "बसेरा", translit: "baserā", english: "shelter/nest" },
          { hindi: "तमस", translit: "tamas", english: "darkness" },
          { hindi: "नज़र", translit: "nazar", english: "sight/glance" },
          { hindi: "आँख", translit: "ā̃kh", english: "eye" },
          { hindi: "बात", translit: "bāt", english: "word/talk" },
          { hindi: "साँस", translit: "sā̃s", english: "breath" },
          { hindi: "धड़कन", translit: "dhaṛkan", english: "heartbeat" },
          { hindi: "इत्र", translit: "itr", english: "perfume" },
          {
            hindi: "क़ातिल",
            translit: "qātil",
            english: "killer/murderer"
          },
          { hindi: "दीदार", translit: "dīdār", english: "sight/vision" },
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
        ],
        other: [
          { hindi: "इंक़लाब", translit: "inqilāb", english: "revolution" },
          { hindi: "जलना", translit: "jalnā", english: "burning" },
          {
            hindi: "ढलना",
            translit: "ḍhalnā",
            english: "setting/declining"
          },
          { hindi: "तड़पना", translit: "taṛapnā", english: "agonizing" },
          { hindi: "बहकाना", translit: "bahakānā", english: "misleading" },
          { hindi: "भुलाना", translit: "bhulānā", english: "forgetting" },
          { hindi: "मिटाना", translit: "miṭānā", english: "erasing" }
        ]
      },
      pronouns: {
        personal: [
          { hindi: "मैं", translit: "maiṁ", english: "I" },
          { hindi: "तू", translit: "tū", english: "you (intimate)" },
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
          { hindi: "हमें", translit: "hamẽ", english: "to us" },
          { hindi: "अपना", translit: "apnā", english: "own/oneself" },
          { hindi: "उस", translit: "us", english: "he/she/that" },
          { hindi: "उसको", translit: "usko", english: "to him/her" },
          { hindi: "कोई", translit: "koī", english: "someone/anyone" },
          { hindi: "किसी", translit: "kisī", english: "to someone" }
        ],
        interrogative: [
          { hindi: "क्यूँ", translit: "kyū̃", english: "why" },
          { hindi: "क्या", translit: "kyā", english: "what" },
          { hindi: "कहाँ", translit: "kahā̃", english: "where" },
          { hindi: "कैसे", translit: "kaise", english: "how" }
        ],
        relative: [
          { hindi: "ये", translit: "ye", english: "these/this" },
          { hindi: "वो", translit: "vo", english: "those/that" },
          {
            hindi: "जिस",
            translit: "jis",
            english: "who/which (relative)"
          },
          { hindi: "ऐसा", translit: "aisā", english: "such/like this" },
          { hindi: "इस", translit: "is", english: "this" }
        ]
      },
      verbs: {
        main: [
          { hindi: "होना", translit: "honā", english: "to be/to happen" },
          { hindi: "चाहना", translit: "chāhnā", english: "to want" },
          { hindi: "कहना", translit: "kahnā", english: "to say/tell" },
          { hindi: "रहना", translit: "rahnā", english: "to stay/live" },
          { hindi: "देखना", translit: "dekhnā", english: "to see/look" },
          { hindi: "जलना", translit: "jalnā", english: "to burn" },
          {
            hindi: "बचना",
            translit: "bachnā",
            english: "to escape/survive"
          },
          { hindi: "चलना", translit: "chalnā", english: "to walk/move" },
          { hindi: "बदलना", translit: "badalnā", english: "to change" },
          { hindi: "ढलना", translit: "ḍhalnā", english: "to set/decline" },
          { hindi: "तकना", translit: "taknā", english: "to stare/gaze" },
          { hindi: "लगना", translit: "lagnā", english: "to seem/feel" },
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
          { hindi: "रुलाना", translit: "rulānā", english: "to make cry" },
          { hindi: "सोना", translit: "sonā", english: "to sleep" },
          { hindi: "जागना", translit: "jāgnā", english: "to wake" },
          {
            hindi: "लगाना",
            translit: "lagānā",
            english: "to apply/attach"
          },
          { hindi: "बहना", translit: "bahnā", english: "to flow" },
          { hindi: "बनना", translit: "bannā", english: "to become" },
          {
            hindi: "सौंपना",
            translit: "saumpnā",
            english: "to hand over/entrust"
          },
          { hindi: "छीनना", translit: "chīnnā", english: "to snatch" },
          { hindi: "मिलना", translit: "milnā", english: "to meet/get" },
          { hindi: "चुराना", translit: "churānā", english: "to steal" },
          { hindi: "उठना", translit: "uṭhnā", english: "to get up" },
          { hindi: "जानना", translit: "jānnā", english: "to know" },
          { hindi: "मोड़ना", translit: "moṛnā", english: "to turn/bend" },
          { hindi: "जोड़ना", translit: "joṛnā", english: "to join/add" },
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
          { hindi: "बोलना", translit: "bolnā", english: "to speak" }
        ],
        auxiliary: [
          {
            hindi: "लगे",
            translit: "lage",
            english: "start to (auxiliary)"
          },
          { hindi: "सकना", translit: "saknā", english: "to be able to" },
          {
            hindi: "चुकना",
            translit: "chuknā",
            english: "to have completed"
          },
          { hindi: "पाना", translit: "pānā", english: "to get/obtain" }
        ]
      },
      adjectives: [
        { hindi: "गहरा", translit: "gahrā", english: "deep" },
        { hindi: "सारा", translit: "sārā", english: "whole/all" },
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
        { hindi: "ख़फ़ा", translit: "khafā", english: "angry/upset" },
        { hindi: "दुखी", translit: "dukhī", english: "sad" },
        { hindi: "घनेरा", translit: "ghanerā", english: "dense/thick" },
        { hindi: "सुनहरा", translit: "sunahrā", english: "golden" },
        {
          hindi: "दीवाना",
          translit: "dīvānā",
          english: "mad/infatuated"
        },
        { hindi: "शुरू", translit: "śurū", english: "beginning" },
        { hindi: "ख़तम", translit: "khatam", english: "finished/ended" },
        { hindi: "सौ", translit: "sau", english: "hundred" },
        { hindi: "हर", translit: "har", english: "each/every" },
        { hindi: "एक", translit: "ek", english: "one" },
        { hindi: "सच्चा", translit: "saccā", english: "true/truthful" },
        { hindi: "पूरा", translit: "pūrā", english: "complete/full" },
        { hindi: "अकेला", translit: "akelā", english: "alone" }
      ],
      adverbs: [
        { hindi: "अब", translit: "ab", english: "now" },
        { hindi: "भी", translit: "bhī", english: "also/even" },
        { hindi: "कैसे", translit: "kaise", english: "how" },
        { hindi: "यूँ", translit: "yū̃", english: "like this/thus" },
        {
          hindi: "बार-बार",
          translit: "bār-bār",
          english: "again and again"
        },
        { hindi: "शायद", translit: "śāyad", english: "perhaps/maybe" },
        {
          hindi: "पहले से ही",
          translit: "pahle se hī",
          english: "already"
        },
        { hindi: "कभी", translit: "kabhī", english: "sometimes/ever" },
        { hindi: "बाद", translit: "bād", english: "after/later" },
        {
          hindi: "इस तरह",
          translit: "is tarah",
          english: "in this way"
        }
      ],
      postpositions: [
        { hindi: "में", translit: "mẽ", english: "in" },
        {
          hindi: "का/की/के",
          translit: "kā/kī/ke",
          english: "of (possessive)"
        },
        { hindi: "से", translit: "se", english: "from/with/by" },
        { hindi: "पर", translit: "par", english: "on/upon" },
        { hindi: "को", translit: "ko", english: "to (object marker)" },
        { hindi: "अगर", translit: "agar", english: "if" },
        { hindi: "तो", translit: "to", english: "then/so" },
        { hindi: "ना/न", translit: "nā/na", english: "no/not" },
        { hindi: "ही", translit: "hī", english: "only/emphatic" },
        { hindi: "भी", translit: "bhī", english: "also/even" },
        {
          hindi: "सा/से",
          translit: "sā/se",
          english: "like/similar to"
        },
        { hindi: "ओ", translit: "o", english: "oh/vocative" },
        { hindi: "रे", translit: "re", english: "hey/vocative" },
        { hindi: "पिया", translit: "piyā", english: "beloved/dear" }
      ],
      conjunctions: [
        { hindi: "और", translit: "aur", english: "and" },
        { hindi: "या", translit: "yā", english: "or" },
        { hindi: "कि", translit: "ki", english: "that" },
        { hindi: "अगर-तो", translit: "agar-to", english: "if-then" }
      ],
      interjections: [
        { hindi: "ओ", translit: "o", english: "oh" },
        { hindi: "पिया", translit: "piyā", english: "beloved/dear" },
        { hindi: "रे", translit: "re", english: "hey" },
        {
          hindi: "शावटी",
          translit: "śāvṭī",
          english: "shawty (English loan)"
        },
        { hindi: "मामी", translit: "māmī", english: "aunty/mami" },
        { hindi: "अरे", translit: "are", english: "hey/oh" },
        {
          hindi: "ओ ज़ालिमा",
          translit: "o zālimā",
          english: "oh cruel one"
        }
      ],
      loanwords: {
        french: [
          {
            hindi: "s'il te plaît",
            translit: "sil te ple",
            english: "please (French)"
          },
          { hindi: "tu", translit: "tu", english: "you (French)" },
          { hindi: "il", translit: "il", english: "he (French)" },
          { hindi: "Mami", translit: "mami", english: "aunty (French)" },
          { hindi: "dey", translit: "de", english: "say (French: 'dis')" },
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
        ],
        english: [
          {
            hindi: "shawty",
            translit: "śāvṭī",
            english: "shawty (slang)"
          },
          { hindi: "move on", translit: "mav on", english: "move on" },
          { hindi: "nobody", translit: "noḅoḍī", english: "nobody" },
          { hindi: "forced", translit: "forseḍ", english: "forced" },
          { hindi: "anything", translit: "eṇīthīṅg", english: "anything" },
          { hindi: "life", translit: "lāif", english: "life" },
          { hindi: "thing", translit: "thīṅg", english: "thing" },
          { hindi: "blind", translit: "blāinḍ", english: "blind" },
          { hindi: "own way", translit: "on ve", english: "own way" },
          { hindi: "yeah", translit: "yeā", english: "yeah" }
        ],
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
          { hindi: "क़सम", translit: "qasam", english: "oath (Arabic)" },
          {
            hindi: "हक़",
            translit: "haq",
            english: "right/truth (Arabic)"
          },
          { hindi: "रब", translit: "rab", english: "Lord (Arabic)" },
          { hindi: "क़दम", translit: "qadam", english: "step (Arabic)" },
          { hindi: "ख़ता", translit: "khatā", english: "mistake (Arabic)" },
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
          { hindi: "इत्र", translit: "itr", english: "perfume (Arabic)" },
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
        ],
        musical: [
          { hindi: "नि", translit: "ni", english: "musical note (ni)" },
          { hindi: "सा", translit: "sā", english: "musical note (sa)" },
          { hindi: "गा", translit: "gā", english: "musical note (ga)" },
          { hindi: "मा", translit: "mā", english: "musical note (ma)" },
          { hindi: "पा", translit: "pā", english: "musical note (pa)" },
          { hindi: "रे", translit: "re", english: "musical note (re)" },
          { hindi: "Ymih", translit: "ymih", english: "vocalization" },
          { hindi: "ooh", translit: "ūh", english: "vocalization" },
          { hindi: "ah", translit: "ā", english: "vocalization" },
          { hindi: "mm", translit: "mm", english: "vocalization" }
        ]
      }
    };
    const totalNouns = vocabulary.nouns.abstract.length + vocabulary.nouns.concrete.length + vocabulary.nouns.other.length;
    const totalPronouns = vocabulary.pronouns.personal.length + vocabulary.pronouns.interrogative.length + vocabulary.pronouns.relative.length;
    const totalVerbs = vocabulary.verbs.main.length + vocabulary.verbs.auxiliary.length;
    const totalAdjectives = vocabulary.adjectives.length;
    const totalAdverbs = vocabulary.adverbs.length;
    const totalPostpositions = vocabulary.postpositions.length;
    const totalConjunctions = vocabulary.conjunctions.length;
    const totalInterjections = vocabulary.interjections.length;
    const totalLoanwords = vocabulary.loanwords.french.length + vocabulary.loanwords.english.length + vocabulary.loanwords.persian.length + vocabulary.loanwords.musical.length;
    const totalWords = totalNouns + totalPronouns + totalVerbs + totalAdjectives + totalAdverbs + totalPostpositions + totalConjunctions + totalInterjections + totalLoanwords;
    let searchTerm = "";
    head("1cf7o8o", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Comprehensive Hindi Vocabulary Dictionary</title>`);
      });
      $$renderer3.push(`<meta charset="UTF-8" class="svelte-1cf7o8o"/> <meta name="viewport" content="width=device-width, initial-scale=1.0" class="svelte-1cf7o8o"/>`);
    });
    $$renderer2.push(`<div class="container mainpage svelte-1cf7o8o"><h1 class="svelte-1cf7o8o">Comprehensive Hindi Vocabulary Dictionary</h1> <p class="subtitle svelte-1cf7o8o">Color-coded word classes with translations,
    transliterations, and grammatical categories</p> <div class="search-container svelte-1cf7o8o"><input type="text" id="wordSearch" placeholder="Search for Hindi words or English translations..."${attr("value", searchTerm)} class="svelte-1cf7o8o"/></div> <div class="stats svelte-1cf7o8o"><div class="stat-item svelte-1cf7o8o"><span class="stat-number svelte-1cf7o8o">${escape_html(totalNouns)}</span> <span class="stat-label svelte-1cf7o8o">Nouns</span></div> <div class="stat-item svelte-1cf7o8o"><span class="stat-number svelte-1cf7o8o">${escape_html(totalVerbs)}</span> <span class="stat-label svelte-1cf7o8o">Verbs</span></div> <div class="stat-item svelte-1cf7o8o"><span class="stat-number svelte-1cf7o8o">${escape_html(totalAdjectives)}</span> <span class="stat-label svelte-1cf7o8o">Adjectives</span></div> <div class="stat-item svelte-1cf7o8o"><span class="stat-number svelte-1cf7o8o">${escape_html(totalWords)}</span> <span class="stat-label svelte-1cf7o8o">Total Words</span></div></div> <div class="color-legend svelte-1cf7o8o"><div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--noun);"></div> <span class="svelte-1cf7o8o">Nouns (संज्ञा)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--pronoun);"></div> <span class="svelte-1cf7o8o">Pronouns (सर्वनाम)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--verb);"></div> <span class="svelte-1cf7o8o">Verbs (क्रिया)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--adjective);"></div> <span class="svelte-1cf7o8o">Adjectives (विशेषण)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--adverb);"></div> <span class="svelte-1cf7o8o">Adverbs (क्रिया विशेषण)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--postposition);"></div> <span class="svelte-1cf7o8o">Postpositions &amp; Particles</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--conjunction);"></div> <span class="svelte-1cf7o8o">Conjunctions (संयोजक)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--interjection);"></div> <span class="svelte-1cf7o8o">Interjections (विस्मयादिबोधक)</span></div> <div class="color-item svelte-1cf7o8o"><div class="color-box svelte-1cf7o8o" style="background-color: var(--loanword);"></div> <span class="svelte-1cf7o8o">Loanwords &amp; Onomatopoeia</span></div></div> <div class="category-tabs svelte-1cf7o8o"><button${attr_class(`category-tab noun ${stringify("active")}`, "svelte-1cf7o8o")}>Nouns (संज्ञा)</button> <button${attr_class(`category-tab pronoun ${stringify("")}`, "svelte-1cf7o8o")}>Pronouns (सर्वनाम)</button> <button${attr_class(`category-tab verb ${stringify("")}`, "svelte-1cf7o8o")}>Verbs (क्रिया)</button> <button${attr_class(`category-tab adjective ${stringify("")}`, "svelte-1cf7o8o")}>Adjectives (विशेषण)</button> <button${attr_class(`category-tab adverb ${stringify("")}`, "svelte-1cf7o8o")}>Adverbs (क्रिया विशेषण)</button> <button${attr_class(`category-tab postposition ${stringify("")}`, "svelte-1cf7o8o")}>Postpositions &amp; Particles</button> <button${attr_class(`category-tab conjunction ${stringify("")}`, "svelte-1cf7o8o")}>Conjunctions (संयोजक)</button> <button${attr_class(`category-tab interjection ${stringify("")}`, "svelte-1cf7o8o")}>Interjections &amp; Vocatives</button> <button${attr_class(`category-tab loanword ${stringify("")}`, "svelte-1cf7o8o")}>Loanwords &amp; Onomatopoeia</button></div> `);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div id="nouns" class="vocabulary-section active svelte-1cf7o8o"><h2 class="section-title noun svelte-1cf7o8o">Nouns (संज्ञा)</h2> <h3 class="subcategory svelte-1cf7o8o">Abstract &amp; Emotional</h3> <div class="word-grid svelte-1cf7o8o"><!--[-->`);
        const each_array_1 = ensure_array_like(vocabulary.nouns.abstract);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let word = each_array_1[$$index_1];
          $$renderer2.push(`<div class="word-card noun svelte-1cf7o8o"><div class="hindi-word svelte-1cf7o8o">${escape_html(word.hindi)}</div> <div class="transliteration svelte-1cf7o8o">${escape_html(word.translit)}</div> <div class="translation svelte-1cf7o8o">${escape_html(word.english)}</div></div>`);
        }
        $$renderer2.push(`<!--]--></div> <h3 class="subcategory svelte-1cf7o8o">Concrete &amp; People</h3> <div class="word-grid svelte-1cf7o8o"><!--[-->`);
        const each_array_2 = ensure_array_like(vocabulary.nouns.concrete);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let word = each_array_2[$$index_2];
          $$renderer2.push(`<div class="word-card noun svelte-1cf7o8o"><div class="hindi-word svelte-1cf7o8o">${escape_html(word.hindi)}</div> <div class="transliteration svelte-1cf7o8o">${escape_html(word.translit)}</div> <div class="translation svelte-1cf7o8o">${escape_html(word.english)}</div></div>`);
        }
        $$renderer2.push(`<!--]--></div> <h3 class="subcategory svelte-1cf7o8o">Other</h3> <div class="word-grid svelte-1cf7o8o"><!--[-->`);
        const each_array_3 = ensure_array_like(vocabulary.nouns.other);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let word = each_array_3[$$index_3];
          $$renderer2.push(`<div class="word-card noun svelte-1cf7o8o"><div class="hindi-word svelte-1cf7o8o">${escape_html(word.hindi)}</div> <div class="transliteration svelte-1cf7o8o">${escape_html(word.translit)}</div> <div class="translation svelte-1cf7o8o">${escape_html(word.english)}</div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> <footer class="svelte-1cf7o8o"><p class="svelte-1cf7o8o">Comprehensive Hindi Vocabulary Dictionary |
      Color-coded by word classes</p> <p class="svelte-1cf7o8o">Includes translations, transliterations, and
      grammatical categorization for language learning</p> <p class="svelte-1cf7o8o">Total vocabulary count: ${escape_html(totalWords)} words</p></footer></div>`);
  });
}
export {
  _page as default
};
