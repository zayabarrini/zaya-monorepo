
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/filter" | "/api/frequency" | "/api/frequency/[language]" | "/api/home" | "/api/posts" | "/api/sentences" | "/api/translate" | "/api/words" | "/blog" | "/blog/posts" | "/blog/posts/[slug]" | "/cinema" | "/courses" | "/debug" | "/favorite-movies" | "/frequency" | "/frequency/[language]" | "/grammar" | "/grammar/arabic" | "/grammar/arabic/advanced-sentences" | "/grammar/arabic/arabic-transliteration-api" | "/grammar/arabic/conjugation" | "/grammar/arabic/doubt" | "/grammar/arabic/endings" | "/grammar/arabic/nouns-adjectives" | "/grammar/arabic/pronominal-composition" | "/grammar/arabic/science" | "/grammar/arabic/sentences" | "/grammar/arabic/songs" | "/grammar/arabic/spelling-words" | "/grammar/arabic/spelling" | "/grammar/arabic/vocabulary" | "/grammar/chinese" | "/grammar/chinese/chinese-character-stroke-order" | "/grammar/chinese/chinese-character-stroke-search" | "/grammar/chinese/chinese-syntax-improved" | "/grammar/chinese/chinese-syntax" | "/grammar/chinese/chinese-transliteration-api" | "/grammar/chinese/chinese-transliteration-simple" | "/grammar/chinese/chinese-transliteration" | "/grammar/hindi" | "/grammar/hindi/hindi-transliteration-api" | "/grammar/hindi/pronominal-composition" | "/grammar/hindi/songs" | "/grammar/hindi/spelling" | "/grammar/japanese" | "/grammar/japanese/japanese-transliteration" | "/grammar/japanese/pronominal-composition" | "/grammar/korean" | "/grammar/korean/korean-transliteration-api" | "/grammar/languages-test" | "/grammar/russian" | "/grammar/russian/pronominal-composition" | "/grammar/russian/russian-declensions" | "/grammar/russian/russian-transliteration-api" | "/grammar/russian/science" | "/grammar/russian/songs" | "/grammar/science" | "/list" | "/melancholic-machines" | "/posts" | "/sentences" | "/transliteration" | "/words";
		RouteParams(): {
			"/api/frequency/[language]": { language: string };
			"/blog/posts/[slug]": { slug: string };
			"/frequency/[language]": { language: string }
		};
		LayoutParams(): {
			"/": { language?: string; slug?: string };
			"/api": { language?: string };
			"/api/filter": Record<string, never>;
			"/api/frequency": { language?: string };
			"/api/frequency/[language]": { language: string };
			"/api/home": Record<string, never>;
			"/api/posts": Record<string, never>;
			"/api/sentences": Record<string, never>;
			"/api/translate": Record<string, never>;
			"/api/words": Record<string, never>;
			"/blog": { slug?: string };
			"/blog/posts": { slug?: string };
			"/blog/posts/[slug]": { slug: string };
			"/cinema": Record<string, never>;
			"/courses": Record<string, never>;
			"/debug": Record<string, never>;
			"/favorite-movies": Record<string, never>;
			"/frequency": { language?: string };
			"/frequency/[language]": { language: string };
			"/grammar": Record<string, never>;
			"/grammar/arabic": Record<string, never>;
			"/grammar/arabic/advanced-sentences": Record<string, never>;
			"/grammar/arabic/arabic-transliteration-api": Record<string, never>;
			"/grammar/arabic/conjugation": Record<string, never>;
			"/grammar/arabic/doubt": Record<string, never>;
			"/grammar/arabic/endings": Record<string, never>;
			"/grammar/arabic/nouns-adjectives": Record<string, never>;
			"/grammar/arabic/pronominal-composition": Record<string, never>;
			"/grammar/arabic/science": Record<string, never>;
			"/grammar/arabic/sentences": Record<string, never>;
			"/grammar/arabic/songs": Record<string, never>;
			"/grammar/arabic/spelling-words": Record<string, never>;
			"/grammar/arabic/spelling": Record<string, never>;
			"/grammar/arabic/vocabulary": Record<string, never>;
			"/grammar/chinese": Record<string, never>;
			"/grammar/chinese/chinese-character-stroke-order": Record<string, never>;
			"/grammar/chinese/chinese-character-stroke-search": Record<string, never>;
			"/grammar/chinese/chinese-syntax-improved": Record<string, never>;
			"/grammar/chinese/chinese-syntax": Record<string, never>;
			"/grammar/chinese/chinese-transliteration-api": Record<string, never>;
			"/grammar/chinese/chinese-transliteration-simple": Record<string, never>;
			"/grammar/chinese/chinese-transliteration": Record<string, never>;
			"/grammar/hindi": Record<string, never>;
			"/grammar/hindi/hindi-transliteration-api": Record<string, never>;
			"/grammar/hindi/pronominal-composition": Record<string, never>;
			"/grammar/hindi/songs": Record<string, never>;
			"/grammar/hindi/spelling": Record<string, never>;
			"/grammar/japanese": Record<string, never>;
			"/grammar/japanese/japanese-transliteration": Record<string, never>;
			"/grammar/japanese/pronominal-composition": Record<string, never>;
			"/grammar/korean": Record<string, never>;
			"/grammar/korean/korean-transliteration-api": Record<string, never>;
			"/grammar/languages-test": Record<string, never>;
			"/grammar/russian": Record<string, never>;
			"/grammar/russian/pronominal-composition": Record<string, never>;
			"/grammar/russian/russian-declensions": Record<string, never>;
			"/grammar/russian/russian-transliteration-api": Record<string, never>;
			"/grammar/russian/science": Record<string, never>;
			"/grammar/russian/songs": Record<string, never>;
			"/grammar/science": Record<string, never>;
			"/list": Record<string, never>;
			"/melancholic-machines": Record<string, never>;
			"/posts": Record<string, never>;
			"/sentences": Record<string, never>;
			"/transliteration": Record<string, never>;
			"/words": Record<string, never>
		};
		Pathname(): "/" | "/api/filter" | `/api/frequency/${string}` & {} | "/api/home" | "/api/posts" | "/api/sentences" | "/api/translate" | "/api/words" | `/blog/posts/${string}` & {} | "/cinema" | "/courses" | "/debug" | "/favorite-movies" | "/frequency" | `/frequency/${string}` & {} | "/grammar" | "/grammar/arabic" | "/grammar/arabic/advanced-sentences" | "/grammar/arabic/arabic-transliteration-api" | "/grammar/arabic/conjugation" | "/grammar/arabic/doubt" | "/grammar/arabic/endings" | "/grammar/arabic/nouns-adjectives" | "/grammar/arabic/pronominal-composition" | "/grammar/arabic/science" | "/grammar/arabic/sentences" | "/grammar/arabic/songs" | "/grammar/arabic/spelling-words" | "/grammar/arabic/spelling" | "/grammar/arabic/vocabulary" | "/grammar/chinese/chinese-character-stroke-order" | "/grammar/chinese/chinese-character-stroke-search" | "/grammar/chinese/chinese-syntax-improved" | "/grammar/chinese/chinese-syntax" | "/grammar/chinese/chinese-transliteration-api" | "/grammar/chinese/chinese-transliteration-simple" | "/grammar/chinese/chinese-transliteration" | "/grammar/hindi" | "/grammar/hindi/hindi-transliteration-api" | "/grammar/hindi/pronominal-composition" | "/grammar/hindi/songs" | "/grammar/hindi/spelling" | "/grammar/japanese/japanese-transliteration" | "/grammar/japanese/pronominal-composition" | "/grammar/korean/korean-transliteration-api" | "/grammar/languages-test" | "/grammar/russian" | "/grammar/russian/pronominal-composition" | "/grammar/russian/russian-declensions" | "/grammar/russian/russian-transliteration-api" | "/grammar/russian/science" | "/grammar/russian/songs" | "/grammar/science" | "/list" | "/melancholic-machines" | "/posts" | "/sentences" | "/transliteration" | "/words";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/css/img/57.jpg" | "/css/img/Bing/bing1.png" | "/css/img/Bing/bing10.png" | "/css/img/Bing/bing100.png" | "/css/img/Bing/bing101.png" | "/css/img/Bing/bing102.png" | "/css/img/Bing/bing103.png" | "/css/img/Bing/bing104.png" | "/css/img/Bing/bing105.png" | "/css/img/Bing/bing106.png" | "/css/img/Bing/bing107.png" | "/css/img/Bing/bing108.png" | "/css/img/Bing/bing109.png" | "/css/img/Bing/bing11.png" | "/css/img/Bing/bing110.png" | "/css/img/Bing/bing111.png" | "/css/img/Bing/bing112.png" | "/css/img/Bing/bing113.png" | "/css/img/Bing/bing114.png" | "/css/img/Bing/bing115.png" | "/css/img/Bing/bing116.png" | "/css/img/Bing/bing117.png" | "/css/img/Bing/bing118.png" | "/css/img/Bing/bing119.png" | "/css/img/Bing/bing12.png" | "/css/img/Bing/bing120.png" | "/css/img/Bing/bing121.png" | "/css/img/Bing/bing122.png" | "/css/img/Bing/bing123.png" | "/css/img/Bing/bing124.png" | "/css/img/Bing/bing125.png" | "/css/img/Bing/bing126.png" | "/css/img/Bing/bing127.png" | "/css/img/Bing/bing128.png" | "/css/img/Bing/bing129.png" | "/css/img/Bing/bing13.png" | "/css/img/Bing/bing130.png" | "/css/img/Bing/bing131.png" | "/css/img/Bing/bing132.png" | "/css/img/Bing/bing133.png" | "/css/img/Bing/bing134.png" | "/css/img/Bing/bing135.png" | "/css/img/Bing/bing136.png" | "/css/img/Bing/bing137.png" | "/css/img/Bing/bing138.png" | "/css/img/Bing/bing139.png" | "/css/img/Bing/bing14.png" | "/css/img/Bing/bing140.png" | "/css/img/Bing/bing141.png" | "/css/img/Bing/bing142.png" | "/css/img/Bing/bing143.png" | "/css/img/Bing/bing144.png" | "/css/img/Bing/bing145.png" | "/css/img/Bing/bing146.png" | "/css/img/Bing/bing147.png" | "/css/img/Bing/bing148.png" | "/css/img/Bing/bing149.png" | "/css/img/Bing/bing15.png" | "/css/img/Bing/bing150.png" | "/css/img/Bing/bing151.png" | "/css/img/Bing/bing152.png" | "/css/img/Bing/bing153.png" | "/css/img/Bing/bing154.png" | "/css/img/Bing/bing155.png" | "/css/img/Bing/bing156.png" | "/css/img/Bing/bing157.png" | "/css/img/Bing/bing158.png" | "/css/img/Bing/bing159.png" | "/css/img/Bing/bing16.png" | "/css/img/Bing/bing160.png" | "/css/img/Bing/bing161.png" | "/css/img/Bing/bing162.png" | "/css/img/Bing/bing163.png" | "/css/img/Bing/bing164.png" | "/css/img/Bing/bing165.png" | "/css/img/Bing/bing166.png" | "/css/img/Bing/bing167.png" | "/css/img/Bing/bing168.png" | "/css/img/Bing/bing169.png" | "/css/img/Bing/bing17.png" | "/css/img/Bing/bing170.png" | "/css/img/Bing/bing171.png" | "/css/img/Bing/bing172.png" | "/css/img/Bing/bing173.png" | "/css/img/Bing/bing174.png" | "/css/img/Bing/bing175.png" | "/css/img/Bing/bing176.png" | "/css/img/Bing/bing177.png" | "/css/img/Bing/bing178.png" | "/css/img/Bing/bing179.png" | "/css/img/Bing/bing18.png" | "/css/img/Bing/bing180.png" | "/css/img/Bing/bing181.png" | "/css/img/Bing/bing182.png" | "/css/img/Bing/bing183.png" | "/css/img/Bing/bing184.png" | "/css/img/Bing/bing185.png" | "/css/img/Bing/bing186.png" | "/css/img/Bing/bing187.png" | "/css/img/Bing/bing188.png" | "/css/img/Bing/bing189.png" | "/css/img/Bing/bing19.png" | "/css/img/Bing/bing190.png" | "/css/img/Bing/bing191.png" | "/css/img/Bing/bing192.png" | "/css/img/Bing/bing193.png" | "/css/img/Bing/bing194.png" | "/css/img/Bing/bing195.png" | "/css/img/Bing/bing196.png" | "/css/img/Bing/bing197.png" | "/css/img/Bing/bing198.png" | "/css/img/Bing/bing199.png" | "/css/img/Bing/bing2.png" | "/css/img/Bing/bing20.png" | "/css/img/Bing/bing200.png" | "/css/img/Bing/bing201.png" | "/css/img/Bing/bing202.png" | "/css/img/Bing/bing203.png" | "/css/img/Bing/bing204.png" | "/css/img/Bing/bing205.png" | "/css/img/Bing/bing206.png" | "/css/img/Bing/bing207.png" | "/css/img/Bing/bing208.png" | "/css/img/Bing/bing209.png" | "/css/img/Bing/bing21.png" | "/css/img/Bing/bing210.png" | "/css/img/Bing/bing211.png" | "/css/img/Bing/bing212.png" | "/css/img/Bing/bing213.png" | "/css/img/Bing/bing214.png" | "/css/img/Bing/bing22.png" | "/css/img/Bing/bing23.png" | "/css/img/Bing/bing24.png" | "/css/img/Bing/bing25.png" | "/css/img/Bing/bing26.png" | "/css/img/Bing/bing27.png" | "/css/img/Bing/bing28.png" | "/css/img/Bing/bing29.png" | "/css/img/Bing/bing3.png" | "/css/img/Bing/bing30.png" | "/css/img/Bing/bing31.png" | "/css/img/Bing/bing32.png" | "/css/img/Bing/bing33.png" | "/css/img/Bing/bing34.png" | "/css/img/Bing/bing35.png" | "/css/img/Bing/bing36.png" | "/css/img/Bing/bing37.png" | "/css/img/Bing/bing38.png" | "/css/img/Bing/bing39.png" | "/css/img/Bing/bing4.png" | "/css/img/Bing/bing40.png" | "/css/img/Bing/bing41.png" | "/css/img/Bing/bing42.png" | "/css/img/Bing/bing43.png" | "/css/img/Bing/bing44.png" | "/css/img/Bing/bing45.png" | "/css/img/Bing/bing46.png" | "/css/img/Bing/bing47.png" | "/css/img/Bing/bing48.png" | "/css/img/Bing/bing49.png" | "/css/img/Bing/bing5.png" | "/css/img/Bing/bing50.png" | "/css/img/Bing/bing51.png" | "/css/img/Bing/bing52.png" | "/css/img/Bing/bing53.png" | "/css/img/Bing/bing54.png" | "/css/img/Bing/bing55.png" | "/css/img/Bing/bing56.png" | "/css/img/Bing/bing57.png" | "/css/img/Bing/bing58.png" | "/css/img/Bing/bing59.png" | "/css/img/Bing/bing6.png" | "/css/img/Bing/bing60.png" | "/css/img/Bing/bing61.png" | "/css/img/Bing/bing62.png" | "/css/img/Bing/bing63.png" | "/css/img/Bing/bing64.png" | "/css/img/Bing/bing65.png" | "/css/img/Bing/bing66.png" | "/css/img/Bing/bing67.png" | "/css/img/Bing/bing68.png" | "/css/img/Bing/bing69.png" | "/css/img/Bing/bing7.png" | "/css/img/Bing/bing70.png" | "/css/img/Bing/bing71.png" | "/css/img/Bing/bing72.png" | "/css/img/Bing/bing73.png" | "/css/img/Bing/bing74.png" | "/css/img/Bing/bing75.png" | "/css/img/Bing/bing76.png" | "/css/img/Bing/bing77.png" | "/css/img/Bing/bing78.png" | "/css/img/Bing/bing79.png" | "/css/img/Bing/bing8.png" | "/css/img/Bing/bing80.png" | "/css/img/Bing/bing81.png" | "/css/img/Bing/bing82.png" | "/css/img/Bing/bing83.png" | "/css/img/Bing/bing84.png" | "/css/img/Bing/bing85.png" | "/css/img/Bing/bing86.png" | "/css/img/Bing/bing87.png" | "/css/img/Bing/bing88.png" | "/css/img/Bing/bing89.png" | "/css/img/Bing/bing9.png" | "/css/img/Bing/bing90.png" | "/css/img/Bing/bing91.png" | "/css/img/Bing/bing92.png" | "/css/img/Bing/bing93.png" | "/css/img/Bing/bing94.png" | "/css/img/Bing/bing95.png" | "/css/img/Bing/bing96.png" | "/css/img/Bing/bing97.png" | "/css/img/Bing/bing98.png" | "/css/img/Bing/bing99.png" | "/css/img/Cinema/Cinema1.png" | "/css/img/Cinema/Cinema10.png" | "/css/img/Cinema/Cinema100.png" | "/css/img/Cinema/Cinema101.png" | "/json/1000-Sentences.json" | "/json/Arabic-Phonetics.json" | "/json/Asti.json" | "/json/Doubt.json" | "/json/Freq/Table of content - 100000ch.json" | "/json/Freq/Table of content - JapFreq.json" | "/json/Freq/ar.json" | "/json/Freq/chinese-japanese-overlap.json" | "/json/Freq/de.json" | "/json/Freq/fr.json" | "/json/Freq/hi.json" | "/json/Freq/it.json" | "/json/Freq/ru.json" | "/json/PoS.json" | "/json/Sentences.json" | "/json/Verb-Tense.json" | "/json/Words.json" | "/json/ar/Downton-Abbey_Cinema-Screenplays-db.json" | "/json/arabic-vocab-enhanced.json" | "/json/ch/epub_content_web-doubt.json" | "/json/ch/epub_content_web-downton.json" | "/json/hi/Downton-Abbey-Cinema-Screenplays-db-hi.json" | "/json/ja/epub_content_web-Downton-abbey.json" | "/json/ru/Downton-Abbey_Cinema-Screenplays-db-ru.json" | "/json/zh/epub_content_web-downton-db.json" | string & {};
	}
}