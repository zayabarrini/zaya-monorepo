<script>
  import DarkmodeButton from "./DarkmodeButton.svelte";
  import IconLink from "./IconLink.svelte";
  import GithubIcon from "./svg/GithubIcon.svelte";
  import Logo from "./svg/ZayaIcon.svelte";
  import YouTubeIcon from "./svg/YoutubeIcon.svelte";
  import SearchButton from "./SearchButton.svelte";

  let isOpen = false;

  const toggleSidebar = () => {
    isOpen = !isOpen;
  };
</script>

<header
  class="fixed inset-x-0 bg-white text-black top-0 z-20 border-b dark:border-gray-800 dark:bg-dark-background"
>
  <nav
    class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4"
  >
    <!-- Logo -->
    <a href="/">
      <span class="zaya notranslate">Zaya Barrini</span>
    </a>

    <!-- Desktop Navigation (Hidden on medium and small screens) -->
    <div class="hidden lg:flex items-center space-x-4">
      <IconLink href="/list?query=Psychoanalysis"
        >Psychoanalysis</IconLink
      >
      <IconLink href="/list?query=Topology"
        >Topology</IconLink
      >
      <IconLink href="/posts">Blog</IconLink>
      <IconLink href="/courses">Courses</IconLink>
      <!-- <IconLink href="/list?query=School">School</IconLink> -->
      <IconLink href="/consulting">Consulting</IconLink>
      <IconLink href="/support">Contribute</IconLink>
      <IconLink href="/cinema">Cinema</IconLink>
      <IconLink href="/list?query=CVs">
        <span class="zaya notranslate">Zaya</span>
      </IconLink>
      <DarkmodeButton />
      <IconLink
        href="https://www.youtube.com/@zayabarrini"
        target="_blank"
      >
        <YouTubeIcon class="h-6 w-6 fill-current" />
      </IconLink>
      <IconLink
        href="https://github.com/zayabarrini"
        target="_blank"
      >
        <GithubIcon class="h-6 w-6 fill-current" />
      </IconLink>
    </div>

    <!-- Medium screen compact navigation (768px - 1023px) -->
    <div
      class="hidden md:flex lg:hidden items-center space-x-3"
    >
      <IconLink href="/posts">Blog</IconLink>
      <IconLink href="/courses">Courses</IconLink>
      <IconLink href="/cinema">Cinema</IconLink>
      <DarkmodeButton />
      <IconLink
        href="https://www.youtube.com/@zayabarrini"
        target="_blank"
      >
        <YouTubeIcon class="h-6 w-6 fill-current" />
      </IconLink>
    </div>
    <SearchButton />

    <!-- Mobile buttons (search and menu) -->
    <div class="flex items-center space-x-2 md:hidden">
      <button class="p-2" on:click={toggleSidebar}
        >☰</button
      >
    </div>

    <!-- Desktop search button -->
    <!-- <div class="hidden md:flex lg:hidden items-center">
      <SearchButton />
    </div> -->
  </nav>

  <!-- Sidebar (for mobile) -->
  <aside
    class={`fixed inset-y-0 left-0 w-full bg-white dark:bg-dark-backgroud p-4 shadow-lg sidebar ${
      isOpen ? "" : "closed"
    }`}
  >
    <div class="flex justify-between items-center">
      <a href="/">
        <span class="zaya notranslate">Zaya Barrini</span>
      </a>
      <button on:click={toggleSidebar} class="p-2 text-xl"
        >✕</button
      >
    </div>
    <nav class="mt-4 flex flex-col space-y-4">
      <IconLink href="/list?query=Psychoanalysis"
        >Psychoanalysis</IconLink
      >
      <IconLink href="/list?query=Topology"
        >Topology</IconLink
      >
      <IconLink href="/posts">Blog</IconLink>
      <IconLink href="/courses">Courses</IconLink>
      <!-- <IconLink href="/list?query=School">School</IconLink> -->
      <IconLink href="/consulting">Consulting</IconLink>
      <IconLink href="/list?query=Art">Art</IconLink>
      <IconLink href="/cinema">Cinema</IconLink>
      <IconLink href="/list?query=CVs">
        <span class="zaya notranslate">Zaya</span>
      </IconLink>
      <DarkmodeButton />
      <IconLink
        href="https://www.youtube.com/@zayabarrini"
        target="_blank"
      >
        <YouTubeIcon class="h-8 w-8 fill-current" />
      </IconLink>
      <IconLink
        href="https://github.com/zayabarrini"
        target="_blank"
      >
        <GithubIcon class="h-8 w-8 fill-current" />
      </IconLink>
    </nav>
  </aside>
</header>

<style>
  .sidebar {
    transition: transform 0.3s ease-in-out;
  }
  .sidebar.closed {
    transform: translateX(-100%);
  }
</style>
