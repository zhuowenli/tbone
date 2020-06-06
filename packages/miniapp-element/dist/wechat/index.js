'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var render = require('@zhuowenli/miniapp-render');
var render__default = _interopDefault(render);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var Event = render.$$adapter.Event,
    EventTarget = render.$$adapter.EventTarget;
/**
 * 触发简单节点事件，不做冒泡处理，但会走捕获阶段
 */

function callSimpleEvent (eventName, evt, domNode) {
  if (!domNode) return;
  EventTarget.$$process(domNode, new Event({
    name: eventName,
    target: domNode,
    eventPhase: Event.AT_TARGET,
    detail: evt && evt.detail,
    $$extra: evt && evt.extra,
    bubbles: false
  }));
}

var coverImage = {
  name: 'cover-image',
  props: [{
    name: 'src',
    get: function get(domNode) {
      return domNode.src;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onCoverImageLoad: function onCoverImageLoad(evt) {
      callSimpleEvent('load', evt, this.domNode);
    },
    onCoverImageError: function onCoverImageError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    }
  }
};

var coverView = {
  name: 'cover-view',
  props: [{
    name: 'scrollTop',
    get: function get(domNode) {
      var value = domNode.getAttribute('scroll-top');
      return value !== undefined && !isNaN(+value) ? +value : '';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

var movableArea = {
  name: 'movable-area',
  props: [{
    name: 'scaleArea',
    get: function get(domNode) {
      return !!domNode.getAttribute('scale-area');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

var scrollView = {
  name: 'scroll-view',
  props: [{
    name: 'scrollX',
    get: function get(domNode) {
      return !!domNode.getAttribute('scroll-x');
    }
  }, {
    name: 'scrollY',
    get: function get(domNode) {
      return !!domNode.getAttribute('scroll-y');
    }
  }, {
    name: 'upperThreshold',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('upper-threshold'), 10);
      return !isNaN(value) ? value : 50;
    }
  }, {
    name: 'lowerThreshold',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('lower-threshold'), 10);
      return !isNaN(value) ? value : 50;
    }
  }, {
    name: 'scrollTop',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('scroll-top'), 10);
      return !isNaN(value) ? value : '';
    }
  }, {
    name: 'scrollLeft',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('scroll-left'), 10);
      return !isNaN(value) ? value : '';
    }
  }, {
    name: 'scrollIntoView',
    get: function get(domNode) {
      return domNode.getAttribute('scroll-into-view') || '';
    }
  }, {
    name: 'scrollWithAnimation',
    get: function get(domNode) {
      return !!domNode.getAttribute('scroll-with-animation');
    }
  }, {
    name: 'scrollAnimationDuration',
    get: function get(domNode) {
      return domNode.getAttribute('scroll-animation-duration');
    }
  }, {
    name: 'enableBackToTop',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-back-to-top');
    }
  }, {
    name: 'enableFlex',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-flex');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onScrollToUpper: function onScrollToUpper(evt) {
      callSimpleEvent('scrolltoupper', evt, this.domNode);
    },
    onScrollToLower: function onScrollToLower(evt) {
      callSimpleEvent('scrolltolower', evt, this.domNode);
    },
    onScroll: function onScroll(evt) {
      callSimpleEvent('scroll', evt, this.domNode);
    }
  }
};

var swiper = {
  name: 'swiper',
  props: [{
    name: 'indicatorDots',
    get: function get(domNode) {
      return !!domNode.getAttribute('indicator-dots');
    }
  }, {
    name: 'indicatorColor',
    get: function get(domNode) {
      return domNode.getAttribute('indicator-color') || 'rgba(0, 0, 0, .3)';
    }
  }, {
    name: 'indicatorActiveColor',
    get: function get(domNode) {
      return domNode.getAttribute('indicator-active-color') || '#000000';
    }
  }, {
    name: 'autoplay',
    get: function get(domNode) {
      return !!domNode.getAttribute('autoplay');
    }
  }, {
    name: 'current',
    get: function get(domNode) {
      return +domNode.getAttribute('current') || 0;
    }
  }, {
    name: 'interval',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('interval'), 10);
      return !isNaN(value) ? value : 5000;
    }
  }, {
    name: 'duration',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('duration'), 10);
      return !isNaN(value) ? value : 500;
    }
  }, {
    name: 'circular',
    get: function get(domNode) {
      return !!domNode.getAttribute('circular');
    }
  }, {
    name: 'vertical',
    get: function get(domNode) {
      return !!domNode.getAttribute('vertical');
    }
  }, {
    name: 'previousMargin',
    get: function get(domNode) {
      return domNode.getAttribute('previous-margin') || '0px';
    }
  }, {
    name: 'nextMargin',
    get: function get(domNode) {
      return domNode.getAttribute('next-margin') || '0px';
    }
  }, {
    name: 'displayMultipleItems',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('display-multiple-items'), 10);
      return !isNaN(value) ? value : 1;
    }
  }, {
    name: 'skipHiddenItemLayout',
    get: function get(domNode) {
      return !!domNode.getAttribute('skip-hidden-item-layout');
    }
  }, {
    name: 'easingFunction',
    get: function get(domNode) {
      return domNode.getAttribute('easing-function') || 'default';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onSwiperChange: function onSwiperChange(evt) {
      if (!this.domNode) return;
      this.domNode.$$setAttributeWithoutUpdate('current', evt.detail.current);
      callSimpleEvent('change', evt, this.domNode);
    },
    onSwiperTransition: function onSwiperTransition(evt) {
      callSimpleEvent('transition', evt, this.domNode);
    },
    onSwiperAnimationfinish: function onSwiperAnimationfinish(evt) {
      callSimpleEvent('animationfinish', evt, this.domNode);
    }
  }
};

var view = {
  name: 'view',
  props: [{
    name: 'hoverClass',
    get: function get(domNode) {
      return domNode.getAttribute('hover-class') || 'none';
    }
  }, {
    name: 'hoverStopPropagation',
    get: function get(domNode) {
      return !!domNode.getAttribute('hover-stop-propagation');
    }
  }, {
    name: 'hoverStartTime',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('hover-start-time'), 10);
      return !isNaN(value) ? value : 50;
    }
  }, {
    name: 'hoverStayTime',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('hover-stay-time'), 10);
      return !isNaN(value) ? value : 400;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

