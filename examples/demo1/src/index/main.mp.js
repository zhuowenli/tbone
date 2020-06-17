/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:19:03
 */

import Vue from 'vue';
import Router from 'vue-router';
import { HlgButton, HlgInput, HlgSelect, HlgOption } from 'hlg-ui';
import App from './App.vue';
import AAA from './AAA.vue';
import BBB from './BBB.vue';

Vue.prototype.$isMiniapp = true;

export default function createApp() {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    Vue.use(Router);
    Vue.use(HlgButton);
    Vue.use(HlgInput);
    Vue.use(HlgSelect);
    Vue.use(HlgOption);

    const router = new Router({
        mode: 'history', // 是否使用 history api
        routes: [
            { path: '/test/aaa', component: AAA },
            { path: '/test/bbb', component: BBB }
        ]
    });

    return new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
}
