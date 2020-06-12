/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-04 17:56:13
 */

import render from '@zhuowenli/miniapp-render';
import { isWeChatMiniProgram } from 'universal-env';
import checkEventAccessDomNode from '../vdom/checkEventAccessDomNode';
import findParentNode from '../vdom/findParentNode';
import callSimpleEvent from './callSimpleEvent';

const { cache, EventTarget } = render.$$adapter;

export default function (eventName, evt, extra, pageId, nodeId) {
    const originNodeId = evt.currentTarget.dataset.privateNodeId || nodeId;
    const originNode = cache.getNode(pageId, originNodeId);

    if (!originNode) return;

    EventTarget.$$process(originNode, eventName, evt, extra, (domNode, evt, isCapture) => {
        if (isWeChatMiniProgram) {
            // 延迟触发跳转，先等所有同步回调处理完成
            setTimeout(() => {
                if (evt.cancelable) return;
                const window = cache.getWindow();

                // 处理特殊节点事件
                if (domNode.tagName === 'LABEL' && evt.type === 'click' && !isCapture) {
                    // 处理 label 的点击
                    const forValue = domNode.getAttribute('for');
                    let targetDomNode;
                    if (forValue) {
                        targetDomNode = window.document.getElementById(forValue);
                    } else {
                        targetDomNode = domNode.querySelector('input');

                        // 寻找 switch 节点
                        if (!targetDomNode) {
                            targetDomNode = domNode.querySelector(
                                'builtIn-component[behavior=switch]'
                            );
                        }
                    }

                    if (!targetDomNode || !!targetDomNode.getAttribute('disabled')) { return; }

                    if (targetDomNode.tagName === 'INPUT') {
                        if (checkEventAccessDomNode(evt, targetDomNode, domNode)) return;
                        targetDomNode.focus();
                    } else if (targetDomNode.tagName === 'BUILTIN-COMPONENT') {
                        if (checkEventAccessDomNode(evt, targetDomNode, domNode)) return;

                        const behavior = targetDomNode.behavior;
                        if (behavior === 'switch') {
                            const checked = !targetDomNode.getAttribute('checked');
                            targetDomNode.setAttribute('checked', checked);
                            callSimpleEvent(
                                'change',
                                { detail: { value: checked } },
                                targetDomNode
                            );
                        }
                    }
                } else if (
                    (domNode.tagName === 'BUTTON' ||
                    domNode.tagName === 'BUILTIN-COMPONENT' &&
                    domNode.behavior === 'button') &&
                    evt.type === 'click' &&
                    !isCapture
                ) {
                    const type = domNode.tagName === 'BUTTON'
                        ? domNode.getAttribute('type')
                        : domNode.getAttribute('form-type');
                    const formAttr = domNode.getAttribute('form');
                    const form = formAttr
                        ? window.document.getElementById(formAttr)
                        : findParentNode(domNode, 'FORM');

                    if (!form) return;
                    if (type !== 'submit' && type !== 'reset') return;

                    const inputList = form.querySelectorAll('input[name]');
                    const textareaList = form.querySelectorAll('textarea[name]');
                    const switchList = form
                        .querySelectorAll('builtin-component[behavior=switch]')
                        .filter(item => !!item.getAttribute('name'));
                    const sliderList = form
                        .querySelectorAll('builtin-component[behavior=slider]')
                        .filter(item => !!item.getAttribute('name'));
                    const pickerList = form
                        .querySelectorAll('builtin-component[behavior=picker]')
                        .filter(item => !!item.getAttribute('name'));

                    if (type === 'submit') {
                        const formData = {};
                        if (inputList.length) {
                            inputList.forEach(item => {
                                formData[item.name] = item.value;
                            });
                        }
                        if (textareaList.length) {
                            textareaList.forEach(
                                (item) => formData[item.name] = item.value
                            );
                        }
                        if (switchList.length) {
                            switchList.forEach(
                                (item) => formData[item.getAttribute('name')] = !!item.getAttribute('checked')
                            );
                        }
                        if (sliderList.length) {
                            sliderList.forEach(
                                item => formData[item.getAttribute('name')] =
                                +item.getAttribute('value') || 0
                            );
                        }
                        if (pickerList.length) {
                            pickerList.forEach(
                                item => formData[item.getAttribute('name')] = item.getAttribute(
                                    'value'
                                )
                            );
                        }

                        const detail = { value: formData };
                        if (form._formId) {
                            detail.formId = form._formId;
                            form._formId = null;
                        }
                        callSimpleEvent(
                            'submit',
                            { detail, extra: { $$from: 'button' } },
                            form
                        );
                    } else if (type === 'reset') {
                        if (inputList.length) {
                            inputList.forEach((item) => {
                                item.setAttribute('value', '');
                            });
                        }
                        if (textareaList.length) { textareaList.forEach((item) => item.setAttribute('value', '')); }
                        if (switchList.length) { switchList.forEach((item) => item.setAttribute('checked', undefined)); }
                        if (sliderList.length) { sliderList.forEach((item) => item.setAttribute('value', undefined)); }
                        if (pickerList.length) { pickerList.forEach((item) => item.setAttribute('value', undefined)); }

                        callSimpleEvent('reset', { extra: { $$from: 'button' } }, form);
                    }
                }
            }, 0);
        } else if (domNode.tagName === 'A' && evt.type === 'click' && !isCapture) {
            // 处理 a 标签的跳转
            const href = domNode.href;
            const target = domNode.target;
            const window = cache.getWindow();

            if (!href || href.indexOf('javascript') !== -1) return;

            if (target === '_blank') window.open(href);
            else window.location.href = href;
        }
    });
}
