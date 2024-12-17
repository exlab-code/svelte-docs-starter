<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { PageData } from './$types.js';
	let { data, children }: { data: PageData; children: any } = $props();
	let docNav = data.docNav;
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-2 border-b bg-background px-4"
		>
			<div class="flex h-16 items-center gap-2">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb />
			</div>

			<div class="flex items-center gap-2">
				<DarkModeToggle />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
