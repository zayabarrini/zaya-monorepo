<script lang="ts">
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";
  import { PaymentProviderFactory } from "@zaya/country-adapters";
  import { LocationService } from "$lib/services/location";
  import type { PaymentMethod, Order } from "@zaya/core";

  export let amount: number;
  export let currency: string = "USD";
  export let onSuccess: (result: any) => void;
  export let onError: (error: Error) => void;

  let loading = true;
  let error: string | null = null;
  let country = "US";
  let paymentMethods: PaymentMethod[] = [];
  let selectedMethod: string | null = null;
  let processing = false;
  let showAllMethods = false;

  const locationService = LocationService.getInstance();
  const factory = PaymentProviderFactory.getInstance();

  onMount(async () => {
    await loadPaymentOptions();
  });

  async function loadPaymentOptions() {
    try {
      loading = true;
      error = null;

      country = await locationService.detectCountry();
      currency =
        await locationService.getCurrencyForCountry(
          country
        );

      const provider = await factory.getProvider(country);

      paymentMethods = await provider.getSupportedMethods({
        country,
        currency,
        amount,
        userAgent: navigator.userAgent
      });

      // Filter and sort methods
      paymentMethods = paymentMethods
        .filter(
          (m) =>
            !m.maximumAmount || amount <= m.maximumAmount
        )
        .filter(
          (m) =>
            !m.minimumAmount || amount >= m.minimumAmount
        )
        .sort((a, b) => {
          // Prioritize common methods
          const priority = [
            "card",
            "apple_pay",
            "google_pay"
          ];
          const aPriority = priority.indexOf(a.id);
          const bPriority = priority.indexOf(b.id);
          if (aPriority !== -1 || bPriority !== -1) {
            if (aPriority === -1) return 1;
            if (bPriority === -1) return -1;
            return aPriority - bPriority;
          }
          return 0;
        });

      if (paymentMethods.length > 0) {
        selectedMethod = paymentMethods[0].id;
      }
    } catch (err) {
      console.error("Failed to load payment options:", err);
      error =
        err instanceof Error
          ? err.message
          : "Failed to load payment options";
      onError?.(
        err instanceof Error ? err : new Error(String(err))
      );
    } finally {
      loading = false;
    }
  }

  async function handleSubmit() {
    if (!selectedMethod || !amount) return;

    try {
      processing = true;
      error = null;

      const provider = await factory.getProvider(country);

      const order: Order = {
        amount,
        currency,
        method: selectedMethod,
        context: {
          country,
          currency,
          amount,
          userAgent: navigator.userAgent
        },
        metadata: {
          timestamp: Date.now(),
          url: window.location.href
        }
      };

      const result = await provider.createPayment(order);

      if (
        result.provider === "stripe" &&
        result.clientSecret
      ) {
        const stripe = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        if (!stripe)
          throw new Error("Failed to load Stripe");

        const { error: stripeError } =
          await stripe.confirmPayment({
            clientSecret: result.clientSecret,
            confirmParams: {
              return_url: `${window.location.origin}/payment/complete`
            }
          });

        if (stripeError) throw stripeError;
      } else if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }

      onSuccess?.(result);
    } catch (err) {
      console.error("Payment failed:", err);
      error =
        err instanceof Error
          ? err.message
          : "Payment failed";
      onError?.(
        err instanceof Error ? err : new Error(String(err))
      );
    } finally {
      processing = false;
    }
  }

  function formatAmount(
    amount: number,
    currency: string
  ): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  function getMethodIcon(methodId: string): string {
    const icons: Record<string, string> = {
      card: "💳",
      apple_pay: "🍎",
      google_pay: "📱",
      afterpay_clearpay: "⏰",
      bancontact: "🏦",
      ideal: "🇳🇱",
      fpx: "🇲🇾",
      konbini: "🏪",
      oxxo: "🏧",
      boleto: "📄",
      twint: "🇨🇭",
      postfinance: "📬",
      upi: "🇮🇳",
      paytm: "📱",
      netbanking: "🏛️"
    };
    return icons[methodId] || "💵";
  }
</script>

