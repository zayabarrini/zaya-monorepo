<script>
  import { onMount } from "svelte";

  let deferredPrompt;
  let showButton = false;
  let installed = false;

  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "beforeinstallprompt",
        (event) => {
          event.preventDefault();
          deferredPrompt = event;
          showButton = true;
        }
      );
    }
  });

  function installPWA() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("Usuário instalou o PWA");
          installed = true;
          setTimeout(() => {
            const notification =
              document.querySelector(".notification");
            notification.classList.add("fade-out");
            setTimeout(() => (installed = false), 500); // Remove após a animação
          }, 4500); // Inicia a animação de saída após 4.5 segundos        } else {
          console.log("Usuário recusou a instalação");
        }
        deferredPrompt = null;
        showButton = false;
      });
    }
  }
</script>

{#if showButton}
  <button class="install-button" on:click={installPWA}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1 17 1ZM17 19H7V5H17V19Z"
        fill="white"
      />
    </svg> Install App
  </button>
{/if}

<!-- {#if installed}
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
      fill="white"
    />
  </svg>
  <p class="notification fade-out">Sucessfully Installed</p>
{/if} -->

<style>
  .install-button {
    padding: 12px 24px;
    background-color: #111827;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease,
      transform 0.2s ease, box-shadow 0.3s ease;
    z-index: 1005;
    top: 10vh;
    right: 1vw;
    position: fixed;
  }

  .install-button:hover {
    background-color: rgb(23, 45, 70);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  .install-button:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .install-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  /* .notification {
    position: fixed;
    top: 10vh;
    right: 1vw;
    z-index: 1005;
    background-color: #394b7a; 
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    font-weight: 600;
    animation: fadeIn 0.5s ease;
  } */

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  /* .notification.fade-out {
    animation: fadeOut 0.5s ease;
  } */
</style>
