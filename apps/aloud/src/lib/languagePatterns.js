const languagePatterns = {
  en: {
    name: 'English',
    patterns: [
      /\b(the|and|of|to|in|that|is|was|for|on|with|as|by|at|from)\b/i,
      /\b(I|you|he|she|it|we|they|me|him|her|us|them)\b/i,
      /\b(this|that|these|those|my|your|his|her|its|our|their)\b/i,
      /[aeiou]{2,}/i,
      /[^aeiouy]{4,}/i,
      /\b(are|were|have|has|had|been|will|would|could|should|may|might)\b/i,
      /\b(about|because|before|after|during|without|within|between)\b/i,
    ],
    weight: 1.0,
  },
  es: {
    name: 'Spanish',
    patterns: [
      /\b(el|la|los|las|y|de|en|por|para|con|sin|sobre|entre|hasta|desde)\b/i,
      /\b(que|como|cuando|donde|quien|cual|este|esta|estos|estas|esto|eso|eso)\b/i,
      /\b(ser|estar|tener|hacer|poder|decir|ir|ver|dar|saber|querer|venir)\b/i,
      /[áéíóúüñ¿¡]/i,
      /\b(porque|además|embargo|siempre|también|después|entonces|mientras|aunque)\b/i,
      /[¿¡]/, // Spanish uses inverted punctuation
      /\b(había|habían|hubo|habrá|habrían)\b/i, // Unique haber conjugations
      /\b(ís|áis|éis)\b/i, // Spanish verb endings
      /[c]cion\b/i, // Common Spanish suffix (like "acción")
    ],
    weight: 1.3,
  },
  fr: {
    name: 'French',
    patterns: [
      /\b(le|la|les|de|du|des|et|en|est|dans|pour|par|sur|avec|sans|chez|vers)\b/i,
      /\b(je|tu|il|elle|nous|vous|ils|elles|mon|ma|mes|ton|ta|tes|son|sa|ses)\b/i,
      /\b(être|avoir|faire|aller|pouvoir|voir|venir|dire|vouloir|savoir|devoir|prendre)\b/i,
      /[àâäéèêëïîôöùûüÿçœæ]/i,
      /\b(c'est|quand|où|comment|pourquoi|mais|donc|alors|pourtant|cependant)\b/i,
      /[èéêë]{2,}/i,
      /\b(aux|eux|ceux|mieux|dieux|cieux)\b/i, // Common French plural endings
      /\b(eur|euse)\b/i, // Common French suffixes (acteur/actrice pattern)
      /\b(ment)\b/i, // Common French adverb ending
      /\b(ais|ait|ions|iez|aient)\b/i, // French imperfect endings
      /[sc]ion\b/i, // French -tion/-sion suffix
      /[ée]e\b/i, // Common French feminine pattern
      /[^aeiou][aeiou][^aeiou][aeiou]/, // French syllable pattern
      /'[a-z]{1,3}\b/i, // French contractions (j', m', t', s', l', d', c')
      /\b(qu'|l'|d'|j'|m'|t'|s'|c'|n')\b/i, // French apostrophe usage
    ],
    weight: 1.4, // Increased weight due to many unique patterns
  },
  de: {
    name: 'German',
    patterns: [
      /\b(der|die|das|und|zu|von|mit|auf|für|an|bei|nach|aus|durch|über|unter)\b/i,
      /\b(ich|du|er|sie|es|wir|ihr|mein|dein|sein|ihr|unser|euer|ihr|Ihr)\b/i,
      /\b(haben|sein|werden|können|müssen|sagen|machen|geben|kommen|gehen|wissen)\b/i,
      /[äöüß]/i,
      /\b(aber|dann|doch|noch|schon|immer|wieder|auch|nur|sehr|bereits|bereits)\b/i,
      /[A-Z][a-z]+[A-Z][a-z]+/, // German capitalizes nouns
      /\b(zu|um|am|im|ins|vom|zum|zur|beim|hinter|neben|zwischen)\b/i,
      /\b(keit|heit|ung|schaft|tion)\b/i, // Common German suffixes
      /[ck]en\b/i, // Common German verb endings
      /\b(ge[^aeiou][a-z]+[en])\b/i, // German past participles
    ],
    weight: 1.3,
  },
  it: {
    name: 'Italian',
    patterns: [
      /\b(il|lo|la|i|gli|le|del|stai|dello|della|dei|degli|delle|al|allo|alla|ai|agli|alle)\b/i,
      /\b(io|tu|lui|lei|noi|voi|loro|mio|tuo|suo|nostro|vostro|loro|mia|tua|sua|nostra|vostra)\b/i,
      /\b(essere|avere|fare|potere|volere|dire|vedere|venire|dovere|sapere|stare|dare)\b/i,
      /[àèéìíîòóùú]/i,
      /\b(perché|quando|dove|come|quanto|anche|ancora|molto|poco|troppo|sempre|mai)\b/i,
      /[aeiou]{2,}/i,
      /[sz]ione\b/i, // Italian suffix (like "azione")
      /\b(mente)\b/i, // Italian adverb ending
      /\b(ando|endo)\b/i, // Italian gerund
      /\b(ato|ito|uto)\b/i, // Italian past participle
      /\b(ava|eva|iva)\b/i, // Italian imperfect
      /[sz]ione\b/i, // Italian -zione suffix
      /[cg]lia\b/i, // Common Italian pattern (like "famiglia")
      /\b(che|chi|ci|ce|ne|vi)\b/i, // Common Italian particles
      /[aeiou]r[aeiou]\b/, // Italian words often end with vowels
      /[^aeiou][aeiou]$/i, // Most Italian words end with a vowel
      /'[a-z]{1,2}\b/i, // Italian contractions (l', un', dell')
      /[sz]ione$|[cg]lia$|[aeiou]re$|[aeiou]le$/i, // Common Italian endings
    ],
    weight: 1.4, // Increased weight for better detection
  },
  pt: {
    name: 'Portuguese',
    patterns: [
      /\b(o|a|os|as|de|do|da|em|no|na|para|por|com|sem|entre|sobre|desde)\b/i,
      /\b(eu|tu|ele|ela|nós|vós|eles|elas|meu|minha|seu|sua|nosso|nossa|vosso|vossa)\b/i,
      /\b(ser|estar|ter|fazer|poder|dizer|ir|ver|vir|dar|saber|querer|haver)\b/i,
      /[áâãàçéêíóôõú]/i,
      /\b(como|onde|quando|porque|também|ainda|muito|pouco|bem|agora|sempre)\b/i,
      /[ãõ]{2,}/i,
      /[ç]/i,
      /\b(ão|ões|ais|eis)\b/i, // Portuguese plural endings
      /\b(ndo)\b/i, // Portuguese gerund
      /\b(ado|ido)\b/i, // Portuguese past participle
      /[lr]mente\b/i, // Portuguese adverb ending
      /[sz]ão\b/i, // Common Portuguese suffix (like "nação")
    ],
    weight: 1.3,
  },
  nl: {
    name: 'Dutch',
    patterns: [
      /\b(de|het|een|van|op|in|met|voor|aan|bij|door|over|onder|naar|uit)\b/i,
      /\b(ik|jij|hij|zij|wij|jullie|mijn|jouw|zijn|haar|ons|hun|uw)\b/i,
      /\b(hebben|zijn|worden|kunnen|moeten|zeggen|maken|gaan|komen|zien|doen)\b/i,
      /[áàäéèëíïóöúü]/i,
      /\b(maar|ook|nog|wel|toch|al|dan|want|dus|echter|omdat|hoewel)\b/i,
      /[aeiou]{2,}/i,
      /ij|IJ|ei|EI|ou|OU|au|AU/, // Common Dutch digraphs
      /\b(je|tje|pje)\b/i, // Dutch diminutives
      /\b(heid|teit|schap)\b/i, // Dutch suffixes
      /\b(ge[a-z]+[dt])\b/i, // Dutch past participles
    ],
    weight: 1.2,
  },
  sv: {
    name: 'Swedish',
    patterns: [
      /\b(och|att|det|som|en|är|för|på|med|till|av|om|från|vid|under)\b/i,
      /\b(jag|du|han|hon|vi|ni|de|min|din|hans|hennes|vår|er|deras)\b/i,
      /\b(har|vara|kunna|måste|säga|göra|gå|komma|se|få|ge|ta|veta)\b/i,
      /[åäöÅÄÖ]/i,
      /\b(men|också|bara|redan|alltid|ofta|aldrig|mycket|lite|också|kanske)\b/i,
      /[åäö]{2,}/i,
      /\b(het|skap|dom|ning)\b/i, // Common Swedish suffixes
      /\b(ade|at|it)\b/i, // Common Swedish verb endings
    ],
    weight: 1.3,
  },
  da: {
    name: 'Danish',
    patterns: [
      /\b(og|at|det|som|en|er|for|på|med|til|af|om|fra|ved|efter)\b/i,
      /\b(jeg|du|han|hun|vi|I|de|min|din|hans|hendes|vores|jeres|deres)\b/i,
      /\b(har|være|kunne|skulle|måtte|sige|gøre|gå|komme|se|få|vide)\b/i,
      /[åæøÅÆØ]/i,
      /\b(men|også|bare|allerede|altid|ofte|aldrig|meget|lidt|måske)\b/i,
      /[æø]{2,}/i,
      /\b(hed|skab|dom|ning)\b/i, // Common Danish suffixes
      /[e]de$/i, // Common Danish past tense
    ],
    weight: 1.3,
  },
  no: {
    name: 'Norwegian',
    patterns: [
      /\b(og|at|det|som|en|er|for|på|med|til|av|om|fra|ved|etter)\b/i,
      /\b(jeg|du|han|hun|vi|dere|de|min|din|hans|hennes|vår|deres|dere)\b/i,
      /\b(har|være|kunne|skulle|måtte|si|gjøre|gå|komme|se|få|vite)\b/i,
      /[åæøÅÆØ]/i,
      /\b(men|også|bare|allerede|alltid|ofte|aldri|mye|lite|kanskje)\b/i,
      /[ø]{2,}/i,
      /\b(het|skap|dom|ning)\b/i, // Common Norwegian suffixes
      /[e]t$/i, // Common Norwegian neuter gender ending
    ],
    weight: 1.3,
  },
  fi: {
    name: 'Finnish',
    patterns: [
      /\b(ja|on|se|että|ei|oli|mutta|niin|ovat|ole|jos|myös|vain|nyt|sitten)\b/i,
      /\b(minä|sinä|hän|me|te|he|minun|sinun|hänen|meidän|teidän|heidän)\b/i,
      /\b(olla|voida|täytyä|sanoa|tehdä|mennä|tulla|nähdä|saada|antaa)\b/i,
      /[äåöÄÅÖ]/i,
      /\b(mutta|myös|vain|niin|nyt|sitten|jo|aina|koska|ennen|jälkeen)\b/i,
      /[äö]{2,}/i,
      /[aeiouy]{2,}/i,
      /[^aeiouy]{3,}/i, // Finnish has consonant clusters
      /\b(ssa|ssä|lla|llä|lle|lta|ltä|na|nä|ksi|tta|ttä)\b/i, // Finnish case endings
      /\b(ko|kö|han|hän|pa|pä)\b/i, // Finnish particles
    ],
    weight: 1.3,
  },
  pl: {
    name: 'Polish',
    patterns: [
      /\b(i|w|na|z|do|się|o|że|jak|po|przez|przy|od|dla|bez|nad|pod)\b/i,
      /\b(mój|twój|jego|jej|nasz|wasz|ich|kto|co|który|jaki|ten|ta|to)\b/i,
      /\b(być|mieć|móc|musieć|mówić|robić|iść|widzieć|dać|wiedzieć|chcieć)\b/i,
      /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/i,
      /\b(ale|jednak|też|bardzo|tylko|jeszcze|już|gdzie|kiedy|dlaczego|ponieważ)\b/i,
      /[rz|sz|cz|dz|dź|dż]/i,
      /[ćńśźż]/i,
      /\b(ego|emu|ych|ym|emi)\b/i, // Polish adjective endings
      /\b(ów|owa|owe|owy)\b/i, // Common Polish suffixes
    ],
    weight: 1.3,
  },
  cs: {
    name: 'Czech',
    patterns: [
      /\b(a|v|na|z|do|se|o|že|jak|po|přes|při|od|pro|bez|pod|nad)\b/i,
      /\b(můj|tvůj|jeho|její|naš|vaš|jejich|kdo|co|který|jaký|ten|ta|to)\b/i,
      /\b(být|mít|moci|muset|říct|udělat|jít|vidět|dát|vědět|chtít)\b/i,
      /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/i,
      /\b(ale|však|také|jen|ještě|už|kde|kdy|proč|proto|tedy|protože|nebo)\b/i,
      /[ř|ů|ě]/i,
      /\b(ho|mu|mi|ti|ci)\b/i, // Common Czech pronouns short forms
      /\b(ovat|ít|ét|ct)\b/i, // Common Czech verb endings
    ],
    weight: 1.3,
  },
  hu: {
    name: 'Hungarian',
    patterns: [
      /\b(és|a|az|hogy|nem|is|de|egy|van|mint|vagy|csak|már|még|majd)\b/i,
      /\b(én|te|ő|mi|ti|ők|enyém|tiéd|övé|miénk|tiétek|övék)\b/i,
      /\b(van|lehet|kell|mond|csinál|megy|lát|jön|tud|akar|tesz|vesz)\b/i,
      /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/i,
      /\b(azonban|viszont|illetve|hanem|mert|tehát|ezért|hiszen|ugyanis)\b/i,
      /[öüőű]{2,}/i,
      /\b(ban|ben|ba|be|ra|re|on|en|ön|nál|nél|tól|től|ig|ért)\b/i, // Hungarian case endings
      /\b(unk|ünk|tok|tek|tök|nak|nek)\b/i, // Hungarian personal endings
    ],
    weight: 1.3,
  },
  ro: {
    name: 'Romanian',
    patterns: [
      /\b(și|de|în|pe|la|cu|din|pentru|prin|după|sub|peste|între|printre)\b/i,
      /\b(eu|tu|el|ea|noi|voi|ei|ele|meu|mea|tău|ta|lui|ei|nostru|noastră|vostru|voastră)\b/i,
      /\b(fi|avea|putea|trebui|spune|face|merge|vedea|da|ști|vrea|lua)\b/i,
      /[ăâîșțĂÂÎȘȚ]/i,
      /\b(dar|însă|pentru că|deoarece|fiindcă|așadar|deci|apoi|acum|atunci)\b/i,
      /[ăâî]/i,
      /\b(ul|ua|lei|ilor)\b/i, // Romanian definite article forms
      /\b(ește|ează|eam|eai|ea)\b/i, // Romanian verb endings
    ],
    weight: 1.3,
  },
  tr: {
    name: 'Turkish',
    patterns: [
      /\b(ve|bir|bu|ile|için|olarak|gibi|kadar|çok|daha|en|sonra|önce|üzere)\b/i,
      /\b(ben|sen|o|biz|siz|onlar|benim|senin|onun|bizim|sizin|onların)\b/i,
      /\b(olmak|etmek|gelmek|gitmek|görmek|bilmek|vermek|almak|yapmak)\b/i,
      /[çÇğĞıİöÖşŞüÜ]/i,
      /\b(ama|ancak|veya|çünkü|eğer|bile|hem|de|ki|ile|yani|üzere)\b/i,
      /[ıİğĞüÜşŞöÖçÇ]/i,
      /\b(lar|ler|den|dan|ta|te|na|ne)\b/i, // Turkish plural and case endings
      /\b(mak|mek|ış|iş|uş|üş)\b/i, // Turkish infinitives and nominalizers
    ],
    weight: 1.3,
  },
  ja: {
    name: 'Japanese',
    patterns: [
      /[ぁ-ん]{2,}/i,
      /[ァ-ン]{2,}/i,
      /[一-龯]{2,}/i,
      /[はがをにへでとやわも]/i,
      /[ですますでした]/i,
      /[、。]/,
      /[〜～]/,
      /[「」『』]/,
      /[っゃゅょ]{1,}/i, // Small kana
      /[ー]{1,}/i, // Long vowel mark
    ],
    weight: 2.0,
    script: 'cjk',
  },
  zh: {
    name: 'Chinese',
    patterns: [
      /[一-龯]{2,}/i,
      /[的了吗我是你他在和有了不]/i,
      /[，。！？；：‘’“”【】（）]/,
      /[～～～]/,
      /[《》]/,
      /[——]/,
      /[个把只条张件]/i, // Common measure words
    ],
    weight: 2.0,
    script: 'cjk',
  },
  ko: {
    name: 'Korean',
    patterns: [
      /[가-힣]{2,}/i,
      /[은는이가을를에에서으로와과]/i,
      /[습니다니다]/i,
      /[하고]/,
      /[、。]/,
      /[「」『』]/,
      /[ㄱ-ㅎㅏ-ㅣ]{2,}/i, // Jamo (if no Hangul fonts)
    ],
    weight: 2.0,
    script: 'cjk',
  },
  ru: {
    name: 'Russian',
    patterns: [
      /[а-яА-Я]{2,}/i,
      /\b(и|в|не|на|с|что|по|это|для|от|за|бы|как|но|мы|он|она|они|ты|вы)\b/i,
      /\b(что|как|так|все|еще|уже|даже|когда|только|чтобы|если|потому|поэтому)\b/i,
      /[ёЁ]/i,
      /\b(ться|тся|ть|л|ла|ло|ли)\b/i, // Common Russian verb endings
      /[^а-я][о][^а-я]/i, // Russian unstressed 'o' pattern
    ],
    weight: 1.5,
  },
  ar: {
    name: 'Arabic',
    patterns: [
      /[\u0600-\u06FF]{2,}/i,
      /\b(و|في|من|على|أن|هذا|كان|مع|لا|ما|هل|هي|هو|لقد|إن|عن|كانت)\b/i,
      /[ء-ي]/i,
      /[إأآؤئءة]/i, // Additional Arabic characters
      /[ًٌٍُِّْ]/i, // Arabic diacritics
    ],
    weight: 1.5,
  },
  hi: {
    name: 'Hindi',
    patterns: [
      /[\u0900-\u097F]{2,}/i,
      /\b(है|हैं|और|का|के|की|में|से|को|पर|या|एक|यह|वह|था|थी|थे|थीं)\b/i,
      /[ॐ]/i,
      /[्]/i, // Halant
      /[़]/i, // Nukta
    ],
    weight: 1.5,
  },
  el: {
    name: 'Greek',
    patterns: [
      /[α-ωΑ-Ω]{2,}/i,
      /\b(και|το|να|στη|του|την|με|από|για|που|είναι|θα|ως|στα|στις|στο)\b/i,
      /[ίϊΐόάέύϋΰήώ]/i,
      /[ς]/i, // Final sigma
    ],
    weight: 1.5,
  },
  he: {
    name: 'Hebrew',
    patterns: [
      /[\u0590-\u05FF]{2,}/i,
      /\b(של|את|על|לא|אני|יש|היה|כל|אם|גם|זה|עם|אשר|הוא|היא|אנחנו|אתם|אתן)\b/i,
      /[ךםןףץ]/i,
      /[ּֿ]/i, // Dagesh and other diacritics
    ],
    weight: 1.5,
  },
  th: {
    name: 'Thai',
    patterns: [
      /[ก-๙]{2,}/i,
      /[เแโใไ]/i,
      /[่้๊๋]/i,
      /[ฯ]/i,
      /[ๆ]/i, // Repetition mark
      /[์]/i, // Silent mark
      /[ุู]/i, // Vowels below/above
    ],
    weight: 1.5,
  },
};

// Simple export - works in all environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = languagePatterns;
} else {
  // For browser
  window.languagePatterns = languagePatterns;
}
