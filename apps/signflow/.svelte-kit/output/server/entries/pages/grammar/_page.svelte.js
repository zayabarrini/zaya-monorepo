import { j as ensure_array_like, i as escape_html, e as attr } from "../../../chunks/vendor-svelte.js";
import { I as IconLink } from "../../../chunks/IconLink.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const grammarRoutes = [
      {
        title: "Arabic Verb Conjugation Table",
        href: "/grammar/arabic/conjugation",
        description: "Comprehensive verb conjugation tool with tenses and forms",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Arabic Noun & Adjective Conjugation",
        href: "/grammar/arabic/nouns-adjectives",
        description: "Declension tables for nouns and adjectives",
        icon: "🔤",
        category: "Grammar"
      },
      {
        title: "Arabic Pronominal Composition",
        href: "/grammar/arabic/pronominal-composition",
        description: "Learn how pronouns combine with verbs and prepositions",
        icon: "🔗",
        category: "Grammar"
      },
      {
        title: "Arabic Syntax Analysis",
        href: "/grammar/arabic/sentences",
        description: "Color-coded sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Arabic Spelling",
        href: "/grammar/arabic/spelling",
        description: "Spelling rules and common mistakes in Arabic",
        icon: "✍️",
        category: "Syntax"
      },
      {
        title: "Arabic Spelling Words",
        href: "/grammar/arabic/spelling-words",
        description: "Spelling rules and common mistakes in Arabic",
        icon: "✍️",
        category: "Syntax"
      },
      {
        title: "Arabic Science",
        href: "/grammar/arabic/science",
        description: "Logic, Math, Physics terminology and grammar",
        icon: "🔬",
        category: "Syntax"
      },
      {
        title: "Arabic Advanced Sentences Syntax Analysis",
        href: "/grammar/arabic/advanced-sentences",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Arabic Grammatical Endings",
        href: "/grammar/arabic/endings",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Arabic Vocabulary",
        href: "/grammar/arabic/vocabulary",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Arabic Songs Lyrics",
        href: "/grammar/arabic/songs",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Arabic Doubt Words",
        href: "/grammar/arabic/doubt",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Russian Noun Declensions",
        href: "/grammar/russian/russian-declensions",
        description: "Color-coded tables for Russian noun declensions",
        icon: "📚",
        category: "Grammar"
      },
      {
        title: "Russian Pronominal Composition",
        href: "/grammar/russian/pronominal-composition",
        description: "Color-coded tables for Russian pronoun composition",
        icon: "📚",
        category: "Grammar"
      },
      {
        title: "Russian Sentence Builder",
        href: "/grammar/russian",
        description: "Interactive tool to construct Russian sentences",
        icon: "🏗️",
        category: "Syntax"
      },
      {
        title: "Russian Science Builder",
        href: "/grammar/russian/science",
        description: "Interactive tool to construct Russian Science",
        icon: "🏗️",
        category: "Syntax"
      },
      {
        title: "Russian Songs Lyrics",
        href: "/grammar/russian/songs",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Hindi Sentence Builder",
        href: "/grammar/hindi",
        description: "Interactive tool to construct Hindi sentences",
        icon: "🏗️",
        category: "Syntax"
      },
      {
        title: "Hindi Pronominal Composition",
        href: "/grammar/hindi/pronominal-composition",
        description: "Comprehensive Hindi verb conjugation tool",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Hindi Songs Lyrics",
        href: "/grammar/hindi/songs",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Hindi Spelling Words",
        href: "/grammar/hindi/spelling",
        description: "Color-coded advanced sentence structure analysis",
        icon: "🎨",
        category: "Syntax"
      },
      {
        title: "Japanese Pronominal Composition",
        href: "/grammar/japanese/pronominal-composition",
        description: "Comprehensive Japanese pronoun composition tool",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Chinese Verb Conjugation Table",
        href: "/grammar/chinese/chinese-syntax",
        description: "Comprehensive Chinese verb conjugation tool",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Chinese Improved Syntax Analyzer",
        href: "/grammar/chinese/chinese-syntax-improved",
        description: "Enhanced Chinese syntax analysis tool",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Chinese Character Stroke Order",
        href: "/grammar/chinese/chinese-character-stroke-order",
        description: "Interactive Chinese character stroke order visualization",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Search Chinese Character Stroke Order",
        href: "/grammar/chinese/chinese-character-stroke-search",
        description: "Search Chinese character stroke order visualization",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Chinese Transliteration - Doubt Version",
        href: "/grammar/chinese/chinese-transliteration",
        description: "Enhanced Chinese transliteration tool with doubt annotations",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Word Lists",
        href: "/words",
        description: "Enhanced Word Lists tool",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Word Frequency",
        href: "/frequency",
        description: "Enhanced Word Frequency Lists",
        icon: "📘",
        category: "Grammar"
      },
      {
        title: "Sentence Lists",
        href: "/sentences",
        description: "Enhanced Sentence Lists tool",
        icon: "📘",
        category: "Grammar"
      }
    ];
    const mainRoutes = [
      {
        title: "Psychoanalysis",
        href: "/list?query=Psychoanalysis",
        icon: "🧠",
        variant: "ghost"
      },
      { title: "Cards", href: "/posts", icon: "📝", variant: "ghost" },
      {
        title: "Languages",
        href: "/list?query=Languages",
        icon: "🌐",
        variant: "ghost"
      }
    ];
    $$renderer2.push(`<div class="container min-h-screen margin-top-header mainpage svelte-oj2vfa"><header class="contents max-w-6xl mx-auto mb-12 svelte-oj2vfa"><div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 svelte-oj2vfa"><a href="/" class="group flex items-center gap-3 no-underline self-start svelte-oj2vfa"><div class="relative svelte-oj2vfa"><div class="w-12 h-12 flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 svelte-oj2vfa"><span class="text-white font-bold text-lg svelte-oj2vfa">Z</span></div></div> <div class="flex flex-col svelte-oj2vfa"><span class="zaya notranslate text-2xl font-bold text-gray-900 tracking-tight svelte-oj2vfa">Zaya Barrini</span> <span class="text-gray-600 text-sm font-medium mt-1 svelte-oj2vfa">Language &amp; Psychoanalysis</span></div></a> <nav class="flex flex-wrap gap-3 svelte-oj2vfa"><!--[-->`);
    const each_array = ensure_array_like(mainRoutes);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let route = each_array[$$index];
      IconLink($$renderer2, {
        href: route.href,
        class: "px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:shadow-md",
        children: ($$renderer3) => {
          $$renderer3.push(`<span class="mr-2 svelte-oj2vfa">${escape_html(route.icon)}</span> ${escape_html(route.title)}`);
        },
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!--]--></nav></div> <div class="rounded-2xl p-8 dark:text-white shadow-xl mb-12 hero svelte-oj2vfa"><div class="max-w-3xl svelte-oj2vfa"><h1 class="text-4xl md:text-5xl font-bold mb-4 svelte-oj2vfa">Language Grammar Toolkit</h1> <p class="text-xl mb-6 svelte-oj2vfa">Interactive tools and comprehensive references for
          mastering grammar, syntax, and linguistic analysis</p> <div class="flex items-center gap-4 svelte-oj2vfa"><div class="flex items-center gap-2 svelte-oj2vfa"><div class="w-3 h-3 bg-green-400 rounded-full animate-pulse svelte-oj2vfa"></div> <span class="text-sm font-medium svelte-oj2vfa">All tools are interactive</span></div> <div class="flex items-center gap-2 svelte-oj2vfa"><div class="w-3 h-3 bg-yellow-400 rounded-full svelte-oj2vfa"></div> <span class="text-sm font-medium svelte-oj2vfa">Color-coded analysis</span></div></div></div></div></header> <main class="max-w-6xl mx-auto svelte-oj2vfa"><section class="mb-16 svelte-oj2vfa"><div class="flex items-center justify-between mb-8 svelte-oj2vfa"><div class="svelte-oj2vfa"><h2 class="text-3xl font-bold text-gray-900 mb-2 svelte-oj2vfa">Grammar Tools</h2> <p class="text-gray-600 svelte-oj2vfa">Interactive tables and analysis tools for Arabic
            grammar</p></div> <div class="hidden md:block svelte-oj2vfa"><span class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold svelte-oj2vfa">${escape_html(grammarRoutes.length)} Tools Available</span></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 svelte-oj2vfa"><!--[-->`);
    const each_array_1 = ensure_array_like(grammarRoutes);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let route = each_array_1[i];
      $$renderer2.push(`<a${attr("href", route.href)} class="group relative rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 overflow-hidden svelte-oj2vfa"><div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 svelte-oj2vfa"></div> <div class="flex items-start gap-4 svelte-oj2vfa"><div class="flex-shrink-0 svelte-oj2vfa"><div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 svelte-oj2vfa">${escape_html(route.icon)}</div></div> <div class="flex-1 svelte-oj2vfa"><div class="flex items-center justify-between mb-2 svelte-oj2vfa"><h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 svelte-oj2vfa">${escape_html(route.title)}</h3> <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 svelte-oj2vfa" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" class="svelte-oj2vfa"></path></svg></div> <p class="text-gray-600 mb-4 svelte-oj2vfa">${escape_html(route.description)}</p> <div class="flex items-center justify-between svelte-oj2vfa"><span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium svelte-oj2vfa">${escape_html(route.category)}</span> <span class="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200 svelte-oj2vfa">Explore tool →</span></div></div></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="mb-12 svelte-oj2vfa"><h3 class="text-2xl font-bold text-gray-900 mb-6 svelte-oj2vfa">Quick Access</h3> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 svelte-oj2vfa"><!--[-->`);
    const each_array_2 = ensure_array_like(grammarRoutes);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let route = each_array_2[$$index_2];
      $$renderer2.push(`<a${attr("href", route.href)} class="group border border-black-700 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex items-center gap-3 svelte-oj2vfa"><div class="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-lg svelte-oj2vfa">${escape_html(route.icon)}</div> <div class="flex-1 min-w-0 svelte-oj2vfa"><div class="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 svelte-oj2vfa">${escape_html(route.title.split(" ").slice(-2).join(" "))}</div> <div class="text-xs text-gray-500 truncate svelte-oj2vfa">${escape_html(route.category)}</div></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <div class="text-center py-8 border-t border-gray-200 svelte-oj2vfa"><p class="text-gray-500 text-sm svelte-oj2vfa">Need help with any of these tools? <a href="/contact" class="text-blue-600 hover:text-blue-800 font-medium ml-1 svelte-oj2vfa">Contact for support →</a></p></div></main></div>`);
  });
}
export {
  _page as default
};
