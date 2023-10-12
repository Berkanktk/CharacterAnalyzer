<script lang="ts">
  import { theme } from "../../routes/stores";
  import { onMount } from "svelte";
  import {localeData, locale} from "../../routes/stores";

  let localTheme: string;
  let data: any = {};

  $: data = $localeData;

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
</script>

<div class="navbar w-full border-b border-base-content/10">
  <div class="navbar-start">
    <a href="/about" class="btn btn-ghost">{data.explanations}</a>

    <details class="dropdown">
      <summary class="m-1 btn btn-ghost"><img src="language.svg" alt="language" />{data.lang}</summary>
      <ul class="p-2 shadow menu dropdown-content z-1 bg-base-100 rounded-box w-52">
        <li value="en"><a on:click={() => changeLanguage('en')}>English</a></li>
        <li value="da"><a on:click={() => changeLanguage('da')}>Danish</a></li>
        <li value="tr"><a on:click={() => changeLanguage('tr')}>Turkish</a></li>
      </ul>
    </details>
  </div>
  <div class="navbar-center my-4">
    <h1 class="font-bold text-3xl">{data.projectName}</h1>
  </div>
  <div class="navbar-end">
    <a
      href="https://github.com/Berkanktk/CharacterAnalyzer"
      class="btn btn-ghost"
      target="_blank"><img src="github.svg" alt="github" /></a
    >
    <button class="btn btn-ghost ml-2" on:click={toggleTheme}>
      <img
        src={localTheme === "light" ? "sun.svg" : "moon.svg"}
        alt={localTheme === "light" ? "sun" : "moon"}
      />
    </button>
  </div>
</div>
