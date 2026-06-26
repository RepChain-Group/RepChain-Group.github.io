export declare const resolveOptionsForCodeGroup: () => {
    before: () => string;
    after: () => string;
};
export declare const resolveOptionsForCodeGroupItem: () => {
    before: (info: any) => string;
    after: () => string;
};
export declare const resolveContainerOptions: (type: any) => {
    type: any;
    render: (tokens: any, idx: any) => string | undefined;
} | {
    before: (info: any) => string;
    after: () => string;
    type: any;
    render?: undefined;
};
