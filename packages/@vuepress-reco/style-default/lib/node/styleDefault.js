"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@vuepress-reco/shared");
const utils_1 = require("@vuepress/utils");
const pages_1 = require("./pages");
exports.default = shared_1.defineStyle((themeConfig) => ({
    pages: pages_1.pages,
    clientAppEnhanceFiles: utils_1.path.resolve(__dirname, '../client/clientAppEnhance.js'),
    clientAppSetupFiles: utils_1.path.resolve(__dirname, '../client/clientAppSetup.js'),
    extendsPage: (page) => {
        // save relative file path into page data to generate edit link
        page.data.filePathRelative = page.filePathRelative;
        // save title into route meta to generate navbar and sidebar
        page.routeMeta.title = page.title;
    },
    plugins: [
        ['@vuepress/back-to-top'],
        ['@vuepress-reco/vuepress-plugin-comments'],
        ['@vuepress-reco/vuepress-plugin-bulletin-popover'],
    ],
}));
