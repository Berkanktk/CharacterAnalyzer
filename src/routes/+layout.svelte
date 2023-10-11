<script lang="ts">
    import "../app.css";
    import NavBar from '$lib/components/NavBar.svelte';
    import Footer from "$lib/components/Footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
    <NavBar />
    <slot />
    <Footer />
</div>