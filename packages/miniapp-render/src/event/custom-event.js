/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-04 17:56:13
 */

import Event from './event';

export default class CustomEvent extends Event {
    constructor(name = '', options = {}) {
        super({
            name,
            ...options,
        });
    }
}
