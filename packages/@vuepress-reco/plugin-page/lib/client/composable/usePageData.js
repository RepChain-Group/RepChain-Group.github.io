import { inject, computed } from 'vue';
import { useRouter } from 'vue-router';
export const classificationPostsSymbol = Symbol(__VUEPRESS_DEV__ ? 'classificationPostsSymbol' : '');
export const classificationSummarySymbol = Symbol(__VUEPRESS_DEV__ ? 'classificationSummarySymbol' : '');
export const postsSymbol = Symbol(__VUEPRESS_DEV__ ? 'postsSymbol' : '');
export function usePageData() {
    const classificationSummary = inject(classificationSummarySymbol);
    const posts = inject(postsSymbol);
    const cp = inject(classificationPostsSymbol);
    if (!postsSymbol) {
        throw new Error('useSiteLocaleData() is called without provider.');
    }
    const { currentRoute } = useRouter();
    const classificationPosts = computed(() => {
        return (cp.value[currentRoute.value.path] || {});
    });
    return { classificationPosts, classificationSummary, posts };
}
