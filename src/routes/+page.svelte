<script lang="ts">
  import { capitalizeText, sentenceCase, invertCase, randomCase, reverseText, calculateWordFrequency } from "$lib/Helpers";
  import Stat from "$lib/components/Stat.svelte";
  import Frequency from "$lib/components/Frequency.svelte";
  import Clipboard from "$lib/components/Clipboard.svelte";
  import { locale, localeData } from "./stores";
  import lang from "$lib/locales/all.json";

  const wordsPerMinute = 200;
  const speechPerMinute = 125;
  
  let data: any = {};
  let text: string = ""; 
  let frequencyData = {};
  let searchQuery: string = "";
  let replaceQuery: string = "";
  let searchResult: string = "";
  let showSearchAndReplace: boolean = false;
  let currentLocale: App.LocaleKey;

  $: frequencyData = calculateWordFrequency(text, frequencyData);
  $: charactersWithoutSpace = text.replace(/ /g, "").length;
  $: uniqueWords = [...new Set(text.split(" ").filter(word => word !== ""))].length
  $: readingTime = text ? Math.ceil(text.split(" ").length / wordsPerMinute) : 0;
  $: speechTime = text ? Math.ceil(text.split(" ").length / speechPerMinute) : 0;
  $: averageWordLength = text ? (text.replace(/ /g, "").length / text.split(" ").length).toFixed(2) : 0;
  $: paragraphs = text.split('\n\n').filter(para => para.trim() !== "").length;
  $: sentences = text.split(/\.|\!|\?/).filter(sentence => sentence.trim() !== "").length;

  // Function to perform a search and replace operation
  function performSearchAndReplace() {
    if (text && searchQuery && replaceQuery) {
      text = text.replace(new RegExp(searchQuery, 'g'), replaceQuery);
      searchResult = `${searchQuery} replaced with ${replaceQuery}`;
    }
  }

  // Function to toggle the display of the search and replace inputs
  function toggleSearchAndReplace() {
    showSearchAndReplace = !showSearchAndReplace;
  }

  // Subscribe to the locale store and update data accordingly
  locale.subscribe((value: string) => {
      currentLocale = value as App.LocaleKey; 
      
      if (currentLocale in lang) {
          data = lang[currentLocale];
          localeData.set(data);
      }
  });
</script>

<div class="md:flex flex-wrap flex-grow text-center p-5">
  <div class="xl:w-1/4 md:p-10 text-center md:mt-20">
      <div class="stats md:stats-vertical shadow flex md:flex-col md:mx-20">
          <Stat title={data.charactersWithoutSpaces} value={charactersWithoutSpace} />
          <Stat title={data.uniqueWords} value={uniqueWords} />
          <Stat title={data.readingTime} value={readingTime > 1 ? `${readingTime} ${data.minutes}` : `${readingTime} ${data.minutes}`} />
          <Stat title={data.speechTime} value={speechTime > 1 ? `${speechTime} ${data.minutes}` : `${speechTime} ${data.minutes}`} />
          <Stat title={data.avgWordLength} value={averageWordLength} />
      </div>
  </div>

  <div class="mx-auto">
      <div class="w-full">
          <div class="stats shadow mx-auto mt-8 w-full md:flex">
              <Stat title={data.characters} value={text.length} />
              <Stat title={data.words} value={text.split(" ").filter(word => word !== "").length} />
              <Stat title={data.paragraphs} value={paragraphs} />
              <Stat title={data.sentences} value={sentences} />
          </div>

          <div class="form-control mt-10 w-full relative">
              <textarea
                  class="textarea textarea-bordered textarea-sm w-full min-size max-size"
                  placeholder={data.textAreaPlaceholder}
                  rows="8"
                  bind:value={text}
              />
              <Clipboard {text} />
          </div>

          <div class="mt-10">
              <button class="btn btn-neutral" on:click={() => (text = text.toUpperCase())}>{data.upperCase}</button>
              <button class="btn btn-neutral" on:click={() => (text = text.toLowerCase())}>{data.lowerCase}</button>
              <button class="btn btn-neutral" on:click={() => (text = capitalizeText(text))}>{data.capitalizedCase}</button>
              <button class="btn btn-neutral" on:click={() => (text = sentenceCase(text))}>{data.sentenceCase}</button>
              <button class="btn btn-neutral" on:click={() => (text = invertCase(text))}>{data.invertCase}</button>
              <button class="btn btn-neutral" on:click={() => (text = randomCase(text))}>{data.randomCase}</button>
              <button class="btn btn-neutral" on:click={() => (text = reverseText(text))}>{data.reverseText}</button>
          </div>

          <div class="mt-10">
              <button class="btn btn-primary" on:click={toggleSearchAndReplace}>
                {#if showSearchAndReplace}
                  {data.searchReplaceClose}
                {:else}
                  {data.searchReplaceOpen}
                {/if}
              </button>
          </div>

          {#if showSearchAndReplace}
            <div class="mt-10">
              <div class="search-replace-inputs flex flex-wrap justify-center">
                <input class="input input-bordered m-1" placeholder={data.searchPlaceholder} bind:value={searchQuery} />
                <input class="input input-bordered m-1" placeholder={data.replacePlaceholder} bind:value={replaceQuery} />
                <button class="btn btn-secondary m-1" on:click={performSearchAndReplace}>{data.replaceButton}</button>
              </div>
              <div class="search-result mt-2">
                {#if searchResult}
                  <p class="text-green-500">{searchResult}</p>
                {/if}
              </div>
            </div>
          {/if}
          
      </div>
  </div>

  <Frequency {frequencyData} />
</div>

<style>
  .btn {
      text-transform: none;
  }

  .min-size {
      min-height: 4rem;
  }

  .max-size {
      max-height: 450px;
  }

  textarea {
    line-height: 2.1em;
  }
</style>