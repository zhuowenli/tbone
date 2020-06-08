/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-08 15:25:21
 */

import {$$adapter} from '@zhuowenli/miniapp-render'

const {Event} = $$adapter

export default function callSingleEvent(eventName, evt, nativeComponent) {
    const domNode = nativeComponent.getDomNodeFromEvt(eventName, evt)
    if (!domNode) return

    domNode.$$trigger(eventName, {
        event: new Event({
            timeStamp: evt && evt.timeStamp,
            touches: evt && evt.touches,
            changedTouches: evt && evt.changedTouches,
            name: eventName,
            target: domNode,
            eventPhase: Event.AT_TARGET,
            detail: evt && evt.detail,
            $$extra: evt && evt.extra,
        }),
        currentTarget: domNode,
    })
}
