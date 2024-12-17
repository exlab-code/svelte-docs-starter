<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { contentRef }: { contentRef: HTMLElement } = $props();
	let headings: Array<{ id: string; text: string; level: number }> = $state([]);

	onMount(() => {
		const extractHeadings = () => {
			// Get all headings from the content
			const headingElements = contentRef.querySelectorAll('h1, h2, h3, h4, h5, h6');

			headings = Array.from(headingElements)
				.map((heading) => {
					// Get the heading level from the tag name (h1 = 1, h2 = 2, etc.)
					const level = parseInt(heading.tagName.charAt(1));
					const text = heading.textContent || '';

					// Create or ensure heading has an ID for linking
					const id = heading.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
					if (!heading.id) heading.id = id;

					return {
						id,
						text,
						level
					};
				})
				.filter(
					(heading): heading is { id: string; text: string; level: number } =>
						heading.text !== null && heading.text !== ''
				);
		};

		extractHeadings();

		// Set up a mutation observer to watch for content changes
		const observer = new MutationObserver(extractHeadings);
		observer.observe(contentRef, {
			childList: true,
			subtree: true
		});

		return () => observer.disconnect();
	});
</script>

<div class="sticky top-16 min-w-56">
	<h5
		id="docs-on-this-page-sidebar-label"
		class="mb-3 text-sm font-semibold text-gray-800 dark:text-neutral-300"
	>
		On this page
	</h5>
	<ul>
		{#each headings as heading (heading.id)}
			<li>
				<a
					href="#{heading.id}"
					class="group flex items-start gap-x-1 py-0.5 text-sm leading-6 text-gray-600 hover:text-gray-900 focus:text-gray-900 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
					style="margin-left: {(heading.level - 1) * 1}rem"
				>
					{#if heading.level > 1}
						<ChevronRight class="mt-[5px] size-3.5 shrink-0" />
					{/if}
					{heading.text}
				</a>
			</li>
		{/each}
	</ul>
</div>
