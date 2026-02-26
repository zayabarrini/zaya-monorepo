<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import PaymentForm from "$lib/components/payment/PaymentForm.svelte";
  import { LocationService } from "$lib/services/location";

  // State management
  let amount = 99.99;
  let customAmount = false;
  let selectedPlan:
    | "basic"
    | "pro"
    | "enterprise"
    | "custom" = "basic";
  let billingCycle: "monthly" | "yearly" = "monthly";
  let paymentStep: "plan" | "payment" | "confirm" = "plan";
  let detectedCountry: string | null = null;
  let countryName: string = "";
  let isDev = false;
  let showTestControls = false;

  // Payment result state
  let paymentStatus:
    | "idle"
    | "processing"
    | "success"
    | "error" = "idle";
  let paymentResult: any = null;
  let paymentError: string | null = null;

  // Animation states
  let planCardsVisible = false;
  let paymentSectionVisible = false;

  // Plans configuration
  const plans = {
    basic: {
      name: "Essential",
      price: { monthly: 29.99, yearly: 299.99 },
      savings: "Save 16%",
      features: [
        "Up to 10 projects",
        "Basic analytics",
        "Email support",
        "2 team members",
        "1GB storage"
      ],
      icon: "🌱",
      color: "emerald",
      popular: false
    },
    pro: {
      name: "Professional",
      price: { monthly: 79.99, yearly: 799.99 },
      savings: "Save 17%",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10 team members",
        "20GB storage",
        "API access",
        "Custom integrations"
      ],
      icon: "⚡",
      color: "blue",
      popular: true
    },
    enterprise: {
      name: "Enterprise",
      price: { monthly: 199.99, yearly: 1999.99 },
      savings: "Save 17%",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "100GB storage",
        "SLA guarantee",
        "Dedicated account manager",
        "Custom contracts",
        "SSO & advanced security"
      ],
      icon: "🏢",
      color: "purple",
      popular: false
    }
  };

  onMount(async () => {
    isDev = import.meta.env.DEV;

    // Detect location
    const locationService = LocationService.getInstance();
    detectedCountry = await locationService.detectCountry();
    countryName = locationService.getCountryName(
      detectedCountry || "US"
    );

    // Trigger animations
    setTimeout(() => {
      planCardsVisible = true;
    }, 100);
  });

  // Computed values
  $: currentPlan = plans[selectedPlan] || plans.basic;
  $: currentPrice = currentPlan.price[billingCycle];
  $: yearlyDiscount =
    billingCycle === "yearly"
      ? (
          plans[selectedPlan].price.monthly * 12 -
          plans[selectedPlan].price.yearly
        ).toFixed(2)
      : 0;
  $: formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(currentPrice);

  // Methods
  function selectPlan(
    plan: "basic" | "pro" | "enterprise" | "custom"
  ) {
    selectedPlan = plan;
    customAmount = plan === "custom";
    if (plan === "custom") {
      amount = 49.99;
    } else {
      amount = currentPrice;
    }

    // Auto-advance to payment on mobile?
    if (window.innerWidth < 640) {
      setTimeout(() => {
        paymentStep = "payment";
      }, 300);
    }
  }

  function handlePaymentSuccess(result: any) {
    paymentStatus = "success";
    paymentResult = result;
    paymentError = null;
    paymentStep = "confirm";

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePaymentError(error: Error) {
    paymentStatus = "error";
    paymentError = error.message;
    paymentResult = null;
  }

  function resetPayment() {
    paymentStatus = "idle";
    paymentResult = null;
    paymentError = null;
    paymentStep = "plan";
  }

  function formatAmount(
    amount: number,
    currency: string = "USD"
  ): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  function getPlanCardClass(plan: string) {
    const base =
      "relative group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl";
    if (selectedPlan === plan) {
      return `${base} ring-2 ring-blue-500 ring-offset-2 bg-gradient-to-br from-blue-50 to-indigo-50`;
    }
    return `${base} bg-white hover:bg-gray-50`;
  }
</script>

<svelte:head>
  <title>Payments - Choose Your Plan</title>
  <meta
    name="description"
    content="Secure payments powered by Stripe. Choose the perfect plan for your needs."
  />
</svelte:head>

<!-- Hero Section -->
<div
  class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white"
>
  <!-- Animated background -->
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
    ></div>
    <div
      class="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
    ></div>
    <div
      class="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
    ></div>
  </div>

  <div
    class="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8"
  >
    <div
      class="text-center"
      in:fade={{ duration: 600, easing: quintOut }}
    >
      <span
        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 bg-opacity-20 text-blue-200 mb-4"
      >
        <span
          class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"
        ></span>
        Secure payments powered by Stripe
      </span>

      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
      >
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200"
        >
          Simple, transparent
        </span>
        <br />
        <span class="text-white">
          pricing for everyone
        </span>
      </h1>

      <p class="text-xl text-blue-200 max-w-2xl mx-auto">
        Choose the perfect plan for your needs. All plans
        include a 14-day free trial.
      </p>

      <!-- Location indicator -->
      {#if detectedCountry}
        <div
          class="mt-8 inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full border border-white border-opacity-20"
        >
          <span class="text-lg mr-2">📍</span>
          <span class="text-sm font-medium"
            >Serving customers in {countryName}</span
          >
          <span
            class="ml-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
          ></span>
        </div>
      {/if}
    </div>
  </div>

  <!-- Wave divider -->
  <div class="absolute bottom-0 w-full">
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-auto"
    >
      <path
        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
        fill="white"
      />
    </svg>
  </div>
</div>

<!-- Main content -->
<main class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
  <!-- Billing toggle -->
  <div
    class="flex justify-center items-center mb-12"
    in:fade={{ delay: 200, duration: 600 }}
  >
    <div
      class="bg-gray-100 p-1 rounded-full inline-flex items-center"
    >
      <button
        on:click={() => (billingCycle = "monthly")}
        class={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          billingCycle === "monthly"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Monthly
      </button>
      <button
        on:click={() => (billingCycle = "yearly")}
        class={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          billingCycle === "yearly"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Yearly
        <span
          class="ml-1.5 text-xs text-green-600 font-semibold"
          >Save 17%</span
        >
      </button>
    </div>
  </div>

  <!-- Step indicator -->
  <div
    class="flex justify-center mb-12"
    in:fade={{ delay: 300, duration: 600 }}
  >
    <div class="flex items-center space-x-8">
      <div class="flex items-center">
        <div
          class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
          ${
            paymentStep === "plan"
              ? "bg-blue-600 text-white"
              : paymentStep === "payment" ||
                  paymentStep === "confirm"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
          }`}
        >
          {paymentStep === "confirm" ? "✓" : "1"}
        </div>
        <span class="ml-2 text-sm font-medium text-gray-700"
          >Choose plan</span
        >
      </div>
      <div class="w-12 h-0.5 bg-gray-200"></div>
      <div class="flex items-center">
        <div
          class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
          ${
            paymentStep === "payment"
              ? "bg-blue-600 text-white"
              : paymentStep === "confirm"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
          }`}
        >
          {paymentStep === "confirm" ? "✓" : "2"}
        </div>
        <span class="ml-2 text-sm font-medium text-gray-700"
          >Payment</span
        >
      </div>
      <div class="w-12 h-0.5 bg-gray-200"></div>
      <div class="flex items-center">
        <div
          class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
          ${paymentStep === "confirm" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
        >
          3
        </div>
        <span class="ml-2 text-sm font-medium text-gray-700"
          >Confirm</span
        >
      </div>
    </div>
  </div>

  <!-- Plan Selection -->
  {#if paymentStep === "plan"}
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      in:fly={{ y: 20, duration: 600, delay: 400 }}
    >
      {#each Object.entries(plans) as [key, plan]}
        {@const isSelected = selectedPlan === key}
        <div
          class={getPlanCardClass(key)}
          in:fly={{
            y: 20,
            duration: 500,
            delay: 400 + parseInt(key) * 100
          }}
        >
          {#if plan.popular}
            <div
              class="absolute -top-4 left-1/2 transform -translate-x-1/2"
            >
              <span
                class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg"
              >
                Most Popular
              </span>
            </div>
          {/if}

          <div class="p-6">
            <div class="text-3xl mb-4">{plan.icon}</div>
            <h3
              class="text-xl font-bold text-gray-900 mb-2"
            >
              {plan.name}
            </h3>
            <div class="mb-4">
              <span
                class="text-3xl font-bold text-gray-900"
              >
                {formatAmount(plan.price[billingCycle])}
              </span>
              <span class="text-gray-500 ml-1"
                >/{billingCycle === "monthly"
                  ? "mo"
                  : "yr"}</span
              >
            </div>

            {#if billingCycle === "yearly"}
              <div class="mb-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {plan.savings}
                </span>
              </div>
            {/if}

            <ul class="space-y-3 mb-6">
              {#each plan.features as feature}
                <li
                  class="flex items-start text-sm text-gray-600"
                >
                  <svg
                    class="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>

            <button
              type="button"
              on:click={() =>
                selectPlan(
                  key as
                    | "basic"
                    | "pro"
                    | "enterprise"
                    | "custom"
                )}
              class={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isSelected ? "Selected" : "Select Plan"}
            </button>
          </div>
        </div>
      {/each}
    </div>

    <!-- Custom amount option -->
    <div
      class="max-w-2xl mx-auto"
      in:fly={{ y: 20, duration: 600, delay: 600 }}
    >
      <button
        type="button"
        on:click={() => selectPlan("custom")}
        class={`w-full text-left bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
          selectedPlan === "custom"
            ? "ring-2 ring-blue-500 bg-blue-50"
            : "hover:border-gray-300"
        }`}
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="text-2xl mr-4">✨</div>
            <div>
              <h3
                class="text-lg font-semibold text-gray-900"
              >
                Custom amount
              </h3>
              <p class="text-sm text-gray-500">
                Pay what you want, support our mission
              </p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-gray-900">
              {formatAmount(amount)}
            </div>
            <span class="text-xs text-gray-500"
              >One-time payment</span
            >
          </div>
        </div>
      </button>
    </div>

    <!-- Continue button -->
    <div
      class="mt-12 text-center"
      in:fade={{ delay: 700, duration: 600 }}
    >
      <button
        on:click={() => (paymentStep = "payment")}
        disabled={!selectedPlan}
        class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        Continue to payment
        <svg
          class="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  {/if}

  <!-- Payment Section -->
  {#if paymentStep === "payment"}
    <div
      class="grid grid-cols-1 lg:grid-cols-3 gap-8"
      in:slide={{ duration: 400 }}
    >
      <!-- Order summary -->
      <div class="lg:col-span-1">
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24"
        >
          <h3
            class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Order Summary
          </h3>

          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium text-gray-900">
                  {currentPlan.name} Plan
                </p>
                <p class="text-sm text-gray-500">
                  {billingCycle === "monthly"
                    ? "Monthly"
                    : "Yearly"} billing
                </p>
              </div>
              <span class="font-semibold text-gray-900"
                >{formattedPrice}</span
              >
            </div>

            {#if selectedPlan === "custom"}
              <div
                class="flex justify-between items-center"
              >
                <span class="text-sm text-gray-600"
                  >Custom amount</span
                >
                <span class="font-semibold text-gray-900"
                  >{formatAmount(amount)}</span
                >
              </div>
            {/if}

            {#if billingCycle === "yearly" && selectedPlan !== "custom"}
              <div class="bg-green-50 rounded-lg p-3">
                <div
                  class="flex justify-between items-center text-sm"
                >
                  <span class="text-green-800 font-medium"
                    >Yearly discount</span
                  >
                  <span class="text-green-600 font-semibold"
                    >-{formatAmount(
                      typeof yearlyDiscount === "string"
                        ? parseFloat(yearlyDiscount)
                        : yearlyDiscount
                    )}</span
                  >
                </div>
                <p class="text-xs text-green-700 mt-1">
                  You save {formatAmount(
                    typeof yearlyDiscount === "string"
                      ? parseFloat(yearlyDiscount)
                      : yearlyDiscount
                  )} compared to monthly
                </p>
              </div>
            {/if}

            <div class="border-t border-gray-200 pt-4 mt-4">
              <div
                class="flex justify-between items-center text-lg"
              >
                <span class="font-bold text-gray-900"
                  >Total</span
                >
                <span class="font-bold text-gray-900"
                  >{formattedPrice}</span
                >
              </div>
              <p class="text-xs text-gray-500 mt-1">
                All prices in USD
              </p>
            </div>

            <div
              class="flex items-center text-sm text-gray-600 pt-2"
            >
              <svg
                class="w-4 h-4 mr-1 text-green-500"
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
              14-day free trial, cancel anytime
            </div>
          </div>
        </div>
      </div>

      <!-- Payment form -->
      <div class="lg:col-span-2">
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3
            class="text-lg font-semibold text-gray-900 mb-6 flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2 text-blue-600"
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
            Payment Details
          </h3>

          <PaymentForm
            {amount}
            currency="USD"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />

          <!-- Back button -->
          <button
            on:click={() => (paymentStep = "plan")}
            class="mt-6 text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to plans
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Confirmation Section -->
  {#if paymentStep === "confirm"}
    <div
      class="max-w-2xl mx-auto text-center"
      in:fly={{ y: 20, duration: 600 }}
    >
      {#if paymentStatus === "success"}
        <div class="bg-white rounded-2xl shadow-xl p-12">
          <div
            class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your transaction
            has been completed successfully.
          </p>

          <div
            class="bg-gray-50 rounded-lg p-6 mb-8 text-left"
          >
            <div
              class="flex justify-between items-center mb-4"
            >
              <span class="text-gray-600"
                >Transaction ID</span
              >
              <span class="font-mono text-sm text-gray-900"
                >{paymentResult?.paymentIntentId ||
                  "N/A"}</span
              >
            </div>
            <div
              class="flex justify-between items-center mb-4"
            >
              <span class="text-gray-600">Amount</span>
              <span class="font-bold text-gray-900"
                >{formatAmount(amount)}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Date</span>
              <span class="text-gray-900"
                >{new Date().toLocaleDateString()}</span
              >
            </div>
          </div>

          <div class="space-x-4">
            <button
              on:click={() => goto("/dashboard")}
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
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
            </button>
            <button
              on:click={resetPayment}
              class="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Make Another Payment
            </button>
          </div>
        </div>
      {:else if paymentStatus === "error"}
        <div class="bg-white rounded-2xl shadow-xl p-12">
          <div
            class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            {paymentError ||
              "Something went wrong with your payment. Please try again."}
          </p>

          <button
            on:click={resetPayment}
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Test controls (development only) -->
  {#if isDev}
    <div class="fixed bottom-6 right-6 z-50">
      <button
        on:click={() =>
          (showTestControls = !showTestControls)}
        class="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {#if showTestControls}
        <div
          class="absolute bottom-16 right-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
          transition:fly={{ y: 10, duration: 200 }}
        >
          <h4 class="font-semibold text-gray-900 mb-3">
            Test Controls
          </h4>
          <div class="space-y-2">
            <label class="block text-sm text-gray-700"
              >Test Country</label
            >
            <select
              bind:value={detectedCountry}
              on:change={() => {
                if (detectedCountry) {
                  localStorage.setItem(
                    "test_country",
                    detectedCountry
                  );
                  window.location.reload();
                }
              }}
              class="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="CH">Switzerland</option>
              <option value="IN">India</option>
              <option value="JP">Japan</option>
            </select>

            <div class="pt-2">
              <button
                on:click={() => {
                  localStorage.removeItem("test_country");
                  window.location.reload();
                }}
                class="text-xs text-gray-500 hover:text-gray-700"
              >
                Reset to auto-detect
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</main>

<style>
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
</style>
