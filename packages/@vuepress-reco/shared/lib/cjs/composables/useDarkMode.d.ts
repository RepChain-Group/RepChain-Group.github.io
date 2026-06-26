import type { InjectionKey, WritableComputedRef } from 'vue';
export declare type DarkModeRef = WritableComputedRef<boolean>;
export declare const darkModeSymbol: InjectionKey<DarkModeRef>;
export declare function useDarkMode(): {
    isDarkMode: DarkModeRef;
    toggleMode: () => void;
};
export declare function setupDarkMode(): void;
