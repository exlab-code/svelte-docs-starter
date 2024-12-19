<script lang="ts">
	import PromoCard from './promo-card.svelte';
	import TableOfContents from './table-of-contents.svelte';
	import Separator from './ui/separator/separator.svelte';

	let {
		title,
		slug,
		description,
		data
	}: { title: string; slug: string; description: string; data: any } = $props();
	let contentRef: HTMLElement | undefined = $state();
</script>

<div class="flex flex-col gap-6 p-4 sm:flex-row">
	<div class="prose max-w-none dark:prose-invert" bind:this={contentRef}>
		<header class="mb-4 border-b border-gray-200 pb-2 dark:border-neutral-700 sm:mb-4 sm:pb-6">
			<p class="mb-2 text-sm font-semibold capitalize text-blue-600 dark:text-blue-500">{slug}</p>
			<h1 class="mb-2 block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
				{title}
			</h1>
			<p class="mt-2 text-gray-800 dark:text-neutral-400 sm:text-lg">
				{description}
			</p>
		</header>
		<data.doc />
	</div>
	<div>
		<div class="sticky top-20 flex w-72 flex-col gap-4">
			<TableOfContents {contentRef} />
			<Separator />
			<PromoCard />
		</div>
	</div>
</div>
