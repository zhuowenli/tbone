/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-10 10:10:09
 */

import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import AAA from './AAA.vue';
import BBB from './BBB.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history', // 是否使用 history api
    routes: [
        { path: '/test/aaa', component: AAA },
        { path: '/test/bbb', component: BBB }
    ]
});

export default new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
