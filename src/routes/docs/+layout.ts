import { generateNavigation } from "$lib/utils";

export async function load() {
    const docNav = await generateNavigation();
    console.log(docNav);
    return {
        docNav
    };
}