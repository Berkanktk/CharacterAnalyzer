<script lang="ts">
 import lang from '$lib/locales/all.json';
 import { locale, localeData } from "../../routes/stores";

 let data: any = {};
 let currentLocale: App.LocaleKey;


  // Subscribe to the locale store and update data accordingly
  locale.subscribe((value: string) => {
      currentLocale = value as App.LocaleKey; 
      
      if (currentLocale in lang) {
          data = lang[currentLocale];
          localeData.set(data);
      }
  });
</script>

<main class="container mx-auto p-4">
  <section class="my-8">
    <h1 class="text-4xl font-bold">{data.aboutTitle}</h1>
    <p class="mt-4 text-lg">{data.aboutContent}</p>
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">{data.wordAnalysisTitle}</h2>
    <p class="mt-4 text-lg">{data.wordAnalysisContent}</p>
    <ul class="list-disc pl-6 mt-2">
      {#each lang[currentLocale].wordAnalysisList as item (item)}
        <li>{item}</li>
      {/each}
    </ul>
    
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">{data.textTransformationTitle}</h2>
    <p class="mt-4 text-lg">{data.textTransformationContent}</p>
    <ul class="list-disc pl-6 mt-2">
      {#each lang[currentLocale].textTransformationList as item (item)}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">{data.wordFrequencyTitle}</h2>
    <p class="mt-4 text-lg">{data.wordFrequencyContent}</p>
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">{data.searchReplaceTitle}</h2>
    <p class="mt-4 text-lg">{data.searchReplaceContent}</p>
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">{data.textComparison}</h2>
    <p class="mt-4 text-lg">{data.textComparisonContent}</p>
  </section>

  <section class="my-8">
    <h2 class="text-2xl font-semibold">{data.accessibilityTitle}</h2>
    <p class="mt-4 text-lg">{data.accessibilityContent}</p>
    <ul class="list-disc pl-6 mt-2">
      {#each lang[currentLocale].accessibilityList as item (item)}
        <li>{item}</li>
      {/each}
    </ul>
  </section>
</main>
  