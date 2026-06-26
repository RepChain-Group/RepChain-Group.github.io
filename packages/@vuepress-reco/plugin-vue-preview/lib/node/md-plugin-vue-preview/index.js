"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdPluginVueVuePreview = void 0;
const utils_1 = require("@vuepress/utils");
const index_js_1 = require("./md-instance/index.js");
const index_js_2 = require("./analyze-deps/index.js");
let hasImportBlockOpen = false;
let importMode = '';
let componentName = null;
let importBlockIndex = 0;
let resolveFileError = false;
const root = process.cwd();
function _getAbsPath(path) {
    return path
        .trim()
        .replace(/^@/, root)
        .trim();
}
function doNotRenderTokenWhenBlockOpen(tokens, idx, options, env, self) {
    if (hasImportBlockOpen) {
        return '';
    }
    return self.renderToken(tokens, idx, options);
}
const mdPluginVueVuePreview = function (md) {
    // 覆盖块标签-起始标签
    md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
        const contentToken = tokens[idx + 1];
        const matchImportPattern = contentToken.type === 'inline' && contentToken.content.match(/^@\[(preview)-?(\w+)?\]\((.+)\)/);
        if (!matchImportPattern) {
            return self.renderToken(tokens, idx, options);
        }
        importMode = matchImportPattern[1];
        componentName = matchImportPattern[2];
        hasImportBlockOpen = true;
        importBlockIndex = idx;
        const filePath = matchImportPattern[3];
        const absoluteFilePath = _getAbsPath(filePath);
        if (!utils_1.fs.existsSync(absoluteFilePath)) {
            resolveFileError = true;
            return `<div class="custom-container warning"><p>未找到文件: ${absoluteFilePath}</p></div><!-- `;
        }
        if (!/\.vue$/.test(absoluteFilePath)) {
            resolveFileError = true;
            return `<div class="custom-container warning"><p>不支持非 vue 文件: ${filePath}</p></div><!-- `;
        }
        resolveFileError = false;
        if (importMode === 'preview') {
            return renderDemoOpen({ filePath, absoluteFilePath });
        }
    };
    // 覆盖块标签-结束标签
    md.renderer.rules.paragraph_close = function (tokens, idx, options, env, self) {
        if (hasImportBlockOpen && (importBlockIndex + 2) === idx) {
            hasImportBlockOpen = false;
            return !resolveFileError ? '--></CodeGroup></VuePreview>' : ' -->';
        }
        return self.renderToken(tokens, idx, options);
    };
    // 移除段落标签
    // md.renderer.rules.paragraph_close = md.renderer.rules.paragraph_open = doNotRenderTokenWhenBlockOpen
};
exports.mdPluginVueVuePreview = mdPluginVueVuePreview;
function renderDemoOpen({ filePath, absoluteFilePath }) {
    let template = `<VuePreview component="${componentName}"><CodeGroup>`;
    const deps = index_js_2.analyzeDeps(absoluteFilePath);
    if (!deps.length) {
        return (template +
            `
  ${index_js_1.md.render(`@[code](${absoluteFilePath})`)}
  `);
    }
    const codeGroups = `${[absoluteFilePath]
        .concat(deps)
        .map((absPath, index) => {
        return `<CodeGroupItem title="${utils_1.path.basename(absPath)}">
      ${index_js_1.md.render(`@[code](${absPath})`)}
      </CodeGroupItem>`;
    })
        .join('')}`;
    return template + codeGroups + '' + '<!-- ';
    return template;
}
