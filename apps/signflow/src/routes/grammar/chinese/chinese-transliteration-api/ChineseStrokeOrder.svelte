<!-- /home/zaya/Downloads/Zayas/zayaslanguage/src/routes/grammar/chinese/chinese-character-stroke-order/+page.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { fade, scale } from "svelte/transition";
  import HanziWriter from "hanzi-writer";
  import { browser } from "$app/environment";

  // Types
  type WriterMap = { [key: string]: any };

  let writers: WriterMap = {};
  let modalWriters: WriterMap = {};
  let isLoading: boolean = false;

  // Common Chinese characters (HSK levels + common characters)
  const commonCharacters: string[] = [
    "的",
    "一",
    "是",
    "不",
    "了",
    "人",
    "我",
    "在",
    "有",
    "他",
    "这",
    "为",
    "之",
    "大",
    "来",
    "以",
    "个",
    "中",
    "上",
    "们",
    "到",
    "说",
    "国",
    "和",
    "地",
    "也",
    "子",
    "时",
    "道",
    "出",
    "而",
    "要",
    "于",
    "就",
    "下",
    "得",
    "可",
    "你",
    "年",
    "生",
    "自",
    "会",
    "那",
    "后",
    "能",
    "对",
    "着",
    "事",
    "其",
    "里",
    "所",
    "去",
    "行",
    "过",
    "家",
    "学",
    "对",
    "起",
    "发",
    "没",
    "成",
    "只",
    "作",
    "当",
    "想",
    "看",
    "文",
    "开",
    "十",
    "三",
    "同",
    "日",
    "进",
    "前",
    "因",
    "体",
    "还",
    "心",
    "合",
    "己",
    "工",
    "使",
    "法",
    "水",
    "性",
    "反",
    "相",
    "二",
    "天",
    "此",
    "面",
    "民",
    "部",
    "理",
    "头",
    "经",
    "战",
    "么",
    "无",
    "革",
    "如",
    "政",
    "主",
    "结",
    "各",
    "知",
    "报",
    "现",
    "回",
    "她",
    "方",
    "制",
    "务",
    "第",
    "物",
    "长",
    "实",
    "深",
    "表",
    "化",
    "等",
    "内",
    "社",
    "加",
    "多",
    "全",
    "两",
    "关",
    "点",
    "也",
    "命",
    "度",
    "利",
    "气",
    "最",
    "新",
    "打",
    "但",
    "本",
    "位",
    "其",
    "把",
    "被",
    "书",
    "电",
    "力",
    "月",
    "立",
    "数",
    "争",
    "无",
    "反",
    "名",
    "所",
    "路",
    "界",
    "便",
    "教",
    "正",
    "任",
    "结",
    "代",
    "次",
    "又",
    "通",
    "但",
    "信",
    "东",
    "儿",
    "十",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "百",
    "千",
    "万",
    "亿",
    "元",
    "角",
    "分",
    "大",
    "小",
    "多",
    "少",
    "长",
    "短",
    "高",
    "低",
    "远",
    "近",
    "快",
    "慢",
    "早",
    "晚",
    "冷",
    "热",
    "好",
    "坏",
    "对",
    "错",
    "新",
    "旧",
    "老",
    "少",
    "男",
    "女",
    "老",
    "幼",
    "父",
    "母",
    "儿",
    "女",
    "哥",
    "姐",
    "弟",
    "妹",
    "爷",
    "奶",
    "你",
    "好",
    "中",
    "国",
    "爱",
    "我",
    "他",
    "她",
    "它",
    "们",
    "这",
    "那",
    "哪",
    "谁",
    "什",
    "么",
    "怎",
    "么",
    "为",
    "什",
    "么",
    "因",
    "为",
    "所",
    "以",
    "但",
    "是",
    "可",
    "是",
    "不",
    "是",
    "也",
    "是",
    "就",
    "是",
    "还",
    "是",
    "真",
    "是",
    "正",
    "是",
    "一",
    "起",
    "一",
    "样",
    "一",
    "共",
    "一",
    "起",
    "一",
    "样",
    "一",
    "共",
    "一",
    "家",
    "学",
    "校",
    "公",
    "司",
    "工",
    "厂",
    "医",
    "院",
    "超",
    "市",
    "商",
    "店",
    "市",
    "场",
    "电",
    "影",
    "电",
    "视",
    "手",
    "机",
    "电",
    "脑",
    "网",
    "络",
    "游",
    "戏",
    "音",
    "乐",
    "运",
    "动",
    "体",
    "育",
    "足",
    "球",
    "篮",
    "球",
    "乒",
    "乓",
    "球",
    "游",
    "泳",
    "跑",
    "步",
    "跳",
    "舞",
    "唱",
    "歌",
    "画",
    "画",
    "写",
    "字",
    "读",
    "书",
    "看",
    "报",
    "听",
    "音",
    "乐",
    "学",
    "习",
    "工",
    "作",
    "休",
    "息",
    "睡",
    "觉",
    "吃",
    "饭",
    "喝",
    "水",
    "洗",
    "澡",
    "刷",
    "牙",
    "洗",
    "脸",
    "穿",
    "衣",
    "服",
    "脱",
    "衣",
    "服",
    "起",
    "床",
    "上",
    "班",
    "下",
    "班",
    "回",
    "家",
    "出",
    "门",
    "进",
    "门",
    "开",
    "门",
    "关",
    "门",
    "坐",
    "下",
    "站",
    "起",
    "来",
    "去",
    "红",
    "黄",
    "蓝",
    "绿",
    "黑",
    "白",
    "灰",
    "紫",
    "粉",
    "橙",
    "棕",
    "金",
    "银",
    "铜",
    "铁",
    "木",
    "水",
    "火",
    "土",
    "石",
    "沙",
    "泥",
    "空",
    "气",
    "风",
    "雨",
    "雪",
    "雷",
    "电",
    "云",
    "太",
    "阳",
    "月",
    "亮",
    "星",
    "星",
    "天",
    "空",
    "地",
    "球",
    "世",
    "界",
    "国",
    "家",
    "城",
    "市",
    "乡",
    "村",
    "山",
    "河",
    "湖",
    "海",
    "江",
    "溪",
    "池",
    "塘",
    "林",
    "树",
    "花",
    "草",
    "猫",
    "狗",
    "鸟",
    "鱼",
    "虫",
    "牛",
    "羊",
    "马",
    "猪",
    "鸡",
    "鸭",
    "鹅",
    "兔",
    "龙",
    "虎",
    "狮",
    "象",
    "熊",
    "猴",
    "鹿",
    "狼",
    "豹",
    "鹰",
    "鸽",
    "雀",
    "燕",
    "蝶",
    "蜂",
    "蚁",
    "蝉",
    "春",
    "夏",
    "秋",
    "冬",
    "年",
    "月",
    "日",
    "时",
    "分",
    "秒",
    "今",
    "天",
    "昨",
    "天",
    "明",
    "天",
    "星",
    "期",
    "周",
    "末",
    "假",
    "期",
    "节",
    "日",
    "生",
    "日",
    "圣",
    "诞",
    "新",
    "年",
    "一",
    "月",
    "二",
    "月",
    "三",
    "月",
    "四",
    "月",
    "五",
    "月",
    "六",
    "月",
    "七",
    "月",
    "八",
    "月",
    "九",
    "月",
    "十",
    "月",
    "十",
    "一",
    "月",
    "十",
    "二",
    "月",
    "星",
    "期",
    "一",
    "星",
    "期",
    "二",
    "星",
    "期",
    "三",
    "星",
    "期",
    "四",
    "星",
    "期",
    "五",
    "星",
    "期",
    "六",
    "星",
    "期",
    "日",
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "百",
    "千"
  ];

  // Remove duplicates
  const demoCharacters: string[] = [
    ...new Set(commonCharacters)
  ];

  // Pagination
  let currentPage: number = 1;
  const charactersPerPage: number = 24;
  let totalPages: number = Math.ceil(
    demoCharacters.length / charactersPerPage
  );

  // Get current page characters
  $: paginatedCharacters = demoCharacters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
  );

  // Modal state
  let showModal: boolean = false;
  let selectedChar: string = "";
  let selectedGlobalIndex: number = 0;

  // Clean up writers for current page
  function cleanupCurrentPageWriters(): void {
    paginatedCharacters.forEach(
      (char: string, localIndex: number) => {
        const globalIndex: number =
          (currentPage - 1) * charactersPerPage +
          localIndex;
        const containerId: string = `char-${globalIndex}`;

        // Destroy the writer if it exists
        if (writers[containerId]) {
          try {
            if (
              typeof writers[containerId].destroy ===
              "function"
            ) {
              writers[containerId].destroy();
            }
          } catch (e) {
            console.error(
              `Failed to destroy writer for ${containerId}`,
              e
            );
          }
          delete writers[containerId];
        }
      }
    );
  }

  // Initialize writers when component mounts or page changes
  onMount(() => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initializeWriters();
    }, 100);
  });

  // Re-initialize writers when page changes
  afterUpdate(() => {
    // Clean up old writers first
    cleanupCurrentPageWriters();

    // Small delay to ensure DOM is updated
    setTimeout(() => {
      initializeWriters();
    }, 100);
  });

  function initializeWriters(): void {
    // Initialize grid writers for current page
    paginatedCharacters.forEach(
      (char: string, localIndex: number) => {
        const globalIndex: number =
          (currentPage - 1) * charactersPerPage +
          localIndex;
        const containerId: string = `char-${globalIndex}`;
        const container: HTMLElement | null =
          document.getElementById(containerId);

        if (container) {
          // Clear container first (prevents duplicate writers)
          container.innerHTML = "";

          try {
            // Create writer - it will automatically fetch from CDN
            const writer = HanziWriter.create(
              container,
              char,
              {
                width: 150,
                height: 150,
                padding: 5,
                strokeAnimationSpeed: 1,
                strokeColor: "#333333",
                radicalColor: "#E53E3E",
                showOutline: true,
                showCharacter: false,
                delayBetweenStrokes: 100
              }
            );

            writers[containerId] = writer;

            // Log for debugging
            console.log(
              `Created writer for ${char} at ${containerId}`
            );
          } catch (e) {
            console.error(
              `Failed to create writer for ${char}`,
              e
            );

            // Show error in the container
            container.innerHTML = `
              <div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #e53e3e; font-size: 0.8rem; text-align: center;">
                Failed to load<br>${char}
              </div>
            `;
          }
        }
      }
    );
  }

  // Initialize modal writers lazily
  function initializeModalWriter(
    globalIndex: number,
    char: string
  ): any {
    const modalContainerId: string = `modal-char-${globalIndex}`;
    const modalContainer: HTMLElement | null =
      document.getElementById(modalContainerId);

    if (modalContainer) {
      // Destroy existing writer if it exists
      if (modalWriters[modalContainerId]) {
        try {
          if (
            typeof modalWriters[modalContainerId]
              .destroy === "function"
          ) {
            modalWriters[modalContainerId].destroy();
          }
        } catch (e) {
          console.error(
            `Failed to destroy modal writer for ${modalContainerId}`,
            e
          );
        }
        delete modalWriters[modalContainerId];
      }

      modalContainer.innerHTML = "";

      try {
        const writer = HanziWriter.create(
          modalContainer,
          char,
          {
            width: 300,
            height: 300,
            padding: 10,
            strokeAnimationSpeed: 0.8,
            strokeColor: "#333333",
            radicalColor: "#E53E3E",
            showOutline: true,
            showCharacter: false,
            delayBetweenStrokes: 80
          }
        );

        modalWriters[modalContainerId] = writer;
        return writer;
      } catch (e) {
        console.error(
          `Failed to create modal writer for ${char}`,
          e
        );

        modalContainer.innerHTML = `
          <div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #e53e3e; font-size: 1rem; text-align: center;">
            Failed to load<br>${char}
          </div>
        `;
      }
    }
    return modalWriters[modalContainerId];
  }

  // Handle page change
  function changePage(newPage: number): void {
    if (newPage < 1 || newPage > totalPages) return;

    // Clean up current page writers before changing page
    cleanupCurrentPageWriters();

    currentPage = newPage;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Animate all characters on current page
  function animateAll(): void {
    paginatedCharacters.forEach(
      (char: string, localIndex: number) => {
        const globalIndex: number =
          (currentPage - 1) * charactersPerPage +
          localIndex;
        const containerId: string = `char-${globalIndex}`;
        if (writers[containerId]) {
          writers[containerId].animateCharacter();
        }
      }
    );
  }

  // Open modal with selected character
  function openModal(
    char: string,
    globalIndex: number
  ): void {
    selectedChar = char;
    selectedGlobalIndex = globalIndex;
    showModal = true;

    // Small delay to ensure modal is rendered before animating
    setTimeout(() => {
      const writer = initializeModalWriter(
        globalIndex,
        char
      );
      if (writer) {
        writer.animateCharacter();
      }
    }, 100);
  }

  // Close modal
  function closeModal(): void {
    showModal = false;
  }

  // Handle escape key
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  // Handle click outside
  function handleModalClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      closeModal();
    }
  }

  // Get global index for a character
  function getGlobalIndex(localIndex: number): number {
    return (
      (currentPage - 1) * charactersPerPage + localIndex
    );
  }
