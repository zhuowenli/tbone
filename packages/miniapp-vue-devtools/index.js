/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-29 14:37:33
 */


import { installHook } from './src/backend/hook';
import { target } from './src/shared-utils/env';

installHook(target);

export default {
    connect(host, port, { showToast, app } = {}) {
        target.__VUE_DEVTOOLS_HOST__ = host;
        target.__VUE_DEVTOOLS_PORT__ = port;
        if (showToast) target.__VUE_DEVTOOLS_TOAST__ = showToast;
        if (app) target.__VUE_ROOT_INSTANCES__ = Array.isArray(app) ? app : [app];

        require('./dist/main.js');
    },
    init(Vue) {
        const tools = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

        tools.emit('init', Vue);
    }
};
