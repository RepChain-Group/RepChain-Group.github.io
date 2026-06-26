"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.md = void 0;
const markdown_1 = require("@vuepress/markdown");
const node_1 = require("@vuepress/plugin-prismjs/lib/node");
const md = markdown_1.createMarkdown();
exports.md = md;
md.options.highlight = (code, lang) => {
    const highlighter = node_1.resolveHighlighter(lang);
    return (highlighter === null || highlighter === void 0 ? void 0 : highlighter(code)) || '';
};