</script>

<svelte:head>
  <title>Chinese Strokes - Demo</title>
</svelte:head>

<main
  class="container"
  on:keydown={handleKeyDown}
  tabindex="0"
  role="main"
>
  <h1>Chinese Character Stroke Order</h1>
  <p class="subtitle">
    Total characters: {demoCharacters.length} • Page {currentPage}
    of {totalPages}
  </p>

  <div class="controls">
    <button
      on:click={animateAll}
      class="animate-btn"
      type="button"
    >
      ▶ Animate Current Page ({paginatedCharacters.length} characters)
    </button>
  </div>

  <div class="characters-grid">
    {#each paginatedCharacters as char, localIndex (localIndex)}
      {@const globalIndex = getGlobalIndex(localIndex)}
      <button
        class="character-card"
        on:click={() => openModal(char, globalIndex)}
        type="button"
        aria-label={`View stroke order for character ${char}`}
      >
        <div class="character-header">
          <span class="character-main" aria-hidden="true"
            >{char}</span
          >
        </div>

        <div class="character-container-wrapper">
          <div
            id={`char-${globalIndex}`}
            class="character-container"
            aria-label={`Stroke order animation for ${char}`}
            role="img"
          ></div>
        </div>

        <div class="char-info">
          {char} • {globalIndex + 1}/{demoCharacters.length} •
          U+{char
            .codePointAt(0)
            ?.toString(16)
            .toUpperCase()
            .padStart(4, "0")}
        </div>
      </button>
    {/each}
  </div>

  <!-- Pagination Controls -->
  <div class="pagination">
    <button
      class="page-btn"
      on:click={() => changePage(1)}
      disabled={currentPage === 1}
      type="button"
    >
      ⏮ First
    </button>

    <button
      class="page-btn"
      on:click={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
      type="button"
    >
      ← Previous
    </button>

    <span class="page-info" aria-live="polite">
      Page {currentPage} of {totalPages}
    </span>

    <button
      class="page-btn"
      on:click={() => changePage(currentPage + 1)}
      disabled={currentPage === totalPages}
      type="button"
    >
      Next →
    </button>

    <button
      class="page-btn"
      on:click={() => changePage(totalPages)}
      disabled={currentPage === totalPages}
      type="button"
    >
      Last ⏭
    </button>
  </div>

  <!-- Modal -->
  {#if showModal}
    <div
      class="modal-overlay"
      on:click={handleModalClick}
      on:keydown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`Stroke order for character ${selectedChar}`}
      tabindex="-1"
      transition:fade={{ duration: 200 }}
    >
      <div
        class="modal-content"
        transition:scale={{ duration: 200 }}
      >
        <button
          class="modal-close"
          on:click={closeModal}
          type="button"
          aria-label="Close modal"
        >
          ×
        </button>

        <div class="modal-header">
          <span class="modal-character" aria-hidden="true"
            >{selectedChar}</span
          >
          <span class="modal-unicode">
            U+{selectedChar
              .codePointAt(0)
              ?.toString(16)
              .toUpperCase()
              .padStart(4, "0")}
          </span>
        </div>

        <div class="modal-animation-container">
          <div
            id={`modal-char-${selectedGlobalIndex}`}
            class="modal-character-container"
            aria-label={`Stroke order animation for ${selectedChar}`}
            role="img"
          ></div>
        </div>

        <div class="modal-controls">
          <button
            class="modal-animate-btn"
            on:click={() => {
              const writer =
                modalWriters[
                  `modal-char-${selectedGlobalIndex}`
                ];
              if (writer) {
                writer.animateCharacter();
              } else {
                const newWriter = initializeModalWriter(
                  selectedGlobalIndex,
                  selectedChar
                );
                if (newWriter) {
                  setTimeout(
                    () => newWriter.animateCharacter(),
                    50
                  );
                }
              }
            }}
            type="button"
          >
            ▶ Replay Animation
          </button>
        </div>

        <div class="modal-info">
          <p>
            Click on the character to see the stroke order
            animation.
          </p>
          <p>The red color shows the radical component.</p>
          <p class="api-note">
            Character data loaded from HanziWriter CDN
          </p>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    outline: none;
  }

  h1 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .subtitle {
    text-align: center;
    color: #718096;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  .controls {
    text-align: center;
    margin-bottom: 2rem;
  }

  .animate-btn {
    background: #4299e1;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .animate-btn:hover {
    background: #3182ce;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
  }

  .animate-btn:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }

  .characters-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 2rem;
    justify-items: center;
    margin-bottom: 2rem;
  }

  .character-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    width: 100%;
    max-width: 250px;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    cursor: pointer;
    border: none;
    text-align: left;
    font-family: inherit;
  }

  .character-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }

  .character-card:active {
    transform: translateY(-2px);
  }

  .character-card:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .character-header {
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .character-main {
    font-size: 2rem;
    font-weight: 600;
    color: #2d3748;
  }

  .character-container-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 160px;
  }

  .character-container {
    width: 150px;
    height: 150px;
  }

  .char-info {
    text-align: center;
    font-size: 0.8rem;
    color: #718096;
    margin-top: 0.5rem;
    font-family: monospace;
  }

  /* Pagination Styles */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    padding: 1rem;
    flex-wrap: wrap;
  }

  .page-btn {
    background: #edf2f7;
    color: #2d3748;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .page-btn:hover:not(:disabled) {
    background: #e2e8f0;
    transform: translateY(-2px);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .page-info {
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
    padding: 0 0.5rem;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: white;
    border-radius: 1.5rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #718096;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
    line-height: 1;
  }

  .modal-close:hover {
    background: #f7fafc;
    color: #2d3748;
    transform: rotate(90deg);
  }

  .modal-close:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .modal-header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }

  .modal-character {
    font-size: 4rem;
    font-weight: 600;
    color: #2d3748;
    display: block;
    line-height: 1.2;
  }

  .modal-unicode {
    font-size: 0.9rem;
    color: #718096;
    font-family: monospace;
  }

  .modal-animation-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    background: #f7fafc;
    border-radius: 1rem;
    padding: 1rem;
  }

  .modal-character-container {
    width: 300px;
    height: 300px;
  }

  .modal-controls {
    text-align: center;
    margin: 1.5rem 0;
  }

  .modal-animate-btn {
    background: #48bb78;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .modal-animate-btn:hover {
    background: #38a169;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(72, 187, 120, 0.2);
  }

  .modal-animate-btn:focus-visible {
    outline: 2px solid #48bb78;
    outline-offset: 2px;
  }

  .modal-info {
    text-align: center;
    color: #718096;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
    margin-top: 0.5rem;
  }

  .modal-info p {
    margin: 0.25rem 0;
  }

  .api-note {
    font-size: 0.8rem;
    color: #a0aec0;
    margin-top: 0.5rem;
  }

  @media (max-width: 640px) {
    .container {
      padding: 1rem;
    }

    .characters-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .character-card {
      max-width: 100%;
    }

    .modal-content {
      padding: 1.5rem;
    }

    .modal-character-container {
      width: 250px;
      height: 250px;
    }

    .modal-character {
      font-size: 3rem;
    }

    .pagination {
      gap: 0.25rem;
    }

    .page-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }
  }
</style>
