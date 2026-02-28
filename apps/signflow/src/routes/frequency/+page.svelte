<!-- src/routes/frequency/+page.svelte -->
<script lang="ts">
  import {
    FREQUENCY_LANGUAGES,
    type FrequencyLanguage
  } from "$lib/languages";

  export const prerender = false;

  // Convert to array for display
  const frequencyLanguages = Object.entries(
    FREQUENCY_LANGUAGES
  ).map(([code, info]) => ({
    code: code as FrequencyLanguage,
    name: info.en,
    native: info.native,
    flag: info.flag,
    direction: info.direction,
    fileName: info.fileName,
    estimatedWords: 10000 // All your frequency files have ~10k words
  }));

  // Stats for display
  const stats = {
    totalLanguages: frequencyLanguages.length,
    totalWords: frequencyLanguages.length * 10000,
    mostCommonLanguage: "Chinese", // Based on your overlap file
    lastUpdated: "2024"
  };
</script>

<svelte:head>
  <title>Word Frequency Lists</title>
  <meta
    name="description"
    content="Most common words in multiple languages with English translations. Perfect for language learners!"
  />
</svelte:head>

<div class="container">
  <header class="frequency-header">
    <h1>Word Frequency Lists</h1>
    <p class="subtitle">
      Learn the most common words in each language.
      Mastering these gives you ~80% understanding of
      everyday text.
    </p>

    <div class="header-stats">
      <div class="stat-card">
        <div class="stat-number">
          {stats.totalLanguages}
        </div>
        <div class="stat-label">Languages</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">
          {stats.totalWords.toLocaleString()}
        </div>
        <div class="stat-label">Total Words</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">10k</div>
        <div class="stat-label">Words per Language</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">80%</div>
        <div class="stat-label">Text Coverage</div>
      </div>
    </div>
  </header>

  <main class="frequency-main">
    <div class="intro-section">
      <h2>Why Learn Frequency Lists?</h2>
      <div class="intro-grid">
        <div class="intro-card">
          <div class="intro-icon">🚀</div>
          <h3>Efficient Learning</h3>
          <p>
            Focus on words you'll actually encounter. The
            top 1000 words cover about 80% of everyday
            conversation.
          </p>
        </div>
        <div class="intro-card">
          <div class="intro-icon">📈</div>
          <h3>Quick Progress</h3>
          <p>
            See immediate results as you recognize more
            words in books, movies, and conversations.
          </p>
        </div>
        <div class="intro-card">
          <div class="intro-icon">🎯</div>
          <h3>Smart Practice</h3>
          <p>
            Each word includes English translation and
            frequency data to prioritize your study.
          </p>
        </div>
        <div class="intro-card">
          <div class="intro-icon">🔍</div>
          <h3>Search & Filter</h3>
          <p>
            Find specific words, filter by rank, and sort by
            frequency or alphabetically.
          </p>
        </div>
      </div>
    </div>

    <div class="languages-section">
      <h2>Available Languages</h2>
      <p class="section-subtitle">
        Click any language to explore its most common words
        with English translations
      </p>

      <div class="languages-grid">
        {#each frequencyLanguages as lang}
          <a
            href="/frequency/{lang.code}"
            class="language-card"
          >
            <div class="card-header">
              <div class="language-flag">{lang.flag}</div>
              <div class="language-names">
                <h3>{lang.name}</h3>
                <div class="native-name">{lang.native}</div>
              </div>
            </div>

            <div class="card-content">
              <p>
                Top {lang.estimatedWords.toLocaleString()} most
                frequent words
              </p>

              <div class="language-stats">
                <div class="stat-item">
                  <span class="stat-label">Words:</span>
                  <span class="stat-value"
                    >{lang.estimatedWords.toLocaleString()}</span
                  >
                </div>
                <div class="stat-item">
                  <span class="stat-label">Direction:</span>
                  <span class="stat-value"
                    >{lang.direction.toUpperCase()}</span
                  >
                </div>
              </div>

              <div class="coverage-meter">
                <div class="meter-label">Text Coverage</div>
                <div class="meter-bar">
                  <div
                    class="meter-fill"
                    style="width: 80%"
                    aria-label="80% text coverage"
                  ></div>
                </div>
                <div class="meter-stats">
                  <span>Top 1000: 70%</span>
                  <span>Top 5000: 90%</span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <span class="view-link"
                >Explore Frequency List →</span
              >
            </div>
          </a>
        {/each}
      </div>
    </div>

    <div class="how-to-section">
      <h2>How to Use These Lists</h2>
      <div class="instructions">
        <div class="instruction-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Choose Your Target Language</h3>
            <p>
              Select a language you want to learn or
              improve. Start with languages similar to ones
              you already know.
            </p>
          </div>
        </div>
        <div class="instruction-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Study in Chunks</h3>
            <p>
              Focus on the top 100 words first, then move to
              500, 1000, and so on. Each level dramatically
              increases comprehension.
            </p>
          </div>
        </div>
        <div class="instruction-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Use the Filters</h3>
            <p>
              Filter by rank range (e.g., 1-100 for most
              common) or search for specific words you want
              to learn.
            </p>
          </div>
        </div>
        <div class="instruction-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Practice Regularly</h3>
            <p>
              Review words daily. Use the copy feature to
              save words to your flashcards or notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
  }

  .frequency-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 40px 20px;
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    border-radius: 20px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .frequency-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" opacity="0.1"><path d="M0,50 Q250,0 500,50 T1000,50" fill="none" stroke="white" stroke-width="2"/></svg>');
    background-size: cover;
  }

  h1 {
    font-size: 3.5rem;
    margin: 0 0 16px 0;
    font-weight: 800;
    position: relative;
  }

  .subtitle {
    font-size: 1.3rem;
    max-width: 800px;
    margin: 0 auto 40px;
    opacity: 0.9;
    line-height: 1.6;
    position: relative;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    position: relative;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 24px;
    border-radius: 16px;
    min-width: 140px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .frequency-main {
    padding: 40px 0;
  }

  .intro-section {
    margin-bottom: 60px;
  }

  .intro-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #333;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 30px;
  }

  .intro-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    text-align: center;
  }

  .intro-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  .intro-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .intro-card h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.5rem;
  }

  .intro-card p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }

  .languages-section {
    margin-bottom: 80px;
  }

  .languages-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 16px;
    color: #333;
  }

  .section-subtitle {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 50px;
  }

  .languages-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    );
    gap: 30px;
  }

  .language-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
  }

  .language-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    padding: 30px;
    background: linear-gradient(
      135deg,
      #f093fb 0%,
      #f5576c 100%
    );
    color: white;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .language-flag {
    font-size: 3rem;
  }

  .language-names h3 {
    margin: 0 0 4px 0;
    font-size: 1.8rem;
  }

  .native-name {
    opacity: 0.9;
    font-size: 1.2rem;
  }

  .card-content {
    padding: 30px;
    flex: 1;
  }

  .card-content p {
    color: #666;
    margin: 0 0 20px 0;
    line-height: 1.6;
  }

  .language-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 25px;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .stat-label {
    color: #666;
  }

  .stat-value {
    font-weight: 600;
    color: #333;
  }

  .coverage-meter {
    margin-top: 20px;
  }

  .meter-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .meter-bar {
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .meter-fill {
    height: 100%;
    background: linear-gradient(90deg, #28a745, #20c997);
    border-radius: 4px;
  }

  .meter-stats {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
  }

  .card-footer {
    padding: 20px 30px;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
  }

  .view-link {
    color: #007bff;
    font-weight: 500;
    display: block;
    text-align: right;
  }

  .how-to-section {
    background: #f8f9fa;
    border-radius: 20px;
    padding: 50px;
  }

  .how-to-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: #333;
  }

  .instructions {
    max-width: 800px;
    margin: 0 auto;
  }

  .instruction-step {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
    align-items: flex-start;
  }

  .step-number {
    background: #007bff;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .step-content h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.5rem;
  }

  .step-content p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    .header-stats {
      gap: 15px;
    }

    .stat-card {
      min-width: 120px;
      padding: 20px;
    }

    .stat-number {
      font-size: 2rem;
    }

    .languages-grid {
      grid-template-columns: 1fr;
    }

    .instruction-step {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .step-number {
      margin-bottom: 15px;
    }

    .how-to-section {
      padding: 30px;
    }
  }
</style>
