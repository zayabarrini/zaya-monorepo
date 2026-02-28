<script lang="ts">
  export let socials = [
    {
      name: "YouTube",
      url: "https://youtube.com/TallesFaria",
      icon: "fa fa-bitbucket"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/zayabarrini",
      icon: "fa fa-instagram"
    },
    {
      name: "GitHub",
      url: "https://github.com/zayabarrini",
      icon: "fa fa-github"
    }
  ];
</script>

<div id="page15" class="bg-gray-900 text-white py-10">
  <footer class="container mx-auto px-4">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <!-- Socials Section -->
      <div>
        <strong class="text-lg">Socials</strong>
        <ul class="mt-2 space-y-2">
          {#each socials as social}
            <li>
              <a
                href={social.url}
                class="flex items-center space-x-2 hover:text-gray-300"
              >
                <i class={social.icon} />
                <span>{social.name}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Newsletter Section -->
      <div>
        <p class="text-lg font-semibold">
          Sign Up for the Newsletter
        </p>
        <p class="text-gray-400">
          Psychoanalysis and Cinema
        </p>
        <form class="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your Email"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </footer>
</div>

<!-- Copyright Section -->
<footer
  id="footer"
  class="bg-gray-800 text-white text-center py-4"
>
  <p>&copy; 2025 Zaya Barrini. All rights reserved.</p>
</footer>
