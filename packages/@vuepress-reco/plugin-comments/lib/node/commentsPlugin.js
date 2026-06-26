"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsPlugin = void 0;
const utils_1 = require("@vuepress/utils");
const commentsPlugin = () => {
    return {
        name: '@vuepress-reco/vuepress-plugin-comments',
        clientAppEnhanceFiles: utils_1.path.resolve(__dirname, '../client/clientAppEnhance.js')
    };
};
exports.commentsPlugin = commentsPlugin;
