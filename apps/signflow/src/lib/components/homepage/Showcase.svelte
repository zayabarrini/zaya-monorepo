<script>
  export let data = {};
</script>

<div id="page2" class="py-10">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Left Section -->
      <div class="flex flex-col items-center">
        <div class="w-full">
          <img
            src={data.imageSrc}
            alt={data.imageAlt}
            class="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <i class="fa fa-heart text-red-500 mt-2" />
      </div>

      <!-- Right Section -->
      <div class="flex flex-col justify-center">
        <h1
          class="text-3xl font-bold text-white dark:text-white"
        >
          <a href="/posts">{data.title}</a>
        </h1>
        <p class="mt-4 text-blue-500 dark:text-gray-300">
          {data.text}
        </p>
        <a
          class="mt-4 inline-block px-6 py-3 border border-blue-500 text-white font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition"
          href="/posts"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
</div>
