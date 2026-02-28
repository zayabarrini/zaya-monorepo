<script>
  export let isVisible; // Boolean to control modal visibility
  export let onClose; // Function to call when the modal is closed
  export let position = { bottom: "80px", right: "80px" }; // Custom position
  export let backgroundColor = "white"; // Default background color
  export let textColor = "#fff"; // Default text color

  // Handle clicks outside the modal content
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  // Handle keyboard events (Escape to close modal)
  function handleKeydown(event) {
    if (event.key === "Escape") {
      onClose();
    }
  }
</script>

{#if isVisible}
  <div
    class="modal-overlay"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    aria-label="modal overlay"
    role="button"
    tabindex="0"
  >
    <div
      class="modal-content {isVisible ? 'visible' : ''}"
      style="
        --bottom: {position.bottom};
        --right: {position.right};
        --background-color: {backgroundColor};
        --text-color: {textColor};
      "
    >
      <button class="close-button" on:click={onClose}
        >×</button
      >
      <slot />
      <!-- Render the content passed to the modal -->
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }

  .modal-content {
    position: fixed;
    bottom: var(--bottom, 80px);
    right: var(--right, 80px);
    background: var(--background-color, white);
    color: var(--text-color, #fff);
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: none; /* Default to hidden */
  }

  .modal-content.visible {
    display: block;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    background: none;
    border: none;
    color: var(--text-color, #fff);
  }
</style>
