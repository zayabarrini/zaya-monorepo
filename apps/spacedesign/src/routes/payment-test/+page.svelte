<script lang="ts">
  import { onMount } from "svelte";
  // import PaymentForm from "$lib/components/payment/PaymentForm.svelte";
  import { LocationService } from "$lib/services/location";

  let amount = 99.99;
  let paymentStatus: "idle" | "success" | "error" = "idle";
  let paymentResult: any = null;
  let paymentError: string | null = null;
  let detectedCountry: string | null = null;
  let isDev = false;

  onMount(async () => {
    // Check if we're in development
    isDev = import.meta.env.DEV;

    // Detect country for display
    const locationService = LocationService.getInstance();
    detectedCountry = await locationService.detectCountry();
  });

  function handleSuccess(result: any) {
    console.log("Payment successful:", result);
    paymentStatus = "success";
    paymentResult = result;
    paymentError = null;
  }

  function handleError(error: Error) {
    console.error("Payment failed:", error);
    paymentStatus = "error";
    paymentError = error.message;
    paymentResult = null;
  }

  function resetPayment() {
    paymentStatus = "idle";
    paymentResult = null;
    paymentError = null;
  }
</script>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-4xl mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        Test Payment Flow
      </h1>
      <p class="text-gray-600 mt-2">
        Testing Stripe integration with location-based
        payment methods
      </p>

      {#if detectedCountry}
        <div
          class="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full"
        >
          <span class="text-lg mr-2">📍</span>
          <span class="font-medium"
            >Detected location: {detectedCountry}</span
          >
        </div>
      {/if}

      {#if isDev}
        <div
          class="mt-2 inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm"
        >
          <span class="mr-1">⚠️</span>
          Development Mode - Test Keys Active
        </div>
      {/if}
    </div>

    <!-- Payment Status Messages -->
    {#if paymentStatus === "success"}
      <div
        class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-400"
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
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">
              Payment Successful
            </h3>
            <div class="mt-2 text-sm text-green-700">
              <p>
                Payment Intent ID: {paymentResult?.paymentIntentId}
              </p>
              <p class="mt-1">
                Status: {paymentResult?.status}
              </p>
            </div>
            <div class="mt-4">
              <button
                on:click={resetPayment}
                class="text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded"
              >
                Make another payment
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if paymentStatus === "error"}
      <div
        class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
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
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Payment Failed
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <p>
                {paymentError ||
                  "An unknown error occurred"}
              </p>
            </div>
            <div class="mt-4">
              <button
                on:click={resetPayment}
                class="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Amount Selector (Test Only) -->
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
    >
      <label
        class="block text-sm font-medium text-gray-700 mb-2"
      >
        Test Amount
      </label>
      <div class="flex items-center gap-4">
        <input
          type="number"
          bind:value={amount}
          min="0.50"
          max="9999.99"
          step="0.01"
          class="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          disabled={paymentStatus !== "idle"}
        />
        <span class="text-sm text-gray-500">
          Minimum: $0.50 | Maximum: $9,999.99
        </span>
      </div>
    </div>

    <!-- Payment Form -->
    {#if paymentStatus === "idle"}
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <!-- <PaymentForm
          {amount}
          onSuccess={handleSuccess}
          onError={handleError}
        /> -->
      </div>
    {/if}

    <!-- Debug Info (Development Only) -->
    {#if isDev && paymentResult}
      <div class="mt-8 p-4 bg-gray-900 rounded-lg">
        <h3 class="text-sm font-mono text-gray-400 mb-2">
          Debug Info
        </h3>
        <pre class="text-xs text-gray-300 overflow-x-auto">
          {JSON.stringify(paymentResult, null, 2)}
        </pre>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Prevent number input spinner */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
