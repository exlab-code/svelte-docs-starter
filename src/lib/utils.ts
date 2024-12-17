import { error } from "@sveltejs/kit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DocResolver } from "./types/docs";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
interface NavItem {
	title: string;
	url: string;
	items?: NavItem[];
}

type Modules = Record<string, () => Promise<unknown>>;


export function slugFromPath(path: string) {
	return path.replace('/src/content/', '').replace('.md', '');
}

export async function getDoc(slug: string) {
	const modules = import.meta.glob(`/src/content/**/*.md`);
	const match = findMatch(slug, modules);
	const doc = await match?.resolver?.();

	if (!doc || !doc.metadata) {
		error(404);
	}

	return {
		component: doc.default,
		metadata: doc.metadata,
		title: doc.metadata.title
	};
}

function findMatch(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}
	if (!match.path) {
		match = getIndexDocIfExists(slug, modules);
	}

	return match;
}

export function slugFromPathname(pathname: string) {
	return pathname.split('/').pop() ?? '';
}

function getIndexDocIfExists(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.includes(`/${slug}/index.md`)) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	return match;
}


export async function generateNavigation(): Promise<NavItem[]> {
	const modules = import.meta.glob(`/src/content/**/*.md`);
	const nav: NavItem[] = [];

	console.log(modules);
	// Group files by their directories
	const groups = new Map<string, NavItem>();

	for (const [path, resolver] of Object.entries(modules)) {
		try {
			const doc = await (resolver as DocResolver)();
			console.log(doc);
			if (!doc?.metadata?.title) continue;

			const slug = slugFromPath(path);
			const parts = slug.split('/').filter(Boolean); // Remove empty strings

			// Handle index files
			if (parts.length === 1 && parts[0] === 'index') {
				nav.push({
					title: doc.metadata.title,
					url: '/'
				});
				continue;
			}

			// Handle files in directories
			const section = parts[0];
			const isIndex = parts[parts.length - 1] === 'index';

			// Create or get section
			if (!groups.has(section)) {
				groups.set(section, {
					title: formatSectionTitle(section),
					url: `/${section}`,
					items: []
				});
			}

			const group = groups.get(section)!;

			if (parts.length === 2 && !isIndex) {
				// Files directly in the section folder
				group.items?.push({
					title: doc.metadata.title,
					url: `/${section}/${parts[1]}`
				});
			} else if (parts.length >= 3) {
				// Handle nested subfolders
				let currentLevel = group;
				for (let i = 1; i < parts.length - 1; i++) {
					const subfolderName = parts[i];
					let subfolder = currentLevel.items?.find(item =>
						item.url === `/${parts.slice(0, i + 1).join('/')}`
					);

					if (!subfolder) {
						subfolder = {
							title: formatSectionTitle(subfolderName),
							url: `/${parts.slice(0, i + 1).join('/')}`,
							items: []
						};
						currentLevel.items?.push(subfolder);
					}

					if (!subfolder.items) {
						subfolder.items = [];
					}

					currentLevel = subfolder;
				}

				if (!isIndex) {
					currentLevel.items?.push({
						title: doc.metadata.title,
						url: `/${parts.join('/')}`
					});
				} else {
					// Use index file's title for the subfolder
					currentLevel.title = doc.metadata.title;
				}
			}
		} catch (e) {
			console.error(`Error processing ${path}:`, e);
		}
	}

	// Sort sections and their items
	const sortedNav = [...nav, ...Array.from(groups.values())].sort((a, b) => {
		const order = [
			'Getting Started',
			'Building Your Application',
			'API Reference',
			'Architecture'
		];

		const indexA = order.indexOf(a.title);
		const indexB = order.indexOf(b.title);

		if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
		if (indexA === -1) return 1;
		if (indexB === -1) return -1;
		return indexA - indexB;
	});

	// Recursively sort items within each section
	function sortItems(items: NavItem[]) {
		items.sort((a, b) => a.title.localeCompare(b.title));
		items.forEach(item => {
			if (item.items) {
				sortItems(item.items);
			}
		});
	}

	sortedNav.forEach(section => {
		if (section.items) {
			sortItems(section.items);
		}
	});

	return sortedNav;
}

function formatSectionTitle(section: string): string {
	return section
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}