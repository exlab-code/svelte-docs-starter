import { docsNavigation } from "$lib/components/doc-navigation.svelte";

export async function load() {
    await docsNavigation.generateNavigation();

}