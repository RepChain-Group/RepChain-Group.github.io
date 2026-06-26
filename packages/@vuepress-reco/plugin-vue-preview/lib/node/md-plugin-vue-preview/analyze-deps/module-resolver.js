"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleResolvePath = void 0;
const utils_1 = require("@vuepress/utils");
const resolve = require('enhanced-resolve');
const slash = require('slash2');
const DEFAULT_EXT = ['.tsx', '.jsx', '.js', '.ts', '.vue'];
function getModuleResolvePath({ basePath, sourcePath, extensions = DEFAULT_EXT, silent = null }) {
    try {
        return slash(resolve.create.sync({
            extensions,
            symlinks: false,
            mainFiles: ['index', 'package.json'],
        })(utils_1.fs.statSync(basePath).isDirectory() ? basePath : utils_1.path.parse(basePath).dir, sourcePath));
    }
    catch (err) {
        if (!silent) {
            console.error(`[vuepress]: cannot resolve module ${sourcePath} from ${basePath}`);
        }
        throw err;
    }
}
exports.getModuleResolvePath = getModuleResolvePath;
