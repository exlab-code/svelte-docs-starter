<!-- DocSidebar.svelte -->
<script lang="ts">
	import SearchForm from '$lib/components/search-form.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { ChevronRight, ExternalLink } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';
	import { siteConfig } from '$lib/config';
	import type { NavItem } from '$lib/types/nav';

	import { docsNavigation } from '$lib/components/doc-navigation.svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<a href="/" class="p-2">
			<img src={siteConfig.logo} alt={siteConfig.title} class="h-6 dark:hidden" />
			<img src={siteConfig.logoDark} alt={siteConfig.title} class="hidden h-6 dark:block" />
		</a>
		<SearchForm />
	</Sidebar.Header>
	<Sidebar.Content class="gap-0">
		{#if docsNavigation.docNav}
			{#each docsNavigation.docNav as navItem (navItem.title)}
				{#if navItem.items && navItem.items.length > 0}
					<Collapsible.Root title={navItem.title} open={true} class="group/collapsible">
						<Sidebar.Group>
							<Sidebar.GroupLabel
								class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
							>
								{#snippet child({ props })}
									<Collapsible.Trigger {...props}>
										<div class="flex items-center gap-2">
											{#if navItem.icon}
												<navItem.icon class="size-4" />
											{/if}
											<span>{navItem.title}</span>
											{#if navItem.label}
												<span class="ml-auto text-xs text-muted-foreground">{navItem.label}</span>
											{/if}
										</div>
										<ChevronRight
											class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
										/>
									</Collapsible.Trigger>
								{/snippet}
							</Sidebar.GroupLabel>
							<Collapsible.Content>
								<Sidebar.GroupContent>
									<Sidebar.Menu>
										{#each navItem.items as item (item.title)}
											<Sidebar.MenuItem>
												<Sidebar.MenuButton>
													{#snippet child({ props })}
														<a
															href={item.href}
															{...props}
															class:cursor-not-allowed={item.disabled}
															class:opacity-60={item.disabled}
															target={item.external ? '_blank' : undefined}
															rel={item.external ? 'noopener noreferrer' : undefined}
														>
															<div class="flex items-center gap-2">
																{#if item.icon}
																	<item.icon class="size-4" />
																{/if}
																<span>{item.title}</span>
																{#if item.label}
																	<span class="ml-auto text-xs text-muted-foreground"
																		>{item.label}</span
																	>
																{/if}
																{#if item.external}
																	<ExternalLink class="ml-auto size-3" />
																{/if}
															</div>
														</a>
													{/snippet}
												</Sidebar.MenuButton>
											</Sidebar.MenuItem>
										{/each}
									</Sidebar.Menu>
								</Sidebar.GroupContent>
							</Collapsible.Content>
						</Sidebar.Group>
					</Collapsible.Root>
				{:else}
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a
											href={navItem.href}
											{...props}
											class:cursor-not-allowed={navItem.disabled}
											class:opacity-60={navItem.disabled}
											target={navItem.external ? '_blank' : undefined}
											rel={navItem.external ? 'noopener noreferrer' : undefined}
											class="flex items-center gap-2"
										>
											{#if navItem.icon}
												<navItem.icon class="size-4" />
											{/if}
											<span>{navItem.title}</span>
											{#if navItem.label}
												<span class="ml-auto text-xs text-muted-foreground">{navItem.label}</span>
											{/if}
											{#if navItem.external}
												<ExternalLink class="ml-auto size-3" />
											{/if}
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				{/if}
			{/each}
		{/if}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
