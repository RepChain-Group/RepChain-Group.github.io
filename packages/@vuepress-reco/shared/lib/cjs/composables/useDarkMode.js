"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDarkMode = exports.useDarkMode = exports.darkModeSymbol = void 0;
const vue_1 = require("vue");
exports.darkModeSymbol = Symbol('darkMode');
function useDarkMode() {
    const isDarkMode = vue_1.inject(exports.darkModeSymbol);
    if (!isDarkMode) {
        throw new Error('useDarkMode() is called without provider.');
    }
    const toggleMode = () => {
        isDarkMode.value = !isDarkMode.value;
    };
    return { isDarkMode, toggleMode };
}
exports.useDarkMode = useDarkMode;
function setupDarkMode() {
    const isDarkMode = vue_1.ref(false);
    vue_1.watch(isDarkMode, (newVal) => {
        localStorage && (localStorage['vuepress-reco-color-scheme'] = newVal ? 'dark' : 'light');
        const htmlEl = window === null || window === void 0 ? void 0 : window.document.querySelector('html');
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.toggle('dark', newVal);
    });
    const initMode = () => {
        if (localStorage && localStorage['vuepress-reco-color-scheme'] === 'dark' ||
            ((!localStorage || !('vuepress-reco-color-scheme' in localStorage)) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            isDarkMode.value = true;
        }
        else {
            isDarkMode.value = false;
        }
    };
    initMode();
    vue_1.provide(exports.darkModeSymbol, isDarkMode);
}
exports.setupDarkMode = setupDarkMode;
