"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vuePreviewPlugin = void 0;
const md_plugin_vue_preview_1 = require("./md-plugin-vue-preview");
const vuePreviewPlugin = (options, app) => {
    return {
        name: '@vuepress-reco/vuepress-plugin-vue-preview',
        extendsMarkdown(md) {
            md.use(md_plugin_vue_preview_1.mdPluginVueVuePreview);
        }
    };
};
exports.vuePreviewPlugin = vuePreviewPlugin;
