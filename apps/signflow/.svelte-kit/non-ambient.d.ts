
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
		RouteId(): "/" | "/api" | "/api/filter" | "/api/frequency" | "/api/frequency/[language]" | "/api/home" | "/api/posts" | "/api/sentences" | "/api/translate" | "/api/words" | "/blog" | "/blog/posts" | "/blog/posts/[slug]" | "/cinema" | "/courses" | "/debug" | "/favorite-movies" | "/frequency" | "/frequency/[language]" | "/grammar" | "/grammar/arabic" | "/grammar/arabic/advanced-sentences" | "/grammar/arabic/arabic-transliteration-api" | "/grammar/arabic/conjugation" | "/grammar/arabic/doubt" | "/grammar/arabic/endings" | "/grammar/arabic/nouns-adjectives" | "/grammar/arabic/pronominal-composition" | "/grammar/arabic/science" | "/grammar/arabic/sentences" | "/grammar/arabic/songs" | "/grammar/arabic/spelling-words" | "/grammar/arabic/spelling" | "/grammar/arabic/vocabulary" | "/grammar/chinese" | "/grammar/chinese/chinese-character-stroke-order" | "/grammar/chinese/chinese-character-stroke-search" | "/grammar/chinese/chinese-syntax-improved" | "/grammar/chinese/chinese-syntax" | "/grammar/chinese/chinese-transliteration-api" | "/grammar/chinese/chinese-transliteration-simple" | "/grammar/chinese/chinese-transliteration" | "/grammar/hindi" | "/grammar/hindi/hindi-transliteration-api" | "/grammar/hindi/pronominal-composition" | "/grammar/hindi/songs" | "/grammar/hindi/spelling" | "/grammar/japanese" | "/grammar/japanese/japanese-transliteration" | "/grammar/japanese/pronominal-composition" | "/grammar/languages-test" | "/grammar/russian" | "/grammar/russian/pronominal-composition" | "/grammar/russian/russian-declensions" | "/grammar/russian/russian-transliteration-api" | "/grammar/russian/science" | "/grammar/russian/songs" | "/grammar/science" | "/list" | "/melancholic-machines" | "/posts" | "/sentences" | "/transliteration" | "/words";
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
		Pathname(): "/" | "/api/filter" | `/api/frequency/${string}` & {} | "/api/home" | "/api/posts" | "/api/sentences" | "/api/translate" | "/api/words" | `/blog/posts/${string}` & {} | "/cinema" | "/courses" | "/debug" | "/favorite-movies" | "/frequency" | `/frequency/${string}` & {} | "/grammar" | "/grammar/arabic" | "/grammar/arabic/advanced-sentences" | "/grammar/arabic/arabic-transliteration-api" | "/grammar/arabic/conjugation" | "/grammar/arabic/doubt" | "/grammar/arabic/endings" | "/grammar/arabic/nouns-adjectives" | "/grammar/arabic/pronominal-composition" | "/grammar/arabic/science" | "/grammar/arabic/sentences" | "/grammar/arabic/songs" | "/grammar/arabic/spelling-words" | "/grammar/arabic/spelling" | "/grammar/arabic/vocabulary" | "/grammar/chinese/chinese-character-stroke-order" | "/grammar/chinese/chinese-character-stroke-search" | "/grammar/chinese/chinese-syntax-improved" | "/grammar/chinese/chinese-syntax" | "/grammar/chinese/chinese-transliteration-api" | "/grammar/chinese/chinese-transliteration-simple" | "/grammar/chinese/chinese-transliteration" | "/grammar/hindi" | "/grammar/hindi/hindi-transliteration-api" | "/grammar/hindi/pronominal-composition" | "/grammar/hindi/songs" | "/grammar/hindi/spelling" | "/grammar/japanese/japanese-transliteration" | "/grammar/japanese/pronominal-composition" | "/grammar/languages-test" | "/grammar/russian" | "/grammar/russian/pronominal-composition" | "/grammar/russian/russian-declensions" | "/grammar/russian/russian-transliteration-api" | "/grammar/russian/science" | "/grammar/russian/songs" | "/grammar/science" | "/list" | "/melancholic-machines" | "/posts" | "/sentences" | "/transliteration" | "/words";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/json/1000-Sentences.json" | "/json/Arabic-Phonetics.json" | "/json/Asti.json" | "/json/Doubt.json" | "/json/Freq/Table of content - 100000ch.json" | "/json/Freq/Table of content - JapFreq.json" | "/json/Freq/ar.json" | "/json/Freq/chinese-japanese-overlap.json" | "/json/Freq/de.json" | "/json/Freq/fr.json" | "/json/Freq/hi.json" | "/json/Freq/it.json" | "/json/Freq/ru.json" | "/json/PoS.json" | "/json/Sentences.json" | "/json/Verb-Tense.json" | "/json/Words.json" | "/json/ar/Downton-Abbey_Cinema-Screenplays-db.json" | "/json/arabic-vocab-enhanced.json" | "/json/ch/epub_content_web-doubt.json" | "/json/ch/epub_content_web-downton.json" | "/json/hi/Downton-Abbey-Cinema-Screenplays-db-hi.json" | "/json/ja/epub_content_web-Downton-abbey.json" | "/json/ru/Downton-Abbey_Cinema-Screenplays-db-ru.json" | "/json/zh/epub_content_web-downton-db.json" | string & {};
	}
}