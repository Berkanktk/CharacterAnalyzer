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

<div class="md:flex flex-wrap flex-grow text-center p-5">
    <div class="xl:w-1/4 md:p-10 text-center md:mt-20">
        <div class="stats md:stats-vertical shadow flex md:flex-col md:mx-20">
            <Stat title="Characters (no space)" value={charactersWithoutSpace} />
            <Stat title="Unique Words" value={uniqueWords} />
            <Stat title="Reading Time" value={readingTime > 1 ? `${readingTime} minutes` : `${readingTime} minute`} />
            <Stat title="Speech Time" value={speechTime > 1 ? `${speechTime} minutes` : `${speechTime} minute`} />
            <Stat title="Avg. Word Length" value={averageWordLength} />
        </div>
    </div>

    <div class="mx-auto">
        <div class="w-full">
            <div class="stats shadow mx-auto mt-10 w-full md:flex">
                <Stat title="Characters" value={text.length} />
                <Stat title="Words" value={text.split(" ").filter(word => word !== "").length} />
                <Stat title="Paragraphs" value={paragraphs} />
                <Stat title="Sentences" value={sentences} />
            </div>

            <div class="form-control mt-10 w-full relative">
                <textarea
                    class="textarea textarea-bordered textarea-sm w-full min-size max-size"
                    placeholder="Enter text here"
                    rows="7"
                    bind:value={text}
                />
                <Clipboard {text} />
            </div>

            <div class="mt-10">
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
        max-height: 450px;
    }
</style>
