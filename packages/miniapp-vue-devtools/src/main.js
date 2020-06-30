/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-29 14:37:33
 */

import { initBackend } from './backend';
import Bridge from './shared-utils/bridge';
import { installToast } from './backend/toast';
import { target } from './shared-utils/env';

const EventBus = [];
const on = (event, callback) => {
    EventBus.push({ event, callback });
};
const emit = (event, data) => {
    console.log('📶 emit', event, data);
    my.sendSocketMessage({
        data: JSON.stringify([event, data])
    });
};

my.onSocketMessage(function (res) {
    try {
        const [e, data] = JSON.parse(res.data);

        EventBus.forEach(({ event, callback }) => {
            if (event === e) {
                console.log('📶 on', e, data);
                callback(data);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

const createSocket = () => {
    const host = target.__VUE_DEVTOOLS_HOST__ || 'http://localhost';
    const port = target.__VUE_DEVTOOLS_PORT__ !== undefined ? target.__VUE_DEVTOOLS_PORT__ : 8098;
    const fullHost = `${port ? `${host}:${port}` : host}/socket.io/`;
    const bridge = new Bridge({
        listen(fn) {
            on('vue-message', data => fn(data));
        },
        send(data) {
            emit('vue-message', data);
        }
    });

    my.httpRequest({
        url: fullHost.replace('ws', 'http'),
        data: {
            EIO: 3,
            transport: 'polling',
            t: 'NC32g82',
        },
        method: 'get',
        success: (res) => {
            console.log('🔗 createSocket', res.data);
            if (/"sid":"(.+?)"/.test(res.data)) {
                const sid = RegExp.$1;

                my.connectSocket({
                    url: fullHost,
                    data: { EIO: 3, transport: 'websocket', sid },
                    success(res) {
                        console.log('🔗 createSocket success', res);
                        console.log(fullHost);
                    },
                    fail(e) {
                        console.error('🚨 createSocket error', e);
                    }
                });

                my.onSocketOpen(function (res) {
                    console.log('WebSocket 连接已打开！');

                    initBackend(bridge);
                    emit('vue-devtools-init');

                    on('vue-devtools-disconnect-backend', () => {
                        my.closeSocket();
                    });

                    installToast(target);
                });
            }
        },
        fail: (res) => {
            console.error('🚨 fetch sid error', res);
        },
    });
};

createSocket();
