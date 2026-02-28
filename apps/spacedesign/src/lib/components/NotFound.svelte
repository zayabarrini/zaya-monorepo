{#if $filteredPosts.length === 0}
  <div
    class="flex flex-col items-center justify-center py-12 text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-16 h-16 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M12 3v2m0 14v2m8-10h2m-18 0H2m16.364 6.364l1.414-1.414M4.222 4.222l1.414 1.414"
      />
    </svg>

    <h2 class="mt-4 text-2xl font-semibold text-gray-600">
      No posts found
    </h2>

    <p class="mt-2 text-gray-500">
      Try searching with different keywords.
    </p>
  </div>
{/if}
