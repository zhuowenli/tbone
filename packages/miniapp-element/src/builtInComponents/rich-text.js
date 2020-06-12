/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-12 09:43:15
 */

import { isWeChatMiniProgram } from 'universal-env';

const props = [{
    name: 'nodes',
    get(domNode) {
        return domNode.getAttribute('nodes') || [];
    },
}];
if (isWeChatMiniProgram) {
    props.push({
        name: 'space',
        get(domNode) {
            return domNode.getAttribute('space') || '';
        },
    });
}

export default {
    name: 'rich-text',
    props,
    handles: {},
};
