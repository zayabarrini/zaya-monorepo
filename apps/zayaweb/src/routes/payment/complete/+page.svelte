<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let status: "processing" | "success" | "error" =
    "processing";
  let paymentIntentId: string | null = null;
  let errorMessage: string | null = null;

  onMount(async () => {
    // Get payment intent from URL
    const url = new URL(window.location.href);
    paymentIntentId = url.searchParams.get(
      "payment_intent"
    );
    const redirectStatus = url.searchParams.get(
      "redirect_status"
    );

    if (redirectStatus === "succeeded") {
      status = "success";
    } else if (redirectStatus === "failed") {
      status = "error";
      errorMessage = "Payment failed. Please try again.";
    } else {
      // Still processing
      setTimeout(() => {
        status = "error";
        errorMessage =
          "Payment timeout. Please check your email for confirmation.";
      }, 10000);
    }
  });
</script>

<div
  class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div
    class="max-w-md w-full bg-white rounded-lg shadow-sm p-8"
  >
    {#if status === "processing"}
      <div class="text-center">
        <div
          class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-blue-600 animate-spin"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <h2
          class="text-xl font-semibold text-gray-900 mb-2"
        >
          Processing Payment
        </h2>
        <p class="text-gray-600">
          Please wait while we confirm your payment...
        </p>
      </div>
    {:else if status === "success"}
      <div class="text-center">
        <div
          class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p class="text-gray-600 mb-6">
          Thank you for your payment.
        </p>
        {#if paymentIntentId}
          <p class="text-xs text-gray-500 mb-6">
            Transaction ID: {paymentIntentId}
          </p>
        {/if}
        <button
          on:click={() => goto("/")}
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return Home
        </button>
      </div>
    {:else}
      <div class="text-center">
        <div
          class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4"
        >
          <svg
            class="h-8 w-8 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p class="text-gray-600 mb-6">
          {errorMessage ||
            "Something went wrong with your payment."}
        </p>
        <button
          on:click={() => goto("/payment-test")}
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    {/if}
  </div>
</div>
