<!-- VocabularyQuiz.svelte - Optional quiz component -->
<script>
  import { onMount } from "svelte";

  export let vocabularyData = {};
  export let category = "all";

  let currentWord = null;
  let showAnswer = false;
  let score = 0;
  let totalAttempted = 0;
  let quizWords = [];

  onMount(() => {
    startNewQuiz();
  });

  function startNewQuiz() {
    // Flatten and filter words
    const allWords = [];
    for (const [cat, words] of Object.entries(
      vocabularyData
    )) {
      if (category === "all" || cat === category) {
        words.forEach((word) => {
          allWords.push({ word, category: cat });
        });
      }
    }

    // Shuffle
    quizWords = allWords.sort(() => Math.random() - 0.5);
    nextWord();
  }

  function nextWord() {
    if (quizWords.length > 0) {
      currentWord = quizWords.pop();
      showAnswer = false;
    } else {
      currentWord = null;
    }
  }

  function handleAnswer(knew) {
    if (knew) score++;
    totalAttempted++;
    nextWord();
  }
</script>

<div class="quiz-container">
  <h2>Vocabulary Quiz</h2>

  <div class="score">Score: {score}/{totalAttempted}</div>

  {#if currentWord}
    <div class="word-card quiz-card">
      <div class="arabic-word">{currentWord.word}</div>

      <button
        class="reveal-btn"
        on:click={() => (showAnswer = !showAnswer)}
      >
        {showAnswer ? "Hide" : "Reveal"} Category
      </button>

      {#if showAnswer}
        <div class="answer">
          Category: {currentWord.category.replace(
            /_/g,
            " "
          )}
        </div>
      {/if}

      <div class="quiz-buttons">
        <button
          class="know-btn"
          on:click={() => handleAnswer(true)}
        >
          ✓ Knew it
        </button>
        <button
          class="dont-know-btn"
          on:click={() => handleAnswer(false)}
        >
          ✗ Didn't know
        </button>
      </div>
    </div>
  {:else}
    <div class="quiz-complete">
      <h3>Quiz Complete!</h3>
      <p>Final Score: {score}/{totalAttempted}</p>
      <button class="restart-btn" on:click={startNewQuiz}>
        Restart Quiz
      </button>
    </div>
  {/if}
</div>

<style>
  .quiz-container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .score {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #4a6fa5;
  }

  .quiz-card {
    text-align: center;
    padding: 2rem;
  }

  .arabic-word {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .reveal-btn {
    background: none;
    border: 2px solid #4a6fa5;
    color: #4a6fa5;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .answer {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }

  .quiz-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .know-btn,
  .dont-know-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .know-btn {
    background: #4caf50;
    color: white;
  }

  .dont-know-btn {
    background: #f44336;
    color: white;
  }

  .know-btn:hover,
  .dont-know-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
</style>
