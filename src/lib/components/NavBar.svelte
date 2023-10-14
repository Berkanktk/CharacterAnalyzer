<script lang="ts">
  import { theme } from "../../routes/stores";
  import { onMount } from "svelte";
  import { localeData, locale, comparisonMode } from "../../routes/stores";
  import { base } from "$app/paths";

  let localTheme: string;
  let data: any = {};
  let isComparisonMode: boolean = false;
  let mobileDropdownOpen: boolean = false;

  $: data = $localeData;
  $: isComparisonMode = $comparisonMode;

  // Function to toggle the theme
  function toggleTheme() {
    theme.update((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  // Function to change the language
  function changeLanguage(lang: string) {
    localStorage.setItem("locale", lang);
    locale.set(lang);
  }

  // Function to handle the checkbox change
  function handleComparisonModeChange(event: any) {
    const isChecked = event.target.checked;
    comparisonMode.update(() => isChecked);
  }

  // Function to toggle the mobile dropdown
  function toggleMobileDropdown() {
    mobileDropdownOpen = !mobileDropdownOpen;
  }

  // Set the theme in localStorage and update the HTML attribute on theme change
  onMount(() => {
    theme.subscribe((newTheme) => {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    });
  });
</script>

<div class="navbar w-full border-b border-base-content/10">
  <!-- Start Dropdown (shown on mobile) -->
  <div class="navbar-start md:hidden">
    <div class="dropdown">
      <button
        class="btn btn-ghost"
        tabindex="0"
        on:click={toggleMobileDropdown}
      >
        <img src="menu.svg" alt="menu" />
      </button>
      <ul
        class="{mobileDropdownOpen
          ? 'block'
          : 'hidden'} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <!-- Add a label for the languages -->
        <li><a href="{base}/about">{data.explanations}</a></li>
        <li class="text-gray-500 text-center">Languages</li>
        <li><a on:click={() => changeLanguage("en")}>English</a></li>
        <li><a on:click={() => changeLanguage("da")}>Danish</a></li>
        <li><a on:click={() => changeLanguage("tr")}>Turkish</a></li>
      </ul>
    </div>
  </div>
  <!-- End Dropdown (shown on mobile) -->

  <!-- Regular navigation (hidden on mobile) -->
  <div class="navbar-start hidden md:flex">
    <a href="{base}/about" class="btn btn-ghost">{data.explanations}</a>
    <div class="dropdown">
      <label for="language-dropdown" tabindex="0" class="m-1 btn btn-ghost">
        <img src="language.svg" alt="language" />
        {data.lang}
      </label>
      <ul
        tabindex="0"
        id="language-dropdown"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li value="en"><a on:click={() => changeLanguage("en")}>English</a></li>
        <li value="da"><a on:click={() => changeLanguage("da")}>Danish</a></li>
        <li value="tr"><a on:click={() => changeLanguage("tr")}>Turkish</a></li>
      </ul>
    </div>
  </div>

  <a class="navbar-center my-4 btn btn-ghost" href="{base}/">
    <h1 class="font-bold text-2xl md:text-3xl">{data.projectName}</h1>
  </a>

  <!-- Start of Right Navigation (hidden on mobile) -->
  <div class="navbar-end">
    <div class="form-control">
      <label class="label cursor-pointer hidden md:flex mr-1">
        <span class="label-text">{data.comparisonMode}</span>
        <input
          type="checkbox"
          class="toggle toggle-accent ml-4"
          checked={isComparisonMode}
          on:change={handleComparisonModeChange}
        />
      </label>
    </div>
    <a
      href="https://github.com/Berkanktk/CharacterAnalyzer"
      class="btn btn-ghost hidden md:flex mr-1"
      target="_blank"
    >
      <img src="github.svg" alt="github" />
    </a>
    <button class="btn btn-ghost mr-1" on:click={toggleTheme}>
      <img
        src={localTheme === "light" ? "sun.svg" : "moon.svg"}
        alt={localTheme === "light" ? "sun" : "moon"}
      />
    </button>
  </div>
  <!-- End of Right Navigation (hidden on mobile) -->
</div>
