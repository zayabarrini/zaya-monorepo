<script>
  export let title = "";
  export let text = "";
  export let href = "#";
  export let backgroundImage = "";
</script>

<section
  class="relative h-[600px] mt-20 rounded-[60%] bg-cover bg-fixed bg-center opacity-90 shadow-xl"
  style="background-image: url({backgroundImage});"
>
  <div class="absolute inset-0 bg-black/50 rounded-[60%]" />

  <div
    class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6"
  >
    <h2
      class="text-4xl md:text-5xl font-bold leading-tight"
    >
      {title}
    </h2>
    <p class="text-lg md:text-xl mt-2">{text}</p>
    <!-- <a
      {href}
      class="mt-4 px-6 py-3 bg-blue-100 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
    >
      Read More
    </a> -->
    <a
      {href}
      target="_blank"
      rel="noopener noreferrer"
      class="px-6 py-3 bg-gradient-to-r from-blue-950 to-blue-1000 text-white font-semibold rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      📖 Access <span class="font-bold">{title}</span>
    </a>
  </div>
</section>
