const languagePatterns = {
  en: {
    name: "English",
    patterns: [
      /\b(the|and|of|to|in|that|is|was|for|on|with|as|by|at|from)\b/i,
      /\b(I|you|he|she|it|we|they|me|him|her|us|them)\b/i,
      /\b(this|that|these|those|my|your|his|her|its|our|their)\b/i,
      /[aeiou]{2,}/i, // English has many vowel combinations
      /[^aeiouy]{4,}/i // English allows consonant clusters
    ],
    weight: 1.0
  },
  es: {
    name: "Spanish",
    patterns: [
      /\b(el|la|los|las|y|de|en|por|para|con|sin|sobre|entre)\b/i,
      /\b(que|como|cuando|donde|quien|cual|este|esta|estos|estas)\b/i,
      /\b(ser|estar|tener|hacer|poder|decir|ir|ver|dar|saber)\b/i,
      /[áéíóúüñ]/i,
      /\b(porque|además|embargo|siempre|también|después)\b/i,
      /[¿¡]/ // Spanish uses inverted punctuation
    ],
    weight: 1.2 // Higher weight for special characters
  },
  fr: {
    name: "French",
    patterns: [
      /\b(le|la|les|de|du|des|et|en|est-ce|dans|pour|par|sur|avec|sans)\b/i,
      /\b(je|tu|il|elle|nous|vous|ils|elles|mon|ma|mes|ton|ta|tes)\b/i,
      /\b(être|avoir|faire|aller|pouvoir|voir|venir|dire|vouloir)\b/i,
      /[àâäéèêëïîôöùûüÿçœ]/i,
      /\b(c'est|quand|où|comment|pourquoi|mais|donc|alors)\b/i,
      /[èéêë]{2,}/i // French has many e with accents
    ],
    weight: 1.2
  },
  de: {
    name: "German",
    patterns: [
      /\b(der|die|das|und|zu|von|mit|auf|für|an|bei|nach|aus|durch)\b/i,
      /\b(ich|du|er|sie|es|wir|ihr|mein|dein|sein|ihr|unser|euer)\b/i,
      /\b(haben|sein|werden|können|müssen|sagen|machen|geben|kommen)\b/i,
      /[äöüß]/i,
      /\b(aber|dann|doch|noch|schon|immer|wieder|auch|nur|sehr)\b/i,
      /[A-Z][a-z]+[A-Z][a-z]+/, // German capitalizes nouns
      /\b(zu|um|am|im|ins|vom|zum|zur)\b/i
    ],
    weight: 1.3 // Higher due to noun capitalization
  },
  it: {
    name: "Italian",
    patterns: [
      /\b(il|la|i|gli|le|di|a|da|stai|in|con|su|per|tra|fra|che)\b/i,
      /\b(io|tu|lui|lei|noi|voi|loro|mio|tuo|suo|nostro|vostro)\b/i,
      /\b(essere|avere|fare|potere|volere|dire|vedere|venire)\b/i,
      /[àèéìíîòóùú]/i,
      /\b(perché|quando|dove|come|quanto|anche|ancora|molto|poco)\b/i,
      /[aeiou]{2,}/i, // Italian has many vowel combinations
      /[sz]cion[ei]/i // Common Italian suffixes
    ],
    weight: 1.1
  },
  pt: {
    name: "Portuguese",
    patterns: [
      /\b(o|a|os|as|de|do|da|em|no|na|para|por|com|sem|entre)\b/i,
      /\b(eu|tu|ele|ela|nós|vós|eles|elas|meu|minha|seu|sua)\b/i,
      /\b(ser|estar|ter|fazer|poder|dizer|ir|ver|vir|dar|saber)\b/i,
      /[áâãàçéêíóôõú]/i,
      /\b(como|onde|quando|porque|também|ainda|muito|pouco|bem)\b/i,
      /[ãõ]{2,}/i, // Portuguese has many nasal sounds
      /[ç]/i // Special character
    ],
    weight: 1.2
  },
  nl: {
    name: "Dutch",
    patterns: [
      /\b(de|het|een|van|op|in|met|voor|aan|bij|door|over|onder)\b/i,
      /\b(ik|jij|hij|zij|wij|jullie|mijn|jouw|zijn|haar|ons|hun)\b/i,
      /\b(hebben|zijn|worden|kunnen|moeten|zeggen|maken|gaan|komen)\b/i,
      /[áàäéèëíïóöúü]/i,
      /\b(maar|ook|nog|wel|toch|al|dan|want|dus|echter|omdat)\b/i,
      /[aeiou]{2,}/i, // Dutch has many double vowels
      /ij|IJ|ei|EI/ // Common Dutch digraphs
    ],
    weight: 1.1
  },
  sv: {
    name: "Swedish",
    patterns: [
      /\b(och|att|det|som|en|är|för|på|med|till|av|om|från|vid)\b/i,
      /\b(jag|du|han|hon|vi|ni|de|min|din|hans|hennes|vår|er)\b/i,
      /\b(har|vara|kunna|måste|säga|göra|gå|komma|se|få|ge)\b/i,
      /[åäöÅÄÖ]/i,
      /\b(men|också|bara|redan|alltid|ofta|aldrig|mycket|lite)\b/i,
      /[åäö]{2,}/i // Swedish has many åäö combinations
    ],
    weight: 1.3
  },
  da: {
    name: "Danish",
    patterns: [
      /\b(og|at|det|som|en|er|for|på|med|til|af|om|fra|ved)\b/i,
      /\b(jeg|du|han|hun|vi|I|de|min|din|hans|hendes|vores|jeres)\b/i,
      /\b(har|være|kunne|skulle|måtte|sige|gøre|gå|komme|se|få)\b/i,
      /[åæøÅÆØ]/i,
      /\b(men|også|bare|allerede|altid|ofte|aldrig|meget|lidt)\b/i,
      /[æø]{2,}/i // Danish has many æø combinations
    ],
    weight: 1.3
  },
  no: {
    name: "Norwegian",
    patterns: [
      /\b(og|at|det|som|en|er|for|på|med|til|av|om|fra|ved)\b/i,
      /\b(jeg|du|han|hun|vi|dere|de|min|din|hans|hennes|vår|deres)\b/i,
      /\b(har|være|kunne|skulle|måtte|si|gjøre|gå|komme|se|få)\b/i,
      /[åæøÅÆØ]/i,
      /\b(men|også|bare|allerede|alltid|ofte|aldri|mye|lite)\b/i,
      /[ø]{2,}/i // Norwegian has many ø
    ],
    weight: 1.3
  },
  fi: {
    name: "Finnish",
    patterns: [
      /\b(ja|on|se|että|ei|oli|mutta|niin|ovat|ole|jos|myös|vain)\b/i,
      /\b(minä|sinä|hän|me|te|he|minun|sinun|hänen|meidän|teidän)\b/i,
      /\b(olla|voida|täytyä|sanoa|tehdä|mennä|tulla|nähdä|saada)\b/i,
      /[äåöÄÅÖ]/i,
      /\b(mutta|myös|vain|niin|nyt|sitten|jo|aina|koska|ennen)\b/i,
      /[äö]{2,}/i, // Finnish has many äö
      /[aeiouy]{2,}/i // Finnish has many vowels
    ],
    weight: 1.2
  },
  pl: {
    name: "Polish",
    patterns: [
      /\b(i|w|na|z|do|się|o|że|jak|po|przez|przy|od|dla|bez)\b/i,
      /\b(mój|twój|jego|jej|nasz|wasz|ich|kto|co|który|jaki|ten)\b/i,
      /\b(być|mieć|móc|musieć|mówić|robić|iść|widzieć|dać|wiedzieć)\b/i,
      /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/i,
      /\b(ale|jednak|też|bardzo|tylko|jeszcze|już|gdzie|kiedy|dlaczego)\b/i,
      /[rz|sz|cz]/i, // Common Polish digraphs
      /[ćńśźż]/i // Polish special characters
    ],
    weight: 1.3
  },
  cs: {
    name: "Czech",
    patterns: [
      /\b(a|v|na|z|do|se|o|že|jak|po|přes|při|od|pro|bez)\b/i,
      /\b(můj|tvůj|jeho|její|naš|vaš|jejich|kdo|co|který|jaký|ten)\b/i,
      /\b(být|mít|moci|muset|říct|udělat|jít|vidět|dát|vědět)\b/i,
      /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/i,
      /\b(ale|však|také|jen|ještě|už|kde|kdy|proč|proto|tedy|protože)\b/i,
      /[ř|ů]/i // Czech special characters
    ],
    weight: 1.3
  },
  hu: {
    name: "Hungarian",
    patterns: [
      /\b(és|a|az|hogy|nem|is|de|egy|van|mint|vagy|csak|már|még)\b/i,
      /\b(én|te|ő|mi|ti|ők|enyém|tiéd|övé|miénk|tiétek|övék)\b/i,
      /\b(van|lehet|kell|mond|csinál|megy|lát|jön|tud|akar)\b/i,
      /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/i,
      /\b(azonban|viszont|illetve|hanem|mert|tehát|ezért|hiszen)\b/i,
      /[öüőű]{2,}/i // Hungarian has many umlauts
    ],
    weight: 1.3
  },
  ro: {
    name: "Romanian",
    patterns: [
      /\b(și|de|în|pe|la|cu|din|pentru|prin|după|sub|peste|între)\b/i,
      /\b(eu|tu|el|ea|noi|voi|ei|ele|meu|mea|tău|ta|lui|ei|nostru)\b/i,
      /\b(fi|avea|putea|trebui|spune|face|merge|vedea|da|ști)\b/i,
      /[ăâîșțĂÂÎȘȚ]/i,
      /\b(dar|însă|pentru că|deoarece|fiindcă|așadar|deci|apoi)\b/i,
      /[ăâî]/i // Romanian specific characters
    ],
    weight: 1.3
  },
  tr: {
    name: "Turkish",
    patterns: [
      /\b(ve|bir|bu|ile|için|olarak|gibi|kadar|çok|daha|en|sonra)\b/i,
      /\b(ben|sen|o|biz|siz|onlar|benim|senin|onun|bizim|sizin|onların)\b/i,
      /\b(olmak|etmek|gelmek|gitmek|görmek|bilmek|vermek|almak)\b/i,
      /[çÇğĞıİöÖşŞüÜ]/i,
      /\b(ama|ancak|veya|çünkü|eğer|bile|hem|de|ki|ile)\b/i,
      /[ıİğĞüÜşŞöÖçÇ]/i // Turkish specific characters
    ],
    weight: 1.3
  },
  ja: {
    name: "Japanese",
    patterns: [
      /[ぁ-ん]/i, // Hiragana
      /[ァ-ン]/i, // Katakana
      /[一-龯]{2,}/i, // Kanji (require at least 2 for better detection)
      /[はがをにへでと]/i, // Common particles
      /[ですますました]/i, // Common verb endings
      /[、。]/, // Japanese punctuation
      /[〜～]/, // Japanese wave dash
      /[「」『』]/ // Japanese quotes
    ],
    weight: 2.0, // Much higher weight for non-Latin scripts
    script: "cjk"
  },
  zh: {
    name: "Chinese",
    patterns: [
      /[一-龯]{2,}/i, // Hanzi (require at least 2)
      /[的了吗我是你他在和有了不]/i, // Common characters
      /[，。！？；：‘’“”【】（）]/, // Chinese punctuation
      /[～～～]/, // Chinese tilde
      /[《》]/, // Chinese book title markers
      /[——]/ // Chinese em dash
    ],
    weight: 2.0,
    script: "cjk",
    // Chinese tends to have less hiragana/katakana and more Hanzi
    checkNoKana: true
  },
  ko: {
    name: "Korean",
    patterns: [
      /[가-힣]{2,}/i, // Hangul (require at least 2)
      /[은는이가을를에에서으로]/i, // Common particles
      /[습니다니다]/i, // Common verb endings
      /[하고]/, // Common conjunctions
      /[、。]/, // Korean punctuation
      /[「」『』]/ // Korean quotes
    ],
    weight: 2.0,
    script: "cjk"
  },
  ru: {
    name: "Russian",
    patterns: [
      /[а-яА-Я]{2,}/i,
      /\b(и|в|не|на|с|что|по|это|для|от|за|бы|как|но|мы|он)\b/i,
      /\b(что|как|так|все|еще|уже|даже|когда|только|чтобы|если)\b/i,
      /[ёЁ]/i
    ],
    weight: 1.5
  },
  ar: {
    name: "Arabic",
    patterns: [
      /[\u0600-\u06FF]{2,}/i,
      /\b(و|في|من|على|أن|هذا|كان|مع|لا|ما|هل|هي|هو|لقد|إن)\b/i,
      /[ء-ي]/i
    ],
    weight: 1.5
  },
  hi: {
    name: "Hindi",
    patterns: [
      /[\u0900-\u097F]{2,}/i,
      /\b(है|हैं|और|का|के|की|में|से|को|पर|या|एक|यह|वह|था)\b/i,
      /[ॐ]/i
    ],
    weight: 1.5
  },
  el: {
    name: "Greek",
    patterns: [
      /[α-ωΑ-Ω]{2,}/i,
      /\b(και|το|να|στη|του|την|με|από|για|που|είναι|θα|ως)\b/i,
      /[ίϊΐόάέύϋΰήώ]/i
    ],
    weight: 1.5
  },
  he: {
    name: "Hebrew",
    patterns: [
      /[\u0590-\u05FF]{2,}/i,
      /\b(של|את|על|לא|אני|יש|היה|כל|אם|גם|זה|עם|אשר|הוא)\b/i,
      /[ךםןףץ]/i // Final letters
    ],
    weight: 1.5
  },
  th: {
    name: "Thai",
    patterns: [
      /[ก-๙]{2,}/i,
      /[เแโใไ]/i, // Thai vowels
      /[่้๊๋]/i, // Thai tones
      /[ฯ]/i // Thai special characters
    ],
    weight: 1.5
  }
};

export default languagePatterns;
