/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-12 09:43:15
 */

import { isWeChatMiniProgram } from 'universal-env';
import callSingleEvent from '../events/callSingleEvent';

let props = [{
    name: 'openType',
    get(domNode) {
        return domNode.getAttribute('open-type') || 'navigate';
    },
}, {
    name: 'hoverClass',
    get(domNode) {
        return domNode.getAttribute('hover-class') || 'none';
    },
}, {
    name: 'hoverStartTime',
    get(domNode) {
        const value = parseInt(domNode.getAttribute('hover-start-time'), 10);
        return !isNaN(value) ? value : 50;
    },
}, {
    name: 'hoverStayTime',
    get(domNode) {
        const value = parseInt(domNode.getAttribute('hover-stay-time'), 10);
        return !isNaN(value) ? value : 600;
    },
}, {
    name: 'url',
    get(domNode) {
        return domNode.getAttribute('url') || '';
    },
}, {
    name: 'animation',
    get(domNode) {
        return domNode.getAttribute('animation');
    }
}];
if (isWeChatMiniProgram) {
    props = props.concat([{
        name: 'target',
        get(domNode) {
            return domNode.getAttribute('target') || 'self';
        },
    }, {
        name: 'delta',
        get(domNode) {
            const value = parseInt(domNode.getAttribute('delta'), 10);
            return !isNaN(value) ? value : 1;
        },
    }, {
        name: 'appId',
        get(domNode) {
            return domNode.getAttribute('app-id') || '';
        },
    }, {
        name: 'path',
        get(domNode) {
            return domNode.getAttribute('path') || '';
        },
    }, {
        name: 'extraData',
        get(domNode) {
            return domNode.getAttribute('extra-data') || {};
        },
    }, {
        name: 'version',
        get(domNode) {
            return domNode.getAttribute('version') || 'release';
        },
    }, {
        name: 'hoverStopPropagation',
        get(domNode) {
            return !!domNode.getAttribute('hover-stop-propagation');
        },
    }]);
}

export default {
    name: 'navigator',
    props,
    handles: {
        onNavigatorSuccess(evt) {
            callSingleEvent('success', evt, this);
        },
        onNavigatorFail(evt) {
            callSingleEvent('fail', evt, this);
        },
        onNavigatorComplete(evt) {
            callSingleEvent('complete', evt, this);
        },
    },
};
