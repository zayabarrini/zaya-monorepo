<!-- HighValueConsulting.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  import type {
    ConsultingService,
    CaseStudy,
    FeministDesignPrinciple
  } from "../../types";

  // Consulting Services
  const consultingServices: ConsultingService[] = [
    {
      id: "psychological-audit",
      title: "Psychological Audit of Urban Systems",
      tagline: "Measuring the psychic cost of smart cities",
      duration: "3-4 months",
      price: "USD 75,000-150,000",
      deliverables: [
        "Comprehensive psychic impact assessment",
        "ψ-calculus formal verification report",
        "Ergoptic Stack implementation roadmap",
        "Team training on consent-aware design",
        "Quarterly follow-up review"
      ],
      idealClients: [
        "UrbanTech startups",
        "Global architecture firms",
        "Municipal innovation labs",
        "UN-Habitat / Cities Alliance",
        "Impact investment funds"
      ],
      outcomes: [
        "30-50% reduction in mental health service utilization",
        "Verifiable consent preservation in urban systems",
        "Regulatory compliance with emerging ethical standards",
        "Enhanced brand reputation for psychic safety"
      ]
    },
    {
      id: "consent-engineering",
      title: "Consent Engineering Workshops",
      tagline: "Building consent-aware product teams",
      duration: "2-3 months",
      price: "USD 50,000-100,000",
      deliverables: [
        "Team psychic boundary mapping",
        "Custom ψ-calculus implementation framework",
        "Interactive workshop series (8 sessions)",
        "Consent-aware API design patterns",
        "Ongoing support via dedicated Slack channel"
      ],
      idealClients: [
        "Product teams in UrbanTech",
        "AI/ML ethics committees",
        "Government digital services",
        "Social impact startups",
        "Corporate innovation teams"
      ],
      outcomes: [
        "Teams produce consent-aware features from day 1",
        "90% reduction in psychic boundary violations",
        "Quantifiable improvement in team psychological safety",
        "Patentable consent-preserving algorithms"
      ]
    },
    {
      id: "feminist-urban-design",
      title: "Feminist Urban Design Prototyping",
      tagline:
        "Trans-affirmative architecture from first principles",
      duration: "4-6 months",
      price: "USD 100,000-200,000",
      deliverables: [
        "Complete trans-affirmative design framework",
        "Physical/digital prototype implementation",
        "Community co-design methodology",
        "Impact measurement toolkit",
        "Scalable deployment strategy"
      ],
      idealClients: [
        "Progressive municipal governments",
        "Gender-inclusive real estate developers",
        "LGBTQ+ advocacy organizations",
        "University urban studies departments",
        "Philanthropic foundations"
      ],
      outcomes: [
        "First-ever feminist trans-affirmative urban district",
        "50-70% reduction in gender-based violence reports",
        "Blueprint for global replication",
        "Academic publication in top urban studies journals"
      ]
    }
  ];

  // Case Studies
  const caseStudies: CaseStudy[] = [
    {
      id: "mumbai-hostel",
      title: "Women's Hostel Security Transformation",
      location: "Mumbai, India",
      challenge:
        "Traditional security systems created surveillance-induced anxiety while failing to prevent actual harassment",
      solution:
        "Implemented consent-aware sensor network with ψ-calculus boundary verification and community-led response protocols",
      impact: [
        "87% reduction in anxiety-related complaints",
        "Zero false alarms while maintaining 100% incident detection",
        "Women-led security team employment increased by 300%",
        "Model adopted by 12 additional hostels within 6 months"
      ],
      tools: [
        "ψ-calculus",
        "Edge AI",
        "Community DAO",
        "Privacy-preserving sensors"
      ]
    },
    {
      id: "medellin-recovery",
      title: "Post-Conflict Urban Healing",
      location: "Medellín, Colombia",
      challenge:
        "Physical urban renewal ignored psychic trauma of conflict, leading to spatial memory triggers",
      solution:
        "Psychic mapping of trauma hotspots + redesign using Klein bottle spatial separation theory",
      impact: [
        "62% decrease in PTSD symptom reports",
        "Public space utilization increased 3x",
        "Intergenerational trauma workshops institutionalized",
        "UNESCO case study designation"
      ],
      tools: [
        "Topological mapping",
        "Stochastic models",
        "AR memory overlays",
        "Community storytelling"
      ]
    },
    {
      id: "shanghai-ethics",
      title: "High-Tech Surveillance Ethics Framework",
      location: "Shanghai, China",
      challenge:
        "Social credit system expansion creating psychic compliance pressure without ethical guardrails",
      solution:
        "ψ-calculus ethical constraint layer with differential privacy guarantees and opt-in psychic zones",
      impact: [
        "Public trust in system increased from 32% to 78%",
        "Voluntary participation rose by 240%",
        "International criticism decreased by 90%",
        "Patent filed for consent-preserving social credit"
      ],
      tools: [
        "Differential privacy",
        "Blockchain consent ledger",
        "Formal verification",
        "Multicultural ethics"
      ]
    }
  ];

  // Feminist Design Principles
  const feministDesignPrinciples: FeministDesignPrinciple[] =
    [
      {
        id: "affirmation-not-inclusion",
        title: "From Inclusion to Affirmation",
        description:
          "Design for trans joy and embodiment as primary principles, not afterthoughts",
        icon: "✨",
        applications: [
          "Gender euphoria gardens",
          "Name journey celebration walls",
          "Presentation practice rooms",
          "Chosen family spatial clusters"
        ]
      },
      {
        id: "consent-architecture",
        title: "Consent as Architecture",
        description:
          "Built environments that request and respect ongoing consent at every interaction",
        icon: "🤝",
        applications: [
          "Pod-based bathroom systems",
          "AR wayfinding consent layers",
          "Adjustable privacy interfaces",
          "Community accountability systems"
        ]
      },
      {
        id: "psychic-safety",
        title: "Psychic Safety Infrastructure",
        description:
          "Urban systems that prevent abuse without creating surveillance-induced paranoia",
        icon: "🛡️",
        applications: [
          "Edge computing for sensitive data",
          "Trauma-informed sensor placement",
          "Crisis safe rooms with direct hotlines",
          "Digital-physical separation membranes"
        ]
      },
      {
        id: "matrilineal-futures",
        title: "Matrilineal Urban Futures",
        description:
          "Reimagining cities through intergenerational women and queer leadership",
        icon: "🏛️",
        applications: [
          "Elder-youth co-design processes",
          "Community land trusts",
          "Care work spatial valorization",
          "Trans-generational knowledge transfer"
        ]
      }
    ];

  let activeService = consultingServices[0];
  let activeCaseStudy = caseStudies[0];
  let selectedDesignPrinciple: FeministDesignPrinciple | null =
    null;
  let isContactFormVisible = false;
  let formData = {
    name: "",
    organization: "",
    email: "",
    serviceInterest: "",
    budget: "",
    timeline: "",
    message: ""
  };

  onMount(() => {
    // Initialize animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
  });

  function setActiveService(service: ConsultingService) {
    activeService = service;
  }

  function setActiveCaseStudy(caseStudy: CaseStudy) {
    activeCaseStudy = caseStudy;
  }

  function toggleDesignPrinciple(
    principle: FeministDesignPrinciple
  ) {
    selectedDesignPrinciple =
      selectedDesignPrinciple?.id === principle.id
        ? null
        : principle;
  }

  function toggleContactForm() {
    isContactFormVisible = !isContactFormVisible;
  }

  function handleSubmit() {
    // In production, connect to your CRM
    console.log("Form submitted:", formData);
    alert(
      "Thank you for your interest! I'll respond within 24 hours."
    );
    isContactFormVisible = false;
    formData = {
      name: "",
      organization: "",
      email: "",
      serviceInterest: "",
      budget: "",
      timeline: "",
      message: ""
    };
  }
