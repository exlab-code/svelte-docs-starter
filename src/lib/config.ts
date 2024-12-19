
import type { NavItem, QuickLink, SocialLink } from "$lib/types/nav";

import {

    type Icon as IconType,
    Boxes,
    Lock,
    Paintbrush,
    Workflow,
    Zap
} from 'lucide-svelte';

interface Feature {
    icon: typeof IconType;
    title: string;
    description: string;
}

interface SiteConfig {
    /** Current version of the documentation/project */
    version: string;

    /** Main title of the documentation site */
    title: string;

    /** Detailed description of the project/documentation */
    description: string;

    /** GitHub repository URL */
    github: string;

    /** NPM package name */
    npm: string;



    /** Array of quick navigation links */
    quickLinks: QuickLink[];

    /** Path to the main logo (light theme) */
    logo: string;

    /** Path to the dark theme logo (optional) */
    logoDark?: string;

    /** Path to the site favicon */
    favicon: string;
}
interface PromoConfig {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    lightImage?: string;
    darkImage?: string;
}
export const siteConfig: SiteConfig = {
    version: '1.0.0',
    title: 'Documentation',
    description:
        'Comprehensive documentation for your project. Built with Svelte 5, MDSvex, Tailwind CSS, and shadcn/ui components.',
    github: 'https://github.com/code-gio/documentation',
    npm: 'your-package-name',

    quickLinks: [
        { title: 'Installation', href: '/docs/installation' },

        { title: 'Examples', href: '/docs/examples' }
    ],
    logo: '/logo.svg',
    logoDark: '/logo-white.svg',
    favicon: '/favicon.png',
};


export let navItems: NavItem[] = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'About',
        href: '/about'
    },
    {
        title: 'Services',
        href: '/services',
        items: [
            { title: 'Web Development', href: '/services/web-development' },
            { title: 'SEO', href: '/services/seo' }
        ]
    },
    {
        title: 'Blog',
        href: '/blog'
    },
    {
        title: 'Contact',
        href: '/contact'
    }
];

export let socialLinks: SocialLink[] = [

    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/giovanirodriguez26/',
        icon: 'linkedin'
    },
    {
        title: 'GitHub',
        href: 'https://github.com/code-gio/documentation',
        icon: 'github'
    },

];


export const features: Feature[] = [
    {
        icon: Boxes,
        title: 'Component Library',
        description: 'Built on top of shadcn/ui, offering comprehensive accessible components with complete documentation'
    },
    {
        icon: Workflow,
        title: 'Type Safe',
        description: 'Fully typed with TypeScript, providing excellent IDE support and reliable development experience'
    },
    {
        icon: Paintbrush,
        title: 'Fully Customizable',
        description: 'Easily customize themes, layouts, and components to match your brand identity and requirements'
    },
    {
        icon: Zap,
        title: 'Fast & Modern',
        description: 'Powered by Svelte 5, MDSvex, and TailwindCSS for optimal performance and developer experience'
    }
];



export let promoConfig: PromoConfig = {
    title: 'Need help with your project?',
    description:
        'I offer custom development services, consulting, and technical guidance for your web applications.',
    ctaText: "Let's work together",
    ctaLink: 'mailto:your@email.com',
    lightImage: '/images/dev-services-light.jpg',
    darkImage: '/images/dev-services-dark.jpg'
};