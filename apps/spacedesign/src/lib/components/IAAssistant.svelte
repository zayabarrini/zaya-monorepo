<script>
  import { onMount } from "svelte";

  // Function to redirect to the AI Assistant
  const redirectToAIAssistant = () => {
    const userAgent =
      navigator.userAgent ||
      navigator.vendor ||
      window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isiOS =
      /iPad|iPhone|iPod/.test(userAgent) &&
      !window.MSStream;
    const isBrowser = !isAndroid && !isiOS; // Check if the user is on a browser

    // If the user is on a browser, open https://chat.deepseek.com/
    if (isBrowser) {
      window.open("https://chat.deepseek.com/", "_blank");
      return;
    }

    // DeepSeek
    const deepSeekAppUrl = isAndroid
      ? "intent://deepseek.com#Intent;package=com.deepseek.app;scheme=https;end"
      : "https://chat.deepseek.com/";
    const deepSeekStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.deepseek.app"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual DeepSeek app store URLs

    // OpenAI ChatGPT
    const chatGPTAppUrl = isAndroid
      ? "intent://chat.openai.com#Intent;package=com.openai.chatgpt;scheme=https;end"
      : "chatgpt://";
    const chatGPTStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.openai.chatgpt"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual ChatGPT app store URLs

    // Replica
    const replicaAppUrl = isAndroid
      ? "intent://replica.ai#Intent;package=com.replica.ai;scheme=https;end"
      : "replica://";
    const replicaStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.replica.ai"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual Replica app store URLs

    // Google Dialogflow
    const dialogflowAppUrl = isAndroid
      ? "intent://dialogflow.com#Intent;package=com.google.dialogflow;scheme=https;end"
      : "dialogflow://";
    const dialogflowStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.google.dialogflow"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual Dialogflow app store URLs

    // Microsoft Azure AI
    const azureAppUrl = isAndroid
      ? "intent://azure.ai#Intent;package=com.microsoft.azure.ai;scheme=https;end"
      : "azure://";
    const azureStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.microsoft.azure.ai"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual Azure AI app store URLs

    // Rasa
    const rasaAppUrl = isAndroid
      ? "intent://rasa.com#Intent;package=com.rasa.ai;scheme=https;end"
      : "rasa://";
    const rasaStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.rasa.ai"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual Rasa app store URLs

    // Anthropic
    const anthropicAppUrl = isAndroid
      ? "intent://anthropic.com#Intent;package=com.anthropic.ai;scheme=https;end"
      : "anthropic://";
    const anthropicStoreUrl = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.anthropic.ai"
      : "https://apps.apple.com/app/id123456789"; // Replace with actual Anthropic app store URLs

    // Priority-based redirection
    const tryOpenApp = (appUrl, storeUrl) => {
      window.location.href = appUrl;
      setTimeout(() => {
        // If the app is not installed, redirect to the app store
        if (!document.hidden) {
          window.location.href = storeUrl;
        }
      }, 500); // Wait 500ms to check if the app opened
    };

    // Try opening apps in priority order
    tryOpenApp(deepSeekAppUrl, deepSeekStoreUrl);
    setTimeout(() => {
      tryOpenApp(chatGPTAppUrl, chatGPTStoreUrl);
    }, 1000);
    setTimeout(() => {
      tryOpenApp(replicaAppUrl, replicaStoreUrl);
    }, 2000);
    setTimeout(() => {
      tryOpenApp(dialogflowAppUrl, dialogflowStoreUrl);
    }, 3000);
    setTimeout(() => {
      tryOpenApp(azureAppUrl, azureStoreUrl);
    }, 4000);
    setTimeout(() => {
      tryOpenApp(rasaAppUrl, rasaStoreUrl);
    }, 5000);
    setTimeout(() => {
      tryOpenApp(anthropicAppUrl, anthropicStoreUrl);
    }, 6000);
  };

  // Handle dark/light mode
  onMount(() => {
    document.documentElement.style.setProperty(
      "--background-color",
      "var(--bg-color, #ffffff)"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      "var(--text-color, #000000)"
    );
    document.documentElement.style.setProperty(
      "--hover-background-color",
      "var(--hover-bg-color, #f0f0f0)"
    );
    document.documentElement.style.setProperty(
      "--icon-filter",
      "var(--icon-filter, invert(0))"
    );
  });
</script>

<!-- Floating Button -->
<!-- <button
  class="floating-button"
  on:click={redirectToAIAssistant}
>
  🤖
</button> -->

<div
  class="translate-icon floating-share"
  id="translate-icon"
  on:click={redirectToAIAssistant}
  on:keypress={redirectToAIAssistant}
  aria-label="Chat"
  role="button"
  tabindex="0"
>
  <img src="/icons/chat.png" alt="Chat" />
</div>

<style>
  /* Floating Button */
  .floating-share {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;
    z-index: 1000;
    font-size: 24px;
    line-height: 1;
    border: none;
  }

  .floating-share:hover {
    background: var(--hover-background-color, #333);
  }

  #translate-icon img {
    width: 24px;
    height: 24px;
    filter: var(--icon-filter, none);
    /* background: var(--background-color, #000); */
  }
</style>
