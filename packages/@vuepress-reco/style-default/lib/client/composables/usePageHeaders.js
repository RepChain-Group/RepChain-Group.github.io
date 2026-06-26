import { inject } from 'vue';
import { usePageData } from '@vuepress/client';
export const pageHeadersSymbol = Symbol('pageHeaders');
export const usePageHeaders = () => {
    const pageHeaders = inject(pageHeadersSymbol);
    if (!pageHeaders) {
        throw new Error('usePageHeaders() is called without provider.');
    }
    return pageHeaders;
};
export function resolvePageHeaders() {
    const page = usePageData();
    // if the sidebar item is current page and children is not set
    // use headers of current page as children
    return headersToSidebarItemChildren(page.value.headers);
}
export const headerToSidebarItem = (header) => ({
    text: header.title,
    link: `#${header.slug}`,
    level: header.level,
    children: headersToSidebarItemChildren(header.children),
});
export const headersToSidebarItemChildren = (headers) => headers.map((header) => headerToSidebarItem(header));
