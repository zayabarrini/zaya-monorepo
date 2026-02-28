<script>
  import { isLoading } from "$lib/stores/loadingStore.js";
</script>

{#if $isLoading}
  <div class="loading-overlay">
    <div class="loading-container">
      <div class="spinner" />
      <div class="loading-text">
        Loading, please wait...
      </div>
    </div>
  </div>
{/if}

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-text {
    color: white;
    font-size: 1.2rem;
    margin-top: 15px;
    font-weight: bold;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
