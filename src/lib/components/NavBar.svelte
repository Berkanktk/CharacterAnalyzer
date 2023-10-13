<script lang="ts">
  import { theme } from "../../routes/stores";
  import { onMount } from "svelte";
  import {localeData, locale, comparisonMode} from "../../routes/stores";
  import { base } from '$app/paths';

  let localTheme: string;
  let data: any = {};
  let isComparisonMode: boolean = false;

  $: data = $localeData;
  $: isComparisonMode = $comparisonMode;

  // Function to toggle the theme
  function toggleTheme() {
    theme.update((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  function changeLanguage(lang: string) {
    localStorage.setItem("locale", lang);
    locale.set(lang);
  }

  // Set the theme in localStorage and update the HTML attribute on theme change
  onMount(() => {
    theme.subscribe((newTheme) => {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    });
  });

  // Function to toggle comparison mode
  function toggleComparisonMode() {
    comparisonMode.update((currentMode) => !currentMode);
  }
</script>

<div class="navbar w-full border-b border-base-content/10">
  <div class="navbar-start">
    <a href="{base}/about" class="btn btn-ghost">{data.explanations}</a>

    <div class="dropdown">
      <label for="language-dropdown" tabindex="0" class="m-1 btn btn-ghost">
        <img src="language.svg" alt="language" />
        {data.lang}
      </label>
      <ul tabindex="0" id="language-dropdown" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li value="en"><a on:click={() => changeLanguage('en')}>English</a></li>
        <li value="da"><a on:click={() => changeLanguage('da')}>Danish</a></li>
        <li value="tr"><a on:click={() => changeLanguage('tr')}>Turkish</a></li>
      </ul>
    </div>

  </div>
  <a class="navbar-center my-4 btn btn-ghost" href="{base}/">
    <h1 class="font-bold text-3xl">{data.projectName}</h1>
  </a>
  <div class="navbar-end">
    <button class="btn" on:click={toggleComparisonMode} class:btn-success={isComparisonMode}>
      {data.comparisonMode}
    </button>

    <a
      href="https://github.com/Berkanktk/CharacterAnalyzer"
      class="btn btn-ghost"
      target="_blank"><img src="github.svg" alt="github" /></a>
    <button class="btn btn-ghost ml-2" on:click={toggleTheme}>
      <img
        src={localTheme === "light" ? "sun.svg" : "moon.svg"}
        alt={localTheme === "light" ? "sun" : "moon"}
      />
    </button>
  </div>
</div>
