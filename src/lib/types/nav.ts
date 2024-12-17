import { type Icon as IconType } from 'lucide-svelte';


export type NavItem = {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: typeof IconType;
    label?: string;
};

export type SidebarNavItem = NavItem & {
    items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
    items: NavItemWithChildren[];
};