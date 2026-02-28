import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/blog/posts/[slug]" | "/cinema" | "/courses" | "/debug" | "/favorite-movies" | "/frequency" | "/frequency/[language]" | "/grammar" | "/grammar/arabic" | "/grammar/arabic/advanced-sentences" | "/grammar/arabic/conjugation" | "/grammar/arabic/doubt" | "/grammar/arabic/endings" | "/grammar/arabic/nouns-adjectives" | "/grammar/arabic/pronominal-composition" | "/grammar/arabic/science" | "/grammar/arabic/sentences" | "/grammar/arabic/songs" | "/grammar/arabic/spelling" | "/grammar/arabic/spelling-words" | "/grammar/arabic/vocabulary" | "/grammar/chinese/chinese-character-stroke-order" | "/grammar/chinese/chinese-character-stroke-search" | "/grammar/chinese/chinese-syntax" | "/grammar/chinese/chinese-syntax-improved" | "/grammar/chinese/chinese-transliteration" | "/grammar/chinese/chinese-transliteration-simple" | "/grammar/hindi" | "/grammar/hindi/pronominal-composition" | "/grammar/hindi/songs" | "/grammar/hindi/spelling" | "/grammar/japanese/pronominal-composition" | "/grammar/languages-test" | "/grammar/russian" | "/grammar/russian/pronominal-composition" | "/grammar/russian/russian-declensions" | "/grammar/russian/science" | "/grammar/russian/songs" | "/grammar/science" | "/list" | "/melancholic-machines" | "/posts" | "/sentences" | "/transliteration" | "/words" | null
type LayoutParams = RouteParams & { slug?: string; language?: string }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageLoad<OutputData extends OutputDataShape<PageParentData> = OutputDataShape<PageParentData>> = Kit.Load<RouteParams, PageServerData, PageParentData, OutputData, RouteId>;
export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Expand<Omit<PageParentData, keyof Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+page.js').load>>>> & OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+page.js').load>>>>>>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutLoad<OutputData extends OutputDataShape<LayoutParentData> = OutputDataShape<LayoutParentData>> = Kit.Load<LayoutParams, LayoutServerData, LayoutParentData, OutputData, LayoutRouteId>;
export type LayoutLoadEvent = Parameters<LayoutLoad>[0];
export type LayoutData = Expand<Omit<LayoutParentData, keyof Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+layout.js').load>>>> & OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+layout.js').load>>>>>>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }