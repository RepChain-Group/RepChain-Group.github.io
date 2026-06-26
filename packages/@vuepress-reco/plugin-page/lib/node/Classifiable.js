"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDate = exports.getTimeNum = void 0;
const core_1 = require("@vuepress/core");
const shared_1 = require("@vuepress-reco/shared");
// 获取时间的数字类型
function getTimeNum(date) {
    const dateNum = !date ? 0 : new Date(date).getTime();
    return dateNum;
}
exports.getTimeNum = getTimeNum;
// 比对时间
function compareDate(a, b) {
    const aDateNum = getTimeNum(a.frontmatter.date);
    const bDateNum = getTimeNum(b.frontmatter.date);
    if (aDateNum === 0 || bDateNum === 0)
        return 0;
    return bDateNum - aDateNum;
}
exports.compareDate = compareDate;
class Classifiable {
    constructor(options, app) {
        this.classificationData = {};
        this.frontmatterKeys = [];
        this.options = options;
        this.app = app;
        this.publishPosts = [];
        this.init();
    }
    // 初始化
    init() {
        this.options.forEach((option) => {
            if (option.type === 'frontmatter') {
                const { frontmatterKey: key, pagination, layout, } = option;
                this.frontmatterKeys.push(key);
                this.classificationData[key] = {
                    pagination: pagination || 10,
                    extendedPages: [],
                    items: {},
                    layout,
                };
            }
        });
    }
    // 解析 key-value 对应的数量
    resolveKeyValue() {
        this.app.pages = this.app.pages.map((page) => {
            page.path = shared_1.convertToPinyin(decodeURIComponent(page.path));
            return page;
        });
        const { autoSetCategory } = this.app.options.themeConfig;
        const publishPosts = this.app.pages
            .filter((page) => {
            var _a, _b;
            const publishFlag = !(((_a = page === null || page === void 0 ? void 0 : page.frontmatter) === null || _a === void 0 ? void 0 : _a.home) === true
                || ((_b = page === null || page === void 0 ? void 0 : page.frontmatter) === null || _b === void 0 ? void 0 : _b.publish) === false
                || (page === null || page === void 0 ? void 0 : page.title) === '');
            if (autoSetCategory && publishFlag) {
                this.setCategory(page);
            }
            return publishFlag;
        })
            .sort((prev, next) => {
            const prevSticky = prev.frontmatter.sticky;
            const nextSticky = next.frontmatter.sticky;
            if (prevSticky && nextSticky) {
                return prevSticky == nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky);
            }
            else if (prevSticky && !nextSticky) {
                return -1;
            }
            else if (!prevSticky && nextSticky) {
                return 1;
            }
            return compareDate(prev, next);
        });
        this.publishPosts = publishPosts;
        publishPosts.forEach((page) => {
            var _a, _b;
            if (((_a = page === null || page === void 0 ? void 0 : page.frontmatter) === null || _a === void 0 ? void 0 : _a.home) === true ||
                ((_b = page === null || page === void 0 ? void 0 : page.frontmatter) === null || _b === void 0 ? void 0 : _b.publish) === false ||
                (page === null || page === void 0 ? void 0 : page.title) === '') {
                return;
            }
            const classificationKeys = Object.keys(page.frontmatter).filter((key) => {
                return this.frontmatterKeys.includes(key);
            });
            classificationKeys.forEach((key) => {
                const values = page.frontmatter[key];
                if (shared_1.isEmptyPlainObject(this.classificationData[key].items)) {
                    this.classificationData[key].items = values.reduce((total, current) => {
                        total[shared_1.convertToPinyin(current)] = {
                            pages: [page],
                            length: 1,
                            label: current
                        };
                        return total;
                    }, {});
                }
                else {
                    values === null || values === void 0 ? void 0 : values.forEach((value) => {
                        if (!this.classificationData[key].items[shared_1.convertToPinyin(value)]) {
                            this.classificationData[key].items[shared_1.convertToPinyin(value)] = {
                                pages: [page],
                                length: 1,
                                label: value
                            };
                        }
                        else {
                            const { pages: p, length, } = this.classificationData[key].items[shared_1.convertToPinyin(value)];
                            this.classificationData[key].items[shared_1.convertToPinyin(value)] = {
                                length: length + 1,
                                pages: [...p, page],
                                label: value
                            };
                        }
                    });
                }
            });
        });
        this.resolvePages();
    }
    // 根据数量转化成 page 信息
    resolvePages() {
        this.frontmatterKeys.forEach((key) => {
            const { items, layout, pagination } = this.classificationData[key];
            const valuesOfKey = Object.keys(items);
            this.classificationData[key].extendedPages = valuesOfKey.reduce((total, value) => {
                const num = items[shared_1.convertToPinyin(value)].length;
                const pageSize = Math.ceil(num / pagination);
                const pages = Array.from({ length: pageSize }).map((item, index) => {
                    return core_1.createPage(this.app, {
                        path: `/${key}/${shared_1.convertToPinyin(value)}/${index + 1}/`,
                        frontmatter: { layout },
                    });
                });
                return [...total, ...pages];
            }, []);
        });
    }
    // 解析 page 配置
    resolvePageOptions(option) {
        if (option.type === 'frontmatter') {
            return this.classificationData[option.frontmatterKey].extendedPages;
        }
        else {
            const { path, layout } = option;
            return [
                core_1.createPage(this.app, {
                    frontmatter: { layout },
                    path: shared_1.convertToPinyin(path),
                }),
            ];
        }
    }
    // 设置类别
    setCategory(page) {
        const blogCategray = (page.filePath || '').match(/.+\/blogs\/(.+)\/.+\.md$/);
        if (blogCategray)
            page.frontmatter.categories = [blogCategray[1]];
        const docCategray = (page.filePath || '').match(/.+\/docs\/(.+)\/.+\.md$/);
        if (docCategray)
            page.frontmatter.categories = [docCategray[1]];
    }
    getPublishPostsPage() {
        const pageSize = Math.ceil(this.publishPosts.length / 10);
        const pages = Array.from({ length: pageSize }).map((item, index) => {
            return core_1.createPage(this.app, {
                path: `/posts/${index + 1}/`,
                frontmatter: { layout: 'Post' },
            });
        });
        return pages;
    }
    // 拓展的页面
    get extendedPages() {
        const pages = this.options.reduce((total, option) => {
            const classificationPages = this.resolvePageOptions(option);
            return [...total, ...classificationPages];
        }, []);
        const publishPostsPages = this.getPublishPostsPage();
        return [...pages, ...publishPostsPages];
    }
    get classificationPaginationPosts() {
        let data = {};
        this.frontmatterKeys.forEach((key) => {
            const { items, pagination } = this.classificationData[key];
            const valuesOfKey = Object.keys(items);
            valuesOfKey.forEach((value) => {
                const { length, pages } = items[value];
                const pageSize = Math.ceil(length / pagination);
                const paginationDataOfValue = Array.from({
                    length: pageSize,
                }).reduce((total, current, index) => {
                    const currentPage = index + 1;
                    total[`/${key}/${shared_1.convertToPinyin(value)}/${currentPage}/`] = {
                        pageSize: pagination,
                        total: pages.length,
                        currentPage,
                        currentClassificationKey: key,
                        currentClassificationValue: value,
                        pages: index < pageSize - 1
                            ? pages.slice(pagination * index, pagination)
                            : pages.slice(pagination * index)
                    };
                    return total;
                }, {});
                data = { ...data, ...paginationDataOfValue };
            });
        });
        return data;
    }
    get classificationSummary() {
        return this.classificationData;
    }
    get posts() {
        return this.publishPosts;
    }
}
exports.default = Classifiable;
