<script  lang="ts">
    export let text = "";

    function copyToClipboard() {
        navigator.clipboard.writeText(text);
    }
</script>

<button class="btn btn-outline absolute top-2 right-2 p-2.5 rounded border-gray-600 hover:bg-gray-300" on:click={copyToClipboard}><img src={`copy.svg`} alt="Clipboard"/></button>