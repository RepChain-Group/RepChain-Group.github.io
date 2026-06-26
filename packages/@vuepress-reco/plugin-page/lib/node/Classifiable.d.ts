import type { App, Page } from '@vuepress/core';
import { ClassificationPaginationPost, ClassificationData, PagePluginOptions } from '../types';
export declare function getTimeNum(date: any): number;
export declare function compareDate(a: any, b: any): number;
export default class Classifiable {
    private classificationData;
    private frontmatterKeys;
    private publishPosts;
    options: PagePluginOptions;
    app: App;
    constructor(options: PagePluginOptions, app: App);
    init(): void;
    resolveKeyValue(): void;
    resolvePages(): void;
    private resolvePageOptions;
    private setCategory;
    getPublishPostsPage(): Array<Promise<Page>>;
    get extendedPages(): Promise<Page>[];
    get classificationPaginationPosts(): Record<string, ClassificationPaginationPost>;
    get classificationSummary(): ClassificationData;
    get posts(): Page<Record<never, never>, Record<never, never>>[];
}
