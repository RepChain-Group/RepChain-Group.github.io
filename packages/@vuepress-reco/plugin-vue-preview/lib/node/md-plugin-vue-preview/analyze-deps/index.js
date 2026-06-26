"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeDeps = void 0;
const babel = require("@babel/core");
const utils_1 = require("@vuepress/utils");
const types = require("@babel/types");
const traverse_1 = require("@babel/traverse");
const compiler = require("@vue/compiler-sfc");
const module_resolver_1 = require("./module-resolver");
function analyzeDeps(absoluteFilePath) {
    var _a, _b;
    let content = utils_1.fs.readFileSync(absoluteFilePath, 'utf-8');
    if (/\.vue$/.test(absoluteFilePath)) {
        const { descriptor } = compiler.parse(content);
        content = (((_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.script) === null || _a === void 0 ? void 0 : _a.content) || ((_b = descriptor.scriptSetup) === null || _b === void 0 ? void 0 : _b.content));
    }
    // @ts-ignore
    const ast = babel.transformSync(content, {
        ast: true,
        plugins: [require('@babel/plugin-syntax-jsx')],
    }).ast;
    const dependencies = [];
    const addDep = function (requireStr) {
        const absPath = module_resolver_1.getModuleResolvePath({
            basePath: absoluteFilePath,
            sourcePath: requireStr,
        });
        if (!absPath || absPath.includes('node_modules')) {
            return;
        }
        dependencies.push(absPath);
    };
    traverse_1.default(ast, {
        CallExpression(callPath) {
            const callPathNode = callPath.node;
            // traverse all require statement
            if (types.isIdentifier(callPathNode.callee) &&
                callPathNode.callee.name === 'require' &&
                types.isStringLiteral(callPathNode.arguments[0])) {
                addDep(callPathNode.arguments[0].value);
            }
        },
        ImportDeclaration(path) {
            addDep(path.node.source.value);
        },
    });
    return dependencies;
}
exports.analyzeDeps = analyzeDeps;
