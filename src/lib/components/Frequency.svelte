<script lang="ts">
    export let frequencyData: { [key: string]: number } = {};
    import {localeData} from "../../routes/stores";

    let data: App.LanguageData = {};
    $: data = $localeData;

    function hasData(frequencyData: { [key: string]: number }): boolean {
        return Object.keys(frequencyData).length > 0;
    }
</script>

<div class="xl:w-1/4 p-10">
    <h1 class="text-3xl font-bold text-center">{data.frequency}</h1>
    {#if hasData(frequencyData)}
        <div class="overflow-x-auto mt-10 max-h-[500px] overflow-y-auto">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>{data.frequencyWord}</th>
                        <th>{data.frequencyOccurrence}</th>
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
    {:else}
        <div class="text-center mt-10">{data.frequencyError}</div>
    {/if}
</div>
