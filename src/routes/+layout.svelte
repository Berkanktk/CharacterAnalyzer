<script lang="ts">
    import "../app.css";
    import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="min-h-screen flex flex-col">
    <NavBar />
    <slot />
</div>