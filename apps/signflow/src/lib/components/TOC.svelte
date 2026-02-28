<script>
  export let toc = [];
</script>

<nav
  class="p-6 rounded-lg shadow-lg pt-24 max-w-5xl mx-auto"
>
  <ul>
    {#each toc as section}
      <li class="mb-4">
        <strong class="text-lg">{section.title}</strong>
        <ul class="ml-4 mt-2 space-y-2">
          {#each section.sections as sub}
            {#if typeof sub === "string"}
              <li
                class="hover:text-gray-300 cursor-pointer"
              >
                {sub}
              </li>
            {:else}
              <li>
                <strong class="text-md">{sub.title}</strong>
                <ul class="ml-4 mt-1 space-y-1">
                  {#each sub.subsections as item}
                    <li
                      class="hover:text-gray-300 cursor-pointer"
                    >
                      {item}
                    </li>
                  {/each}
                </ul>
              </li>
            {/if}
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</nav>
