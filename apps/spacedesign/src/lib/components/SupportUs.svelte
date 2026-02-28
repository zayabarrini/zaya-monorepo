<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let visible = false;

  onMount(() => {
    visible = true;
  });

  const copyPIX = () => {
    const pixCode =
      "00020101021126580014br.gov.bcb.pix013678dfe124-00aa-4a62-90eb-d6f203c7af7c";
    navigator.clipboard.writeText(pixCode).then(() => {
      alert("PIX code copied to clipboard!");
    });
  };

  const copyBitcoin = () => {
    const bitcoinAddress =
      "bc1qrc2e063twsfy9fdl0lleypcrujn8lyhucmpfdn";
    navigator.clipboard
      .writeText(bitcoinAddress)
      .then(() => {
        alert("Bitcoin address copied to clipboard!");
      });
  };
</script>

<div
  class="support-container prose"
  in:fade={{ duration: 500 }}
>
  <!-- Hero Section -->
  <section
    class="hero-section"
    in:fade={{ delay: 100, duration: 600 }}
  >
    <div class="hero-content">
      <h1>Support the Psychoanalytic School & Community</h1>
      <p class="lead">
        Join us in building a vibrant space for
        psychoanalysis, digital art, and cinema. Your
        contribution fuels our mission of education,
        transformation, and cultural creation.
      </p>
      <div class="divider" />
    </div>
  </section>

  <!-- How to Support -->
  <section
    class="section"
    in:fade={{ delay: 200, duration: 600 }}
  >
    <div class="section-header">
      <h2><span class="icon">🌟</span> How to Support</h2>
    </div>

    <!-- Recurring Contributions -->
    <div
      class="recurring-section"
      in:fade={{ delay: 400, duration: 600 }}
    >
      <h2>Recurring Contributions</h2>
      <div class="platform-grid">
        <a
          href="https://www.kickante.com.br/crowdfunding/escola-de-psicanalise-talles-barrini"
          target="_blank"
          class="platform-card accent-primary"
        >
          Kickante
        </a>
        <a
          href="https://apoia.se/zayabarrini"
          target="_blank"
          class="platform-card accent-secondary"
        >
          Apoia-se
        </a>
        <a
          href="https://buymeacoffee.com/zayabarrini"
          target="_blank"
          class="platform-card accent-tertiary"
        >
          Buy Me a Coffee
        </a>
      </div>
    </div>

    <!-- Quick Donations -->
    <div
      class="card-group"
      in:fade={{ delay: 300, duration: 600 }}
    >
      <h3>Quick Donations</h3>

      <div class="donation-grid">
        <!-- PIX Card -->
        <div class="donation-card accent-primary">
          <div class="donation-icon">🇧🇷</div>
          <h4>PIX (Brazil)</h4>
          <div class="pix-code" onclick={copyPIX}>
            <code>000201...c7af7c</code>
            <button
              class="copy-btn"
              title="Copy to clipboard">📋</button
            >
          </div>
          <!-- <small>Click to copy full code</small> -->
        </div>

        <!-- Wise Card -->
        <div class="donation-card accent-secondary">
          <div class="donation-icon">🌍</div>
          <h4>Wise (International)</h4>
          <a
            href="mailto:tallesberrini@gmail.com"
            class="donation-link"
          >
            tallesberrini@gmail.com or @tallesdeoliveiraf
          </a>
          <!-- <small></small> -->
        </div>

        <!-- Bitcoin Card -->
        <div class="donation-card accent-tertiary">
          <div class="donation-icon">₿</div>
          <h4>Cryptocurrency Bitcoin (BTC)</h4>
          <div
            class="bitcoin-address"
            onclick={copyBitcoin}
          >
            <code>bc1qrc...cmpfdn</code>
            <button
              class="copy-btn"
              title="Copy to clipboard">📋</button
            >
          </div>
          <!-- <small>Bitcoin (BTC)</small> -->
        </div>

        <!-- Amazon Card -->
        <div class="donation-card accent-primary">
          <div class="donation-icon">🎁</div>
          <h4>Amazon Wishlist</h4>
          <a
            href="https://www.amazon.com.br/hz/wishlist/ls/3UUK9DJ1OZ20S?ref_=wl_share"
            target="_blank"
            class="donation-link"
          >
            View our list
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Vision -->
  <section
    class="vision-section"
    in:fade={{ delay: 500, duration: 600 }}
  >
    <div class="section-header">
      <h2>
        <span class="icon">🏛️</span> Our Vision: A Space for
        Creation & Connection
      </h2>
    </div>
    <p>
      We are building a physical and digital <strong
        >Psychoanalysis, Digital Art, and Cinema Space</strong
      > to foster:
    </p>

    <div class="vision-grid">
      <div class="vision-item accent-primary">
        <div class="vision-icon">🤝</div>
        <h4>Social bonds</h4>
        <p>Meaningful exchange and community building</p>
      </div>
      <div class="vision-item accent-secondary">
        <div class="vision-icon">🎨</div>
        <h4>Artistic expression</h4>
        <p>Interdisciplinary dialogue and creativity</p>
      </div>
      <div class="vision-item accent-tertiary">
        <div class="vision-icon">🧠</div>
        <h4>Clinical training</h4>
        <p>Seminars, supervision, and research</p>
      </div>
      <div class="vision-item accent-primary">
        <div class="vision-icon">🌟</div>
        <h4>Public events</h4>
        <p>
          Like <em>SextArte</em> and other community gatherings
        </p>
      </div>
    </div>
  </section>

  <!-- Goals & Next Steps -->
  <section
    class="goals-section"
    in:fade={{ delay: 600, duration: 600 }}
  >
    <div class="section-header">
      <h2>
        <span class="icon">🚀</span> Goals & Next Steps
      </h2>
    </div>
    <div class="goals-grid">
      <ul class="goals-list">
        <li>Launch the <em>Non-Todx</em> course</li>
        <li>Publish <em>Máquinas Psicanalíticas</em></li>
        <li>
          Release recordings on <em>LGBTQIAP+ Parenting</em>
        </li>
        <li>
          Develop digital art projects and freelance sales
        </li>
        <li>Write screenplay for international cinema</li>
        <li>
          Build the <strong>Zaya Barrini</strong> website/app
        </li>
        <li>Produce an AI-edited audio album</li>
        <li>
          Establish partnerships with publishers, directors,
          producers, and artists
        </li>
      </ul>
    </div>
  </section>

  <!-- Products & Services -->
  <section
    class="products-section"
    in:fade={{ delay: 700, duration: 600 }}
  >
    <div class="section-header">
      <h2>
        <span class="icon">📚</span> Invest in Your Growth &
        Our Community
      </h2>
    </div>

    <div class="products-grid">
      <div class="service-card accent-primary">
        <h3>Clinical & Educational Services</h3>
        <ul>
          <li>
            <strong>Psychoanalytic Practice:</strong> Begin,
            continue, or conclude your analytic journey.
          </li>
          <li>
            <strong>Supervision:</strong> Guidance on analytic
            structure, direction, and complex cases.
          </li>
          <li>
            <strong>Study & Research Groups:</strong> Training
            in psychoanalysis, language, cinema, and culture.
          </li>
        </ul>
      </div>

      <div class="service-card accent-secondary">
        <h3>Digital Products & Courses</h3>
        <div class="course-card">
          <h4>
            Figures in Psychoanalysis: The Child, Evil, and
            Neurosis
          </h4>
          <a
            href="https://go.hotmart.com/V85752654T"
            target="_blank"
            class="course-link accent-primary"
          >
            Access Course
          </a>
        </div>
        <div class="course-card">
          <h4>
            Psychoanalysis and Artificial Intelligence
          </h4>
          <a
            href="https://go.hotmart.com/B85742391D"
            target="_blank"
            class="course-link accent-secondary"
          >
            Access Course
          </a>
        </div>
        <div class="coupon-banner accent-tertiary">
          🎉 Use coupon <code>zayabarrini</code> for 15% off
          until April 20.
        </div>
      </div>
    </div>
  </section>

  <!-- Resources & Partnerships -->
  <section
    class="resources-section"
    in:fade={{ delay: 800, duration: 600 }}
  >
    <div class="resources-grid">
      <div class="resource-column accent-primary">
        <h3>
          <span class="icon">📂</span> Resources & Materials
        </h3>
        <a
          href="https://drive.google.com/drive/folders/1RVQs75Obb9ZXaLrUQwucCaye87eqvoHr?usp=sharing"
          target="_blank"
          class="resource-link"
        >
          Google Drive Folder
        </a>
        <p>Slides, Membership Materials & Ebooks</p>
      </div>

      <div class="resource-column accent-secondary">
        <h3>
          <span class="icon">🤝</span> Partnerships & Collaboration
        </h3>
        <div class="presentation-links">
          <a
            href="https://shorturl.at/dfuI9"
            target="_blank"
            class="presentation-link"
          >
            Cinema, Art & Psychoaxis
          </a>
          <a
            href="https://docs.google.com/presentation/d/1MGYJgJPWMmoz7mkZWdFOs3cxNQC9fnZreEX7RPo5Mw/edit?usp=sharing"
            target="_blank"
            class="presentation-link"
          >
            School of Cinema, Art & Psychoanalysis
          </a>
          <a
            href="https://docs.google.com/presentation/d/1pdimAblLJPtOYCBqVitH2cV4O96BFWeopLXrl-fuJ4/edit?usp=sharing"
            target="_blank"
            class="presentation-link"
          >
            AI & Psychoanalysis
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Stay Connected -->
  <section
    class="connect-section"
    in:fade={{ delay: 900, duration: 600 }}
  >
    <div class="section-header">
      <h2><span class="icon">📢</span> Stay Connected</h2>
    </div>

    <div class="connect-grid">
      <a
        href="https://t.me/zayabarrini"
        target="_blank"
        class="connect-card accent-primary"
      >
        <div class="connect-icon">📢</div>
        <h4>Telegram Channel</h4>
      </a>

      <a
        href="https://chat.whatsapp.com/JGlGyJQirVK2nshslvTsen"
        target="_blank"
        class="connect-card accent-secondary"
      >
        <div class="connect-icon">💬</div>
        <h4>WhatsApp Community</h4>
      </a>

      <a
        href="https://linktr.ee/zayabarrini"
        target="_blank"
        class="connect-card accent-tertiary"
      >
        <div class="connect-icon">🔗</div>
        <h4>All Links</h4>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer
    class="support-footer"
    in:fade={{ delay: 1000, duration: 600 }}
  >
    <div class="footer-content">
      <h3>Let's begin this journey together.</h3>
      <div class="contact-info">
        <p><strong>Zaya Barrini</strong></p>
        <p>
          📧 <a
            href="mailto:tallesconsultoriapessoal@gmail.com"
            >tallesconsultoriapessoal@gmail.com</a
          >
        </p>
        <p>📱 +55 (35) 99772-6990</p>
        <p>
          🌐 <a
            href="https://linktr.ee/zayabarrini"
            target="_blank">@zayabarrini</a
          >
        </p>
      </div>
      <p class="footer-note">
        <em
          >Your support transforms psychoanalytic practice,
          artistic expression, and cultural innovation.
          Thank you for being part of our community.</em
        >
      </p>
    </div>
  </footer>
