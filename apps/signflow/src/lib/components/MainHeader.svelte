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
  class="fixed inset-x-0 bg-white top-0 z-20 border-b bg-white dark:border-gray-800 dark:bg-dark-background"
>
  <nav
    class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4"
  >
    <!-- Logo -->

    <a href="/">
      <!-- <div class="zaya-img" /> -->
      <!-- <Logo class="h-8 w-20" /> -->
      <span class="zaya notranslate">Zaya Barrini</span>
    </a>

    <!-- Desktop Navigation (Hidden on small screens) -->
    <div class="hidden sm:flex items-center space-x-4">
      <IconLink href="/list?query=Psychoanalysis"
        >Psychoanalysis</IconLink
      >
      <IconLink href="/posts">Posts</IconLink>

      <IconLink href="/list?query=Languages"
        >Languages</IconLink
      >
      <IconLink href="/list?query=Practice"
        >Practice</IconLink
      >
      <IconLink href="/grammar">Grammar</IconLink>
      <IconLink href="/list?query=CVs">
        <span class="zaya notranslate">Zaya</span>
      </IconLink>
      <!-- <SearchButton /> -->
      <DarkmodeButton />
      <IconLink
        href="https://www.youtube.com/@zayabarrini"
        target="_blank"
      >
        <YouTubeIcon class="h-8 w-8 fill-current" />
      </IconLink>
      <IconLink
        href="https://github.com/tallesbarrini"
        target="_blank"
      >
        <GithubIcon class="h-8 w-8 fill-current" />
      </IconLink>
    </div>

    <!-- Sidebar Toggle Button (Mobile) -->
    <SearchButton />

    <button class="sm:hidden p-2" on:click={toggleSidebar}>
      ☰
    </button>
  </nav>

  <!-- Sidebar (for mobile) -->
  <aside
    class={`fixed inset-y-0 left-0 w-full bg-white dark:bg-dark-backgroud p-4 shadow-lg sidebar ${
      isOpen ? "" : "closed"
    }`}
  >
    <div class="flex justify-between items-center">
      <a href="/"> <Logo class="h-8 w-20" /> </a>
      <button on:click={toggleSidebar} class="p-2 text-xl"
        >✕</button
      >
    </div>
    <nav class="mt-4 flex flex-col space-y-4">
      <IconLink href="/list?query=Psychoanalysis"
        >Psychoanalysis</IconLink
      ><IconLink href="/posts">Posts</IconLink>
      <IconLink href="/courses">Courses</IconLink>
      <IconLink href="/list?query=Practice"
        >Practice</IconLink
      >
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
        href="https://github.com/tallesbarrini"
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
