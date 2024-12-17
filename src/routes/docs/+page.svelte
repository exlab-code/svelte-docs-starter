<script lang="ts">
	import DocRenderer from '$lib/components/doc-renderer.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
	let { title, slug, description } = data.metadata;
</script>

<DocRenderer {title} {slug} {description} {data} />
