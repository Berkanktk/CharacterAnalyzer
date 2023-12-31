<script lang="ts">
  import { capitalizeText, sentenceCase, invertCase, randomCase, reverseText, calculateWordFrequency } from "$lib/Helpers";
  import Stat from "$lib/components/Stat.svelte";
  import Frequency from "$lib/components/Frequency.svelte";
  import Clipboard from "$lib/components/Clipboard.svelte";
  import { locale, localeData, comparisonMode } from "./stores";
  import lang from "$lib/locales/all.json";
  import { diffChars } from 'diff';

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
  let comparisonText = text;
  let counts: any = 0
  let isComparisonMode: boolean = false
  let totalChanged: number = 0
  
  $: isComparisonMode = $comparisonMode
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
      totalChanged = text.split(replaceQuery).length - 1;
      searchResult = `${totalChanged} instances of ${searchQuery} replaced with ${replaceQuery}`;
    }
  }

  // Function to toggle the display of the search and replace inputs
  function toggleSearchAndReplace() {
    showSearchAndReplace = !showSearchAndReplace;
  }
  
  // Function to calculate counts
  function calculateCounts() {
    const diffResult = diffChars(text, comparisonText);

    // Calculate the total length of value strings in objects with "removed" or "added" set to true
    const totalLength = diffResult.reduce((total, obj) => {
      if (obj.value && (obj.removed === true || obj.added === true)) {
        total += obj.value.length;
      }
      return total;
    }, 0);

    counts = totalLength;
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

<div class="xl:flex text-center p-5">
  <div class="xl:w-1/4 text-center xl:mt-28">
      <div class="stats xl:stats-vertical shadow flex xl:flex-col lg:mx-12">
          <Stat title={data.charactersWithoutSpaces} value={charactersWithoutSpace} />
          <Stat title={data.uniqueWords} value={uniqueWords} />
          <Stat title={data.readingTime} value={readingTime > 1 ? `${readingTime} ${data.minutes}` : `${readingTime} ${data.minutes}`} />
          <Stat title={data.speechTime} value={speechTime > 1 ? `${speechTime} ${data.minutes}` : `${speechTime} ${data.minutes}`} />
          <Stat title={data.avgWordLength} value={averageWordLength} />
      </div>
  </div>

  <div class="mx-auto flex grow">
      <div class="w-full">
          <div class="stats shadow mx-auto mt-8 w-full md:flex">
              <Stat title={data.characters} value={text.length} />
              <Stat title={data.words} value={text.split(" ").filter(word => word !== "").length} />
              <Stat title={data.paragraphs} value={paragraphs} />
              <Stat title={data.sentences} value={sentences} />
          </div>

          <div class="form-control mt-10 w-full relative">
            {#if !isComparisonMode}
              <textarea
                class="textarea textarea-bordered textarea-sm w-full min-size max-size"
                placeholder={data.textAreaPlaceholder}
                rows="8"
                bind:value={text}
              />
              <Clipboard {text} />
            {:else}
              <div class="grid grid-cols-2 gap-4">
                <textarea
                  class="textarea textarea-bordered textarea-sm min-size max-size"
                  rows="8"
                  placeholder="Enter Original Text"
                  bind:value={text}
                  on:input={calculateCounts}
                />
                <textarea
                  class="textarea textarea-bordered textarea-sm min-size max-size"
                  rows="8"
                  placeholder="Enter Comparison Text"
                  bind:value={comparisonText}
                  on:input={calculateCounts}
                />
              </div>

              <div class="mt-4 border border-gray-600 rounded-lg p-4 break-all min-h-16">
                {#each diffChars(text, comparisonText) as { added, removed, value }}
                  {#if added}
                    <span class="text-green-500">{value}</span>
                  {:else if removed}
                    <span class="text-red-500">{value}</span>
                  {:else}
                    <span class="text-gray-500">{value}</span>
                  {/if}
                {/each}
              </div>

              <p class="mt-4">{counts} total differences</p>

            {/if}
          </div>

          {#if !isComparisonMode}
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

          {/if}

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