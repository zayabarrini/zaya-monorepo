<script lang="ts">
  import { onMount } from "svelte";

  // Props
  export let title: string;
  export let url: string;
  export let image: string;
  export let floating: boolean = true; // Enable floating button
  export let showIcons: boolean = true; // Show icons in mini modal

  // State
  let showShareModal = false; // Controls share icons modal visibility

  // Encode URL and title
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  // Social Media Share Links
  const shareLinks = {
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    // linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}&source=${encodedSource}`,
    // facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    // whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    // telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    // twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${encodedHashtags}&via=${encodedUsername}`
    // pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedDescription}`,
    // reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    // tumblr: `https://www.tumblr.com/share/link?url=${encodedUrl}&name=${encodedTitle}&description=${encodedDescription}`,
    // vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&comment=${encodedDescription}`,
    // email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%20${encodedUrl}`,
    // messenger: `https://www.facebook.com/dialog/send?app_id=${appId}&link=${encodedUrl}&redirect_uri=${encodedUrl}`,
    // instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Instagram doesn't have direct URL sharing
  };
  // Ensure correct link preview
  onMount(() => {
    const metaImage = document.querySelector(
      "meta[property='og:image']"
    );
    if (!metaImage) {
      const metaTag = document.createElement("meta");
      metaTag.setAttribute("property", "og:image");
      metaTag.setAttribute("content", image);
      document.head.appendChild(metaTag);
    }
  });

  // Toggle share modal visibility
  function toggleShareModal() {
    showShareModal = !showShareModal;
  }

  // Copy link to clipboard
  function copyLinkToClipboard() {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
    showShareModal = false;
  }

  // Handle clicks outside the modal content
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      console.log("Backdrop clicked");
      showShareModal = false;
    }
  }

  // Handle keyboard events (Escape to close modal)
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      showShareModal = false; // Close share modal
    }

    // if (event.key === "Enter" || event.key === " ") {
    //   console.log("Enter or Space key pressed");
    //   showShareModal = !showShareModal;
    // }
  }

  // Add event listeners
  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () =>
      window.removeEventListener("keydown", handleKeydown);
  });
</script>

<!-- Floating Share Button -->
{#if floating}
  <button
    class="floating-share"
    on:click={toggleShareModal}
    aria-label="Share"
  >
    <img src="/icons/share.svg" alt="Share" width="24" />
  </button>
{/if}

<!-- Share Icons Modal -->
{#if showShareModal && showIcons}
  <!-- Modal Backdrop -->
  <div
    class="share-modal-backdrop"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    tabindex="0"
    role="button"
  >
    <!-- Modal Content -->
    <div class="share-modal">
      <div class="social-icons">
        {#each Object.entries(shareLinks) as [platform, link]}
          <a
            href={link}
            target="_blank"
            title={"Share on " + platform}
            on:click={handleBackdropClick}
          >
            <img
              src={"/icons/" + platform + ".svg"}
              alt={platform}
            />
            {platform.charAt(0).toUpperCase() +
              platform.slice(1)}
          </a>
        {/each}
        <!-- Copy Link Button -->
        <button
          class="copy-link"
          on:click={copyLinkToClipboard}
        >
          <img
            src="/icons/copy.svg"
            alt="Copy Link"
            width="24"
          />
          Copy Link
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Standard Share Buttons -->
{#if !floating}
  <div class="social-icons">
    {#each Object.entries(shareLinks) as [platform, link]}
      <a
        href={link}
        target="_blank"
        title={"Share on " + platform}
      >
        <img
          src={"/icons/" + platform + ".svg"}
          alt={platform}
        />
      </a>
    {/each}
    <!-- Copy Link Button -->
    <button
      class="copy-link"
      on:click={copyLinkToClipboard}
    >
      <img
        src="/icons/copy.svg"
        alt="Copy Link"
        width="24"
      />
    </button>
  </div>
{/if}

<style>
  /* Floating Button */
  .floating-share {
    position: fixed;
    bottom: 140px;
    right: 20px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;
    z-index: 1000;
  }
  .floating-share img {
    filter: var(--icon-filter, none);
  }

  .floating-share:hover {
    background: var(--hover-background-color, #333);
  }

  .share-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Share Icons Modal */
  .share-modal {
    position: fixed;
    bottom: 120px;
    right: 20px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 1000;
  }

  .share-modal-backdrop:focus {
    outline: 2px solid #007bff; /* Add a focus outline */
  }

  .share-modal button {
    color: var(--text-color, #fff);
  }

  .share-modal .social-icons {
    flex-direction: column;
  }

  /* Social Icons */
  .social-icons {
    display: flex;
    margin-top: 1em;
    /* flex-direction: column; */
    gap: 8px;
  }
  .social-icons a {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--text-color, #fff);
    transition: 0.3s;
  }
  .social-icons a:hover {
    color: var(--hover-text-color, #007bff);
  }
  .social-icons img {
    width: 24px;
    height: 24px;
    filter: var(
      --icon-filter,
      none
    ); /* Adjust icon color for dark mode */
  }

  /* Copy Link Button */
  .copy-link {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: var(--text-color, #fff);
    transition: 0.3s;
  }
  .copy-link:hover {
    color: var(--hover-text-color, #007bff);
  }
</style>
