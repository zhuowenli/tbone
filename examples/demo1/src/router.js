/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-17 14:03:09
 */

import Vue from 'vue';
import Router from 'vue-router';
import AAA from './pages/AAA.vue';
import BBB from './pages/BBB.vue';

Vue.use(Router);

export default new Router({
    mode: 'history', // 是否使用 history api
    routes: [
        { path: '/test/aaa', component: AAA },
        { path: '/test/bbb', component: BBB }
    ]
});