<div class="payment-container">
  <!-- Loading state -->
  {#if loading}
    <div
      class="flex flex-col items-center justify-center py-12"
    >
      <div class="relative">
        <div
          class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
        ></div>
        <div
          class="absolute inset-0 flex items-center justify-center"
        >
          <div
            class="w-8 h-8 bg-blue-600 rounded-full animate-pulse"
          ></div>
        </div>
      </div>
      <p class="mt-4 text-gray-600 font-medium">
        Loading payment options...
      </p>
      <p class="text-sm text-gray-400">
        Secure connection established
      </p>
    </div>

    <!-- Error state -->
  {:else if error}
    <div
      class="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
    >
      <div
        class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg
          class="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        Unable to load payment methods
      </h3>
      <p class="text-gray-600 mb-4">{error}</p>
      <button
        on:click={loadPaymentOptions}
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Try Again
      </button>
    </div>

    <!-- Payment form -->
  {:else}
    <!-- Secure badge -->
    <div
      class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100"
    >
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <span class="ml-2 text-sm font-medium text-gray-700"
          >Secure payment</span
        >
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-xs text-gray-500">Powered by</span
        >
        <span class="font-semibold text-gray-700"
          >Stripe</span
        >
      </div>
    </div>

    <!-- Country indicator -->
    <div
      class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-2xl mr-3">📍</span>
          <div>
            <p
              class="text-xs text-gray-500 uppercase tracking-wider"
            >
              Billing location
            </p>
            <p class="font-semibold text-gray-900">
              {locationService.getCountryName(country)}
            </p>
          </div>
        </div>
        <div class="text-right">
          <p
            class="text-xs text-gray-500 uppercase tracking-wider"
          >
            Currency
          </p>
          <p class="font-semibold text-gray-900">
            {currency}
          </p>
        </div>
      </div>
    </div>

    <!-- Payment methods -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h3
          class="text-sm font-semibold text-gray-700 uppercase tracking-wider"
        >
          Select payment method
        </h3>
        <span class="text-xs text-gray-500">
          {paymentMethods.length}
          {paymentMethods.length === 1
            ? "option"
            : "options"} available
        </span>
      </div>

      <div class="grid gap-3">
        {#each showAllMethods ? paymentMethods : paymentMethods.slice(0, 3) as method}
          <button
            class={`method-card ${selectedMethod === method.id ? "selected" : ""}`}
            class:selected={selectedMethod === method.id}
            on:click={() => (selectedMethod = method.id)}
            disabled={processing}
          >
            <div class="flex items-center flex-1">
              <span class="text-2xl mr-3"
                >{getMethodIcon(method.id)}</span
              >
              <div class="text-left">
                <span class="font-medium text-gray-900"
                  >{method.name}</span
                >
                {#if method.processingTime}
                  <p class="text-xs text-gray-500">
                    {method.processingTime}
                  </p>
                {/if}
              </div>
            </div>

            <div class="flex items-center">
              {#if method.fee}
                <span class="text-xs text-gray-500 mr-2"
                  >+{method.fee}% fee</span
                >
              {/if}
              {#if selectedMethod === method.id}
                <div
                  class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              {/if}
            </div>
          </button>
        {/each}
      </div>

      {#if paymentMethods.length > 3 && !showAllMethods}
        <button
          on:click={() => (showAllMethods = true)}
          class="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          Show {paymentMethods.length - 3} more payment methods
          <svg
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      {/if}
    </div>

    <!-- Amount display -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Total amount</span>
        <div class="text-right">
          <span class="text-2xl font-bold text-gray-900">
            {formatAmount(amount, currency)}
          </span>
          <p class="text-xs text-gray-500 mt-1">
            Including all taxes
          </p>
        </div>
      </div>
    </div>

    <!-- Submit button -->
    <button
      on:click={handleSubmit}
      disabled={!selectedMethod || processing}
      class="pay-button"
    >
      {#if processing}
        <span class="flex items-center justify-center">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing payment...
        </span>
      {:else}
        <span class="flex items-center justify-center">
          Pay {formatAmount(amount, currency)}
          <svg
            class="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      {/if}
    </button>

    <!-- Payment guarantees -->
    <div
      class="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500"
    >
      <span class="flex items-center">
        <svg
          class="w-3 h-3 mr-1 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        PCI-DSS compliant
      </span>
      <span class="flex items-center">
        <svg
          class="w-3 h-3 mr-1 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        256-bit SSL
      </span>
      <span class="flex items-center">
        <svg
          class="w-3 h-3 mr-1 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        Money-back guarantee
      </span>
    </div>
  {/if}
</div>

<style>
  .payment-container {
    @apply w-full;
  }

  .method-card {
    @apply flex items-center justify-between w-full p-4 bg-white border-2 border-gray-100 
           rounded-xl hover:border-gray-200 hover:bg-gray-50/50 
           transition-all duration-200 disabled:opacity-50 
           disabled:cursor-not-allowed;
  }

  .method-card.selected {
    @apply border-blue-500 bg-blue-50/50 ring-2 ring-blue-200;
  }

  .pay-button {
    @apply w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 
           text-white font-semibold rounded-xl shadow-lg 
           hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl 
           transform hover:-translate-y-0.5 transition-all duration-200 
           disabled:opacity-50 disabled:cursor-not-allowed 
           disabled:hover:translate-y-0 disabled:hover:shadow-lg
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }
</style>
