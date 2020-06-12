import { $$adapter } from '@zhuowenli/miniapp-render';

const { Event, EventTarget } = $$adapter;

/**
 * 触发简单节点事件，不做冒泡处理，但会走捕获阶段
 */
export default function (eventName, evt, domNode) {
    if (!domNode) return;

    EventTarget.$$process(domNode, new Event({
        touches: evt.touches,
        changedTouches: evt.changedTouches,
        name: eventName,
        target: domNode,
        eventPhase: Event.AT_TARGET,
        detail: evt && evt.detail,
        $$extra: evt && evt.extra,
        bubbles: false,
    }));
}
