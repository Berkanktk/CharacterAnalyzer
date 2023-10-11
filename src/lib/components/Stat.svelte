<!-- Stat.svelte -->
<script lang="ts">
    export let title: string;
    export let value: any;
  </script>
  
  <div class="stat place-items-center">
    <div class="stat-figure text-secondary" />
    <div class="stat-title">{title}</div>
    <div class="stat-value">{value}</div>
  </div>
  