</div>

<style>
  .support-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: "Lora", serif;
    color: var(--text-color);
    position: relative;
    z-index: 1;
  }

  /* Define box-shadow variable */
  .support-container {
    --box-shadow: 0 4px 8px
      color-mix(
        in srgb,
        var(--text-color) 20%,
        transparent 80%
      );
    --box-shadow-strong: 0 8px 32px
      color-mix(
        in srgb,
        var(--text-color) 15%,
        transparent 85%
      );
    --box-shadow-hover: 0 20px 40px
      color-mix(
        in srgb,
        var(--text-color) 25%,
        transparent 75%
      );
  }

  /* Accent color classes using your color-mix variables */
  .accent-primary {
    --accent-color: color-mix(
      in srgb,
      var(--background-color) 70%,
      #91476c 30%
    );
    --accent-light: color-mix(
      in srgb,
      var(--background-color) 90%,
      #91476c 10%
    );
    --accent-dark: color-mix(
      in srgb,
      var(--background-color) 50%,
      #91476c 50%
    );
  }

  .accent-secondary {
    --accent-color: color-mix(
      in srgb,
      var(--background-color) 70%,
      #3e975c 30%
    );
    --accent-light: color-mix(
      in srgb,
      var(--background-color) 90%,
      #3e975c 10%
    );
    --accent-dark: color-mix(
      in srgb,
      var(--background-color) 50%,
      #3e975c 50%
    );
  }

  .accent-tertiary {
    --accent-color: color-mix(
      in srgb,
      var(--background-color) 70%,
      #a414b4 30%
    );
    --accent-light: color-mix(
      in srgb,
      var(--background-color) 90%,
      #a414b4 10%
    );
    --accent-dark: color-mix(
      in srgb,
      var(--background-color) 50%,
      #a414b4 50%
    );
  }

  /* Fallback for browsers without color-mix support */
  @supports not (color-mix(in srgb, black, white)) {
    .accent-primary {
      --accent-color: #7a3a5c;
      --accent-light: #a37d94;
      --accent-dark: #5d2c46;
    }
    .accent-secondary {
      --accent-color: #2d7045;
      --accent-light: #7da88e;
      --accent-dark: #215533;
    }
    .accent-tertiary {
      --accent-color: #9039a0;
      --accent-light: #b87bc4;
      --accent-dark: #6c2b78;
    }
  }

  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
    padding: 3rem 2rem;
    margin-top: 3rem;
    background:
      radial-gradient(
        circle at 20% 50%,
        rgba(var(--blob-1), 0.25),
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(var(--blob-2), 0.15),
        transparent 50%
      ),
      var(--background-color);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    color: var(--text-color);
  }

  .hero-content h1 {
    font-family: "Open Sans", serif;
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    background: linear-gradient(
      135deg,
      color-mix(
        in srgb,
        var(--text-color) 90%,
        #91476c 10%
      ),
      color-mix(in srgb, var(--text-color) 90%, #a414b4 10%)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: var(--text-color);
  }

  .lead {
    font-size: 1.25rem;
    line-height: 1.7;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    color: var(--text-color);
  }

  .divider {
    height: 2px;
    width: 100px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color, #91476c),
      transparent
    );
    margin: 2.5rem auto;
    border-radius: 1px;
  }

  .section {
    margin: 4rem 0;
  }

  .section-header {
    margin-bottom: 2.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
    color: var(--text-color);
  }

  .section-header h2 {
    font-family: "Open Sans", serif;
    font-size: 2rem;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .icon {
    font-size: 1.8rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    color: var(--text-color);
  }

  .card-group {
    margin-top: 2rem;
    background: color-mix(
      in srgb,
      var(--background-color) 95%,
      var(--accent-color, #91476c) 5%
    );
    padding: 2.5rem;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    margin-bottom: 2.5rem;
    box-shadow: var(--box-shadow-strong);
    display: flex;
    flex-flow: column;
    color: var(--text-color);
  }

  .card-group h3 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .donation-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 1.75rem;
    margin-top: 1rem;
  }

  .donation-card {
    background: color-mix(
      in srgb,
      var(--background-color) 90%,
      var(--accent-color) 10%
    );
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-top: 4px solid var(--accent-color);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    color: var(--text-color);
  }

  .donation-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .donation-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--box-shadow-hover);
    border-color: var(--accent-color);
  }

  .donation-card:hover::before {
    opacity: 1;
  }

  .donation-icon {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    color: var(--text-color);
  }

  .donation-card h4 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .pix-code,
  .bitcoin-address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: color-mix(
      in srgb,
      var(--background-color) 85%,
      var(--accent-color) 15%
    );
    padding: 0.875rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin: 0.75rem 0;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: monospace;
    color: var(--text-color);
  }

  .pix-code:hover,
  .bitcoin-address:hover {
    background-color: color-mix(
      in srgb,
      var(--background-color) 80%,
      var(--accent-color) 20%
    );
    border-color: var(--accent-color);
  }

  .pix-code code,
  .bitcoin-address code {
    color: var(--text-color);
  }

  .copy-btn {
    background: var(--accent-color);
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .copy-btn:hover {
    background: var(--accent-dark);
    transform: scale(1.05);
  }

  .donation-link {
    display: block;
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
    padding: 0.875rem;
    background: color-mix(
      in srgb,
      var(--background-color) 90%,
      var(--accent-color) 10%
    );
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin: 0.75rem 0;
    transition: all 0.2s ease;
    text-align: center;
  }

  .donation-link:hover {
    background-color: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
  }

  .donation-card small {
    color: var(--text-color);
    opacity: 0.8;
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }

  .recurring-section {
    background: color-mix(
      in srgb,
      var(--background-color) 95%,
      var(--accent-color) 5%
    );
    padding: 2.5rem;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow-strong);
    color: var(--text-color);

    h2 {
      color: var(--text-color);
    }
  }

  .platform-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 1.25rem;
    margin-top: 1.5rem;
  }

  .platform-card {
    background: linear-gradient(
      135deg,
      color-mix(
        in srgb,
        var(--accent-color) 40%,
        transparent 60%
      ),
      color-mix(
        in srgb,
        var(--accent-color) 20%,
        transparent 80%
      )
    );
    color: white;
    padding: 1.75rem;
    border-radius: 12px;
    text-decoration: none;
    text-align: center;
    font-family: "Open Sans", serif;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    border: 1px solid
      color-mix(
        in srgb,
        var(--accent-color) 30%,
        transparent 70%
      );
    backdrop-filter: blur(10px);
  }

  .platform-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: var(--box-shadow-hover);
    background: linear-gradient(
      135deg,
      color-mix(
        in srgb,
        var(--accent-color) 50%,
        transparent 50%
      ),
      color-mix(
        in srgb,
        var(--accent-color) 30%,
        transparent 70%
      )
    );
  }

  .vision-section,
  .goals-section,
  .products-section,
  .resources-section,
  .connect-section {
    background: color-mix(
      in srgb,
      var(--background-color) 97%,
      var(--accent-color) 3%
    );
    padding: 3rem;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow-strong);
    margin: 4rem 0;
    backdrop-filter: blur(10px);
    color: var(--text-color);
  }

  .vision-section p,
  .goals-section p,
  .products-section p,
  .resources-section p {
    color: var(--text-color);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .vision-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 2rem;
    margin-top: 2.5rem;
  }

  .vision-item {
    text-align: center;
    padding: 2rem;
    border-radius: 12px;
    background: color-mix(
      in srgb,
      var(--background-color) 92%,
      var(--accent-color) 8%
    );
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    color: var(--text-color);
  }

  .vision-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow-hover);
    border-color: var(--accent-color);
  }

  .vision-item .vision-icon {
    font-size: 2.8rem;
    margin-bottom: 1.25rem;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    color: var(--text-color);
  }

  .vision-item h4 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .vision-item p {
    color: var(--text-color);
    opacity: 0.9;
    font-size: 0.95rem;
    margin: 0;
  }

  .goals-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .goals-list li {
    padding: 1rem 0;
    padding-left: 2.5rem;
    position: relative;
    border-bottom: 1px solid var(--border-color);
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--text-color);
  }

  .goals-list li:last-child {
    border-bottom: none;
  }

  .goals-list li:before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--accent-color);
    font-weight: bold;
    font-size: 1.2rem;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 2.5rem;
    margin-top: 2.5rem;
  }

  .service-card {
    background: color-mix(
      in srgb,
      var(--background-color) 92%,
      var(--accent-color) 8%
    );
    padding: 2.5rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    border-top: 4px solid var(--accent-color);
    color: var(--text-color);
  }

  .service-card h3 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .service-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .service-card li {
    padding: 0.75rem 0;
    color: var(--text-color);
    line-height: 1.6;
    border-bottom: 1px solid var(--border-color);
  }

  .service-card li:last-child {
    border-bottom: none;
  }

  .service-card strong {
    color: var(--accent-color);
  }

  .course-card {
    background: color-mix(
      in srgb,
      var(--background-color) 94%,
      var(--accent-color) 6%
    );
    padding: 1.75rem;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    margin-bottom: 1.25rem;
    transition: all 0.3s ease;
    color: var(--text-color);
  }

  .course-card:hover {
    border-color: var(--accent-color);
    box-shadow: var(--box-shadow);
  }

  .course-card h4 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .course-link {
    display: block;
    text-align: center;
    background: var(--accent-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-family: "Open Sans", serif;
    font-weight: 600;
    margin-top: 1rem;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .course-link:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }

  .coupon-banner {
    background: linear-gradient(
      135deg,
      color-mix(
        in srgb,
        var(--accent-color) 40%,
        transparent 60%
      ),
      color-mix(
        in srgb,
        var(--accent-color) 20%,
        transparent 80%
      )
    );
    color: white;
    padding: 1.25rem;
    border-radius: 10px;
    text-align: center;
    margin-top: 1.5rem;
    font-family: "Open Sans", serif;
    font-weight: 600;
    border: 1px solid
      color-mix(
        in srgb,
        var(--accent-color) 30%,
        transparent 70%
      );
    backdrop-filter: blur(10px);
  }

  .coupon-banner code {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: monospace;
    margin: 0 0.25rem;
    color: white;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 3rem;
  }

  .resource-column {
    padding: 2rem;
    border-radius: 12px;
    background: color-mix(
      in srgb,
      var(--background-color) 94%,
      var(--accent-color) 6%
    );
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }

  .resource-column h3 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .resource-link,
  .presentation-link {
    display: block;
    background: color-mix(
      in srgb,
      var(--background-color) 88%,
      var(--accent-color) 12%
    );
    padding: 1.25rem;
    border-radius: 8px;
    color: var(--accent-color);
    text-decoration: none;
    margin: 0.75rem 0;
    border: 1px solid var(--border-color);
    transition: all 0.2s ease;
    font-family: "Open Sans", serif;
    font-weight: 500;
    text-align: center;
  }

  .resource-link:hover,
  .presentation-link:hover {
    background-color: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
    transform: translateX(5px);
  }

  .resource-column p {
    color: var(--text-color);
    opacity: 0.9;
    margin-top: 1rem;
    font-size: 0.95rem;
    text-align: center;
  }

  .connect-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 2rem;
    margin-top: 2.5rem;
  }

  .connect-card {
    background: color-mix(
      in srgb,
      var(--background-color) 92%,
      var(--accent-color) 8%
    );
    padding: 2.5rem 2rem;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    text-align: center;
    border-top: 4px solid var(--accent-color);
  }

  .connect-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--box-shadow-hover);
    border-color: var(--accent-color);
  }

  .connect-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    color: var(--text-color);
  }

  .connect-card h4 {
    font-family: "Open Sans", serif;
    color: var(--text-color);
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .support-footer {
    text-align: center;
    padding: 4rem 2rem;
    background:
      radial-gradient(
        circle at 30% 20%,
        rgba(var(--blob-1), 0.2),
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        rgba(var(--blob-3), 0.15),
        transparent 50%
      ),
      color-mix(
        in srgb,
        var(--background-color) 94%,
        var(--accent-color) 6%
      );
    border-radius: 20px;
    margin-top: 4rem;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    color: var(--text-color);
  }

  .support-footer h3 {
    font-family: "Open Sans", serif;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    font-weight: 600;
  }

  .contact-info {
    margin: 2.5rem 0;
    font-size: 1.1rem;
    color: var(--text-color);
  }

  .contact-info p {
    margin: 0.75rem 0;
    color: var(--text-color);
  }

  .contact-info a {
    color: var(--accent-color);
    text-decoration: none;
    transition: all 0.2s ease;
    border-bottom: 1px dotted transparent;
  }

  .contact-info a:hover {
    color: var(--accent-dark);
    border-bottom-color: var(--accent-color);
  }

  .footer-note {
    font-style: italic;
    opacity: 0.85;
    max-width: 600px;
    margin: 2.5rem auto 0;
    line-height: 1.7;
    font-size: 1.1rem;
    padding: 1.5rem;
    background: rgba(var(--blob-1), 0.05);
    border-radius: 10px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .support-container {
      padding: 1rem;
    }

    .hero-content h1 {
      font-size: 2rem;
    }

    .lead {
      font-size: 1.1rem;
    }

    .section-header h2 {
      font-size: 1.5rem;
    }

    .donation-grid,
    .platform-grid,
    .vision-grid,
    .connect-grid {
      grid-template-columns: 1fr;
    }

    .products-grid,
    .resources-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .vision-section,
    .goals-section,
    .products-section,
    .resources-section,
    .connect-section {
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .card-group,
    .recurring-section {
      padding: 1.5rem;
    }

    .support-footer {
      padding: 2rem 1rem;
    }
  }

  /* Animation */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
