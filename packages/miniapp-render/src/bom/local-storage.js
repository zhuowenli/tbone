/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-05 12:21:14
 */
import Event from '../event/event'

export default class LocalStorage {
    constructor(window) {
        this.$_keys = []
        this.$_window = window
    }

    /**
     * 更新 storage 信息
     */
    $_updateInfo() {
        try {
            const info = my.getStorageInfoSync()
            const pages = getCurrentPages() || []
            pages.forEach(page => {
                if (page && page.window) {
                    page.window.localStorage.$$keys = info.keys
                }
            })
        } catch (err) {
            console.warn('getStorageInfoSync fail')
        }
    }

    /**
     * 触发 window 的 storage 事件
     */
    $_triggerStorage(key, newValue, oldValue, force) {
        if (!force && newValue === oldValue) return

        const pages = getCurrentPages() || []
        pages.forEach(page => {
            if (page && page.window && page.window !== this.$_window) {
                page.window.$$trigger('storage', {
                    event: new Event({
                        name: 'storage',
                        target: page.window,
                        $$extra: {
                            key,
                            newValue,
                            oldValue,
                            storageArea: this,
                            url: this.$_window.location.href,
                        }
                    })
                })
            }
        })
    }

    set $$keys(keys) {
        this.$_keys = keys
    }

    /**
     * 对外属性和方法
     */
    get length() {
        return this.$_keys && this.$_keys.length || 0
    }

    key(num) {
        if (typeof num !== 'number' || !isFinite(num) || num < 0) return null

        return this.$_keys[num] || null
    }

    getItem(key) {
        if (!key || typeof key !== 'string') return null

        return my.getStorageSync(key) || null
    }

    setItem(key, data) {
        if (!key || typeof key !== 'string') return
        data = '' + data

        const oldValue = my.getStorageSync(key) || null

        my.setStorageSync(key, data)
        this.$_updateInfo()
        this.$_triggerStorage(key, data, oldValue)
    }

    removeItem(key) {
        if (!key || typeof key !== 'string') return

        const oldValue = my.getStorageSync(key) || null

        my.removeStorageSync(key)
        this.$_updateInfo()
        this.$_triggerStorage(key, null, oldValue)
    }

    clear() {
        my.clearStorageSync()
        this.$_updateInfo()
        this.$_triggerStorage(null, null, null, true)
    }
}
