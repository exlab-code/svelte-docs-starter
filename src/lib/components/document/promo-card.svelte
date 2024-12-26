<script lang="ts">
	import { promoConfig } from '$lib/config';
	import { ArrowRight } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
</script>

<div>
	<div class="mt-4">
		<h3 class="font-semibold text-gray-800 dark:text-white">
			{promoConfig.title}
		</h3>
		<p class="mt-2 text-sm text-gray-600 dark:text-neutral-300">
			{promoConfig.description}
		</p>
		<Button variant="link" href={promoConfig.ctaLink} class="p-0">
			{promoConfig.ctaText}
			<ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
		</Button>
	</div>
</div>
