<script>
  export let iconSrc; // Path to the icon image
  export let altText; // Alt text for the icon
  export let onClick; // Function to call when the button is clicked
  export let backgroundColor = "#000"; // Default background color
  export let iconFilter = "none"; // Default icon filter
  export let position = { bottom: "20px", right: "20px" }; // Custom position
</script>

<div
  class="floating-button"
  style="
    --bottom: {position.bottom};
    --right: {position.right};
    --background-color: {backgroundColor};
    --icon-filter: {iconFilter};
  "
  on:click={onClick}
  on:keypress={onClick}
  aria-label={altText}
  role="button"
  tabindex="0"
>
  <img src={iconSrc} alt={altText} />
</div>

<style>
  .floating-button {
    position: fixed;
    bottom: var(--bottom, 20px);
    right: var(--right, 20px);
    cursor: pointer;
    z-index: 1000;
    background: var(--background-color, #000);
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .floating-button img {
    width: 24px;
    height: 24px;
    filter: var(--icon-filter, none);
  }
</style>
