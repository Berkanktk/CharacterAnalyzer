import { writable } from "svelte/store";

export const theme = writable("dark");
export const localeData = writable({});
export const locale = writable("en");
export const comparisonMode = writable(false);