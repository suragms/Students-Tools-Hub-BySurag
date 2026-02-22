import { useEffect } from 'react';

/**
 * Sets document title and meta description for the current page.
 * Use on each tool page for per-route SEO.
 */
export default function SeoHead({ title, description }) {
    useEffect(() => {
        const prevTitle = document.title;
        const prevMeta = document.querySelector('meta[name="description"]');
        const prevContent = prevMeta?.getAttribute('content') || '';

        if (title) document.title = `${title} | StudentTools Hub`;
        if (description && prevMeta) prevMeta.setAttribute('content', description);

        return () => {
            document.title = prevTitle;
            if (prevMeta) prevMeta.setAttribute('content', prevContent);
        };
    }, [title, description]);

    return null;
}
