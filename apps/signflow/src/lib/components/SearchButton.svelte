<script>
  import { onMount } from "svelte";

  let isModalOpen = false; // Controls modal visibility
  let searchQuery = ""; // Stores the search input value

  // Open the search modal
  function openModal() {
    isModalOpen = true;
  }

  // Close the search modal and clear the input
  function closeModal() {
    isModalOpen = false;
    searchQuery = ""; // Clear the search input
  }

  // Handle form submission
  function handleSearch(event) {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      alert("Please enter a search term."); // Prevent empty searches
      return;
    }

    // Redirect to /list?query=SearchInput
    window.location.href = `/list?query=${encodeURIComponent(
      query
    )}`;
  }

  // Handle keyboard events (Escape to close modal)
  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  // Handle clicks outside the modal content
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal(); // Close modal if clicking outside the modal content
    }
  }

  // Add event listener for Escape key
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
  <!-- Add your search icon SVG here -->
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
    <!-- Close Button -->
    <button
      class="close-modal"
      on:click={closeModal}
      aria-label="Close search modal">×</button
    >

    <!-- Search Form -->
    <form on:submit={handleSearch}>
      <input
        class="search-input"
        type="text"
        bind:value={searchQuery}
        placeholder="Search..."
        aria-label="Search input"
      />
      <!-- <button
        type="submit"
        class="submit-button"
        aria-label="Submit search">Search</button
      > -->
    </form>
  </div>
</div>

<style>
  /* Search Icon */
  .search-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  /* Modal */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }

  .modal.open {
    display: flex;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
  }

  /* Close Button */
  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 1em;
  }

  /* Search Input */
  .search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    /* box-shadow: 0 4px 4px #0c0b0c; */
  }
</style>
