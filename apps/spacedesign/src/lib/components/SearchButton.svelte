<script>
  import { onMount, tick } from "svelte";

  let isModalOpen = false;
  let searchQuery = "";
  let searchInput; // Reference to the input element

  async function openModal() {
    isModalOpen = true;
    // Wait for the modal to render and then focus the input
    await tick();
    if (searchInput) {
      searchInput.focus();
    }
  }

  function closeModal() {
    isModalOpen = false;
    searchQuery = "";
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      // Instead of alert, show visual feedback
      searchInput.classList.add("shake");
      setTimeout(
        () => searchInput.classList.remove("shake"),
        500
      );
      return;
    }

    // Redirect to /list?query=SearchInput
    window.location.href = `/list?query=${encodeURIComponent(query)}`;
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () =>
      window.removeEventListener("keydown", handleKeydown);
  });
</script>

<!-- Search Icon -->
<button
  class="search-icon"
  on:click={openModal}
  aria-label="Open search modal"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
      fill="currentColor"
    />
    <path
      d="M23.7071 22.2929L18.7071 17.2929C18.3166 16.9024 17.6834 16.9024 17.2929 17.2929C16.9024 17.6834 16.9024 18.3166 17.2929 18.7071L22.2929 23.7071C22.6834 24.0976 23.3166 24.0976 23.7071 23.7071C24.0976 23.3166 24.0976 22.6834 23.7071 22.2929Z"
      fill="currentColor"
    />
  </svg>
</button>

<!-- Search Modal -->
<div
  class="modal {isModalOpen ? 'open' : ''}"
  aria-hidden={!isModalOpen}
  on:click={handleBackdropClick}
>
  <div class="modal-content">
    <button
      class="close-modal"
      on:click={closeModal}
      aria-label="Close search modal"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="search-header">
      <svg
        class="search-icon-large"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- <h2>Discover Knowledge</h2> -->
    </div>

    <form on:submit={handleSearch}>
      <input
        bind:this={searchInput}
        class="search-input"
        type="text"
        bind:value={searchQuery}
        placeholder="Search articles on cinema, psychoanalysis, and art..."
        aria-label="Search input"
      />
      <!-- <div class="search-hint">
        <span class="hint-text">Press Enter to explore</span
        >
        <span class="hint-escape">ESC to close</span>
      </div> -->
    </form>
  </div>
</div>

<style>
  .search-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    /* color: #4a5568; */
  }

  .search-icon:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
    transform: scale(1.1);
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .modal.open {
    display: flex;
    opacity: 1;
  }

  .modal-content {
    background: linear-gradient(
      135deg,
      #0b0b18 0%,
      #081f0d 100%
    );
    padding: 2rem;
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transform: translateY(20px);
    transition: transform 0.3s ease;
    color: white;
  }

  .modal.open .modal-content {
    transform: translateY(0);
  }

  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .close-modal:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  .search-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .search-icon-large {
    color: rgba(255, 255, 255, 0.9);
  }

  .search-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(45deg, #fff, #e0e7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.125rem;
    border: none;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #1a202c;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-bottom: 1rem;
  }

  .search-input::placeholder {
    color: #718096;
  }

  .search-input:focus {
    outline: none;
    background: white;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  .search-hint {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .hint-text {
    color: rgba(255, 255, 255, 0.9);
  }

  .hint-escape {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-family: monospace;
  }

  /* Shake animation for empty search */
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  .shake {
    animation: shake 0.5s ease-in-out;
    border: 2px solid #fc8181 !important;
  }

  /* Responsive design */
  @media (max-width: 640px) {
    .modal-content {
      margin: 1rem;
      padding: 1.5rem;
    }

    .search-header h2 {
      font-size: 1.25rem;
    }

    .search-input {
      font-size: 1rem;
      padding: 0.875rem 1.25rem;
    }
  }
</style>
