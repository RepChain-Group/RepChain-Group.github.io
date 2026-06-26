import { h } from 'vue';
import { useRoute } from 'vue-router';
import Link from './Link.vue';
const isActiveItem = (route, item) => {
    if (route.hash === item.link) {
        return true;
    }
    if (item.children) {
        return item.children.some((child) => isActiveItem(route, child));
    }
    return false;
};
const renderItem = (item, props) => {
    return h('li', {
        ...props,
    }, h(Link, {
        class: 'page-header-item',
        item,
    }));
};
const renderChildren = (item) => {
    var _a;
    if (!((_a = item.children) === null || _a === void 0 ? void 0 : _a.length)) {
        return [null];
    }
    return item.children.map((child) => h(HeaderChild, {
        item: child,
    }));
};
export const HeaderChild = ({ item }) => {
    const route = useRoute();
    const active = isActiveItem(route, item);
    if (item.children && item.children.length > 0) {
        return [
            renderItem(item, {
                class: {
                    [`page-header-menu-depth_${item.level || 2}`]: true,
                    active,
                },
            }),
            ...renderChildren(item),
        ];
    }
    return [
        renderItem(item, {
            class: {
                [`page-header-menu-depth_${item.level || 2}`]: true,
                active,
            },
        }),
    ];
};
HeaderChild.displayName = 'HeaderChild';
HeaderChild.props = {
    item: {
        type: Object,
        required: true,
    },
};
