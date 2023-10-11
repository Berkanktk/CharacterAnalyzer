<script lang="ts">
    let text: string = ""; // Variable to store the text from the textarea
    let frequencyData = {};

    // Helper function to capitalize each word
    function capitalizeText(text: string): string {
        return text
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    }

    // Helper function to convert text to sentence case
    function sentenceCase(text: string): string {
        return text
            .split(". ")
            .map(
                (sentence) =>
                    sentence.charAt(0).toUpperCase() +
                    sentence.slice(1).toLowerCase()
            )
            .join(". ");
    }

    // Helper function to invert the case of each character
    function invertCase(text: string): string {
        return text
            .split("")
            .map((char) =>
                char === char.toUpperCase()
                    ? char.toLowerCase()
                    : char.toUpperCase()
            )
            .join("");
    }

    // Helper function to randomize the case of each character
    function randomCase(text: string): string {
        return text
            .split("")
            .map((char) =>
                Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()
            )
            .join("");
    }

    // Helper function to reverse the text
    function reverseText(text: string): string {
        return text.split("").reverse().join("");
    }

    function calculateWordFrequency(inputText: string) {
        const words = inputText.toLowerCase().match(/\b\w+\b/g);
        const frequency: Record<string, number> = {};

        if (words) {
            words.forEach((word) => {
                frequency[word] = (frequency[word] || 0) + 1;
            });
        }

        // Sort the frequency data by occurrence (descending)
        frequencyData = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .reduce((obj, [word, count]) => ({ ...obj, [word]: count }), {});

        return frequencyData;
    }

    // Watch for changes in the 'text' variable and update word frequency
    $: {
        frequencyData = calculateWordFrequency(text);
    }
</script>

<div class="flex">
    <div class="w-1/4 p-10 text-center mt-20">
        <div class="stats stats-vertical shadow">
            <div class="stat place-items-center">
                <div class="stat-title">Characters (without space)</div>
                <div class="stat-value">0</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">Unique Words</div>
                <div class="stat-value">0</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">Reading Time</div>
                <div class="stat-value">0</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">Speech Time</div>
                <div class="stat-value">0</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">Average Word Length</div>
                <div class="stat-value">0</div>
            </div>
        </div>
    </div>

    <div class="mx-auto">
        <div class="w-full">
            <div class="stats shadow mx-auto mt-10 w-full">
                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary" />
                    <div class="stat-title">Characters</div>
                    <div class="stat-value">0</div>
                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary" />
                    <div class="stat-title">Words</div>
                    <div class="stat-value">0</div>
                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary" />
                    <div class="stat-title">Paragraphs</div>
                    <div class="stat-value">0</div>
                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary" />
                    <div class="stat-title">Sentences</div>
                    <div class="stat-value">0</div>
                </div>
            </div>

            <div class="form-control mt-10 w-full">
                <textarea
                    class="textarea textarea-bordered textarea-sm w-full"
                    placeholder="Enter text here"
                    rows="10"
                    bind:value={text}
                />
            </div>

            <div class="mt-10">
                <button class="btn btn-primary" on:click={() => (text = text.toUpperCase())}>UPPERCASE</button>
                <button class="btn btn-primary" on:click={() => (text = text.toLowerCase())}>lowercase</button>
                <button class="btn btn-primary" on:click={() => (text = capitalizeText(text))}>Capitalized Case</button>
                <button class="btn btn-primary" on:click={() => (text = sentenceCase(text))}>Sentence case</button>
                <button class="btn btn-primary" on:click={() => (text = invertCase(text))}>iNVERT cASE</button>
                <button class="btn btn-primary" on:click={() => (text = randomCase(text))}>rAnDoM</button>
                <button class="btn btn-primary" on:click={() => (text = reverseText(text))}>Reverse</button>
            </div>
        </div>
    </div>

    <div class="w-1/4 p-10">
        <h1 class="text-3xl font-bold text-center">Frequency</h1>
        {#if Object.keys(frequencyData).length === 0}
            <div class="text-center mt-10">No data to display</div>
        {:else}
            <div class="overflow-x-auto mt-10 max-h-[500px] overflow-y-auto">
                <table class="table table-sm">

                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Occurrence</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each Object.entries(frequencyData) as [word, count]}
                            <tr class="hover">
                                <td>{word}</td>
                                <td>{count}</td>
                            </tr>
                        {/each}
                    </tbody>

                </table>
            </div>
        {/if}
    </div>    
</div>

<style>
    .btn {
        text-transform: none;
    }
</style>