var icon = {
  name: 'icon',
  props: [{
    name: 'type',
    get: function get(domNode) {
      return domNode.getAttribute('type') || '';
    }
  }, {
    name: 'size',
    get: function get(domNode) {
      return domNode.getAttribute('size') || '23';
    }
  }, {
    name: 'color',
    get: function get(domNode) {
      return domNode.getAttribute('color') || '';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

var progress = {
  name: 'progress',
  props: [{
    name: 'percent',
    get: function get(domNode) {
      return +domNode.getAttribute('percent') || 0;
    }
  }, {
    name: 'showInfo',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-info');
    }
  }, {
    name: 'borderRadius',
    get: function get(domNode) {
      return domNode.getAttribute('border-radius') || '0';
    }
  }, {
    name: 'fontSize',
    get: function get(domNode) {
      return domNode.getAttribute('font-size') || '16';
    }
  }, {
    name: 'strokeWidth',
    get: function get(domNode) {
      return domNode.getAttribute('stroke-width') || '6';
    }
  }, {
    name: 'color',
    get: function get(domNode) {
      return domNode.getAttribute('color') || '#09BB07';
    }
  }, {
    name: 'activeColor',
    get: function get(domNode) {
      return domNode.getAttribute('active-color') || '#09BB07';
    }
  }, {
    name: 'backgroundColor',
    get: function get(domNode) {
      return domNode.getAttribute('background-color') || '#EBEBEB';
    }
  }, {
    name: 'active',
    get: function get(domNode) {
      return !!domNode.getAttribute('active');
    }
  }, {
    name: 'activeMode',
    get: function get(domNode) {
      return domNode.getAttribute('active-mode') || 'backwards';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onProgressActiveEnd: function onProgressActiveEnd(evt) {
      callSimpleEvent('activeend', evt, this.domNode);
    }
  }
};

var text = {
  name: 'text',
  props: [{
    name: 'selectable',
    get: function get(domNode) {
      return !!domNode.getAttribute('selectable');
    }
  }, {
    name: 'space',
    get: function get(domNode) {
      return domNode.getAttribute('space') || '';
    }
  }, {
    name: 'decode',
    get: function get(domNode) {
      return !!domNode.getAttribute('decode');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-04 17:56:13
 */
var button = {
  name: 'button',
  props: [{
    name: 'size',
    get: function get(domNode) {
      return domNode.getAttribute('size') || 'default';
    }
  }, {
    name: 'type',
    get: function get(domNode) {
      return domNode.getAttribute('type') || 'default';
    }
  }, {
    name: 'plain',
    get: function get(domNode) {
      return !!domNode.getAttribute('plain');
    }
  }, {
    name: 'disabled',
    get: function get(domNode) {
      return !!domNode.getAttribute('disabled');
    }
  }, {
    name: 'loading',
    get: function get(domNode) {
      return !!domNode.getAttribute('loading');
    }
  }, {
    name: 'formType',
    get: function get(domNode) {
      return domNode.getAttribute('form-type') || '';
    }
  }, {
    name: 'openType',
    get: function get(domNode) {
      return domNode.getAttribute('open-type') || '';
    }
  }, {
    name: 'hoverClass',
    get: function get(domNode) {
      return domNode.getAttribute('hover-class') || 'button-hover';
    }
  }, {
    name: 'hoverStopPropagation',
    get: function get(domNode) {
      return !!domNode.getAttribute('hover-stop-propagation');
    }
  }, {
    name: 'hoverStartTime',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('hover-start-time'), 10);
      return !isNaN(value) ? value : 20;
    }
  }, {
    name: 'hoverStayTime',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('hover-stay-time'), 10);
      return !isNaN(value) ? value : 70;
    }
  }, {
    name: 'lang',
    get: function get(domNode) {
      return domNode.getAttribute('lang') || 'en';
    }
  }, {
    name: 'sessionFrom',
    get: function get(domNode) {
      return domNode.getAttribute('session-from') || '';
    }
  }, {
    name: 'sendMessageTitle',
    get: function get(domNode) {
      return domNode.getAttribute('send-message-title') || '';
    }
  }, {
    name: 'sendMessagePath',
    get: function get(domNode) {
      return domNode.getAttribute('send-message-path') || '';
    }
  }, {
    name: 'sendMessageImg',
    get: function get(domNode) {
      return domNode.getAttribute('send-message-img') || '';
    }
  }, {
    name: 'appParameter',
    get: function get(domNode) {
      return domNode.getAttribute('app-parameter') || '';
    }
  }, {
    name: 'showMessageCard',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-message-card');
    }
  }, {
    name: 'businessId',
    get: function get(domNode) {
      return domNode.getAttribute('business-id') || '';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onButtonGetUserInfo: function onButtonGetUserInfo(evt) {
      callSimpleEvent('getuserinfo', evt, this.domNode);
    },
    onButtonContact: function onButtonContact(evt) {
      callSimpleEvent('contact', evt, this.domNode);
    },
    onButtonGetPhoneNumber: function onButtonGetPhoneNumber(evt) {
      callSimpleEvent('getphonenumber', evt, this.domNode);
    },
    onButtonError: function onButtonError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    },
    onButtonOpenSetting: function onButtonOpenSetting(evt) {
      callSimpleEvent('opensetting', evt, this.domNode);
    },
    onButtonLaunchApp: function onButtonLaunchApp(evt) {
      callSimpleEvent('launchapp', evt, this.domNode);
    }
  }
};

var editor = {
  name: 'editor',
  props: [{
    name: 'readOnly',
    get: function get(domNode) {
      return !!domNode.getAttribute('read-only');
    }
  }, {
    name: 'placeholder',
    get: function get(domNode) {
      return domNode.getAttribute('placeholder') || '';
    }
  }, {
    name: 'showImgSize',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-img-size');
    }
  }, {
    name: 'showImgToolbar',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-img-toolbar');
    }
  }, {
    name: 'showImgResize',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-img-resize');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onEditorReady: function onEditorReady(evt) {
      callSimpleEvent('ready', evt, this.domNode);
    },
    onEditorFocus: function onEditorFocus(evt) {
      callSimpleEvent('focus', evt, this.domNode);
    },
    onEditorBlur: function onEditorBlur(evt) {
      callSimpleEvent('blur', evt, this.domNode);
    },
    onEditorInput: function onEditorInput(evt) {
      callSimpleEvent('input', evt, this.domNode);
    },
    onEditorStatusChange: function onEditorStatusChange(evt) {
      callSimpleEvent('statuschange', evt, this.domNode);
    }
  }
};

var form = {
  name: 'form',
  props: [{
    name: 'reportSubmit',
    get: function get(domNode) {
      return !!domNode.getAttribute('report-submit');
    }
  }, {
    name: 'reportSubmitTimeout',
    get: function get(domNode) {
      return +domNode.getAttribute('report-submit-timeout') || 0;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onFormSubmit: function onFormSubmit(evt) {
      callSimpleEvent('submit', evt, this.domNode);
    },
    onFormReset: function onFormReset(evt) {
      callSimpleEvent('reset', evt, this.domNode);
    }
  }
};

// Check if the event passes through a node
function checkEventAccessDomNode(evt, domNode, dest) {
  var targetNode = dest || domNode.ownerDocument.body;
  var target = evt.target;
  if (domNode === targetNode) return true;

  while (target && target !== dest) {
    if (target === domNode) return true;
    target = target.parentNode;
  }

  return false;
}

// Find the closest parent node
function findParentNode(domNode, tagName) {
  var checkParentNode = function checkParentNode(parentNode, tagName) {
    if (!parentNode) return false;
    if (parentNode.tagName === tagName) return true;
    if (parentNode.tagName === 'BUILTIN-COMPONENT' && parentNode.behavior === tagName.toLowerCase()) return true;
    return false;
  };

  var parentNode = domNode.parentNode;
  if (checkParentNode(parentNode, tagName)) return parentNode;

  while (parentNode && parentNode.tagName !== tagName) {
    parentNode = parentNode.parentNode;
    if (checkParentNode(parentNode, tagName)) return parentNode;
  }

  return null;
}

var _render$$$adapter = render__default.$$adapter,
    cache = _render$$$adapter.cache,
    EventTarget$1 = _render$$$adapter.EventTarget;
function callEvent (eventName, evt, extra, pageId, nodeId) {
  var originNodeId = evt.currentTarget.dataset.privateNodeId || nodeId;
  var originNode = cache.getNode(pageId, originNodeId);
  if (!originNode) return;
  EventTarget$1.$$process(originNode, eventName, evt, extra, function (domNode, evt, isCapture) {
    // 延迟触发跳转，先等所有同步回调处理完成
    setTimeout(function () {
      if (evt.cancelable) return;
      var window = cache.getWindow(pageId); // 处理特殊节点事件

      if (domNode.tagName === 'A' && evt.type === 'click' && !isCapture) {
        // 处理 a 标签的跳转
        var href = domNode.href;
        var target = domNode.target;
        if (!href || href.indexOf('javascript') !== -1) return;
        if (target === '_blank') window.open(href);else window.location.href = href;
      } else if (domNode.tagName === 'LABEL' && evt.type === 'click' && !isCapture) {
        // 处理 label 的点击
        var forValue = domNode.getAttribute('for');
        var targetDomNode;

        if (forValue) {
          targetDomNode = window.document.getElementById(forValue);
        } else {
          targetDomNode = domNode.querySelector('input'); // 寻找 switch 节点

          if (!targetDomNode) {
            targetDomNode = domNode.querySelector('builtin-component[behavior=switch]');
          }
        }

        if (!targetDomNode || !!targetDomNode.getAttribute('disabled')) {
          return;
        } // Find target node


        if (targetDomNode.tagName === 'INPUT') {
          if (checkEventAccessDomNode(evt, targetDomNode, domNode)) {
            return;
          }

          var type = targetDomNode.type;

          if (type === 'radio') {
            targetDomNode.setAttribute('checked', true);
            var name = targetDomNode.name;
            var otherDomNodes = window.document.querySelectorAll("input[name=" + name + "]") || [];

            for (var _iterator = _createForOfIteratorHelperLoose(otherDomNodes), _step; !(_step = _iterator()).done;) {
              var otherDomNode = _step.value;

              if (otherDomNode.type === 'radio' && otherDomNode !== targetDomNode) {
                otherDomNode.setAttribute('checked', false);
              }
            }

            callSimpleEvent('change', {
              detail: {
                value: targetDomNode.value
              }
            }, targetDomNode);
          } else if (type === 'checkbox') {
            targetDomNode.setAttribute('checked', !targetDomNode.checked);
            callSimpleEvent('change', {
              detail: {
                value: targetDomNode.checked ? [targetDomNode.value] : []
              }
            }, targetDomNode);
          } else {
            targetDomNode.focus();
          }
        } else if (targetDomNode.tagName === 'BUILTIN-COMPONENT') {
          if (checkEventAccessDomNode(evt, targetDomNode, domNode)) {
            return;
          }

          var behavior = targetDomNode.behavior;

          if (behavior === 'switch') {
            var checked = !targetDomNode.getAttribute('checked');
            targetDomNode.setAttribute('checked', checked);
            callSimpleEvent('change', {
              detail: {
                value: checked
              }
            }, targetDomNode);
          }
        }
      } else if ((domNode.tagName === 'BUTTON' || domNode.tagName === 'BUILTIN-COMPONENT' && domNode.behavior === 'button') && evt.type === 'click' && !isCapture) {
        // 处理 button 点击
        var _type = domNode.tagName === 'BUTTON' ? domNode.getAttribute('type') : domNode.getAttribute('form-type');

        var formAttr = domNode.getAttribute('form');
        var form = formAttr ? window.document.getElementById('formAttr') : findParentNode(domNode, 'FORM');
        if (!form) return;
        if (_type !== 'submit' && _type !== 'reset') return;
        var inputList = form.querySelectorAll('input[name]');
        var textareaList = form.querySelectorAll('textarea[name]');
        var switchList = form.querySelectorAll('builtin-component[behavior=switch]').filter(function (item) {
          return !!item.getAttribute('name');
        });
        var sliderList = form.querySelectorAll('builtin-component[behavior=slider]').filter(function (item) {
          return !!item.getAttribute('name');
        });
        var pickerList = form.querySelectorAll('builtin-component[behavior=picker]').filter(function (item) {
          return !!item.getAttribute('name');
        });

        if (_type === 'submit') {
          var formData = {};

          if (inputList.length) {
            inputList.forEach(function (item) {
              if (item.type === 'radio') {
                if (item.checked) formData[item.name] = item.value;
              } else if (item.type === 'checkbox') {
                formData[item.name] = formData[item.name] || [];
                if (item.checked) formData[item.name].push(item.value);
              } else {
                formData[item.name] = item.value;
              }
            });
          }

          if (textareaList.length) {
            textareaList.forEach(function (item) {
              return formData[item.getAttribute('name')] = item.value;
            });
          }

          if (switchList.length) {
            switchList.forEach(function (item) {
              return formData[item.getAttribute('name')] = !!item.getAttribute('checked');
            });
          }

          if (sliderList.length) {
            sliderList.forEach(function (item) {
              return formData[item.getAttribute('name')] = +item.getAttribute('value') || 0;
            });
          }

          if (pickerList.length) {
            pickerList.forEach(function (item) {
              return formData[item.getAttribute('name')] = item.getAttribute('value');
            });
          }

          callSimpleEvent('submit', {
            detail: {
              value: formData
            },
            extra: {
              $$from: 'button'
            }
          }, form);
        } else if (_type === 'reset') {
          if (inputList.length) {
            inputList.forEach(function (item) {
              if (item.type === 'radio') {
                item.setAttribute('checked', false);
              } else if (item.type === 'checkbox') {
                item.setAttribute('checked', false);
              } else {
                item.setAttribute('value', '');
              }
            });
          }

          if (textareaList.length) {
            textareaList.forEach(function (item) {
              return item.setAttribute('value', '');
            });
          }

          if (switchList.length) {
            switchList.forEach(function (item) {
              return item.setAttribute('checked', undefined);
            });
          }

          if (sliderList.length) {
            sliderList.forEach(function (item) {
              return item.setAttribute('value', undefined);
            });
          }

          if (pickerList.length) {
            pickerList.forEach(function (item) {
              return item.setAttribute('value', undefined);
            });
          }

          callSimpleEvent('reset', {
            extra: {
              $$from: 'button'
            }
          }, form);
        }
      }
    }, 0);
  });
}

var cache$1 = render__default.$$adapter.cache;
var input = {
  name: 'input',
  props: [{
    name: 'value',
    get: function get(domNode) {
      return domNode.value || '';
    }
  }, {
    name: 'type',
    get: function get(domNode) {
      var value = domNode.type || 'text';
      return value !== 'password' ? value : 'text';
    }
  }, {
    name: 'password',
    get: function get(domNode) {
      return domNode.type !== 'password' ? !!domNode.getAttribute('password') : true;
    }
  }, {
    name: 'placeholder',
    get: function get(domNode) {
      return domNode.placeholder;
    }
  }, {
    name: 'placeholderColor',
    get: function get(domNode) {
      return domNode.getAttribute('placeholderColor') || '#999999';
    }
  }, {
    name: 'placeholderStyle',
    get: function get(domNode) {
      return domNode.getAttribute('placeholder-style') || '';
    }
  }, {
    name: 'placeholderClass',
    get: function get(domNode) {
      return domNode.getAttribute('placeholder-class') || 'input-placeholder';
    }
  }, {
    name: 'disabled',
    get: function get(domNode) {
      return domNode.disabled || domNode.readOnly;
    }
  }, {
    name: 'maxlength',
    get: function get(domNode) {
      var value = parseInt(domNode.maxlength, 10);
      return !isNaN(value) ? value : 140;
    }
  }, {
    name: 'cursorSpacing',
    get: function get(domNode) {
      return +domNode.getAttribute('cursor-spacing') || 0;
    }
  }, {
    name: 'autoFocus',
    get: function get(domNode) {
      return !!domNode.getAttribute('autofocus');
    }
  }, {
    name: 'focus',
    get: function get(domNode) {
      return !!domNode.getAttribute('focus');
    }
  }, {
    name: 'confirmType',
    get: function get(domNode) {
      return domNode.getAttribute('confirm-type') || 'done';
    }
  }, {
    name: 'confirmHold',
    get: function get(domNode) {
      return !!domNode.getAttribute('confirm-hold');
    }
  }, {
    name: 'cursor',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('cursor'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'selectionStart',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('selection-start'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'selectionEnd',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('selection-end'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'adjustPosition',
    get: function get(domNode) {
      var value = domNode.getAttribute('adjust-position');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'checked',
    get: function get(domNode) {
      return !!domNode.getAttribute('checked');
    }
  }, {
    name: 'color',
    get: function get(domNode) {
      return domNode.getAttribute('color') || '#09BB07';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onInputInput: function onInputInput(evt) {
      if (!this.domNode) return;
      this._inputOldValue = this.domNode.value;
      callEvent('input', evt, null, this.pageId, this.nodeId);
    },
    onInputFocus: function onInputFocus(evt) {
      this._inputOldValue = this.domNode.value || '';
      callSimpleEvent('focus', evt, this.domNode);
    },
    onInputBlur: function onInputBlur(evt) {
      if (!this.domNode) return;
      this.domNode.setAttribute('focus', false);

      if (this._inputOldValue !== undefined && this.domNode.value !== this._inputOldValue) {
        this._inputOldValue = undefined;
        callEvent('change', evt, null, this.pageId, this.nodeId);
      }

      callSimpleEvent('blur', evt, this.domNode);
    },
    onInputConfirm: function onInputConfirm(evt) {
      callSimpleEvent('confirm', evt, this.domNode);
    },
    onInputKeyBoardHeightChange: function onInputKeyBoardHeightChange(evt) {
      callSimpleEvent('keyboardheightchange', evt, this.domNode);
    },
    onRadioChange: function onRadioChange(evt) {
      var window = cache$1.getWindow(this.pageId);
      var domNode = this.domNode;
      var value = evt.detail.value;
      var name = domNode.name;
      var otherDomNodes = window.document.querySelectorAll("input[name=" + name + "]") || [];

      if (value === domNode.value) {
        domNode.setAttribute('checked', true);

        for (var _iterator = _createForOfIteratorHelperLoose(otherDomNodes), _step; !(_step = _iterator()).done;) {
          var otherDomNode = _step.value;

          if (otherDomNode.type === 'radio' && otherDomNode !== domNode) {
            otherDomNode.setAttribute('checked', false);
          }
        }
      }

      callEvent('input', evt, null, this.pageId, this.nodeId);
      callEvent('change', evt, null, this.pageId, this.nodeId);
    },
    onCheckboxChange: function onCheckboxChange(evt) {
      var domNode = this.domNode;
      var value = evt.detail.value || [];

      if (value.indexOf(domNode.value) >= 0) {
        domNode.setAttribute('checked', true);
      } else {
        domNode.setAttribute('checked', false);
      }

      callEvent('change', evt, null, this.pageId, this.nodeId);
    }
  }
};

// eslint-disable-next-line import/no-extraneous-dependencies
var picker = {
  name: 'picker',
  props: [{
    name: 'disabled',
    get: function get(domNode) {
      return !!domNode.getAttribute('disabled');
    }
  }, {
    name: 'range',
    get: function get(domNode) {
      var value = domNode.getAttribute('range');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'rangeKey',
    get: function get(domNode) {
      return domNode.getAttribute('range-key') || '';
    }
  }, {
    name: 'value',
    get: function get(domNode) {
      var mode = domNode.getAttribute('mode') || 'selector';
      var value = domNode.getAttribute('value');

      if (mode === 'selector' || mode === 'multiSelector') {
        return +value || 0;
      } else if (mode === 'time') {
        return value || '';
      } else if (mode === 'date') {
        return value || '0';
      } else if (mode === 'region') {
        return value || [];
      }

      return value;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onPickerChange: function onPickerChange(evt) {
      if (!this.domNode) return;
      this.domNode.$$setAttributeWithoutUpdate('value', evt.detail.value);
      callSimpleEvent('change', evt, this.domNode);
    },
    onPickerCancel: function onPickerCancel(evt) {
      callSimpleEvent('cancel', evt, this.domNode);
    }
  }
};

{
  picker.props.concat([{
    name: 'mode',
    get: function get(domNode) {
      return domNode.getAttribute('mode') || 'selector';
    }
  }, {
    name: 'start',
    get: function get(domNode) {
      return domNode.getAttribute('start') || '';
    }
  }, {
    name: 'end',
    get: function get(domNode) {
      return domNode.getAttribute('end') || '';
    }
  }, {
    name: 'fields',
    get: function get(domNode) {
      return domNode.getAttribute('fields') || 'day';
    }
  }, {
    name: 'customItem',
    get: function get(domNode) {
      return domNode.getAttribute('custom-item') || '';
    }
  }]);

  picker.handles.onPickerColumnChange = function (evt) {
    callSimpleEvent('columnchange', evt, this.domNode);
  };
}

var pickerView = {
  name: 'picker-view',
  props: [{
    name: 'value',
    get: function get(domNode) {
      var value = domNode.getAttribute('value');
      if (typeof value === 'string') value = value.split(',').map(function (item) {
        return parseInt(item, 10);
      });
      return value !== undefined ? value : [];
    }
  }, {
    name: 'indicatorStyle',
    get: function get(domNode) {
      return domNode.getAttribute('indicator-style') || '';
    }
  }, {
    name: 'indicatorClass',
    get: function get(domNode) {
      return domNode.getAttribute('indicator-class') || '';
    }
  }, {
    name: 'maskStyle',
    get: function get(domNode) {
      return domNode.getAttribute('mask-style') || '';
    }
  }, {
    name: 'maskClass',
    get: function get(domNode) {
      return domNode.getAttribute('mask-class') || '';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onPickerViewChange: function onPickerViewChange(evt) {
      if (!this.domNode) return;
      this.domNode.$$setAttributeWithoutUpdate('value', evt.detail.value);
      callSimpleEvent('change', evt, this.domNode);
    },
    onPickerViewPickstart: function onPickerViewPickstart(evt) {
      callSimpleEvent('pickstart', evt, this.domNode);
    },
    onPickerViewPickend: function onPickerViewPickend(evt) {
      callSimpleEvent('pickend', evt, this.domNode);
    }
  }
};

var slider = {
  name: 'slider',
  props: [{
    name: 'min',
    get: function get(domNode) {
      return +domNode.getAttribute('min') || 0;
    }
  }, {
    name: 'max',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('max'), 10);
      return !isNaN(value) ? value : 100;
    }
  }, {
    name: 'step',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('step'), 10);
      return !isNaN(value) ? value : 1;
    }
  }, {
    name: 'disabled',
    get: function get(domNode) {
      return !!domNode.getAttribute('disabled');
    }
  }, {
    name: 'value',
    get: function get(domNode) {
      return +domNode.getAttribute('value') || 0;
    }
  }, {
    name: 'color',
    get: function get(domNode) {
      return domNode.getAttribute('color') || '#e9e9e9';
    }
  }, {
    name: 'selectedColor',
    get: function get(domNode) {
      return domNode.getAttribute('selected-color') || '#1aad19';
    }
  }, {
    name: 'activeColor',
    get: function get(domNode) {
      return domNode.getAttribute('active-color') || '#1aad19';
    }
  }, {
    name: 'backgroundColor',
    get: function get(domNode) {
      return domNode.getAttribute('background-color') || '#e9e9e9';
    }
  }, {
    name: 'blockSize',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('block-size'), 10);
      return !isNaN(value) ? value : 28;
    }
  }, {
    name: 'blockColor',
    get: function get(domNode) {
      return domNode.getAttribute('block-color') || '#ffffff';
    }
  }, {
    name: 'showValue',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-value');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onSliderChange: function onSliderChange(evt) {
      if (!this.domNode) return;
      this.domNode.$$setAttributeWithoutUpdate('value', evt.detail.value);
      callSimpleEvent('change', evt, this.domNode);
    },
    onSliderChanging: function onSliderChanging(evt) {
      callSimpleEvent('changing', evt, this.domNode);
    }
  }
};

var switchCom = {
  name: 'switch',
  props: [{
    name: 'checked',
    get: function get(domNode) {
      return !!domNode.getAttribute('checked');
    }
  }, {
    name: 'disabled',
    get: function get(domNode) {
      return !!domNode.getAttribute('disabled');
    }
  }, {
    name: 'type',
    get: function get(domNode) {
      return domNode.getAttribute('type') || 'switch';
    }
  }, {
    name: 'color',
    get: function get(domNode) {
      return domNode.getAttribute('color') || '#04BE02';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onSwitchChange: function onSwitchChange(evt) {
      if (!this.domNode) return;
      this.domNode.setAttribute('checked', evt.detail.value);
      callSimpleEvent('change', evt, this.domNode);
    }
  }
};

var textarea = {
  name: 'textarea',
  props: [{
    name: 'value',
    get: function get(domNode) {
      return domNode.value || '';
    }
  }, {
    name: 'placeholder',
    get: function get(domNode) {
      return domNode.placeholder;
    }
  }, {
    name: 'placeholderColor',
    get: function get(domNode) {
      return domNode.getAttribute('placeholderColor') || '#999999';
    }
  }, {
    name: 'placeholderStyle',
    get: function get(domNode) {
      return domNode.getAttribute('placeholder-style') || '';
    }
  }, {
    name: 'placeholderClass',
    get: function get(domNode) {
      return domNode.getAttribute('placeholder-class') || 'input-placeholder';
    }
  }, {
    name: 'disabled',
    get: function get(domNode) {
      return domNode.disabled || domNode.readOnly;
    }
  }, {
    name: 'maxlength',
    get: function get(domNode) {
      var value = parseInt(domNode.maxlength, 10);
      return !isNaN(value) ? value : 140;
    }
  }, {
    name: 'autoFocus',
    get: function get(domNode) {
      return !!domNode.getAttribute('autofocus');
    }
  }, {
    name: 'focus',
    get: function get(domNode) {
      return !!domNode.getAttribute('focus');
    }
  }, {
    name: 'autoHeight',
    get: function get(domNode) {
      return !!domNode.getAttribute('auto-height');
    }
  }, {
    name: 'fixed',
    get: function get(domNode) {
      return !!domNode.getAttribute('fixed');
    }
  }, {
    name: 'cursorSpacing',
    get: function get(domNode) {
      return +domNode.getAttribute('cursor-spacing') || 0;
    }
  }, {
    name: 'cursor',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('cursor'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'showConfirmBar',
    get: function get(domNode) {
      var value = domNode.getAttribute('show-confirm-bar');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'selectionStart',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('selection-start'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'selectionEnd',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('selection-end'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'adjustPosition',
    get: function get(domNode) {
      var value = domNode.getAttribute('adjust-position');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onTextareaFocus: function onTextareaFocus(evt) {
      this._textareaOldValue = this.domNode.value;
      callSimpleEvent('focus', evt, this.domNode);
    },
    onTextareaBlur: function onTextareaBlur(evt) {
      if (!this.domNode) return;
      this.domNode.setAttribute('focus', false);

      if (this._textareaOldValue !== undefined && this.domNode.value !== this._textareaOldValue) {
        this._textareaOldValue = undefined;
        this.callEvent('change', evt);
      }

      callSimpleEvent('blur', evt, this.domNode);
    },
    onTextareaLineChange: function onTextareaLineChange(evt) {
      callSimpleEvent('linechange', evt, this.domNode);
    },
    onTextareaInput: function onTextareaInput(evt) {
      if (!this.domNode) return;
      var value = '' + evt.detail.value;
      this.domNode.setAttribute('value', value);
      callEvent('input', evt, null, this.pageId, this.nodeId);
    },
    onTextareaConfirm: function onTextareaConfirm(evt) {
      callSimpleEvent('confirm', evt, this.domNode);
    },
    onTextareaKeyBoardHeightChange: function onTextareaKeyBoardHeightChange(evt) {
      callSimpleEvent('keyboardheightchange', this.domNode);
    }
  }
};

var navigator = {
  name: 'navigator',
  props: [{
    name: 'target',
    get: function get(domNode) {
      return domNode.getAttribute('target') || 'self';
    }
  }, {
    name: 'url',
    get: function get(domNode) {
      return domNode.getAttribute('url') || '';
    }
  }, {
    name: 'openType',
    get: function get(domNode) {
      return domNode.getAttribute('open-type') || 'navigate';
    }
  }, {
    name: 'delta',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('delta'), 10);
      return !isNaN(value) ? value : 1;
    }
  }, {
    name: 'appId',
    get: function get(domNode) {
      return domNode.getAttribute('app-id') || '';
    }
  }, {
    name: 'path',
    get: function get(domNode) {
      return domNode.getAttribute('path') || '';
    }
  }, {
    name: 'extraData',
    get: function get(domNode) {
      return domNode.getAttribute('extra-data') || {};
    }
  }, {
    name: 'version',
    get: function get(domNode) {
      return domNode.getAttribute('version') || 'release';
    }
  }, {
    name: 'hoverClass',
    get: function get(domNode) {
      return domNode.getAttribute('hover-class') || 'navigator-hover';
    }
  }, {
    name: 'hoverStopPropagation',
    get: function get(domNode) {
      return !!domNode.getAttribute('hover-stop-propagation');
    }
  }, {
    name: 'hoverStartTime',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('hover-start-time'), 10);
      return !isNaN(value) ? value : 50;
    }
  }, {
    name: 'hoverStayTime',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('hover-stay-time'), 10);
      return !isNaN(value) ? value : 600;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onNavigatorSuccess: function onNavigatorSuccess(evt) {
      callSimpleEvent('success', evt, this.domNode);
    },
    onNavigatorFail: function onNavigatorFail(evt) {
      callSimpleEvent('fail', evt, this.domNode);
    },
    onNavigatorComplete: function onNavigatorComplete(evt) {
      callSimpleEvent('complete', evt, this.domNode);
    }
  }
};

var camera = {
  name: 'camera',
  props: [{
    name: 'mode',
    get: function get(domNode) {
      return domNode.getAttribute('mode') || 'normal';
    }
  }, {
    name: 'devicePosition',
    get: function get(domNode) {
      return domNode.getAttribute('device-position') || 'back';
    }
  }, {
    name: 'flash',
    get: function get(domNode) {
      return domNode.getAttribute('flash') || 'auto';
    }
  }, {
    name: 'frameSize',
    get: function get(domNode) {
      return domNode.getAttribute('frame-size') || 'medium';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onCameraStop: function onCameraStop(evt) {
      callSimpleEvent('stop', evt, this.domNode);
    },
    onCameraError: function onCameraError(evt) {
      callSimpleEvent('error', evt);
    },
    onCameraInitDone: function onCameraInitDone(evt) {
      callSimpleEvent('initdone', evt, this.domNode);
    },
    onCameraScanCode: function onCameraScanCode(evt) {
      callSimpleEvent('scancode', evt, this.domNode);
    }
  }
};

var image = {
  name: 'image',
  props: [{
    name: 'renderingMode',
    get: function get(domNode) {
      return domNode.getAttribute('rendering-mode') || '';
    }
  }, {
    name: 'src',
    get: function get(domNode) {
      return domNode.src;
    }
  }, {
    name: 'mode',
    get: function get(domNode) {
      return domNode.getAttribute('mode') || 'scaleToFill';
    }
  }, {
    name: 'lazyLoad',
    get: function get(domNode) {
      return !!domNode.getAttribute('lazy-load');
    }
  }, {
    name: 'showMenuByLongpress',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-menu-by-longpress');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onImageLoad: function onImageLoad(evt) {
      callSimpleEvent('load', evt, this.domNode);
    },
    onImageError: function onImageError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    }
  }
};

var livePlayer = {
  name: 'live-player',
  props: [{
    name: 'src',
    get: function get(domNode) {
      return domNode.src;
    }
  }, {
    name: 'mode',
    get: function get(domNode) {
      return domNode.getAttribute('mode') || 'live';
    }
  }, {
    name: 'autoplay',
    get: function get(domNode) {
      return !!domNode.getAttribute('autoplay');
    }
  }, {
    name: 'muted',
    get: function get(domNode) {
      return !!domNode.getAttribute('muted');
    }
  }, {
    name: 'orientation',
    get: function get(domNode) {
      return domNode.getAttribute('orientation') || 'vertical';
    }
  }, {
    name: 'objectFit',
    get: function get(domNode) {
      return domNode.getAttribute('object-fit') || 'contain';
    }
  }, {
    name: 'backgroundMute',
    get: function get(domNode) {
      return !!domNode.getAttribute('background-mute');
    }
  }, {
    name: 'minCache',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('min-cache'), 10);
      return !isNaN(value) ? value : 1;
    }
  }, {
    name: 'maxCache',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('max-cache'), 10);
      return !isNaN(value) ? value : 3;
    }
  }, {
    name: 'soundMode',
    get: function get(domNode) {
      return domNode.getAttribute('sound-mode') || 'speaker';
    }
  }, {
    name: 'autoPauseIfNavigate',
    get: function get(domNode) {
      var value = domNode.getAttribute('auto-pause-if-navigate');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'autoPauseIfOpenNative',
    get: function get(domNode) {
      var value = domNode.getAttribute('auto-pause-if-open-native');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onLivePlayerStateChange: function onLivePlayerStateChange(evt) {
      callSimpleEvent('statechange', evt, this.domNode);
    },
    onLivePlayerFullScreenChange: function onLivePlayerFullScreenChange(evt) {
      callSimpleEvent('fullscreenchange', evt, this.domNode);
    },
    onLivePlayerNetStatus: function onLivePlayerNetStatus(evt) {
      callSimpleEvent('netstatus', evt, this.domNode);
    }
  }
};

var livePusher = {
  name: 'live-pusher',
  props: [{
    name: 'url',
    get: function get(domNode) {
      return domNode.getAttribute('url');
    }
  }, {
    name: 'mode',
    get: function get(domNode) {
      return domNode.getAttribute('mode') || 'RTC';
    }
  }, {
    name: 'autopush',
    get: function get(domNode) {
      return !!domNode.getAttribute('autopush');
    }
  }, {
    name: 'muted',
    get: function get(domNode) {
      return !!domNode.getAttribute('muted');
    }
  }, {
    name: 'enableCamera',
    get: function get(domNode) {
      var value = domNode.getAttribute('enable-camera');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'autoFocus',
    get: function get(domNode) {
      var value = domNode.getAttribute('auto-focus');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'orientation',
    get: function get(domNode) {
      return domNode.getAttribute('orientation') || 'vertical';
    }
  }, {
    name: 'beauty',
    get: function get(domNode) {
      return +domNode.getAttribute('beauty') || 0;
    }
  }, {
    name: 'whiteness',
    get: function get(domNode) {
      return +domNode.getAttribute('whiteness') || 0;
    }
  }, {
    name: 'aspect',
    get: function get(domNode) {
      return domNode.getAttribute('aspect') || '9:16';
    }
  }, {
    name: 'minBitrate',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('min-bitrate'), 10);
      return !isNaN(value) ? value : 200;
    }
  }, {
    name: 'maxBitrate',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('max-bitrate'), 10);
      return !isNaN(value) ? value : 1000;
    }
  }, {
    name: 'waitingImage',
    get: function get(domNode) {
      return domNode.getAttribute('waiting-image') || '';
    }
  }, {
    name: 'waitingImageHash',
    get: function get(domNode) {
      return domNode.getAttribute('waiting-image-hash') || '';
    }
  }, {
    name: 'zoom',
    get: function get(domNode) {
      return !!domNode.getAttribute('zoom');
    }
  }, {
    name: 'devicePosition',
    get: function get(domNode) {
      return domNode.getAttribute('device-position') || 'front';
    }
  }, {
    name: 'backgroundMute',
    get: function get(domNode) {
      return !!domNode.getAttribute('background-mute');
    }
  }, {
    name: 'mirror',
    get: function get(domNode) {
      return !!domNode.getAttribute('mirror');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onLivePusherStateChange: function onLivePusherStateChange(evt) {
      callSimpleEvent('statechange', evt, this.domNode);
    },
    onLivePusherNetStatus: function onLivePusherNetStatus(evt) {
      callSimpleEvent('netstatus', evt, this.domNode);
    },
    onLivePusherError: function onLivePusherError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    },
    onLivePusherBgmStart: function onLivePusherBgmStart(evt) {
      callSimpleEvent('bgmstart', evt, this.domNode);
    },
    onLivePusherBgmProgress: function onLivePusherBgmProgress(evt) {
      callSimpleEvent('bgmprogress', evt, this.domNode);
    },
    onLivePusherBgmComplete: function onLivePusherBgmComplete(evt) {
      callSimpleEvent('bgmcomplete', evt, this.domNode);
    }
  }
};

var video = {
  name: 'video',
  props: [{
    name: 'src',
    get: function get(domNode) {
      return domNode.src;
    }
  }, {
    name: 'duration',
    get: function get(domNode) {
      return +domNode.getAttribute('duration') || 0;
    }
  }, {
    name: 'controls',
    get: function get(domNode) {
      return domNode.controls;
    }
  }, {
    name: 'danmuList',
    get: function get(domNode) {
      var value = domNode.getAttribute('danmu-list');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'danmuBtn',
    get: function get(domNode) {
      return !!domNode.getAttribute('danmu-btn');
    }
  }, {
    name: 'enableDanmu',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-danmu');
    }
  }, {
    name: 'autoplay',
    get: function get(domNode) {
      return domNode.autoplay;
    }
  }, {
    name: 'loop',
    get: function get(domNode) {
      return domNode.loop;
    }
  }, {
    name: 'muted',
    get: function get(domNode) {
      return domNode.muted;
    }
  }, {
    name: 'initialTime',
    get: function get(domNode) {
      return +domNode.getAttribute('initial-time') || 0;
    }
  }, {
    name: 'direction',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('direction'), 10);
      return !isNaN(value) ? value : -1;
    }
  }, {
    name: 'showProgress',
    get: function get(domNode) {
      var value = domNode.getAttribute('show-progress');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'showFullscreenBtn',
    get: function get(domNode) {
      var value = domNode.getAttribute('show-fullscreen-btn');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'showPlayBtn',
    get: function get(domNode) {
      var value = domNode.getAttribute('show-play-btn');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'showCenterPlayBtn',
    get: function get(domNode) {
      var value = domNode.getAttribute('show-center-play-btn');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'enableProgressGesture',
    get: function get(domNode) {
      var value = domNode.getAttribute('enable-progress-gesture');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'objectFit',
    get: function get(domNode) {
      return domNode.getAttribute('object-fit') || 'contain';
    }
  }, {
    name: 'poster',
    get: function get(domNode) {
      return domNode.poster;
    }
  }, {
    name: 'showMuteBtn',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-mute-btn');
    }
  }, {
    name: 'title',
    get: function get(domNode) {
      return domNode.getAttribute('title') || '';
    }
  }, {
    name: 'playBtnPosition',
    get: function get(domNode) {
      return domNode.getAttribute('play-btn-position') || 'bottom';
    }
  }, {
    name: 'enablePlayGesture',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-play-gesture');
    }
  }, {
    name: 'autoPauseIfNavigate',
    get: function get(domNode) {
      var value = domNode.getAttribute('auto-pause-if-navigate');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'autoPauseIfOpenNative',
    get: function get(domNode) {
      var value = domNode.getAttribute('auto-pause-if-open-native');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'vslideGesture',
    get: function get(domNode) {
      return !!domNode.getAttribute('vslide-gesture');
    }
  }, {
    name: 'vslideGestureInFullscreen',
    get: function get(domNode) {
      var value = domNode.getAttribute('vslide-gesture-in-fullscreen');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onVideoPlay: function onVideoPlay(evt) {
      callSimpleEvent('play', evt, this.domNode);
    },
    onVideoPause: function onVideoPause(evt) {
      callSimpleEvent('pause', evt, this.domNode);
    },
    onVideoEnded: function onVideoEnded(evt) {
      callSimpleEvent('ended', evt, this.domNode);
    },
    onVideoTimeUpdate: function onVideoTimeUpdate(evt) {
      if (!this.domNode) return;
      this.domNode.$$setAttributeWithoutUpdate('currentTime', evt.detail.currentTime);
      callSimpleEvent('timeupdate', evt, this.domNode);
    },
    onVideoFullScreenChange: function onVideoFullScreenChange(evt) {
      callSimpleEvent('fullscreenchange', evt, this.domNode);
    },
    onVideoWaiting: function onVideoWaiting(evt) {
      callSimpleEvent('waiting', evt, this.domNode);
    },
    onVideoError: function onVideoError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    },
    onVideoProgress: function onVideoProgress(evt) {
      if (!this.domNode) return;
      this.domNode.$$setAttributeWithoutUpdate('buffered', evt.detail.buffered);
      callSimpleEvent('progress', evt, this.domNode);
    }
  }
};

var map = {
  name: 'map',
  props: [{
    name: 'longitude',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('longitude'), 10);
      return !isNaN(value) ? value : 39.92;
    }
  }, {
    name: 'latitude',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('latitude'), 10);
      return !isNaN(value) ? value : 116.46;
    }
  }, {
    name: 'scale',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('scale'), 10);
      return !isNaN(value) ? value : 16;
    }
  }, {
    name: 'markers',
    get: function get(domNode) {
      var value = domNode.getAttribute('markers');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'polyline',
    get: function get(domNode) {
      var value = domNode.getAttribute('polyline');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'circles',
    get: function get(domNode) {
      var value = domNode.getAttribute('circles');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'controls',
    get: function get(domNode) {
      var value = domNode.getAttribute('controls');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'includePoints',
    get: function get(domNode) {
      var value = domNode.getAttribute('include-points');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'showLocation',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-location');
    }
  }, {
    name: 'polygons',
    get: function get(domNode) {
      var value = domNode.getAttribute('polygons');
      return value !== undefined ? value : [];
    }
  }, {
    name: 'subkey',
    get: function get(domNode) {
      return domNode.getAttribute('subkey') || '';
    }
  }, {
    name: 'layerStyle',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('layer-style'), 10);
      return !isNaN(value) ? value : 1;
    }
  }, {
    name: 'rotate',
    get: function get(domNode) {
      return +domNode.getAttribute('rotate') || 0;
    }
  }, {
    name: 'skew',
    get: function get(domNode) {
      return +domNode.getAttribute('skew') || 0;
    }
  }, {
    name: 'enable3D',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-3D');
    }
  }, {
    name: 'showCompass',
    get: function get(domNode) {
      return !!domNode.getAttribute('show-compass');
    }
  }, {
    name: 'enableOverlooking',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-overlooking');
    }
  }, {
    name: 'enableZoom',
    get: function get(domNode) {
      var value = domNode.getAttribute('enable-zoom');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'enableScroll',
    get: function get(domNode) {
      var value = domNode.getAttribute('enable-scroll');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'enableRotate',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-rotate');
    }
  }, {
    name: 'enableSatellite',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-satellite');
    }
  }, {
    name: 'enableTraffic',
    get: function get(domNode) {
      return !!domNode.getAttribute('enable-traffic');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onMapTap: function onMapTap(evt) {
      callSimpleEvent('tap', evt, this.domNode);
    },
    onMapMarkerTap: function onMapMarkerTap(evt) {
      callSimpleEvent('markertap', evt, this.domNode);
    },
    onMapControlTap: function onMapControlTap(evt) {
      callSimpleEvent('controltap', evt, this.domNode);
    },
    onMapCalloutTap: function onMapCalloutTap(evt) {
      callSimpleEvent('callouttap', evt, this.domNode);
    },
    onMapUpdated: function onMapUpdated(evt) {
      callSimpleEvent('updated', evt, this.domNode);
    },
    onMapRegionChange: function onMapRegionChange(evt) {
      callSimpleEvent('regionchange', evt, this.domNode);
    },
    onMapPoiTap: function onMapPoiTap(evt) {
      callSimpleEvent('poitap', evt, this.domNode);
    }
  }
};

var canvas = {
  name: 'canvas',
  props: [{
    name: 'type',
    get: function get(domNode) {
      return domNode.getAttribute('type') || '';
    }
  }, {
    name: 'canvasId',
    get: function get(domNode) {
      return domNode.getAttribute('canvas-id') || '';
    }
  }, {
    name: 'disableScroll',
    get: function get(domNode) {
      return !!domNode.getAttribute('disable-scroll');
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onCanvasTouchStart: function onCanvasTouchStart(evt) {
      this.callSimpleEvent('canvastouchstart', evt);
    },
    onCanvasTouchMove: function onCanvasTouchMove(evt) {
      this.callSimpleEvent('canvastouchmove', evt);
    },
    onCanvasTouchEnd: function onCanvasTouchEnd(evt) {
      this.callSimpleEvent('canvastouchend', evt);
    },
    onCanvasTouchCancel: function onCanvasTouchCancel(evt) {
      this.callSimpleEvent('canvastouchcancel', evt);
    },
    onCanvasLongTap: function onCanvasLongTap(evt) {
      callSimpleEvent('longtap', evt, this.domNode);
    },
    onCanvasError: function onCanvasError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    }
  }
};

var ad = {
  name: 'ad',
  props: [{
    name: 'unitId',
    get: function get(domNode) {
      return domNode.getAttribute('unit-id') || '';
    }
  }, {
    name: 'adIntervals',
    get: function get(domNode) {
      return +domNode.getAttribute('ad-intervals') || 0;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onAdLoad: function onAdLoad(evt) {
      callSimpleEvent('load', evt, this.domNode);
    },
    onAdError: function onAdError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    },
    onAdClose: function onAdClose(evt) {
      callSimpleEvent('close', evt, this.domNode);
    }
  }
};

var officialAccount = {
  name: 'official-account',
  props: [{
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onOfficialAccountLoad: function onOfficialAccountLoad(evt) {
      callSimpleEvent('load', evt, this.domNode);
    },
    onOfficialAccountError: function onOfficialAccountError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    }
  }
};

var openData = {
  name: 'open-data',
  props: [{
    name: 'type',
    get: function get(domNode) {
      return domNode.getAttribute('type') || '';
    }
  }, {
    name: 'openGid',
    get: function get(domNode) {
      return domNode.getAttribute('open-gid') || '';
    }
  }, {
    name: 'lang',
    get: function get(domNode) {
      return domNode.getAttribute('lang') || 'en';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

var webView = {
  name: 'web-view',
  props: [{
    name: 'src',
    get: function get(domNode) {
      return domNode.src;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onWebviewMessage: function onWebviewMessage(evt) {
      callSimpleEvent('message', evt, this.domNode);
    },
    onWebviewLoad: function onWebviewLoad(evt) {
      callSimpleEvent('load', evt, this.domNode);
    },
    onWebviewError: function onWebviewError(evt) {
      callSimpleEvent('error', evt, this.domNode);
    }
  }
};

var cache$2 = render__default.$$adapter.cache;
var movableView = {
  name: 'movable-view',
  props: [{
    name: 'direction',
    get: function get(domNode) {
      return domNode.getAttribute('direction') || 'none';
    }
  }, {
    name: 'inertia',
    get: function get(domNode) {
      return !!domNode.getAttribute('inertia');
    }
  }, {
    name: 'outOfBounds',
    get: function get(domNode) {
      return !!domNode.getAttribute('out-of-bounds');
    }
  }, {
    name: 'x',
    get: function get(domNode) {
      return +domNode.getAttribute('x') || 0;
    }
  }, {
    name: 'y',
    get: function get(domNode) {
      return +domNode.getAttribute('y') || 0;
    }
  }, {
    name: 'damping',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('damping'), 10);
      return !isNaN(value) ? value : 20;
    }
  }, {
    name: 'friction',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('friction'), 10);
      return !isNaN(value) ? value : 2;
    }
  }, {
    name: 'disabled',
    get: function get(domNode) {
      return !!domNode.getAttribute('disabled');
    }
  }, {
    name: 'scale',
    get: function get(domNode) {
      return !!domNode.getAttribute('scale');
    }
  }, {
    name: 'scaleMin',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('scale-min'), 10);
      return !isNaN(value) ? value : 0.5;
    }
  }, {
    name: 'scaleMax',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('scale-max'), 10);
      return !isNaN(value) ? value : 10;
    }
  }, {
    name: 'scaleValue',
    get: function get(domNode) {
      var value = parseInt(domNode.getAttribute('scale-value'), 10);
      return !isNaN(value) ? value : 1;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      var value = domNode.getAttribute('animation');
      return value !== undefined ? !!value : true;
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {
    onMovableViewChange: function onMovableViewChange(evt) {
      var nodeId = evt.currentTarget.dataset.privateNodeId;
      var domNode = cache$2.getNode(this.pageId, nodeId);
      if (!domNode) return;
      domNode.$$setAttributeWithoutUpdate('x', evt.detail.x);
      domNode.$$setAttributeWithoutUpdate('y', evt.detail.y);
      callSimpleEvent('change', evt, domNode);
    },
    onMovableViewScale: function onMovableViewScale(evt) {
      var nodeId = evt.currentTarget.dataset.privateNodeId;
      var domNode = cache$2.getNode(this.pageId, nodeId);
      if (!domNode) return;
      domNode.$$setAttributeWithoutUpdate('x', evt.detail.x);
      domNode.$$setAttributeWithoutUpdate('y', evt.detail.y);
      domNode.$$setAttributeWithoutUpdate('scale-value', evt.detail.scale);
      callSimpleEvent('scale', evt, domNode);
    },
    onMovableViewHtouchmove: function onMovableViewHtouchmove(evt) {
      var nodeId = evt.currentTarget.dataset.privateNodeId;
      var domNode = cache$2.getNode(this.pageId, nodeId);
      if (!domNode) return;
      callSimpleEvent('htouchmove', evt, domNode);
    },
    onMovableViewVtouchmove: function onMovableViewVtouchmove(evt) {
      var nodeId = evt.currentTarget.dataset.privateNodeId;
      var domNode = cache$2.getNode(this.pageId, nodeId);
      if (!domNode) return;
      callSimpleEvent('vtouchmove', evt, domNode);
    }
  }
};

var swiperItem = {
  name: 'swiper-item',
  props: [{
    name: 'itemId',
    get: function get(domNode) {
      return domNode.getAttribute('item-id') || '';
    }
  }, {
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

var pickerViewColumn = {
  name: 'picker-view-column',
  props: [{
    name: 'animation',
    get: function get(domNode) {
      return domNode.getAttribute('animation');
    }
  }],
  handles: {}
};

// Components
var components = [coverImage, coverView, movableArea, scrollView, swiper, view, icon, progress, text, button, editor, form, input, picker, pickerView, slider, switchCom, textarea, navigator, camera, image, livePlayer, livePusher, video, map, canvas, ad, officialAccount, openData, webView];
var subComponents = [movableView, swiperItem, pickerViewColumn];
var componentNameMap = {};
var propsMap = {};
var handlesMap = {};
components.forEach(function (_ref) {
  var name = _ref.name,
      props = _ref.props,
      handles = _ref.handles;
  componentNameMap[name] = name;
  propsMap[name] = props;
  Object.assign(handlesMap, handles);
});
subComponents.forEach(function (_ref2) {
  var name = _ref2.name,
      props = _ref2.props,
      handles = _ref2.handles;
  propsMap[name] = props;
  Object.assign(handlesMap, handles);
});

var ELEMENT_DIFF_KEYS = ['nodeId', 'pageId', 'tagName', 'compName', 'id', 'class', 'style', 'src', 'mode', 'lazyLoad', 'showMenuByLongpress', 'isImage', 'isLeaf', 'isSimple', 'content', 'extra', 'animation'];
var TEXT_NODE_DIFF_KEYS = ['nodeId', 'pageId', 'content'];
var NEET_BEHAVIOR_NORMAL_CUSTOM_ELEMENT = ['movable-view', 'swiper-item', 'picker-view-column'];
var NOT_SUPPORT = ['IFRAME', 'A']; // The nodes that class and style need to be separated

var NEET_SPLIT_CLASS_STYLE_FROM_CUSTOM_ELEMENT = ['INPUT', 'TEXTAREA', 'VIDEO', 'CANVAS', 'BUILTIN-COMPONENT', 'CUSTOM-COMPONENT']; // The nodes that must be render as custom components

var NEET_RENDER_TO_CUSTOM_ELEMENT = [].concat(NOT_SUPPORT, NEET_SPLIT_CLASS_STYLE_FROM_CUSTOM_ELEMENT);

// import render from '@zhuowenli/miniapp-render'
// Filter nodes only reserve childs

function filterNodes(domNode, level) {
  var childNodes = domNode.childNodes || [];
  if (!childNodes.map) return []; // Tags are not supported and child nodes are not rendered

  if (NOT_SUPPORT.indexOf(domNode.tagName) >= 0) return [];
  return childNodes.map(function (child) {
    var domInfo = child.$$domInfo;
    if (domInfo.type !== 'element' && domInfo.type !== 'text') return; // Add default class

    domInfo.class = "h5-" + domInfo.tagName + " node-" + domInfo.nodeId + " " + (domInfo.class || '');
    domInfo.domNode = child; // Special node

    if (NEET_SPLIT_CLASS_STYLE_FROM_CUSTOM_ELEMENT.indexOf(child.tagName) >= 0) {
      if (domInfo.tagName === 'builtin-component' && NEET_BEHAVIOR_NORMAL_CUSTOM_ELEMENT.indexOf(child.behavior) !== -1) {
        domInfo.compName = child.behavior;
        domInfo.extra = {
          hidden: child.getAttribute('hidden') || false
        }; // Add special component props

        var props = propsMap[child.behavior] || {};

        if (props && props.length) {
          props.forEach(function (_ref) {
            var name = _ref.name,
                get = _ref.get;
            domInfo.extra[name] = get(child);
          });
        }

        if (child.children.length && level > 0) {
          domInfo.childNodes = filterNodes(child, level - 1);
        }

        return domInfo;
      } // id and style are excluded


      domInfo.class = "h5-" + domInfo.tagName + " " + (domInfo.tagName === 'builtin-component' ? 'builtin-' + child.behavior : '');
      domInfo.id = '';
      domInfo.style = '';
    } // Check image node


    domInfo.isImage = domInfo.type === 'element' && domInfo.tagName === 'img';

    if (domInfo.isImage) {
      domInfo.src = child.src || '';
      domInfo.mode = child.getAttribute('mode') || '';
      domInfo.lazyLoad = !!child.getAttribute('lazy-load');
      domInfo.showMenuByLongpress = !!child.getAttribute('show-menu-by-longpress');
    } else {
      domInfo.src = '';
      domInfo.mode = '';
      domInfo.lazyLoad = false;
      domInfo.showMenuByLongpress = false;
    } // Check child nodes


    domInfo.isLeaf = !domInfo.isImage && domInfo.type === 'element' && !child.children.length && NEET_RENDER_TO_CUSTOM_ELEMENT.indexOf(child.tagName.toUpperCase()) === -1;

    if (domInfo.isLeaf) {
      domInfo.content = child.childNodes.map(function (childNode) {
        return childNode.$$domInfo.type === 'text' ? childNode.textContent : '';
      }).join('');
    } // Check simple node that can be rendered as view


    domInfo.isSimple = !domInfo.isLeaf && domInfo.type === 'element' && NEET_RENDER_TO_CUSTOM_ELEMENT.indexOf(child.tagName.toUpperCase()) === -1 && level > 0;

    if (domInfo.isSimple) {
      domInfo.content = '';
      domInfo.childNodes = filterNodes(child, level - 1);
    }

    return domInfo;
  }).filter(function (child) {
    return !!child;
  });
}

function checkDiffChildNodes(newChildNodes, oldChildNodes) {
  if (newChildNodes.length !== oldChildNodes.length) return true;

  for (var i = 0, len = newChildNodes.length; i < len; i++) {
    var newChild = newChildNodes[i];
    var oldChild = oldChildNodes[i];
    if (newChild.type !== oldChild.type) return true;
    var keys = newChild.type === 'element' ? ELEMENT_DIFF_KEYS : TEXT_NODE_DIFF_KEYS;

    for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
      var key = _step.value;
      var newValue = newChild[key];
      var oldValue = oldChild[key];

      if (typeof newValue === 'object') {
        // Diff object top level
        if (typeof oldValue !== 'object') return true;
        var objectKeys = Object.keys(newValue);

        for (var _i = 0, _objectKeys = objectKeys; _i < _objectKeys.length; _i++) {
          var objectKey = _objectKeys[_i];
          if (newValue[objectKey] !== oldValue[objectKey]) return true;
        }
      }

      if (newValue !== oldValue) return true;
    } // Diff children


    var newGrandChildNodes = newChild.childNodes || [];
    var oldGrandChildNodes = oldChild.childNodes || [];

    if (newGrandChildNodes.length || oldGrandChildNodes.length) {
      var checkRes = checkDiffChildNodes(newGrandChildNodes, oldGrandChildNodes);
      if (checkRes) return true;
    }
  }

  return false;
}

function checkComponentAttr(instance, name, newData) {
  var oldData = instance.data;
  var domNode = instance.domNode;
  var attrs = propsMap[name];
  newData.builtinComponentName = name;

  if (attrs && attrs.length) {
    for (var _iterator = _createForOfIteratorHelperLoose(attrs), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          _name = _step$value.name,
          get = _step$value.get;
      var newValue = get(domNode);
      if (!oldData || oldData[_name] !== newValue) newData[_name] = newValue;
    }
  } // Add id/class/style/hidden/animation


  var newId = domNode.id;
  if (!oldData || oldData.id !== newId) newData.id = newId;
  var newClass = "builtin-component-" + name + " node-" + domNode.$$nodeId + " " + (domNode.className || '');
  if (!oldData || oldData.class !== newClass) newData.class = newClass;
  var newStyle = domNode.style.cssText;
  if (!oldData || oldData.style !== newStyle) newData.style = newStyle;
  var newHidden = domNode.getAttribute('hidden') || false;
  if (!oldData || oldData.hidden !== newHidden) newData.hidden = newHidden;
  var newAnimation = domNode.getAttribute('animation');
  if (!oldData || oldData.animation !== newAnimation) newData.animation = newAnimation;
}

// Deal the nodes that needn't transfrom to custom component
function dealWithLeafAndSimple(childNodes, onChildNodesUpdate) {
  if (childNodes && childNodes.length) {
    childNodes = childNodes.map(function (originChildNode) {
      var childNode = Object.assign({}, originChildNode);

      if (childNode.isLeaf || childNode.isSimple) {
        childNode.domNode.$$clearEvent('$$childNodesUpdate');
        childNode.domNode.addEventListener('$$childNodesUpdate', onChildNodesUpdate);
      }

      delete childNode.domNode;
      childNode.childNodes = dealWithLeafAndSimple(childNode.childNodes, onChildNodesUpdate);
      return childNode;
    });
  }

  return childNodes;
}

function init (instance, data) {
  var domNode = instance.domNode;
  var tagName = domNode.tagName;

  if (tagName === 'BUILTIN-COMPONENT') {
    // BuildIn component
    data.builtinComponentName = domNode.behavior;
    var builtinComponentName = componentNameMap[data.builtinComponentName];
    if (builtinComponentName) checkComponentAttr(instance, builtinComponentName, data);else console.warn("value \"" + data.builtinComponentName + "\" is not supported for builtin-component's behavior");
  } else if (tagName === 'CUSTOM-COMPONENT') {
    // Custom component
    data.customComponentName = domNode.behavior;
    data.nodeId = instance.nodeId;
    data.pageId = instance.pageId;
  } else if (NOT_SUPPORT.indexOf(tagName) >= 0) {
    // Not supported component
    data.builtinComponentName = 'not-support';
    data.content = domNode.textContent;
  } else {
    // Could be replaced html tag
    var _builtinComponentName = componentNameMap[tagName.toLowerCase()];
    if (_builtinComponentName) checkComponentAttr(instance, _builtinComponentName, data);
  }
}

// eslint-disable-next-line import/no-extraneous-dependencies
function getInitialProps () {
  {
    return {
      properties: {
        inCover: {
          type: Boolean,
          value: false
        }
      }
    };
  }
}

// eslint-disable-next-line import/no-extraneous-dependencies
function getId (instance) {
  var nodeId, pageId;

  {
    nodeId = instance.dataset.privateNodeId;
    pageId = instance.dataset.privatePageId;
  }

  return {
    nodeId: nodeId,
    pageId: pageId
  };
}

// eslint-disable-next-line import/no-extraneous-dependencies
function getLifeCycle (_ref) {
  var init = _ref.init,
      mount = _ref.mount,
      _ready = _ref.ready,
      unmount = _ref.unmount;

  {
    var attached = function attached() {
      return mount.apply(this, arguments);
    };

    var detached = function detached() {
      return unmount.apply(this, arguments);
    };

    return {
      lifetimes: {
        attached: attached,
        detached: detached
      },
      // Keep compatibility to wx base library version < 2.2.3
      attached: attached,
      detached: detached,
      created: function created() {
        init.apply(this, arguments);
      },
      ready: function ready() {
        _ready.apply(this, arguments);
      }
    };
  }
}

var _render$$$adapter$1 = render__default.$$adapter,
    cache$3 = _render$$$adapter$1.cache,
    tool = _render$$$adapter$1.tool; // The number of levels of dom subtrees rendered as custom components

var MAX_DOM_SUB_TREE_LEVEL = 10;
var DOM_SUB_TREE_LEVEL = 10;

var config = _extends({
  data: {
    builtinComponentName: '',
    // the builtIn component name
    customComponentName: '',
    // current render custom component name
    innerChildNodes: [],
    // BuiltIn component children
    childNodes: []
  }
}, getInitialProps(), {
  options: {
    addGlobalClass: true // global style

  },
  methods: _extends({
    // Watch child nodes update
    onChildNodesUpdate: function onChildNodesUpdate() {
      // Node unomunted
      if (!this.pageId || !this.nodeId) return; // child nodes update

      var childNodes = filterNodes(this.domNode, DOM_SUB_TREE_LEVEL - 1);
      var oldChildNodes = this.data.builtinComponentName || this.data.customComponentName ? this.data.innerChildNodes : this.data.childNodes;

      if (checkDiffChildNodes(childNodes, oldChildNodes)) {
        var dataChildNodes = dealWithLeafAndSimple(childNodes, this.onChildNodesUpdate);
        var newData = {};

        if (this.data.builtinComponentName || this.data.customComponentName) {
          // builtIn component/custom component
          newData.innerChildNodes = dataChildNodes;
          newData.childNodes = [];
        } else {
          // normal tag
          newData.innerChildNodes = [];
          newData.childNodes = dataChildNodes;
        }

        this.setData(newData);
      } // dispatch child update


      var childNodeStack = [].concat(childNodes);
      var childNode = childNodeStack.pop();

      while (childNode) {
        if (childNode.type === 'element' && !childNode.isLeaf && !childNode.isSimple) {
          childNode.domNode.$$trigger('$$childNodesUpdate');
        }

        if (childNode.childNodes && childNode.childNodes.length) {
          childNode.childNodes.forEach(function (subChildNode) {
            return childNodeStack.push(subChildNode);
          });
        }

        childNode = childNodeStack.pop();
      }
    },
    // Watch node update
    onSelfNodeUpdate: function onSelfNodeUpdate() {
      // Node unomunted
      if (!this.pageId || !this.nodeId) return;
      var newData = {};
      var domNode = this.domNode;
      var data = this.data;
      var tagName = domNode.tagName;
      var newAttrData = newData;

      if (!this.__ready) {
        this.__readyData = newAttrData = {};
      }

      if (tagName === 'BUILTIN-COMPONENT') {
        // BuiltIn component
        if (data.builtinComponentName !== domNode.behavior) {
          newData.builtinComponentName = domNode.behavior;
        }

        var builtinComponentName = componentNameMap[domNode.behavior];

        if (builtinComponentName) {
          checkComponentAttr(this, builtinComponentName, newAttrData);
        }
      } else if (tagName === 'CUSTOM-COMPONENT') {
        // Custom component
        if (data.customComponentName !== domNode.behavior) {
          newData.customComponentName = domNode.behavior;
        }

        if (data.nodeId !== this.nodeId) data.nodeId = this.nodeId;
        if (data.pageId !== this.pageId) data.pageId = this.pageId;
      } else if (NOT_SUPPORT.indexOf(tagName) >= 0) {
        // Not support
        newData.builtinComponentName = 'not-support';

        if (data.content !== domNode.content) {
          newData.content = domNode.textContent;
        }
      } else {
        // Replaced html tag
        var _builtinComponentName = componentNameMap[tagName.toLowerCase()];

        if (_builtinComponentName) {
          checkComponentAttr(this, _builtinComponentName, newAttrData);
        }
      }

      this.setData(newData);
    },
    // Dom event
    onTouchStart: function onTouchStart(evt) {
      if (this.document && this.document.$$checkEvent(evt)) {
        callEvent('touchstart', evt, null, this.pageId, this.nodeId);
      }
    },
    onTouchMove: function onTouchMove(evt) {
      if (this.document && this.document.$$checkEvent(evt)) {
        callEvent('touchmove', evt, null, this.pageId, this.nodeId);
      }
    },
    onTouchEnd: function onTouchEnd(evt) {
      if (this.document && this.document.$$checkEvent(evt)) {
        callEvent('touchend', evt, null, this.pageId, this.nodeId);
      }
    },
    onTouchCancel: function onTouchCancel(evt) {
      if (this.document && this.document.$$checkEvent(evt)) {
        callEvent('touchcancel', evt, null, this.pageId, this.nodeId);
      }
    },
    onTap: function onTap(evt) {
      if (this.document && this.document.$$checkEvent(evt)) {
        callEvent('click', evt, {
          button: 0
        }, this.pageId, this.nodeId); // 默认左键
      }
    },
    onImgLoad: function onImgLoad(evt) {
      var pageId = this.pageId;
      var originNodeId = evt.currentTarget.dataset.privateNodeId || this.nodeId;
      var originNode = cache$3.getNode(pageId, originNodeId);
      if (!originNode) return;
      var domNode = originNode || this.getDomNodeFromEvt(evt);
      callSimpleEvent('load', evt, domNode);
    },
    onImgError: function onImgError(evt) {
      var pageId = this.pageId;
      var originNodeId = evt.currentTarget.dataset.privateNodeId || this.nodeId;
      var originNode = cache$3.getNode(pageId, originNodeId);
      if (!originNode) return;
      var domNode = originNode || this.getDomNodeFromEvt(evt);
      callSimpleEvent('error', evt, domNode);
    },

    /**
     * 从小程序事件对象中获取 domNode
     */
    getDomNodeFromEvt: function getDomNodeFromEvt(evt) {
      if (!evt) return;
      var pageId = this.pageId;
      var originNodeId = evt.currentTarget && evt.currentTarget.dataset.privateNodeId || this.nodeId;
      return cache$3.getNode(pageId, originNodeId);
    }
  }, handlesMap)
});

var lifeCycles = getLifeCycle({
  init: function init() {
    var config = cache$3.getConfig(); // Resets global variables according to configuration

    if (config.optimization) {
      var domSubTreeLevel = +config.optimization.domSubTreeLevel;

      if (domSubTreeLevel >= 1 && domSubTreeLevel <= MAX_DOM_SUB_TREE_LEVEL) {
        DOM_SUB_TREE_LEVEL = domSubTreeLevel;
      }
    }
  },
  mount: function mount() {
    var _getId = getId(this),
        nodeId = _getId.nodeId,
        pageId = _getId.pageId;

    var data = {};
    this.nodeId = nodeId;
    this.pageId = pageId; // Record dom

    this.domNode = cache$3.getNode(pageId, nodeId);
    if (!this.domNode) return; // TODO, for the sake of compatibility with a bug in the underlying library, is implemented as follows

    if (this.domNode.tagName === 'CANVAS') {
      this.domNode._builtInComponent = this;
    } // Store document


    this.document = cache$3.getDocument(pageId); // Listen global event

    this.onChildNodesUpdate = tool.throttle(this.onChildNodesUpdate.bind(this));
    this.domNode.$$clearEvent('$$childNodesUpdate');
    this.domNode.addEventListener('$$childNodesUpdate', this.onChildNodesUpdate);
    this.onSelfNodeUpdate = tool.throttle(this.onSelfNodeUpdate.bind(this));
    this.domNode.$$clearEvent('$$domNodeUpdate');
    this.domNode.addEventListener('$$domNodeUpdate', this.onSelfNodeUpdate); // init

    init(this, data); // init child nodes

    var childNodes = filterNodes(this.domNode, DOM_SUB_TREE_LEVEL - 1);
    var dataChildNodes = dealWithLeafAndSimple(childNodes, this.onChildNodesUpdate);

    if (data.builtinComponentName || data.customComponentName) {
      // builtIn component/custom component
      data.innerChildNodes = dataChildNodes;
      data.childNodes = [];
    } else {
      // normal tag
      data.innerChildNodes = [];
      data.childNodes = dataChildNodes;
    }

    this.setData(data);
  },
  ready: function ready() {
    this.__ready = true;

    if (this.__readyData) {
      this.setData(this.__readyData);
      this.__readyData = null;
    }
  },
  unmount: function unmount() {
    this.nodeId = null;
    this.pageId = null;
    this.domNode = null;
    this.document = null;
  }
});
Component(_extends({}, config, lifeCycles));
