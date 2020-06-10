/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-05 12:21:14
 */

export default class Performance {
    constructor(timeOrigin) {
        this.$_timeOrigin = timeOrigin
    }

    /**
     * 对外属性和方法
     */
    get navigation() {
        console.warn('performance.navigation is not supported')
        return null
    }

    get timing() {
        console.warn('performance.timing is not supported')
        return null
    }

    get timeOrigin() {
        return this.$_timeOrigin
    }

    now() {
        return +new Date() - this.$_timeOrigin
    }
}
