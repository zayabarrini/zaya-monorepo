export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38'),
	() => import('./nodes/39'),
	() => import('./nodes/40'),
	() => import('./nodes/41'),
	() => import('./nodes/42'),
	() => import('./nodes/43'),
	() => import('./nodes/44'),
	() => import('./nodes/45'),
	() => import('./nodes/46'),
	() => import('./nodes/47')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/blog/posts/[slug]": [3],
		"/cinema": [4],
		"/courses": [5],
		"/debug": [6],
		"/favorite-movies": [7],
		"/frequency": [8],
		"/frequency/[language]": [9],
		"/grammar": [10],
		"/grammar/arabic": [11],
		"/grammar/arabic/advanced-sentences": [12],
		"/grammar/arabic/conjugation": [13],
		"/grammar/arabic/doubt": [14],
		"/grammar/arabic/endings": [15],
		"/grammar/arabic/nouns-adjectives": [16],
		"/grammar/arabic/pronominal-composition": [17],
		"/grammar/arabic/science": [18],
		"/grammar/arabic/sentences": [19],
		"/grammar/arabic/songs": [20],
		"/grammar/arabic/spelling-words": [22],
		"/grammar/arabic/spelling": [21],
		"/grammar/arabic/vocabulary": [23],
		"/grammar/chinese/chinese-character-stroke-order": [24],
		"/grammar/chinese/chinese-character-stroke-search": [25],
		"/grammar/chinese/chinese-syntax-improved": [27],
		"/grammar/chinese/chinese-syntax": [26],
		"/grammar/chinese/chinese-transliteration-simple": [29],
		"/grammar/chinese/chinese-transliteration": [28],
		"/grammar/hindi": [30],
		"/grammar/hindi/pronominal-composition": [31],
		"/grammar/hindi/songs": [32],
		"/grammar/hindi/spelling": [33],
		"/grammar/japanese/pronominal-composition": [34],
		"/grammar/languages-test": [35],
		"/grammar/russian": [36],
		"/grammar/russian/pronominal-composition": [37],
		"/grammar/russian/russian-declensions": [38],
		"/grammar/russian/science": [39],
		"/grammar/russian/songs": [40],
		"/grammar/science": [41],
		"/list": [42],
		"/melancholic-machines": [43],
		"/posts": [44],
		"/sentences": [45],
		"/transliteration": [46],
		"/words": [47]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';