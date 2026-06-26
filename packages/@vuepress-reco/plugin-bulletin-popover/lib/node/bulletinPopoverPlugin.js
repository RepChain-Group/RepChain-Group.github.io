"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulletinPopoverPlugin = void 0;
const utils_1 = require("@vuepress/utils");
const bulletinPopoverPlugin = (options, app) => {
    return {
        name: '@vuepress-reco/vuepress-plugin-bulletin-popover',
        clientAppRootComponentFiles: utils_1.path.resolve(__dirname, '../client/components/Bulletin.vue'),
    };
};
exports.bulletinPopoverPlugin = bulletinPopoverPlugin;