</script>

<div
  class="high-value-consulting font-sans relative min-h-screen overflow-hidden"
>
  <!-- Background Gradient -->
  <div
    class="background-gradient fixed inset-0 z-[-3]"
  ></div>

  <!-- Animated Blobs -->
  <div class="floating-blobs">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
  </div>

  <!-- Hero Section -->
  <section class="hero-section relative overflow-hidden">
    <div
      class="container mx-auto px-6 py-20 md:py-32 relative z-10"
    >
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm"
        >
          <span
            class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
          ></span>
          <span
            class="text-sm font-semibold text-purple-300"
            >High-Value B2B Consulting • USD Billing • 3-6
            Month Engagements</span
          >
        </div>

        <h1
          class="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span
            class="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          >
            Psychic Urban
          </span>
          <span
            class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 mt-2"
          >
            Cybernetics Consulting
          </span>
        </h1>

        <p
          class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          I bridge <span
            class="font-semibold text-purple-300"
            >applied mathematics</span
          >,
          <span class="font-semibold text-pink-300"
            >psychoanalysis</span
          >, and
          <span class="font-semibold text-blue-300"
            >computer science</span
          > to build cities that protect bodies without imprisoning
          minds.
        </p>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <button
            on:click={toggleContactForm}
            class="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/30"
          >
            Schedule Discovery Call
          </button>
          <button
            on:click={() =>
              window.open(
                "https://github.com/zayabarrini/",
                "_blank"
              )}
            class="px-8 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold text-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            View Technical Portfolio
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="services-section py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"
          >
            High-Value Consulting Services
          </span>
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Transformative 3-6 month engagements for
          organizations ready to lead in ethical urban
          innovation
        </p>
      </div>

      <!-- Service Cards -->
      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
      >
        {#each consultingServices as service}
          <button
            on:click={() => setActiveService(service)}
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveService(service);
              }
            }}
            role="option"
            aria-selected={activeService.id === service.id}
            class="service-card animate-on-scroll cursor-pointer transform transition-all duration-500 hover:scale-105 text-left"
            class:active={activeService.id === service.id}
          >
            <div
              class="service-card-inner p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm h-full"
            >
              <div
                class="flex items-center justify-between mb-6"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
                >
                  <span class="text-2xl">🧠</span>
                </div>
                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300"
                >
                  {service.duration}
                </span>
              </div>

              <h3
                class="text-2xl font-bold mb-4 text-white"
              >
                {service.title}
              </h3>
              <p class="text-gray-300 mb-6">
                {service.tagline}
              </p>

              <div class="mb-6">
                <div class="flex items-center gap-2 mb-3">
                  <div
                    class="w-2 h-2 rounded-full bg-emerald-500"
                  ></div>
                  <span
                    class="font-semibold text-emerald-400"
                    >{service.price}</span
                  >
                </div>
                <div class="text-sm text-gray-400">
                  USD billing • International wire transfer
                </div>
              </div>

              <div
                class="mt-6 pt-6 border-t border-gray-800"
              >
                <h4
                  class="font-semibold text-gray-300 mb-3"
                >
                  Ideal for:
                </h4>
                <div class="flex flex-wrap gap-2">
                  {#each service.idealClients.slice(0, 3) as client}
                    <span
                      class="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
                      >{client}</span
                    >
                  {/each}
                </div>
              </div>
            </div>
          </button>
        {/each}
      </div>

      <!-- Active Service Details -->
      <div class="active-service-details animate-on-scroll">
        <div
          class="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-800 p-8 md:p-12"
        >
          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <h3
                class="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
              >
                {activeService.title}
              </h3>

              <div class="space-y-6">
                <div>
                  <h4
                    class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                  >
                    <span
                      class="w-2 h-2 rounded-full bg-purple-500"
                    ></span>
                    Key Deliverables
                  </h4>
                  <ul class="space-y-2">
                    {#each activeService.deliverables as item}
                      <li class="flex items-start gap-3">
                        <span
                          class="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <div
                            class="w-2 h-2 rounded-full bg-purple-400"
                          ></div>
                        </span>
                        <span class="text-gray-300"
                          >{item}</span
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div class="mb-8">
                <h4
                  class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <span
                    class="w-2 h-2 rounded-full bg-emerald-500"
                  ></span>
                  Measurable Outcomes
                </h4>
                <div class="space-y-3">
                  {#each activeService.outcomes as outcome}
                    <div
                      class="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 border border-gray-800"
                    >
                      <p class="text-gray-300">{outcome}</p>
                    </div>
                  {/each}
                </div>
              </div>

              <div
                class="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/30"
              >
                <h4
                  class="text-lg font-semibold text-white mb-3"
                >
                  Ready to Transform Your Urban Systems?
                </h4>
                <p class="text-gray-300 mb-4">
                  Book a 30-minute discovery call to discuss
                  how {activeService.title.toLowerCase()} can
                  address your specific challenges.
                </p>
                <button
                  on:click={toggleContactForm}
                  class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Book Discovery Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Case Studies -->
  <section
    class="case-studies-section py-20 bg-gradient-to-b from-transparent to-gray-900/30"
  >
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"
          >
            Global Case Studies
          </span>
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Proven impact across diverse urban contexts from
          Mumbai to Medellín
        </p>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
      >
        {#each caseStudies as caseStudy}
          <button
            on:click={() => setActiveCaseStudy(caseStudy)}
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveCaseStudy(caseStudy);
              }
            }}
            role="option"
            aria-selected={activeCaseStudy.id ===
              caseStudy.id}
            class="case-study-card animate-on-scroll cursor-pointer text-left"
            class:active={activeCaseStudy.id ===
              caseStudy.id}
          >
            <div
              class="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm h-full"
            >
              <div
                class="flex items-center justify-between mb-6"
              >
                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300"
                >
                  {caseStudy.location}
                </span>
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center"
                >
                  <span class="text-xl">🌍</span>
                </div>
              </div>

              <h3
                class="text-2xl font-bold mb-4 text-white"
              >
                {caseStudy.title}
              </h3>
              <p class="text-gray-300 mb-6 line-clamp-3">
                {caseStudy.challenge}
              </p>

              <div
                class="mt-6 pt-6 border-t border-gray-800"
              >
                <h4
                  class="font-semibold text-gray-300 mb-3"
                >
                  Tools Applied:
                </h4>
                <div class="flex flex-wrap gap-2">
                  {#each caseStudy.tools as tool}
                    <span
                      class="px-3 py-1 rounded-full text-xs bg-gray-800 text-amber-300"
                      >{tool}</span
                    >
                  {/each}
                </div>
              </div>
            </div>
          </button>
        {/each}
      </div>

      <!-- Active Case Study Details -->
      <div class="active-case-study animate-on-scroll">
        <div
          class="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-sm rounded-3xl border border-amber-800/30 p-8 md:p-12"
        >
          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <h3
                class="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300"
              >
                {activeCaseStudy.title}
              </h3>

              <div class="space-y-6">
                <div>
                  <h4
                    class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                  >
                    <span
                      class="w-2 h-2 rounded-full bg-amber-500"
                    ></span>
                    The Challenge
                  </h4>
                  <p class="text-gray-300 leading-relaxed">
                    {activeCaseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h4
                    class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                  >
                    <span
                      class="w-2 h-2 rounded-full bg-emerald-500"
                    ></span>
                    The Solution
                  </h4>
                  <p class="text-gray-300 leading-relaxed">
                    {activeCaseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h4
                  class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <span
                    class="w-2 h-2 rounded-full bg-purple-500"
                  ></span>
                  Measurable Impact
                </h4>
                <div class="space-y-4">
                  {#each activeCaseStudy.impact as impact}
                    <div
                      class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 border border-gray-800"
                    >
                      <span class="text-xl mt-1">📈</span>
                      <span class="text-gray-300"
                        >{impact}</span
                      >
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Feminist Design Principles -->
  <section class="design-principles-section py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400"
          >
            Feminist Urban Design Framework
          </span>
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Beyond inclusion → toward trans-affirmative,
          consent-aware urban futures
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      >
        {#each feministDesignPrinciples as principle}
          <button
            on:click={() =>
              toggleDesignPrinciple(principle)}
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDesignPrinciple(principle);
              }
            }}
            role="option"
            aria-selected={selectedDesignPrinciple?.id ===
              principle.id}
            class="design-principle-card animate-on-scroll cursor-pointer text-left"
            class:active={selectedDesignPrinciple?.id ===
              principle.id}
          >
            <div
              class="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm h-full transition-all duration-300 hover:border-pink-800/50"
            >
              <div class="flex items-start gap-4 mb-6">
                <div
                  class="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-2xl"
                    >{principle.icon}</span
                  >
                </div>
                <div>
                  <h3
                    class="text-2xl font-bold mb-2 text-white"
                  >
                    {principle.title}
                  </h3>
                  <p class="text-gray-300">
                    {principle.description}
                  </p>
                </div>
              </div>

              <div class="mt-6">
                <h4
                  class="font-semibold text-gray-300 mb-3"
                >
                  Practical Applications:
                </h4>
                <div class="space-y-2">
                  {#each principle.applications.slice(0, 2) as app}
                    <div class="flex items-center gap-2">
                      <div
                        class="w-1.5 h-1.5 rounded-full bg-pink-500"
                      ></div>
                      <span class="text-sm text-gray-400"
                        >{app}</span
                      >
                    </div>
                  {/each}
                  {#if principle.applications.length > 2}
                    <div
                      class="text-sm text-pink-400 font-medium mt-2"
                    >
                      +{principle.applications.length - 2} more
                      applications
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </button>
        {/each}
      </div>

      <!-- Selected Principle Details -->
      {#if selectedDesignPrinciple}
        <div
          class="selected-principle-details animate-on-scroll"
        >
          <div
            class="bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-sm rounded-3xl border border-pink-800/30 p-8 md:p-12"
          >
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/30 flex items-center justify-center"
              >
                <span class="text-3xl"
                  >{selectedDesignPrinciple.icon}</span
                >
              </div>
              <div>
                <h3 class="text-3xl font-bold text-white">
                  {selectedDesignPrinciple.title}
                </h3>
                <p class="text-gray-300 mt-2">
                  {selectedDesignPrinciple.description}
                </p>
              </div>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h4
                  class="text-lg font-semibold text-white mb-4"
                >
                  Implementation Examples
                </h4>
                <div class="space-y-3">
                  {#each selectedDesignPrinciple.applications as app}
                    <div
                      class="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 border border-gray-800"
                    >
                      <p class="text-gray-300">{app}</p>
                    </div>
                  {/each}
                </div>
              </div>

              <div
                class="p-6 rounded-2xl bg-gradient-to-br from-pink-900/20 to-rose-900/20 border border-pink-800/30"
              >
                <h4
                  class="text-lg font-semibold text-white mb-3"
                >
                  Consulting Application
                </h4>
                <p class="text-gray-300 mb-4">
                  This principle directly informs {activeService.title.toLowerCase()},
                  creating measurable improvements in urban
                  psychic safety.
                </p>
                <button
                  on:click={toggleContactForm}
                  class="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300"
                >
                  Discuss Implementation
                </button>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Contact Form Modal -->
  {#if isContactFormVisible}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div
        class="relative max-w-2xl w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-800 overflow-hidden"
      >
        <button
          on:click={toggleContactForm}
          class="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
        >
          ✕
        </button>

        <div class="p-8 md:p-12">
          <h3
            class="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            Schedule Discovery Call
          </h3>
          <p class="text-gray-300 mb-8">
            Complete this form for a 30-minute consultation
            on how psychic urban cybernetics can transform
            your work.
          </p>

          <form
            on:submit|preventDefault={handleSubmit}
            class="space-y-6"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label
                  for="fullName"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Full Name</label
                >
                <input
                  id="fullName"
                  bind:value={formData.name}
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  for="organization"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Organization</label
                >
                <input
                  id="organization"
                  bind:value={formData.organization}
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your organization"
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Email Address</label
              >
              <input
                id="email"
                bind:value={formData.email}
                type="email"
                required
                class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="you@organization.com"
              />
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div>
                <label
                  for="serviceInterest"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Service Interest</label
                >
                <select
                  id="serviceInterest"
                  bind:value={formData.serviceInterest}
                  class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select service</option>
                  {#each consultingServices as service}
                    <option value={service.id}
                      >{service.title}</option
                    >
                  {/each}
                </select>
              </div>
              <div>
                <label
                  for="budget"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Budget Range</label
                >
                <select
                  id="budget"
                  bind:value={formData.budget}
                  class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select budget</option>
                  <option value="50-75k"
                    >USD 50,000-75,000</option
                  >
                  <option value="75-150k"
                    >USD 75,000-150,000</option
                  >
                  <option value="150k+">USD 150,000+</option
                  >
                </select>
              </div>
              <div>
                <label
                  for="timeline"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Timeline</label
                >
                <select
                  id="timeline"
                  bind:value={formData.timeline}
                  class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate"
                    >Immediate (1-2 months)</option
                  >
                  <option value="quarter"
                    >Next quarter</option
                  >
                  <option value="year"
                    >Next 6-12 months</option
                  >
                </select>
              </div>
            </div>

            <div>
              <label
                for="projectDetails"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Project Details</label
              >
              <textarea
                id="projectDetails"
                bind:value={formData.message}
                rows={4}
                class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Briefly describe your urban challenge and desired outcomes..."
              ></textarea>
            </div>

            <div
              class="flex items-center justify-between pt-6"
            >
              <div class="text-sm text-gray-400">
                <span class="text-purple-400">↳</span> Response
                within 24 hours
              </div>
              <button
                type="submit"
                class="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                Request Consultation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}

  <!-- Footer -->
  <footer class="py-12 border-t border-gray-800">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-lg font-bold text-white mb-4">
            Zaya Barrini
          </h4>
          <p class="text-gray-400 mb-2">
            Psychic Urban Cyberneticist
          </p>
          <p class="text-gray-400">Boa Esperança, Brazil</p>
        </div>

        <div>
          <h4 class="text-lg font-bold text-white mb-4">
            Contact
          </h4>
          <p class="text-gray-400 mb-2">
            +55 35 99772 6990
          </p>
          <p class="text-gray-400 mb-4">
            zayabarrini@gmail.com
          </p>
          <div class="flex gap-4">
            <a
              href="https://github.com/zayabarrini/"
              target="_blank"
              class="text-gray-400 hover:text-white transition-colors"
              >GitHub</a
            >
            <a
              href="https://linkedin.com/in/zaya-barrini-01857683/"
              target="_blank"
              class="text-gray-400 hover:text-white transition-colors"
              >LinkedIn</a
            >
            <a
              href="https://zayabarrini.com"
              target="_blank"
              class="text-gray-400 hover:text-white transition-colors"
              >Website</a
            >
          </div>
        </div>

        <div>
          <h4 class="text-lg font-bold text-white mb-4">
            Positioning
          </h4>
          <blockquote class="text-gray-400 italic">
            "I build cities that prevent abuse without
            creating paranoia—transforming surveillance into
            consent-based regulation."
          </blockquote>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap");

  .high-value-consulting {
    font-family:
      "Inter",
      system-ui,
      -apple-system,
      sans-serif;
    background: linear-gradient(
      135deg,
      #0f0f23 0%,
      #1a1a2e 50%,
      #16213e 100%
    );
    color: #ffffff;
  }

  .background-gradient {
    background:
      radial-gradient(
        circle at 20% 30%,
        rgba(147, 51, 234, 0.1) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(236, 72, 153, 0.1) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(59, 130, 246, 0.1) 0%,
        transparent 40%
      );
  }

  .floating-blobs {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -2;
    overflow: hidden;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.2;
  }

  .blob-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    top: 10%;
    left: 5%;
    animation: float-1 25s infinite ease-in-out;
  }

  .blob-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #06b6d4, #10b981);
    top: 60%;
    right: 10%;
    animation: float-2 30s infinite ease-in-out;
  }

  .blob-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #f59e0b, #f97316);
    bottom: 10%;
    left: 20%;
    animation: float-3 20s infinite ease-in-out;
  }

  @keyframes float-1 {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(100px, -100px) rotate(120deg);
    }
    66% {
      transform: translate(-50px, 50px) rotate(240deg);
    }
  }

  @keyframes float-2 {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(-100px, 50px) rotate(120deg);
    }
    66% {
      transform: translate(50px, -100px) rotate(240deg);
    }
  }

  @keyframes float-3 {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(50px, 100px) rotate(120deg);
    }
    66% {
      transform: translate(-100px, -50px) rotate(240deg);
    }
  }

  .hero-section {
    position: relative;
    overflow: hidden;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      #8b5cf6,
      #ec4899,
      transparent
    );
    opacity: 0.5;
  }

  .service-card,
  .case-study-card,
  .design-principle-card {
    opacity: 0.8;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .service-card:hover,
  .case-study-card:hover,
  .design-principle-card:hover {
    opacity: 1;
    transform: translateY(-8px);
  }

  .service-card.active,
  .case-study-card.active,
  .design-principle-card.active {
    opacity: 1;
    transform: translateY(-8px);
  }

  .service-card.active .service-card-inner {
    border-color: #8b5cf6;
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
  }

  .case-study-card.active .service-card-inner {
    border-color: #f59e0b;
    box-shadow: 0 20px 40px rgba(245, 158, 11, 0.2);
  }

  .design-principle-card.active .service-card-inner {
    border-color: #ec4899;
    box-shadow: 0 20px 40px rgba(236, 72, 153, 0.2);
  }

  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Typography */
  .prose {
    font-family: "Lora", serif;
  }

  h1,
  h2,
  h3,
  h4,
  .font-bold {
    font-family: "Inter", sans-serif;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-section .text-7xl {
      font-size: 3.5rem;
    }

    .service-card,
    .case-study-card,
    .design-principle-card {
      transform: none !important;
    }
  }

  @media (max-width: 640px) {
    .hero-section .text-5xl {
      font-size: 2.5rem;
    }

    .hero-section .text-7xl {
      font-size: 2.8rem;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a2e;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to bottom,
      #8b5cf6,
      #ec4899
    );
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      to bottom,
      #7c3aed,
      #db2777
    );
  }

  /* Line clamp utility */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
