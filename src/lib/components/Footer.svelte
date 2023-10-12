<script lang="ts">
    import {localeData} from "../../routes/stores";

    let data: any = {};
    $: data = $localeData;
</script>

<footer class="w-full text-center">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://berkankutuk.dk/" target="_blank" class="hover:underline">Berkan Kütük</a>. {data.copyRight}</span>
    </div>
</footer>