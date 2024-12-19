import type { DocResolver } from "$lib/types/docs";
import type { NavItem } from "$lib/types/nav";
import { slugFromPath } from "$lib/utils";

interface TreeNode {
    title: string;
    path: string;
    metadata?: any;
    children: Map<string, TreeNode>;
    isFile: boolean;
}

class DocsNavigation {
    private static instance: DocsNavigation;
    public docNav = $state<NavItem[]>([]);
    private tree: TreeNode = {
        title: 'root',
        path: '',
        children: new Map(),
        isFile: false
    };

    private constructor() { }

    public static getInstance(): DocsNavigation {
        if (!DocsNavigation.instance) {
            DocsNavigation.instance = new DocsNavigation();
        }
        return DocsNavigation.instance;
    }

    private createNavItem(node: TreeNode): NavItem {
        const href = node.path ? `/docs${node.path}` : '/docs';
        const items = Array.from(node.children.values())
            .map(child => this.createNavItem(child))
            .sort((a, b) => {
                // Sort index files first, then by title
                const aIsIndex = a.title.toLowerCase() === 'index';
                const bIsIndex = b.title.toLowerCase() === 'index';
                if (aIsIndex !== bIsIndex) return aIsIndex ? -1 : 1;
                return a.title.localeCompare(b.title);
            });

        return {
            title: node.metadata?.title || this.formatTitle(node.title),
            href,
            items: items.length > 0 ? items : undefined,
            disabled: node.metadata?.disabled ?? false,
            external: node.metadata?.external ?? false,
            label: node.metadata?.label,
        };
    }

    private formatTitle(path: string): string {
        const basename = path.split('/').pop() || '';
        return basename
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    private addToTree(fullPath: string, metadata?: any): void {
        // Remove /src/content prefix and .md extension
        const path = fullPath
            .replace(/^\/src\/content/, '')
            .replace(/\.md$/, '');

        const parts = path.split('/').filter(Boolean);
        let currentNode = this.tree;
        let currentPath = '';

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            currentPath += `/${part}`;

            if (!currentNode.children.has(part)) {
                currentNode.children.set(part, {
                    title: part,
                    path: currentPath,
                    children: new Map(),
                    isFile: i === parts.length - 1
                });
            }

            currentNode = currentNode.children.get(part)!;

            // If this is the last part and it's a file, add the metadata
            if (i === parts.length - 1) {
                currentNode.metadata = metadata;
                currentNode.isFile = true;
            }
        }
    }

    private processTree(node: TreeNode): void {
        // If a directory has an index.md file, use its metadata for the directory
        const indexChild = node.children.get('index');
        if (indexChild) {
            node.metadata = indexChild.metadata;
            node.children.delete('index');
        }

        // Process all children recursively
        for (const child of node.children.values()) {
            this.processTree(child);
        }
    }

    public async generateNavigation(): Promise<void> {
        const modules = import.meta.glob(`/src/content/**/*.md`);

        // First pass: build the tree
        for (const [path, resolver] of Object.entries(modules)) {
            try {
                const doc = await (resolver as DocResolver)();
                if (!doc?.metadata?.title) continue;

                this.addToTree(path, doc.metadata);
            } catch (e) {
                console.error(`Error processing ${path}:`, e);
            }
        }

        // Second pass: process the tree
        this.processTree(this.tree);

        // Convert tree to navigation structure
        this.docNav = Array.from(this.tree.children.values())
            .map(node => this.createNavItem(node))
            .sort((a, b) => a.title.localeCompare(b.title));
    }
}

export const docsNavigation = DocsNavigation.getInstance();