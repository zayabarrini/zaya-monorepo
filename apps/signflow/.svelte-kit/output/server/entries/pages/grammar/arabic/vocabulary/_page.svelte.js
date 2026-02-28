import "clsx";
import { f as fallback, i as escape_html, j as ensure_array_like, l as attr_style, d as stringify, e as attr, b as bind_props } from "../../../../../chunks/vendor-svelte.js";
function ArabicVocabularyEnhanced($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let categories, categoryCounts;
    let jsonPath = fallback($$props["jsonPath"], "/json/arabic-vocab-enhanced.json");
    let vocabularyData = [];
    let searchTerm = "";
    const categoryIcons = {
      "Arabic nature & weather vocabulary": "🌿",
      "Arabic human body vocabulary": "🧍",
      "Arabic emotions & personality traits vocabulary": "💭",
      "Arabic colors vocabulary": "🎨",
      "Arabic city/transportation vocabulary": "🏙️",
      "Arabic basic verbs": "⚡",
      "Arabic mankind/kinship vocabulary": "👪",
      "Arabic clothing vocabulary": "👕",
      "Arabic education vocabulary": "📚",
      "Arabic food vocabulary": "🍽️",
      "Arabic geography vocabulary": "🌍",
      "Arabic media and the arts vocabulary": "🎭",
      "Arabic medicine vocabulary": "🏥",
      "Arabic religion vocabulary": "🕋",
      "Arabic sports & hobbies vocabulary": "⚽",
      "Arabic technology vocabulary": "💻",
      "Arabic time vocabulary": "⏰",
      "Arabic work/money vocabulary": "💼",
      "Arabic media vocabulary": "📱",
      "Arabic crime and punishment vocabulary": "⚖️",
      "Arabic government and politics vocabulary": "🏛️",
      "Arabic war vocabulary": "⚔️"
    };
    const categoryColors = {
      "Arabic nature & weather vocabulary": { primary: "#047857", secondary: "#10b981" },
      "Arabic human body vocabulary": { primary: "#b45309", secondary: "#d97706" },
      "Arabic emotions & personality traits vocabulary": { primary: "#9d174d", secondary: "#be185d" },
      "Arabic colors vocabulary": { primary: "#6b21a8", secondary: "#7e22ce" },
      "Arabic city/transportation vocabulary": { primary: "#1e40af", secondary: "#2563eb" },
      "Arabic basic verbs": { primary: "#b91c1c", secondary: "#dc2626" },
      "Arabic mankind/kinship vocabulary": { primary: "#92400e", secondary: "#b45309" },
      "Arabic clothing vocabulary": { primary: "#831843", secondary: "#9d174d" },
      "Arabic education vocabulary": { primary: "#065f46", secondary: "#047857" },
      "Arabic food vocabulary": { primary: "#854d0e", secondary: "#a16207" },
      "Arabic geography vocabulary": { primary: "#1e3a8a", secondary: "#1e40af" },
      "Arabic media and the arts vocabulary": { primary: "#6d28d9", secondary: "#7c3aed" },
      "Arabic medicine vocabulary": { primary: "#0e7490", secondary: "#0891b2" },
      "Arabic religion vocabulary": { primary: "#064e3b", secondary: "#065f46" },
      "Arabic sports & hobbies vocabulary": { primary: "#b45309", secondary: "#c2410c" },
      "Arabic technology vocabulary": { primary: "#374151", secondary: "#4b5563" },
      "Arabic time vocabulary": { primary: "#854d0e", secondary: "#a16207" },
      "Arabic work/money vocabulary": { primary: "#166534", secondary: "#15803d" },
      "Arabic media vocabulary": { primary: "#6d28d9", secondary: "#7c3aed" },
      "Arabic crime and punishment vocabulary": { primary: "#991b1b", secondary: "#b91c1c" },
      "Arabic government and politics vocabulary": { primary: "#1e3a8a", secondary: "#1e40af" },
      "Arabic war vocabulary": { primary: "#7f1d1d", secondary: "#991b1b" }
    };
    function getCategoryStyle(category) {
      const colors = categoryColors[category] || { primary: "#4a5568", secondary: "#718096" };
      return `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    }
    function getCategoryCardColor(category) {
      return categoryColors[category]?.primary || "#4a5568";
    }
    categories = [...new Set(vocabularyData.map((item) => item.category))].filter(Boolean).sort();
    categoryCounts = categories.reduce(
      (acc, cat) => {
        acc[cat] = vocabularyData.filter((item) => item.category === cat).length;
        return acc;
      },
      {}
    );
    vocabularyData.filter((item) => item.pos?.includes("noun")).length;
    vocabularyData.filter((item) => item.pos?.includes("verb")).length;
    vocabularyData.filter((item) => item.pos?.includes("adj")).length;
    vocabularyData.filter((item) => item.pos?.includes("particle") || item.pos?.includes("prep")).length;
    $$renderer2.push(`<div class="container mainpage svelte-hx4lca" dir="rtl"><header class="header svelte-hx4lca"><h1 class="svelte-hx4lca">قاموس المفردات العربية المتقدم</h1> <p class="svelte-hx4lca">مجموعة شاملة من المفردات العربية المصنفة حسب المجالات
      - Visual Arabic Dictionary</p></header> <nav class="category-nav svelte-hx4lca"><button class="category-btn all-btn svelte-hx4lca" style="background: linear-gradient(135deg, #4a5568, #718096);"><span class="svelte-hx4lca">🌟</span> <span class="svelte-hx4lca">عرض الكل</span> <span class="category-count svelte-hx4lca">${escape_html(
      // Get category style
      // Get category card color
      // Initialize on mount
      vocabularyData.length
    )}</span></button> <!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button class="category-btn category-specific svelte-hx4lca"${attr_style(`background: ${stringify(getCategoryStyle(category))};`)}><span class="svelte-hx4lca">${escape_html(categoryIcons[category] || "📖")}</span> <span class="category-name svelte-hx4lca">${escape_html(category.replace("Arabic ", "").replace(" vocabulary", ""))}</span> <span class="category-count svelte-hx4lca">${escape_html(categoryCounts[category] || 0)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="search-container svelte-hx4lca"><div class="search-icon svelte-hx4lca">🔍</div> <input type="text" class="search-input svelte-hx4lca" placeholder="ابحث عن كلمة أو معنى..."${attr("value", searchTerm)}/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="stats-container svelte-hx4lca"><div class="stat-item stat-words svelte-hx4lca"><div class="stat-number svelte-hx4lca">${escape_html(vocabularyData.length)}</div> <div class="stat-label svelte-hx4lca">إجمالي الكلمات</div> <div class="stat-icon svelte-hx4lca">📚</div></div> <div class="stat-item stat-categories svelte-hx4lca"><div class="stat-number svelte-hx4lca">${escape_html(categories.length)}</div> <div class="stat-label svelte-hx4lca">التصنيفات</div> <div class="stat-icon svelte-hx4lca">🏷️</div></div> <div class="stat-item stat-egyptian svelte-hx4lca"><div class="stat-number svelte-hx4lca">${escape_html(vocabularyData.filter((w) => w.egyptian).length)}</div> <div class="stat-label svelte-hx4lca">كلمات مصرية</div> <div class="stat-icon svelte-hx4lca">🇪🇬</div></div> <div class="stat-item stat-examples svelte-hx4lca"><div class="stat-number svelte-hx4lca">${escape_html(vocabularyData.filter((w) => w.example && !w.example.includes("مثال:")).length)}</div> <div class="stat-label svelte-hx4lca">أمثلة</div> <div class="stat-icon svelte-hx4lca">💬</div></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-container svelte-hx4lca"><div class="spinner svelte-hx4lca"></div> <p class="svelte-hx4lca">جاري تحميل المفردات...</p></div>`);
    }
    $$renderer2.push(`<!--]--> <footer class="footer svelte-hx4lca"><p class="svelte-hx4lca">قاموس المفردات العربية المتقدم - Enhanced Arabic
      Vocabulary Dictionary</p> <p class="svelte-hx4lca">© 2024 - جميع الحقوق محفوظة</p> <div class="category-preview svelte-hx4lca"><!--[-->`);
    const each_array_2 = ensure_array_like(categories.slice(0, 8));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let category = each_array_2[$$index_2];
      $$renderer2.push(`<div class="preview-icon svelte-hx4lca"${attr_style(`background: ${stringify(getCategoryCardColor(category))}; color: white;`)}>${escape_html(categoryIcons[category] || "📖")}</div>`);
    }
    $$renderer2.push(`<!--]--></div></footer></div>`);
    bind_props($$props, { jsonPath });
  });
}
function _page($$renderer) {
  ArabicVocabularyEnhanced($$renderer, { jsonPath: "/json/arabic-vocab-enhanced.json" });
}
export {
  _page as default
};
