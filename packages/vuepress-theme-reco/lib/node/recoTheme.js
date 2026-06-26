"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoTheme = void 0;
const utils_1 = require("@vuepress/utils");
const resolveContainer_1 = require("./resolveContainer");
const tailwind_1 = require("./tailwind");
const recoTheme = (themeConfig) => {
    const { style = '@vuepress-reco/style-default' } = themeConfig;
    const stylePath = utils_1.path.resolve(process.cwd(), `node_modules/${style}`);
    const getStyleConfig = require(utils_1.path.resolve(`${stylePath}/lib/node/index.js`)).default;
    const styleConfig = getStyleConfig(themeConfig);
    styleConfig.plugins = [
        '@vuepress/plugin-git',
        ['@vuepress/plugin-theme-data', { themeData: themeConfig }],
        '@vuepress/plugin-search',
        '@vuepress/plugin-palette',
        '@vuepress/plugin-nprogress',
        '@vuepress/plugin-prismjs',
        ['@vuepress/active-header-links', {
                headerLinkSelector: 'a.page-header-item',
            }],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('tip')],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('info')],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('warning')],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('danger')],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('details')],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('code-group')],
        ['@vuepress/plugin-container', resolveContainer_1.resolveContainerOptions('code-group-item')],
        ['@vuepress/plugin-external-link-icon'],
        ['@vuepress-reco/vuepress-plugin-vue-preview'],
        ['@vuepress/register-components',
            {
                componentsDir: utils_1.path.resolve(process.cwd(), themeConfig.vuePreviewsDir || './.vuepress/vue-previews'),
            },
        ],
        ['@vuepress/register-components',
            {
                componentsDir: utils_1.path.resolve(process.cwd(), themeConfig.componentsDir || './.vuepress/components'),
            },
        ],
        ...styleConfig.plugins,
    ];
    return {
        name: 'vuepress-theme-reco',
        layouts: utils_1.path.resolve(process.cwd(), `node_modules/${style}/lib/client/layouts`),
        onInitialized(app) {
            // todo @vuepress/bundler-vite 适配问题
            app.options.bundler = '@vuepress/bundler-webpack';
            const { bundler, bundlerConfig } = app.options || {};
            if (bundler === '@vuepress/bundler-vite') {
                app.options.bundlerConfig = {
                    viteOptions: {
                        ...((bundlerConfig === null || bundlerConfig === void 0 ? void 0 : bundlerConfig.viteOptions) || {}),
                        css: {
                            postcss: {
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss')(tailwind_1.tailwindConfig),
                                    require('autoprefixer')({}),
                                    require('postcss-nested'),
                                    require('postcss-each')
                                ]
                            }
                        },
                        optimizeDeps: {
                            exclude: ['vue']
                        }
                    },
                };
            }
            else {
                app.options.bundlerConfig = {
                    postcss: {
                        postcssOptions: {
                            plugins: [
                                ['tailwindcss', tailwind_1.tailwindConfig],
                                ['autoprefixer', {}],
                                ['postcss-nested'],
                                ['postcss-each']
                            ]
                        },
                    },
                    ...bundlerConfig,
                };
            }
            styleConfig.onInitialized && styleConfig.onInitialized(app);
        },
        templateBuild: utils_1.path.resolve(__dirname, '../../templates/index.build.html'),
        templateDev: utils_1.path.resolve(__dirname, '../../templates/index.dev.html'),
        ...styleConfig,
    };
};
exports.recoTheme = recoTheme;
