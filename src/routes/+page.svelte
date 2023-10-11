<script lang="ts">
    import { capitalizeText, sentenceCase, invertCase, randomCase, reverseText, calculateWordFrequency } from "$lib/Helpers";
    import Stat from "$lib/components/Stat.svelte";
    import Frequency from "$lib/components/Frequency.svelte";
    import Clipboard from "$lib/components/Clipboard.svelte";

    let text: string = ""; 
    let frequencyData = {};
    const wordsPerMinute = 200;
    const speechPerMinute = 125;

    $: frequencyData = calculateWordFrequency(text, frequencyData);
    $: charactersWithoutSpace = text.replace(/ /g, "").length;
    $: uniqueWords = [...new Set(text.split(" ").filter(word => word !== ""))].length
    $: readingTime = text ? Math.ceil(text.split(" ").length / wordsPerMinute) : 0;
    $: speechTime = text ? Math.ceil(text.split(" ").length / speechPerMinute) : 0;
    $: averageWordLength = text ? (text.replace(/ /g, "").length / text.split(" ").length).toFixed(2) : 0;
    $: paragraphs = text.split('\n\n').filter(para => para.trim() !== "").length;
    $: sentences = text.split(/\.|\!|\?/).filter(sentence => sentence.trim() !== "").length;

</script>

<div class="flex flex-wrap">
    <div class="w-full p-5 md:w-1/4 md:p-10 text-center mt-10">
        <div class="stats stats-vertical shadow">
            <Stat title="Characters (no space)" value={charactersWithoutSpace} />
            <Stat title="Unique Words" value={uniqueWords} />
            <Stat title="Reading Time" value={readingTime > 1 ? `${readingTime} min` : `${readingTime} min`} />
            <Stat title="Speech Time" value={speechTime > 1 ? `${speechTime} min` : `${speechTime} min`} />
            <Stat title="Avg. Word Length" value={averageWordLength} />
        </div>
    </div>

    <div class="mx-auto">
        <div class="w-full">
            <div class="stats shadow mx-auto mt-10 w-full">
                <Stat title="Characters" value={text.length} />
                <Stat title="Words" value={text.split(" ").filter(word => word !== "").length} />
                <Stat title="Paragraphs" value={paragraphs} />
                <Stat title="Sentences" value={sentences} />
              </div>

            <div class="form-control mt-10 w-full relative">
                <textarea
                    class="textarea textarea-bordered textarea-sm w-full min-size max-size"
                    placeholder="Enter text here"
                    rows="10"
                    bind:value={text}
                />
                <Clipboard {text} />
            </div>

            <div class="mt-8"> 
                <button class="btn btn-neutral" on:click={() => (text = text.toUpperCase())}>UPPERCASE</button>
                <button class="btn btn-neutral" on:click={() => (text = text.toLowerCase())}>lowercase</button>
                <button class="btn btn-neutral" on:click={() => (text = capitalizeText(text))}>Capitalized Case</button>
                <button class="btn btn-neutral" on:click={() => (text = sentenceCase(text))}>Sentence case</button>
                <button class="btn btn-neutral" on:click={() => (text = invertCase(text))}>iNVERT cASE</button>
                <button class="btn btn-neutral" on:click={() => (text = randomCase(text))}>rAnDoM</button>
                <button class="btn btn-neutral" on:click={() => (text = reverseText(text))}>Reverse</button>
            </div>
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
        max-height: 500px;
    }
</style>
