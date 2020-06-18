/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:03
 */

import Vue from 'vue';
import {
    // HlgCheckbox, HlgCheckboxGroup, HlgForm,
    HlgInput,
    HlgButton, HlgSelect, HlgOption, HlgDropdown, HlgDropdownItem,
} from 'hlg-ui';
import App from './App.vue';
import router from './router';

Vue.prototype.$isMiniapp = true;

export default function createApp() {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    // Vue.use(HlgCheckbox);
    // Vue.use(HlgCheckboxGroup);
    Vue.use(HlgInput);
    // Vue.use(HlgForm);
    Vue.use(HlgSelect);
    Vue.use(HlgOption);
    Vue.use(HlgButton);
    Vue.use(HlgDropdown);
    Vue.use(HlgDropdownItem);

    return new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
}
