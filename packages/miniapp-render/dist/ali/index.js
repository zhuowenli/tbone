(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['@zhuowenli/miniapp-render'] = factory());
}(this, (function () { 'use strict';

  /**
   * Hump to hyphen
   */
  function toDash(str) {
    return str.replace(/[A-Z]/g, function (all) {
      return "-" + all.toLowerCase();
    });
  }
  /**
   * Hyphen to hump
   */


  function toCamel(str) {
    return str.replace(/-([a-zA-Z])/g, function (all, $1) {
      return $1.toUpperCase();
    });
  }
  /**
   * Get unique id
   */


  var seed = +new Date();

  function getId() {
    return seed++;
  }
  /**
   * Gets the route of the miniapp page from the pageId
   */


  function getPageRoute(pageId) {
    return pageId.split('-')[2];
  }
  /**
   * Gets the applet page name from pageRoute
   */


  function getPageName(pageRoute) {
    var splitPageRoute = pageRoute.split('/');
    return splitPageRoute[1] === 'pages' ? splitPageRoute[2] : splitPageRoute[1];
  }
  /**
   * Throttling, which is called only once in a synchronous flow
   */


  var waitFuncSet = new Set();

  function throttle(func) {
    return function () {
      if (waitFuncSet.has(func)) return;
      waitFuncSet.add(func);
      Promise.resolve().then(function () {
        if (waitFuncSet.has(func)) {
          waitFuncSet.delete(func);
          func();
        }
      }).catch(function () {// ignore
      });
    };
  }
  /**
   * Clear throttling cache
   */


  function flushThrottleCache() {
    waitFuncSet.forEach(function (waitFunc) {
      return waitFunc && waitFunc();
    });
    waitFuncSet.clear();
  }
  /**
   * Encode special character
   */


  function decodeContent(content) {
    return content.replace(/&nbsp;/g, "\xA0").replace(/&ensp;/g, "\u2002").replace(/&emsp;/g, "\u2003").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'').replace(/&amp;/g, '&');
  }
  /**
   * Check tag wheather supported
   */


  var NOT_SUPPORT_TAG_NAME_LIST = ['IFRAME', 'A'];

  function isTagNameSupport(tagName) {
    return NOT_SUPPORT_TAG_NAME_LIST.indexOf(tagName) === -1;
  }

  var tool = {
    toDash: toDash,
    toCamel: toCamel,
    getId: getId,
    getPageRoute: getPageRoute,
    getPageName: getPageName,
    throttle: throttle,
    flushThrottleCache: flushThrottleCache,
    decodeContent: decodeContent,
    isTagNameSupport: isTagNameSupport
  };

  var pageMap = {};
  var configCache = {}; // Init

  function init(pageId, options) {
    pageMap[pageId] = {
      window: options.window,
      document: options.document,
      nodeIdMap: options.nodeIdMap
    };
  } // Destroy


  function destroy(pageId) {
    delete pageMap[pageId];
  }
  /**
   * Get document
   */


  function getDocument(pageId) {
    return pageMap[pageId] && pageMap[pageId].document;
  }
  /**
   * Get window
   */


  function getWindow(pageId) {
    return pageMap[pageId] && pageMap[pageId].window;
  }
  /**
   * Save domNode map
   */


  function setNode(pageId, nodeId, domNode) {
    if (domNode === void 0) {
      domNode = null;
    }

    var document = pageMap[pageId] && pageMap[pageId].document; // Call before run, do nothing

    if (!document) return;
    if (!domNode) return pageMap[pageId].nodeIdMap[nodeId] = domNode;
    var parentNode = domNode.parentNode;

    while (parentNode && parentNode !== document.body) {
      parentNode = parentNode.parentNode;
    }

    pageMap[pageId].nodeIdMap[nodeId] = parentNode === document.body ? domNode : null;
  } // Get the domNode by nodeId


  function getNode(pageId, nodeId) {
    return pageMap[pageId] && pageMap[pageId].nodeIdMap[nodeId];
  } // Store global config


  function setConfig(config) {
    configCache = config;
  } // Get global config


  function getConfig() {
    return configCache;
  }

  var cache = {
    init: init,
    destroy: destroy,
    getDocument: getDocument,
    getWindow: getWindow,
    setNode: setNode,
    getNode: getNode,
    setConfig: setConfig,
    getConfig: getConfig
  };

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _extends_1 = createCommonjsModule(function (module) {
    function _extends() {
      module.exports = _extends = Object.assign || function (target) {
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

    module.exports = _extends;
  });

  /**
   * Check the relationships between nodes
   */
  function checkRelation(node1, node2) {
    if (node1 === node2) return true;

    while (node1) {
      if (node1 === node2) return true;
      node1 = node1.parentNode;
    }

    return false;
  }

  var Event = /*#__PURE__*/function () {
    function Event(options) {
      var _this = this;

      this.$_name = options.name.toLowerCase();
      this.$_target = options.target;
      this.$_timeStamp = options.timeStamp || Date.now();
      this.$_currentTarget = options.currentTarget || options.target;
      this.$_eventPhase = options.eventPhase || Event.NONE;
      this.$_detail = options.detail || null;
      this.$_immediateStop = false;
      this.$_canBubble = true;
      this.$_bubbles = options.bubbles || false;
      this.$_touches = null;
      this.$_targetTouches = null;
      this.$_changedTouches = null;
      this.$_cancelable = false; // Add fields

      var extra = options.$$extra;

      if (extra) {
        Object.keys(extra).forEach(function (key) {
          _this[key] = extra[key];
        });
      } // Handle touches


      if (options.touches && options.touches.length) {
        this.$_touches = options.touches.map(function (touch) {
          return _extends_1({}, touch, {
            target: options.target
          });
        });
        this.$$checkTargetTouches();
      } // Handle changedTouches


      if (options.changedTouches && options.changedTouches.length) {
        this.$_changedTouches = options.changedTouches.map(function (touch) {
          return _extends_1({}, touch, {
            target: options.target
          });
        });
      }
    } // Whether the event is stopped immediately


    var _proto = Event.prototype;

    // Set target
    _proto.$$setTarget = function $$setTarget(target) {
      this.$_target = target;
    } // Set currentTarget
    ;

    _proto.$$setCurrentTarget = function $$setCurrentTarget(currentTarget) {
      this.$_currentTarget = currentTarget;
      this.$$checkTargetTouches();
    } // Set the stage of the event
    ;

    _proto.$$setEventPhase = function $$setEventPhase(eventPhase) {
      this.$_eventPhase = eventPhase;
    } // Check targetTouches
    ;

    _proto.$$checkTargetTouches = function $$checkTargetTouches() {
      var _this2 = this;

      if (this.$_touches && this.$_touches.length) {
        this.$_targetTouches = this.$_touches.filter(function (touch) {
          return checkRelation(touch.target, _this2.$_currentTarget);
        });
      }
    };

    _proto.preventDefault = function preventDefault() {
      this.$_cancelable = true;
    };

    _proto.stopPropagation = function stopPropagation() {
      if (this.eventPhase === Event.NONE) return;
      this.$_canBubble = false;
    };

    _proto.stopImmediatePropagation = function stopImmediatePropagation() {
      if (this.eventPhase === Event.NONE) return;
      this.$_immediateStop = true;
      this.$_canBubble = false;
    };

    _proto.initEvent = function initEvent(name, bubbles) {
      if (name === void 0) {
        name = '';
      }

      if (typeof name !== 'string') return;
      this.$_name = name.toLowerCase();
      this.$_bubbles = bubbles === undefined ? this.$_bubbles : !!bubbles;
    };

    createClass(Event, [{
      key: "$$immediateStop",
      get: function get() {
        return this.$_immediateStop;
      } // Whether can bubble

    }, {
      key: "$$canBubble",
      get: function get() {
        return this.$_canBubble;
      }
    }, {
      key: "bubbles",
      get: function get() {
        return this.$_bubbles;
      }
    }, {
      key: "cancelable",
      get: function get() {
        return this.$_cancelable;
      }
    }, {
      key: "target",
      get: function get() {
        return this.$_target;
      }
    }, {
      key: "currentTarget",
      get: function get() {
        return this.$_currentTarget;
      }
    }, {
      key: "eventPhase",
      get: function get() {
        return this.$_eventPhase;
      }
    }, {
      key: "type",
      get: function get() {
        return this.$_name;
      }
    }, {
      key: "timeStamp",
      get: function get() {
        return this.$_timeStamp;
      }
    }, {
      key: "touches",
      get: function get() {
        return this.$_touches;
      }
    }, {
      key: "targetTouches",
      get: function get() {
        return this.$_targetTouches;
      }
    }, {
      key: "changedTouches",
      get: function get() {
        return this.$_changedTouches;
      }
    }, {
      key: "detail",
      set: function set(value) {
        this.$_detail = value;
      },
      get: function get() {
        return this.$_detail;
      }
    }]);

    return Event;
  }(); // Static props


  Event.NONE = 0;
  Event.CAPTURING_PHASE = 1;
  Event.AT_TARGET = 2;
  Event.BUBBLING_PHASE = 3;

  var CustomEvent = /*#__PURE__*/function (_Event) {
    inheritsLoose(CustomEvent, _Event);

    function CustomEvent(name, options) {
      if (name === void 0) {
        name = '';
      }

      if (options === void 0) {
        options = {};
      }

      return _Event.call(this, _extends_1({
        name: name
      }, options)) || this;
    }

    return CustomEvent;
  }(Event);

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  /**
   * Compare touch list
   */

  function compareTouchList(a, b) {
    if (a.length !== b.length) return false;

    for (var i, len = a.length; i < len; i++) {
      var aItem = a[i];
      var bItem = b[i];
      if (aItem.identifier !== bItem.identifier) return false;
      if (aItem.pageX !== bItem.pageX || aItem.pageY !== bItem.pageY || aItem.clientX !== bItem.clientX || aItem.clientY !== bItem.clientY) return false;
    }

    return true;
  }
  /**
   * Compare event detail
   * @param {object} a
   * @param {object} b
   */


  function compareDetail(a, b) {
    if (a.pageX === b.pageX && a.pageY === b.pageY && a.clientX === b.clientX && a.clientY === b.clientY) {
      return true;
    }

    return false;
  }
  /**
   *
   * @param {string} property 'touches' or 'changedTouches' or 'detail'
   * @param {object} last last event
   * @param {object} now current event
   */


  function compareEventProperty(property, last, now) {
    var compareFn = property === 'detail' ? compareDetail : compareTouchList;

    if (last[property] && now[property] && !compareFn(last[property], now[property])) {
      // property are different
      return true;
    }

    if (!last[property] && now[property] || last[property] && !now[property]) {
      // One of them  doesn't have property
      return true;
    }

    return false;
  }

  function compareEventInAlipay(last, now) {
    // In Alipay, timestamps of the same event may have slight differences when bubbling
    // Set the D-value threshold to 10
    if (!last || now.timeStamp - last.timeStamp > 10) {
      return true;
    } // Tap event has no touches or changedTouches in Alipay, so use detail property to check


    return compareEventProperty('detail', last, now) || compareEventProperty('touches', last, now) || compareEventProperty('changedTouches', last, now);
  }

  var EventTarget = /*#__PURE__*/function () {
    function EventTarget() {
      this.$$init.apply(this, arguments);
    }

    var _proto = EventTarget.prototype;

    _proto.$$init = function $$init() {
      // Supplement the instance's properties for the 'XXX' in XXX judgment
      this.ontouchstart = null;
      this.ontouchmove = null;
      this.ontouchend = null;
      this.ontouchcancel = null;
      this.oninput = null;
      this.onfocus = null;
      this.onblur = null;
      this.onchange = null; // Logs the triggered miniapp events

      this.$_miniappEvent = null;
      this.$_eventHandlerMap = null;
    } // Destroy instance
    ;

    _proto.$$destroy = function $$destroy() {
      var _this = this;

      Object.keys(this).forEach(function (key) {
        // Handles properties beginning with on
        if (key.indexOf('on') === 0) _this[key] = null; // Handles private properties that are hung externally

        if (key[0] === '_') _this[key] = null;
        if (key[0] === '$' && key[1] !== '_' && key[1] !== '$') _this[key] = null;
      });
      this.$_miniappEvent = null;
      this.$_eventHandlerMap = null;
    };

    // Trigger event capture, bubble flow
    EventTarget.$$process = function $$process(target, eventName, miniappEvent, extra, callback) {
      var event;

      if (eventName instanceof CustomEvent || eventName instanceof Event) {
        // The event object is passed in
        event = eventName;
        eventName = event.type;
      }

      eventName = eventName.toLowerCase();
      var path = [target];
      var parentNode = target.parentNode;

      while (parentNode && parentNode.tagName !== 'HTML') {
        path.push(parentNode);
        parentNode = parentNode.parentNode;
      }

      if (path[path.length - 1].tagName === 'BODY') {
        // If the last node is document.body, the document.documentelement is appended
        path.push(parentNode);
      }

      if (!event) {
        // Special handling here, not directly return the applet's event object
        event = new Event({
          name: eventName,
          target: target,
          timeStamp: miniappEvent.timeStamp,
          touches: miniappEvent.touches,
          changedTouches: miniappEvent.changedTouches,
          bubbles: true,
          $$extra: extra
        });
      } // Capture


      for (var i = path.length - 1; i >= 0; i--) {
        var currentTarget = path[i]; // Determine if the bubble is over

        if (!event.$$canBubble) break;
        if (currentTarget === target) continue;
        event.$$setCurrentTarget(currentTarget);
        event.$$setEventPhase(Event.CAPTURING_PHASE);
        currentTarget.$$trigger(eventName, {
          event: event,
          isCapture: true
        });
        if (callback) callback(currentTarget, event, true);
      }

      if (event.$$canBubble) {
        event.$$setCurrentTarget(target);
        event.$$setEventPhase(Event.AT_TARGET); // Both capture and bubble phase listening events are triggered

        target.$$trigger(eventName, {
          event: event,
          isCapture: true,
          isTarget: true
        });
        if (callback) callback(target, event, true);
        target.$$trigger(eventName, {
          event: event,
          isCapture: false,
          isTarget: true
        });
        if (callback) callback(target, event, false);
      }

      if (event.bubbles) {
        for (var _iterator = _createForOfIteratorHelperLoose(path), _step; !(_step = _iterator()).done;) {
          var _currentTarget = _step.value;
          // Determine if the bubble is over
          if (!event.$$canBubble) break;
          if (_currentTarget === target) continue;
          event.$$setCurrentTarget(_currentTarget);
          event.$$setEventPhase(Event.BUBBLING_PHASE);

          _currentTarget.$$trigger(eventName, {
            event: event,
            isCapture: false
          });

          if (callback) callback(_currentTarget, event, false);
        }
      } // Reset event


      event.$$setCurrentTarget(null);
      event.$$setEventPhase(Event.NONE);
      return event;
    } // Get handlers
    ;

    _proto.$_getHandlers = function $_getHandlers(eventName, isCapture, isInit) {
      var handlerMap = this.$_eventHandlerMap;

      if (isInit) {
        var handlerObj = handlerMap[eventName] = handlerMap[eventName] || {};
        handlerObj.capture = handlerObj.capture || [];
        handlerObj.bubble = handlerObj.bubble || [];
        return isCapture ? handlerObj.capture : handlerObj.bubble;
      } else {
        var _handlerObj = handlerMap[eventName];
        if (!_handlerObj) return null;
        return isCapture ? _handlerObj.capture : _handlerObj.bubble;
      }
    } // Trigger node event
    ;

    _proto.$$trigger = function $$trigger(eventName, _temp) {
      var _this2 = this;

      var _ref = _temp === void 0 ? {} : _temp,
          event = _ref.event,
          _ref$args = _ref.args,
          args = _ref$args === void 0 ? [] : _ref$args,
          isCapture = _ref.isCapture,
          isTarget = _ref.isTarget;

      eventName = eventName.toLowerCase();
      var handlers = this.$_getHandlers(eventName, isCapture);
      var onEventName = "on" + eventName;

      if ((!isCapture || !isTarget) && typeof this[onEventName] === 'function') {
        // The event that triggers the onXXX binding
        if (event && event.$$immediateStop) return;

        try {
          var _this$onEventName;

          (_this$onEventName = this[onEventName]).call.apply(_this$onEventName, [this || null, event].concat(args));
        } catch (err) {
          console.error(err);
        }
      }

      if (handlers && handlers.length) {
        // Trigger addEventListener binded events
        handlers.forEach(function (handler) {
          if (event && event.$$immediateStop) return;

          try {
            handler.call.apply(handler, [_this2 || null, event].concat(args));
          } catch (err) {
            console.error(err);
          }
        });
      }
    }
    /**
     * 检查该事件是否可以触发
     */
    ;

    _proto.$$checkEvent = function $$checkEvent(miniappEvent) {
      var last = this.$_miniappEvent;
      var now = miniappEvent;
      var flag = false;

      {
        flag = compareEventInAlipay(last, now);
      }

      if (flag) this.$_miniappEvent = now;
      return flag;
    } // Empty all handles to an event
    ;

    _proto.$$clearEvent = function $$clearEvent(eventName, isCapture) {
      if (isCapture === void 0) {
        isCapture = false;
      }

      if (typeof eventName !== 'string') return;
      eventName = eventName.toLowerCase();
      var handlers = this.$_getHandlers(eventName, isCapture);
      if (handlers && handlers.length) handlers.length = 0;
    };

    _proto.addEventListener = function addEventListener(eventName, handler, options) {
      if (typeof eventName !== 'string' || typeof handler !== 'function') return;
      var isCapture = false;
      if (typeof options === 'boolean') isCapture = options;else if (typeof options === 'object') isCapture = options.capture;
      eventName = eventName.toLowerCase();
      var handlers = this.$_getHandlers(eventName, isCapture, true);
      handlers.push(handler);
    };

    _proto.removeEventListener = function removeEventListener(eventName, handler, isCapture) {
      if (isCapture === void 0) {
        isCapture = false;
      }

      if (typeof eventName !== 'string' || typeof handler !== 'function') return;
      eventName = eventName.toLowerCase();
      var handlers = this.$_getHandlers(eventName, isCapture);
      if (handlers && handlers.length) handlers.splice(handlers.indexOf(handler), 1);
    };

    _proto.dispatchEvent = function dispatchEvent(evt) {
      if (evt instanceof CustomEvent) {
        EventTarget.$$process(this, evt);
      } // preventDefault is not supported, so it always returns true


      return true;
    };

    createClass(EventTarget, [{
      key: "$_eventHandlerMap",
      set: function set(value) {
        this.$__eventHandlerMap = value;
      },
      get: function get() {
        if (!this.$__eventHandlerMap) this.$__eventHandlerMap = Object.create(null);
        return this.$__eventHandlerMap;
      }
    }]);

    return EventTarget;
  }();

  var Node = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(Node, _EventTarget);

    function Node() {
      return _EventTarget.apply(this, arguments) || this;
    }

    var _proto = Node.prototype;

    /**
     * Override parent class $$init method
     */
    _proto.$$init = function $$init(options, tree) {
      _EventTarget.prototype.$$init.call(this);

      this.$_nodeId = options.nodeId; // unique

      this.$_type = options.type;
      this.$_parentNode = null;
      this.$_tree = tree;
      this.$_pageId = tree.pageId;
    }
    /**
     * Override parent class $$destroy method
     */
    ;

    _proto.$$destroy = function $$destroy() {
      _EventTarget.prototype.$$destroy.call(this);

      this.$_nodeId = null;
      this.$_type = null;
      this.$_parentNode = null;
      this.$_tree = null;
      this.$_pageId = null;
    }
    /**
     * private nodeId
     */
    ;

    /**
     * update parent node
     */
    _proto.$$updateParent = function $$updateParent(parentNode) {
      if (parentNode === void 0) {
        parentNode = null;
      }

      this.$_parentNode = parentNode;
    };

    _proto.hasChildNodes = function hasChildNodes() {
      return false;
    };

    createClass(Node, [{
      key: "$$nodeId",
      get: function get() {
        return this.$_nodeId;
      }
      /**
       * private pageId
       */

    }, {
      key: "$$pageId",
      get: function get() {
        return this.$_pageId;
      }
    }, {
      key: "parentNode",
      get: function get() {
        return this.$_parentNode;
      }
    }, {
      key: "nodeValue",
      get: function get() {
        return null;
      }
    }, {
      key: "previousSibling",
      get: function get() {
        var childNodes = this.parentNode && this.parentNode.childNodes || [];
        var index = childNodes.indexOf(this);

        if (index > 0) {
          return childNodes[index - 1];
        }

        return null;
      }
    }, {
      key: "previousElementSibling",
      get: function get() {
        var childNodes = this.parentNode && this.parentNode.childNodes || [];
        var index = childNodes.indexOf(this);

        if (index > 0) {
          for (var i = index - 1; i >= 0; i--) {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
              return childNodes[i];
            }
          }
        }

        return null;
      }
    }, {
      key: "nextSibling",
      get: function get() {
        var childNodes = this.parentNode && this.parentNode.childNodes || [];
        var index = childNodes.indexOf(this);
        return childNodes[index + 1] || null;
      }
    }, {
      key: "nextElementSibling",
      get: function get() {
        var childNodes = this.parentNode && this.parentNode.childNodes || [];
        var index = childNodes.indexOf(this);

        if (index < childNodes.length - 1) {
          for (var i = index + 1, len = childNodes.length; i < len; i++) {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
              return childNodes[i];
            }
          }
        }

        return null;
      }
    }, {
      key: "ownerDocument",
      get: function get() {
        return cache.getDocument(this.$_pageId) || null;
      }
    }]);

    return Node;
  }(EventTarget); // static props


  Node.ELEMENT_NODE = 1;
  Node.TEXT_NODE = 3;
  Node.CDATA_SECTION_NODE = 4;
  Node.PROCESSING_INSTRUCTION_NODE = 7;
  Node.COMMENT_NODE = 8;
  Node.DOCUMENT_NODE = 9;
  Node.DOCUMENT_TYPE_NODE = 10;
  Node.DOCUMENT_FRAGMENT_NODE = 11;

  var Pool = /*#__PURE__*/function () {
    function Pool(size) {
      this.$_size = size || 3000;
      this.$_cache = [];
    } // Add an object


    var _proto = Pool.prototype;

    _proto.add = function add(object) {
      if (this.$_cache.length >= this.$_size) return;
      this.$_cache.push(object);
    } // Get an object
    ;

    _proto.get = function get() {
      return this.$_cache.pop();
    };

    return Pool;
  }();

  function _createForOfIteratorHelperLoose$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var pool = new Pool();

  function ClassList(onUpdate) {
    this.$$init(onUpdate);
  }

  ClassList.$$create = function (onUpdate) {
    var config = cache.getConfig();

    if (config.optimization.domExtendMultiplexing) {
      var instance = pool.get();

      if (instance) {
        instance.$$init(onUpdate);
        return instance;
      }
    }

    return new ClassList(onUpdate);
  };

  ClassList.prototype = Object.assign([], {
    $$init: function $$init(onUpdate) {
      this.$_doUpdate = onUpdate;
    },
    $$destroy: function $$destroy() {
      this.$_doUpdate = null;
      this.length = 0;
    },
    $$recycle: function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.domExtendMultiplexing) {
        pool.add(this);
      }
    },
    $$parse: function $$parse(className) {
      if (className === void 0) {
        className = '';
      }

      this.length = 0;
      className = className.trim();
      className = className ? className.split(/\s+/) : [];

      for (var _iterator = _createForOfIteratorHelperLoose$1(className), _step; !(_step = _iterator()).done;) {
        var item = _step.value;
        this.push(item);
      }

      this.$_doUpdate();
    },
    item: function item(index) {
      return this[index];
    },
    contains: function contains(className) {
      if (typeof className !== 'string') return false;
      return this.indexOf(className) !== -1;
    },
    add: function add() {
      var isUpdate = false;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var _i = 0, _args = args; _i < _args.length; _i++) {
        var className = _args[_i];
        if (typeof className !== 'string') continue;
        className = className.trim();

        if (className && this.indexOf(className) === -1) {
          this.push(className);
          isUpdate = true;
        }
      }

      if (isUpdate) this.$_doUpdate();
    },
    remove: function remove() {
      var isUpdate = false;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _args2 = args; _i2 < _args2.length; _i2++) {
        var className = _args2[_i2];
        if (typeof className !== 'string') continue;
        className = className.trim();
        if (!className) continue;
        var index = this.indexOf(className);

        if (index >= 0) {
          this.splice(index, 1);
          isUpdate = true;
        }
      }

      if (isUpdate) this.$_doUpdate();
    },
    toggle: function toggle(className, force) {
      if (typeof className !== 'string') return false;
      className = className.trim();
      if (!className) return false;
      var isNotContain = this.indexOf(className) === -1;
      var action = isNotContain ? 'add' : 'remove';
      action = force === true ? 'add' : force === false ? 'remove' : action;

      if (action === 'add') {
        this.add(className);
      } else {
        this.remove(className);
      }

      return force === true || force === false ? force : isNotContain;
    },
    toString: function toString() {
      return this.join(' ');
    }
  });

  /**
   * A list of supported style properties that by default contain only commonly used style properties
   */
  var styleList = ['position', 'top', 'bottom', 'right', 'left', 'float', 'clear', 'display', 'width', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'flex', 'flexBasis', 'flexGrow', 'flexShrink', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'background', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundRepeat', 'backgroundSize', 'border', 'borderRadius', 'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomStyle', 'borderBottomWidth', 'borderCollapse', 'borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopStyle', 'borderTopWidth', 'outline', 'borderWidth', 'borderStyle', 'borderColor', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'transform', 'transformOrigin', 'perspective', 'perspectiveOrigin', 'backfaceVisibility', 'font', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'color', 'textAlign', 'textDecoration', 'textIndent', 'textRendering', 'textShadow', 'textOverflow', 'textTransform', 'wordBreak', 'wordSpacing', 'wordWrap', 'lineHeight', 'letterSpacing', 'whiteSpace', 'userSelect', 'visibility', 'opacity', 'zIndex', 'zoom', 'overflow', 'overflowX', 'overflowY', 'boxShadow', 'boxSizing', 'content', 'cursor', 'direction', 'listStyle', 'objectFit', 'pointerEvents', 'resize', 'verticalAlign', 'willChange', 'clip', 'clipPath', 'fill', 'touchAction'];

  function _createForOfIteratorHelperLoose$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

  function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var pool$1 = new Pool();
  /**
   * Parse style string
   */

  function parse(styleText) {
    var rules = {};

    if (styleText) {
      styleText = tool.decodeContent(styleText); // deal with the semicolon in the value first

      styleText = styleText.replace(/url\([^)]+\)/ig, function (all) {
        return all.replace(/;/ig, ':#||#:');
      });
      styleText.split(';').forEach(function (rule) {
        rule = rule.trim();
        if (!rule) return;
        var split = rule.indexOf(':');
        if (split === -1) return;
        var name = tool.toCamel(rule.substr(0, split).trim());
        rules[name] = rule.substr(split + 1).replace(/:#\|\|#:/ig, ';').trim();
      });
    }

    return rules;
  }

  var Style = /*#__PURE__*/function () {
    function Style(onUpdate) {
      this.__settedStyle = {};
      this.$$init(onUpdate);
    }

    Style.$$create = function $$create(onUpdate) {
      var config = cache.getConfig();

      if (config.optimization.domExtendMultiplexing) {
        // reuse dom extension objects
        var instance = pool$1.get();

        if (instance) {
          instance.$$init(onUpdate);
          return instance;
        }
      }

      return new Style(onUpdate);
    } // Init instance
    ;

    var _proto = Style.prototype;

    _proto.$$init = function $$init(onUpdate) {
      this.$_doUpdate = onUpdate || function () {}; // Whether checking for updates is disabled


      this.$_disableCheckUpdate = false;
    };

    _proto.$$destroy = function $$destroy() {
      var _this = this;

      this.$_doUpdate = null;
      this.$_disableCheckUpdate = false;
      styleList.forEach(function (name) {
        _this.__settedStyle[name] = undefined;
      });
    };

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.domExtendMultiplexing) {
        // reuse dom extension objects
        pool$1.add(this);
      }
    };

    _proto.$_checkUpdate = function $_checkUpdate() {
      if (!this.$_disableCheckUpdate) {
        this.$_doUpdate();
      }
    };

    _proto.getPropertyValue = function getPropertyValue(name) {
      if (typeof name !== 'string') return '';
      name = tool.toCamel(name);
      return this[name] || '';
    };

    createClass(Style, [{
      key: "cssText",
      get: function get() {
        var _this2 = this;

        return Object.keys(this.__settedStyle).reduce(function (cssText, name) {
          if (_this2.__settedStyle[name]) {
            return cssText + (tool.toDash(name) + ":" + _this2.__settedStyle[name].trim() + ";");
          }

          return cssText;
        }, '');
      },
      set: function set(styleText) {
        if (typeof styleText !== 'string') return;
        styleText = styleText.replace(/"/g, '\''); // Parse style

        var rules = parse(styleText); // Merge the Settings for each rule into an update

        this.$_disableCheckUpdate = true;

        for (var _iterator = _createForOfIteratorHelperLoose$2(styleList), _step; !(_step = _iterator()).done;) {
          var name = _step.value;
          this[name] = rules[name];
        }

        this.$_disableCheckUpdate = false;
        this.$_checkUpdate();
      }
    }]);

    return Style;
  }();
  /**
   * Set the getters and setters for each property
   */


  var properties = {};
  styleList.forEach(function (name) {
    properties[name] = {
      get: function get() {
        return this.__settedStyle[name] || '';
      },
      set: function set(value) {
        var oldValue = this.__settedStyle[name];
        value = value !== undefined ? '' + value : undefined;
        this.__settedStyle[name] = value;
        if (oldValue !== value) this.$_checkUpdate();
      }
    };
  });
  Object.defineProperties(Style.prototype, properties);

  var pool$2 = new Pool();

  var Attribute = /*#__PURE__*/function () {
    function Attribute(element, onUpdate) {
      this.$$init(element, onUpdate);
    }

    Attribute.$$create = function $$create(element, onUpdate) {
      var config = cache.getConfig();

      if (config.optimization.domExtendMultiplexing) {
        var instance = pool$2.get();

        if (instance) {
          instance.$$init(element, onUpdate);
          return instance;
        }
      }

      return new Attribute(element, onUpdate);
    };

    var _proto = Attribute.prototype;

    _proto.$$init = function $$init(element, onUpdate) {
      this.$_element = element;
      this.$_doUpdate = onUpdate;
      this.$_map = {};
      this.$_list = [];
      this.triggerUpdate();
    };

    _proto.$$destroy = function $$destroy() {
      this.$_element = null;
      this.$_doUpdate = null;
      this.$_map = null;
      this.$_list = null;
    };

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.domExtendMultiplexing) {
        pool$2.add(this);
      }
    };

    _proto.set = function set(name, value) {
      var element = this.$_element;
      var map = this.$_map;

      if (name === 'id') {
        map.id = value;
      } else if (name === 'class' || element.tagName === 'BUILTIN-COMPONENT' && name === 'className') {
        element.className = value;
      } else if (name === 'style') {
        element.style.cssText = value;
      } else if (name.indexOf('data-') === 0) {
        var datasetName = tool.toCamel(name.substr(5));
        element.dataset[datasetName] = value;
      } else {
        var config = cache.getConfig(); // 判断 value 是否需要删减

        if (typeof value === 'string' && config.optimization.attrValueReduce && value.length > config.optimization.attrValueReduce) {
          console.warn("property \"" + name + "\" will be deleted, because it's greater than " + config.optimization.attrValueReduce);
          value = '';
        }

        map[name] = value;
        this.$_doUpdate();
      }

      this.triggerUpdate();
    };

    _proto.get = function get(name) {
      var element = this.$_element;
      var map = this.$_map;

      if (name === 'id') {
        return map.id || '';
      }

      if (name === 'class') {
        return element.className;
      } else if (name === 'style') {
        return element.style.cssText;
      } else if (name.indexOf('data-') === 0) {
        var datasetName = tool.toCamel(name.substr(5));
        if (!element.$__dataset) return undefined;
        return element.dataset[datasetName];
      } else {
        return map[name];
      }
    };

    _proto.has = function has(name) {
      var element = this.$_element;
      var map = this.$_map;

      if (name === 'id') {
        return !!element.id;
      } else if (name === 'class') {
        return !!element.className;
      } else if (name === 'style') {
        return !!element.style.cssText;
      } else if (name.indexOf('data-') === 0) {
        var datasetName = tool.toCamel(name.substr(5));
        if (!element.$__dataset) return false;
        return Object.prototype.hasOwnProperty.call(element.dataset, datasetName);
      } else {
        return Object.prototype.hasOwnProperty.call(map, name);
      }
    };

    _proto.remove = function remove(name) {
      var element = this.$_element;
      var map = this.$_map;

      if (name === 'id') {
        element.id = '';
      } else if (name === 'class' || name === 'style') {
        this.set(name, '');
      } else if (name.indexOf('data-') === 0) {
        var datasetName = tool.toCamel(name.substr(5));
        if (element.$__dataset) delete element.dataset[datasetName];
      } else {
        // The Settings for the other fields need to trigger the parent component to update
        delete map[name];
        this.$_doUpdate();
      }

      this.triggerUpdate();
    };

    _proto.triggerUpdate = function triggerUpdate() {
      var map = this.$_map;
      var list = this.$_list; // Empty the old list

      list.forEach(function (item) {
        delete list[item.name];
      });
      delete list.class;
      delete list.style;
      list.length = 0; // Add a new list

      Object.keys(map).forEach(function (name) {
        if (name !== 'id') {
          var item = {
            name: name,
            value: map[name]
          };
          list.push(item);
          list[name] = item;
        }
      });
      var idValue = this.get('id');
      var classValue = this.get('class');
      var styleValue = this.get('style');

      if (idValue) {
        var item = {
          name: 'id',
          value: idValue
        };
        list.push(item);
        list.id = item;
      }

      if (classValue) {
        var _item = {
          name: 'class',
          value: classValue
        };
        list.push(_item);
        list.class = _item;
      }

      if (styleValue) {
        var _item2 = {
          name: 'style',
          value: styleValue
        };
        list.push(_item2);
        list.style = _item2;
      }
    };

    createClass(Attribute, [{
      key: "list",
      get: function get() {
        return this.$_list;
      }
    }]);

    return Attribute;
  }();

  function _createForOfIteratorHelperLoose$3(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

  function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * https://johnresig.com/files/htmlparser.js
   */
  // Reg
  var doctypeReg = /^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i;
  var startTagReg = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i;
  var endTagReg = /^<\/([-A-Za-z0-9_]+)[^>]*>/i;
  var attrReg = /([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty element - https://www.w3.org/TR/html/syntax.html#void-elements

  var voidMap = {};
  ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].forEach(function (n) {
    return voidMap[n] = true;
  }); // Block element - https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#Elements

  var blockMap = {};
  ['address', 'article', 'aside', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main', 'nav', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot', 'ul', 'video'].forEach(function (n) {
    return blockMap[n] = true;
  }); // Inline element - https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements#Elements

  var inlineMap = {};
  ['a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'br', 'button', 'cite', 'code', 'dfn', 'em', 'i', 'img', 'input', 'kbd', 'label', 'map', 'object', 'q', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'textarea', 'time', 'tt', 'var'].forEach(function (n) {
    return inlineMap[n] = true;
  }); // An element that may contain arbitrary content- https://www.w3.org/TR/html/syntax.html#raw-text

  var rawTextMap = {};
  ['script', 'style'].forEach(function (n) {
    return rawTextMap[n] = true;
  });
  var longAttributeCache = {};
  var seed$1 = 0;

  function tokenize(content, handler) {
    var stack = [];
    var last = content;

    stack.last = function () {
      return this[this.length - 1];
    };

    while (content) {
      var isText = true;

      if (!stack.last() || !rawTextMap[stack.last()]) {
        if (content.indexOf('<!--') === 0) {
          // comment
          var index = content.indexOf('-->');

          if (index >= 0) {
            content = content.substring(index + 3);
            isText = false;
          }
        } else if (content.indexOf('</') === 0) {
          // end tag
          var match = content.match(endTagReg);

          if (match) {
            content = content.substring(match[0].length);
            match[0].replace(endTagReg, parseEndTag);
            isText = false;
          }
        } else if (content.indexOf('<') === 0) {
          // start tag
          var _match = content.match(startTagReg);

          if (_match) {
            content = content.substring(_match[0].length);

            _match[0].replace(startTagReg, parseStartTag);

            isText = false;
          } else {
            // 检测 doctype
            _match = content.match(doctypeReg);

            if (_match) {
              content = content.substring(_match[0].length);
              isText = false;
            }
          }
        }

        if (isText) {
          var _index = content.indexOf('<');

          var text = _index < 0 ? content : content.substring(0, _index);
          content = _index < 0 ? '' : content.substring(_index);
          if (handler.text) handler.text(text);
        }
      } else {
        var execRes = new RegExp("</" + stack.last() + "[^>]*>").exec(content);

        if (execRes) {
          var _text = content.substring(0, execRes.index);

          content = content.substring(execRes.index + execRes[0].length);

          _text.replace(/<!--(.*?)-->/g, '');

          if (_text && handler.text) handler.text(_text);
        }

        parseEndTag('', stack.last());
      }

      if (content === last) throw new Error("parse error: " + content);
      last = content;
    } // Close the label in the stack


    parseEndTag();

    function parseStartTag(tag, tagName, rest, unary) {
      tagName = tagName.toLowerCase();
      unary = !!unary;
      unary = voidMap[tagName] || !!unary;
      if (!unary) stack.push(tagName);

      if (handler.start) {
        var attrs = [];

        try {
          rest.replace(attrReg, function (all, $1, $2, $3, $4) {
            var value = $2 || $3 || $4;
            attrs.push({
              name: $1,
              value: value
            });
          });
        } catch (err) {
          // Some android will kneel down when performing a property regex on a string that is too long (mainly base 64)
          rest = rest.replace(/url\([^)]+\)/ig, function (all) {
            var id = "url(:#|" + ++seed$1 + "|#:)";
            longAttributeCache[id] = all;
            return id;
          });
          rest.replace(attrReg, function (all, $1, $2, $3, $4) {
            var value = $2 || $3 || $4;
            attrs.push({
              name: $1,
              value: value.replace(/url\(:#\|\d+\|#:\)/ig, function (all) {
                return longAttributeCache[all] || 'url()';
              })
            });
          });
        }

        handler.start(tagName, attrs, unary);
      }
    }

    function parseEndTag(tag, tagName) {
      var pos;

      if (!tagName) {
        pos = 0;
      } else {
        // Find the start tag with the same name
        tagName = tagName.toLowerCase();

        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos] === tagName) break;
        }
      }

      if (pos >= 0) {
        // Close all tags in the start and end tags
        for (var i = stack.length - 1; i >= pos; i--) {
          if (handler.end) handler.end(stack[i]);
        }

        stack.length = pos;
      }
    }
  }

  function parse$1(html) {
    var r = {
      children: []
    };
    var stack = [r];

    stack.last = function () {
      return this[this.length - 1];
    };

    tokenize(html, {
      start: function start(tagName, attrs, unary) {
        var node = {
          type: 'element',
          tagName: tagName,
          attrs: attrs,
          unary: unary,
          children: []
        };
        stack.last().children.push(node);

        if (!unary) {
          stack.push(node);
        }
      },
      // eslint-disable-next-line no-unused-vars
      end: function end(tagName) {
        var node = stack.pop();

        if (node.tagName === 'table') {
          // Supplement insert tbody
          var hasTbody = false;

          for (var _iterator = _createForOfIteratorHelperLoose$3(node.children), _step; !(_step = _iterator()).done;) {
            var child = _step.value;

            if (child.tagName === 'tbody') {
              hasTbody = true;
              break;
            }
          }

          if (!hasTbody) {
            node.children = [{
              type: 'element',
              tagName: 'tbody',
              attrs: [],
              unary: false,
              children: node.children
            }];
          }
        }
      },
      text: function text(content) {
        content = content.trim();
        if (!content) return;
        stack.last().children.push({
          type: 'text',
          content: content
        });
      }
    });
    return r.children;
  }

  var parser = {
    tokenize: tokenize,
    parse: parse$1,
    voidMap: voidMap,
    blockMap: blockMap,
    inlineMap: inlineMap,
    rawTextMap: rawTextMap
  };

  function _createForOfIteratorHelperLoose$4(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

  function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var pool$3 = new Pool();

  var Element = /*#__PURE__*/function (_Node) {
    inheritsLoose(Element, _Node);

    function Element() {
      return _Node.apply(this, arguments) || this;
    }

    Element.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reusing element node
        var instance = pool$3.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new Element(options, tree);
    } // Override the $$init method of the parent class
    ;

    var _proto = Element.prototype;

    _proto.$$init = function $$init(options, tree) {
      options.type = 'element';

      _Node.prototype.$$init.call(this, options, tree);

      this.$_tagName = options.tagName || '';
      this.$_children = [];
      this.$_nodeType = options.nodeType || Node.ELEMENT_NODE;
      this.$_unary = !!parser.voidMap[this.$_tagName.toLowerCase()];
      this.$_notTriggerUpdate = false;
      this.$_dataset = null;
      this.$_classList = null;
      this.$_style = null;
      this.$_attrs = null;
      this.$_initAttrs(options.attrs);
      this.onclick = null;
      this.ontouchstart = null;
      this.ontouchmove = null;
      this.ontouchend = null;
      this.ontouchcancel = null;
      this.onload = null;
      this.onerror = null;
    } // Override the $$destroy method of the parent class
    ;

    _proto.$$destroy = function $$destroy() {
      _Node.prototype.$$destroy.call(this);

      this.$_tagName = '';
      this.$_children.length = 0;
      this.$_nodeType = Node.ELEMENT_NODE;
      this.$_unary = null;
      this.$_notTriggerUpdate = false;
      this.$_dataset = null;
      this.$_classList = null;
      this.$_style = null;
      this.$_attrs = null;
    } // Recycling instance
    ;

    _proto.$$recycle = function $$recycle() {
      this.$_children.forEach(function (child) {
        return child.$$recycle();
      });
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reusing element node
        pool$3.add(this);
      }
    };

    // Init attribute
    _proto.$_initAttrs = function $_initAttrs(attrs) {
      var _this = this;

      if (attrs === void 0) {
        attrs = {};
      }

      // Avoid create $_attrs when component init
      var attrKeys = Object.keys(attrs);
      if (!attrKeys.length) return; // Initialization does not trigger updates

      this.$_notTriggerUpdate = true;
      attrKeys.forEach(function (name) {
        if (name.indexOf('data-') === 0) {
          // dataset
          var datasetName = tool.toCamel(name.substr(5));
          _this.$_dataset[datasetName] = attrs[name];
        } else {
          // Other attributes
          _this.setAttribute(name, attrs[name]);
        }
      }); // Restart triggers update

      this.$_notTriggerUpdate = false;
    } // Listen for class or style attribute values to change
    ;

    _proto.$_onClassOrStyleUpdate = function $_onClassOrStyleUpdate() {
      if (this.$__attrs) this.$_attrs.triggerUpdate();
      this.$_triggerParentUpdate();
    } // Update parent tree
    ;

    _proto.$_triggerParentUpdate = function $_triggerParentUpdate() {
      if (this.parentNode && !this.$_notTriggerUpdate) this.parentNode.$$trigger('$$childNodesUpdate');
      if (!this.$_notTriggerUpdate) this.$$trigger('$$domNodeUpdate');
    } // Update child nodes
    ;

    _proto.$_triggerMeUpdate = function $_triggerMeUpdate() {
      if (!this.$_notTriggerUpdate) this.$$trigger('$$childNodesUpdate');
    } // Changes to the mapping table caused by changes to update child nodes
    ;

    _proto.$_updateChildrenExtra = function $_updateChildrenExtra(node, isRemove) {
      var id = node.id; // Update nodeId - dom map

      if (isRemove) {
        cache.setNode(this.$_pageId, node.$$nodeId, null);
      } else {
        cache.setNode(this.$_pageId, node.$$nodeId, node);
      } // Update id - dom map


      if (id) {
        if (isRemove) {
          this.$_tree.updateIdMap(id, null);
        } else {
          this.$_tree.updateIdMap(id, node);
        }
      }

      if (node.childNodes && node.childNodes.length) {
        for (var _iterator = _createForOfIteratorHelperLoose$4(node.childNodes), _step; !(_step = _iterator()).done;) {
          var child = _step.value;
          this.$_updateChildrenExtra(child, isRemove);
        }
      }
    } // Traverse the dom tree to generate the HTML
    ;

    _proto.$_generateHtml = function $_generateHtml(node) {
      var _this2 = this;

      if (node.nodeType === Node.TEXT_NODE) {
        // Text node
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Element
        var tagName = node.tagName.toLowerCase();
        var html = "<" + tagName; // Attribute

        if (node.id) html += " id=\"" + node.id + "\"";
        if (node.className) html += " class=\"" + node.className + "\"";
        var styleText = node.style.cssText;
        if (styleText) html += " style=\"" + styleText + "\"";
        var src = node.src;
        if (src) html += " src=" + src;
        var animation = node.animation;
        if (node.animation) html += "animation=" + animation;
        var dataset = node.dataset;
        Object.keys(dataset).forEach(function (name) {
          html += " data-" + tool.toDash(name) + "=\"" + dataset[name] + "\"";
        });
        html = this.$$dealWithAttrsForGenerateHtml(html, node);

        if (node.$$isUnary) {
          // Empty tag
          return html + " />";
        } else {
          var childrenHtml = node.childNodes.map(function (child) {
            return _this2.$_generateHtml(child);
          }).join('');
          return html + ">" + childrenHtml + "</" + tagName + ">";
        }
      }
    } // Traverse the ast to generate the dom tree
    ;

    _proto.$_generateDomTree = function $_generateDomTree(node) {
      var type = node.type,
          _node$tagName = node.tagName,
          tagName = _node$tagName === void 0 ? '' : _node$tagName,
          _node$attrs = node.attrs,
          attrs = _node$attrs === void 0 ? [] : _node$attrs,
          _node$children = node.children,
          children = _node$children === void 0 ? [] : _node$children,
          _node$content = node.content,
          content = _node$content === void 0 ? '' : _node$content; // generated at runtime, using the b- prefix

      var nodeId = "b-" + tool.getId();

      if (type === 'element') {
        // Element
        var attrsMap = {}; // The property list is converted to a map

        for (var _iterator2 = _createForOfIteratorHelperLoose$4(attrs), _step2; !(_step2 = _iterator2()).done;) {
          var attr = _step2.value;
          var name = attr.name;
          var value = attr.value;
          if (name === 'style') value = value && value.replace('"', '\'') || '';
          attrsMap[name] = value;
        }

        var element = this.ownerDocument.$$createElement({
          tagName: tagName,
          attrs: attrsMap,
          nodeId: nodeId
        });

        for (var _iterator3 = _createForOfIteratorHelperLoose$4(children), _step3; !(_step3 = _iterator3()).done;) {
          var child = _step3.value;
          child = this.$_generateDomTree(child);
          if (child) element.appendChild(child);
        }

        return element;
      } else if (type === 'text') {
        // Text node
        return this.ownerDocument.$$createTextNode({
          content: tool.decodeContent(content),
          nodeId: nodeId
        });
      }
    } // Dom info
    ;

    // The $_generateHtml interface is called to handle additional attributes
    _proto.$$dealWithAttrsForGenerateHtml = function $$dealWithAttrsForGenerateHtml(html) {
      // The concrete implementation logic is implemented by subclasses
      return html;
    } // The setter for outerHTML is called to handle the extra properties
    ;

    _proto.$$dealWithAttrsForOuterHTML = function $$dealWithAttrsForOuterHTML() {} // The cloneNode interface is called to process additional properties
    ;

    _proto.$$dealWithAttrsForCloneNode = function $$dealWithAttrsForCloneNode() {
      return {};
    };

    _proto.$$getBoundingClientRect = function $$getBoundingClientRect() {
      var _this3 = this;

      // Clears out setData
      tool.flushThrottleCache();
      var window = cache.getWindow(this.$_pageId);
      return new Promise(function (resolve, reject) {
        if (!window) reject();

        if (_this3.tagName === 'BODY') {
          window.$$createSelectorQuery().selectViewport().scrollOffset(function (res) {
            return res ? resolve(res) : reject();
          }).exec();
        } else {
          window.$$createSelectorQuery().select(".miniapp-root >>> .node-" + _this3.$_nodeId).boundingClientRect(function (res) {
            return res ? resolve(res) : reject();
          }).exec();
        }
      });
    } // Gets the context object of the corresponding widget component
    ;

    _proto.$$getContext = function $$getContext() {
      var _this4 = this;

      // Clears out setData
      tool.flushThrottleCache();
      var window = cache.getWindow(this.$_pageId);
      return new Promise(function (resolve, reject) {
        if (!window) reject();

        if (_this4.tagName === 'CANVAS') {
          // TODO, for the sake of compatibility with a bug in the underlying library, for the time being
          my.createSelectorQuery().in(_this4._builtInComponent).select(".node-" + _this4.$_nodeId).context(function (res) {
            return res && res.context ? resolve(res.context) : reject();
          }).exec();
        } else {
          window.$$createSelectorQuery().select(".miniapp-root >>> .node-" + _this4.$_nodeId).context(function (res) {
            return res && res.context ? resolve(res.context) : reject();
          }).exec();
        }
      });
    } // Gets the NodesRef object for the corresponding node
    ;

    _proto.$$getNodesRef = function $$getNodesRef() {
      var _this5 = this;

      // Clears out setData
      tool.flushThrottleCache();
      var window = cache.getWindow(this.$_pageId);
      return new Promise(function (resolve, reject) {
        if (!window) reject();

        if (_this5.tagName === 'CANVAS') {
          // TODO, for the sake of compatibility with a bug in the underlying library, for the time being
          resolve(my.createSelectorQuery().in(_this5._builtInComponent).select(".node-" + _this5.$_nodeId));
        } else {
          resolve(window.$$createSelectorQuery().select(".miniapp-root >>> .node-" + _this5.$_nodeId));
        }
      });
    } // Sets properties, but does not trigger updates
    ;

    _proto.$$setAttributeWithoutUpdate = function $$setAttributeWithoutUpdate(name, value) {
      this.$_notTriggerUpdate = true;
      this.setAttribute(name, value);
      this.$_notTriggerUpdate = false;
    };

    _proto.cloneNode = function cloneNode(deep) {
      var _this6 = this;

      var dataset = {};
      Object.keys(this.$_dataset).forEach(function (name) {
        dataset["data-" + tool.toDash(name)] = _this6.$_dataset[name];
      });
      var newNode = this.ownerDocument.$$createElement({
        tagName: this.$_tagName,
        attrs: _extends_1({
          id: this.id,
          class: this.className,
          style: this.style.cssText,
          src: this.src
        }, dataset, this.$$dealWithAttrsForCloneNode()),
        nodeType: this.$_nodeType,
        nodeId: "b-" + tool.getId()
      });

      if (deep) {
        // Deep clone
        for (var _iterator4 = _createForOfIteratorHelperLoose$4(this.$_children), _step4; !(_step4 = _iterator4()).done;) {
          var child = _step4.value;
          newNode.appendChild(child.cloneNode(deep));
        }
      }

      return newNode;
    };

    _proto.appendChild = function appendChild(node) {
      if (!(node instanceof Node)) return;
      var nodes;
      var hasUpdate = false;

      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        // documentFragment
        nodes = [].concat(node.childNodes);
      } else {
        nodes = [node];
      }

      for (var _iterator5 = _createForOfIteratorHelperLoose$4(nodes), _step5; !(_step5 = _iterator5()).done;) {
        var _node = _step5.value;
        if (_node === this) continue;
        if (_node.parentNode) _node.parentNode.removeChild(_node);
        this.$_children.push(_node); // Set parentNode

        _node.$$updateParent(this); // Update map


        this.$_updateChildrenExtra(_node);
        hasUpdate = true;
      } // Trigger webview update


      if (hasUpdate) this.$_triggerMeUpdate();
      return this;
    };

    _proto.removeChild = function removeChild(node) {
      if (!(node instanceof Node)) return;
      var index = this.$_children.indexOf(node);

      if (index >= 0) {
        // Inserted, need to delete
        this.$_children.splice(index, 1);
        node.$$updateParent(null); // Update map

        this.$_updateChildrenExtra(node, true); // Trigger webview update

        this.$_triggerMeUpdate();
      }

      return node;
    };

    _proto.insertBefore = function insertBefore(node, ref) {
      if (!(node instanceof Node)) return;
      if (ref && !(ref instanceof Node)) return;
      var nodes;
      var hasUpdate = false;

      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        // documentFragment
        nodes = [];

        for (var i = 0; i < node.childNodes.length; i++) {
          // Need to invert them
          nodes.push(node.childNodes[i]);
        }
      } else {
        nodes = [node];
      }

      for (var _iterator6 = _createForOfIteratorHelperLoose$4(nodes), _step6; !(_step6 = _iterator6()).done;) {
        var _node2 = _step6.value;
        if (_node2 === this) continue;
        if (_node2.parentNode) _node2.parentNode.removeChild(_node2);
        var insertIndex = ref ? this.$_children.indexOf(ref) : -1;

        if (insertIndex === -1) {
          // Insert to the end
          this.$_children.push(_node2);
        } else {
          // Inserted before ref
          this.$_children.splice(insertIndex, 0, _node2);
        } // Set parentNode


        _node2.$$updateParent(this); // Update the mapping table


        this.$_updateChildrenExtra(_node2);
        hasUpdate = true;
      } // Trigger the webview update


      if (hasUpdate) this.$_triggerMeUpdate();
      return node;
    };

    _proto.replaceChild = function replaceChild(node, old) {
      if (!(node instanceof Node) || !(old instanceof Node)) return;
      var nodes;
      var hasUpdate = false;

      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        // documentFragment
        nodes = [];

        for (var i = node.childNodes.length - 1; i >= 0; i--) {
          // Inserted one by one, it need to reverse the order
          nodes.push(node.childNodes[i]);
        }
      } else {
        nodes = [node];
      }

      var replaceIndex = this.$_children.indexOf(old);
      if (replaceIndex !== -1) this.$_children.splice(replaceIndex, 1);

      for (var _iterator7 = _createForOfIteratorHelperLoose$4(nodes), _step7; !(_step7 = _iterator7()).done;) {
        var _node3 = _step7.value;
        if (_node3 === this) continue;
        if (_node3.parentNode) _node3.parentNode.removeChild(_node3);

        if (replaceIndex === -1) {
          // Insert to the end
          this.$_children.push(_node3);
        } else {
          // Replace to old
          this.$_children.splice(replaceIndex, 0, _node3);
        } // Set parentNode


        _node3.$$updateParent(this); // Update the mapping table


        this.$_updateChildrenExtra(_node3);
        this.$_updateChildrenExtra(old, true);
        hasUpdate = true;
      } // Trigger the webview side update


      if (hasUpdate) this.$_triggerMeUpdate();
      return old;
    };

    _proto.hasChildNodes = function hasChildNodes() {
      return this.$_children.length > 0;
    };

    _proto.getElementsByTagName = function getElementsByTagName(tagName) {
      if (typeof tagName !== 'string') return [];
      return this.$_tree.getByTagName(tagName, this);
    };

    _proto.getElementsByClassName = function getElementsByClassName(className) {
      if (typeof className !== 'string') return [];
      return this.$_tree.getByClassName(className, this);
    };

    _proto.querySelector = function querySelector(selector) {
      if (typeof selector !== 'string') return;
      return this.$_tree.query(selector, this)[0] || null;
    };

    _proto.querySelectorAll = function querySelectorAll(selector) {
      if (typeof selector !== 'string') return [];
      return this.$_tree.query(selector, this);
    };

    _proto.setAttribute = function setAttribute(name, value) {
      if (typeof name !== 'string') return; // preserve the original contents of the object/Array/boolean/undefined to facilitate the use of the built-in components of miniapp

      var valueType = typeof value;
      if (valueType !== 'object' && valueType !== 'boolean' && value !== undefined && !Array.isArray(value)) value = '' + value;

      if (name === 'id') {
        // id to be handled here in advance
        this.id = value;
      } else {
        this.$_attrs.set(name, value);
      }
    };

    _proto.getAttribute = function getAttribute(name) {
      if (typeof name !== 'string') return '';
      if (!this.$__attrs) return name === 'id' || name === 'style' || name === 'class' ? '' : undefined;
      return this.$_attrs.get(name);
    };

    _proto.hasAttribute = function hasAttribute(name) {
      if (typeof name !== 'string') return false;
      if (!this.$__attrs) return false;
      return this.$_attrs.has(name);
    };

    _proto.removeAttribute = function removeAttribute(name) {
      if (typeof name !== 'string') return false;
      return this.$_attrs.remove(name);
    };

    _proto.contains = function contains(otherElement) {
      var stack = [];
      var checkElement = this;

      while (checkElement) {
        if (checkElement === otherElement) return true;
        var childNodes = checkElement.childNodes;
        if (childNodes && childNodes.length) childNodes.forEach(function (child) {
          return stack.push(child);
        });
        checkElement = stack.pop();
      }

      return false;
    };

    _proto.getBoundingClientRect = function getBoundingClientRect() {
      // Do not make any implementation, only for compatible use
      console.warn('getBoundingClientRect is not supported, please use npm package universal-element to get DOM info in miniapp');
      return {};
    };

    createClass(Element, [{
      key: "$_dataset",
      set: function set(value) {
        this.$__dataset = value;
      },
      get: function get() {
        if (!this.$__dataset) this.$__dataset = Object.create(null);
        return this.$__dataset;
      }
    }, {
      key: "$_classList",
      set: function set(value) {
        if (!value && this.$__classList) this.$__classList.$$recycle();
        this.$__classList = value;
      },
      get: function get() {
        if (!this.$__classList) this.$__classList = ClassList.$$create(this.$_onClassOrStyleUpdate.bind(this));
        return this.$__classList;
      }
    }, {
      key: "$_style",
      set: function set(value) {
        if (!value && this.$__style) this.$__style.$$recycle();
        this.$__style = value;
      },
      get: function get() {
        if (!this.$__style) this.$__style = Style.$$create(this.$_onClassOrStyleUpdate.bind(this));
        return this.$__style;
      }
    }, {
      key: "$_attrs",
      set: function set(value) {
        if (!value && this.$__attrs) this.$__attrs.$$recycle();
        this.$__attrs = value;
      },
      get: function get() {
        if (!this.$__attrs) this.$__attrs = Attribute.$$create(this, this.$_triggerParentUpdate.bind(this));
        return this.$__attrs;
      }
    }, {
      key: "$$domInfo",
      get: function get() {
        return {
          nodeId: this.$$nodeId,
          pageId: this.$$pageId,
          type: this.$_type,
          tagName: this.$_tagName,
          id: this.id,
          class: this.className,
          style: this.$__style ? this.style.cssText : '',
          animation: this.$__attrs ? this.$__attrs.get('animation') : {}
        };
      } // Check Empty tag

    }, {
      key: "$$isUnary",
      get: function get() {
        return this.$_unary;
      }
    }, {
      key: "id",
      get: function get() {
        if (!this.$__attrs) return '';
        return this.$_attrs.get('id');
      },
      set: function set(id) {
        if (typeof id !== 'string') return;
        id = id.trim();
        var oldId = this.$_attrs.get('id');
        this.$_attrs.set('id', id);
        if (id === oldId) return; // update tree

        if (this.$_tree.getById(oldId) === this) this.$_tree.updateIdMap(oldId, null);
        if (id) this.$_tree.updateIdMap(id, this);
        this.$_triggerParentUpdate();
      }
    }, {
      key: "tagName",
      get: function get() {
        return this.$_tagName.toUpperCase();
      }
    }, {
      key: "className",
      get: function get() {
        if (!this.$__classList) return '';
        return this.$_classList.toString();
      },
      set: function set(className) {
        if (typeof className !== 'string') return;
        this.$_classList.$$parse(className);
      }
    }, {
      key: "classList",
      get: function get() {
        return this.$_classList;
      }
    }, {
      key: "nodeName",
      get: function get() {
        return this.tagName;
      }
    }, {
      key: "nodeType",
      get: function get() {
        return this.$_nodeType;
      }
    }, {
      key: "childNodes",
      get: function get() {
        return this.$_children;
      }
    }, {
      key: "children",
      get: function get() {
        return this.$_children.filter(function (child) {
          return child.nodeType === Node.ELEMENT_NODE;
        });
      }
    }, {
      key: "firstChild",
      get: function get() {
        return this.$_children[0];
      }
    }, {
      key: "lastChild",
      get: function get() {
        return this.$_children[this.$_children.length - 1];
      }
    }, {
      key: "innerHTML",
      get: function get() {
        var _this7 = this;

        return this.$_children.map(function (child) {
          return _this7.$_generateHtml(child);
        }).join('');
      },
      set: function set(html) {
        var _this8 = this;

        if (typeof html !== 'string') return;
        var fragment = this.ownerDocument.$$createElement({
          tagName: 'documentfragment',
          nodeId: "b-" + tool.getId(),
          nodeType: Node.DOCUMENT_FRAGMENT_NODE
        }); // parse to ast

        var ast = null;

        try {
          ast = parser.parse(html);
        } catch (err) {
          console.error(err);
        }

        if (!ast) return; // Generate dom tree

        ast.forEach(function (item) {
          var node = _this8.$_generateDomTree(item);

          if (node) fragment.appendChild(node);
        }); // Delete all child nodes

        this.$_children.forEach(function (node) {
          node.$$updateParent(null); // Update the mapping table

          _this8.$_updateChildrenExtra(node, true);
        });
        this.$_children.length = 0; // Appends the new child node

        if (this.$_tagName === 'table') {
          // The table node needs to determine whether a tbody exists
          var hasTbody = false;

          for (var _iterator8 = _createForOfIteratorHelperLoose$4(fragment.childNodes), _step8; !(_step8 = _iterator8()).done;) {
            var child = _step8.value;

            if (child.tagName === 'TBODY') {
              hasTbody = true;
              break;
            }
          }

          if (!hasTbody) {
            var tbody = this.ownerDocument.$$createElement({
              tagName: 'tbody',
              attrs: {},
              nodeType: Node.ELEMENT_NODE,
              nodeId: "b-" + tool.getId()
            });
            tbody.appendChild(fragment);
            this.appendChild(tbody);
          }
        } else {
          this.appendChild(fragment);
        }
      }
    }, {
      key: "outerHTML",
      get: function get() {
        return this.$_generateHtml(this);
      },
      set: function set(html) {
        var _this9 = this;

        if (typeof html !== 'string') return; // Resolve to ast, taking only the first as the current node

        var ast = null;

        try {
          ast = parser.parse(html)[0];
        } catch (err) {
          console.error(err);
        }

        if (ast) {
          // Generate dom tree
          var node = this.$_generateDomTree(ast); // Delete all child nodes

          this.$_children.forEach(function (node) {
            node.$$updateParent(null); // Update the mapping table

            _this9.$_updateChildrenExtra(node, true);
          });
          this.$_children.length = 0; // When first render doesn't trigger update

          this.$_notTriggerUpdate = true; // Append new child nodes

          var children = [].concat(node.childNodes);

          for (var _iterator9 = _createForOfIteratorHelperLoose$4(children), _step9; !(_step9 = _iterator9()).done;) {
            var child = _step9.value;
            this.appendChild(child);
          }

          this.$_tagName = node.tagName.toLowerCase();
          this.id = node.id || '';
          this.className = node.className || '';
          this.style.cssText = node.style.cssText || '';
          this.src = node.src || '';
          this.$_dataset = Object.assign({}, node.dataset);
          this.$$dealWithAttrsForOuterHTML(node); // Trigger update

          this.$_notTriggerUpdate = false;
          this.$_triggerParentUpdate();
        }
      }
    }, {
      key: "innerText",
      get: function get() {
        // WARN: this is handled in accordance with the textContent, not to determine whether it will be rendered or not
        return this.textContent;
      },
      set: function set(text) {
        this.textContent = text;
      }
    }, {
      key: "textContent",
      get: function get() {
        return this.$_children.map(function (child) {
          return child.textContent;
        }).join('');
      },
      set: function set(text) {
        var _this10 = this;

        text = '' + text; // Delete all child nodes

        this.$_children.forEach(function (node) {
          node.$$updateParent(null); // Update mapping table

          _this10.$_updateChildrenExtra(node, true);
        });
        this.$_children.length = 0; // An empty string does not add a textNode node

        if (!text) return; // Generated at run time, using the b- prefix

        var nodeId = "b-" + tool.getId();
        var child = this.ownerDocument.$$createTextNode({
          content: text,
          nodeId: nodeId
        });
        this.appendChild(child);
      }
    }, {
      key: "style",
      get: function get() {
        return this.$_style;
      },
      set: function set(value) {
        this.$_style.cssText = value;
      }
    }, {
      key: "dataset",
      get: function get() {
        return this.$_dataset;
      }
    }, {
      key: "attributes",
      get: function get() {
        return this.$_attrs.list;
      }
    }, {
      key: "src",
      get: function get() {
        if (!this.$__attrs) return '';
        return this.$_attrs.get('src');
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('src', value);
      }
    }]);

    return Element;
  }(Node);

  function _createForOfIteratorHelperLoose$5(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

  function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * Thanks sizzle：https://github.com/jquery/sizzle/tree/master
   */
  var PSEUDO_CHECK = {
    checked: function checked(node) {
      return node.checked || node.selected;
    },
    disabled: function disabled(node) {
      return node.disabled;
    },
    enabled: function enabled(node) {
      return !node.disabled;
    },
    'first-child': function firstChild(node) {
      return node.parentNode.children[0] === node;
    },
    'last-child': function lastChild(node) {
      return node.parentNode.children[node.parentNode.children.length - 1] === node;
    },
    'nth-child': function nthChild(node, param) {
      var children = node.parentNode.children;
      var a = param.a,
          b = param.b;
      var index = children.indexOf(node) + 1;

      if (a) {
        return (index - b) % a === 0;
      } else {
        return index === b;
      }
    }
  };
  var ATTR_CHECK = {
    '=': function _(nodeVal, val) {
      return nodeVal === val;
    },
    '~=': function _(nodeVal, val) {
      return nodeVal.split(/\s+/).indexOf(val) !== -1;
    },
    '|=': function _(nodeVal, val) {
      return nodeVal === val || nodeVal.indexOf(val + '-') === 0;
    },
    '^=': function _(nodeVal, val) {
      return nodeVal.indexOf(val) === 0;
    },
    '$=': function $(nodeVal, val) {
      return nodeVal.substr(nodeVal.length - val.length) === val;
    },
    '*=': function _(nodeVal, val) {
      return nodeVal.indexOf(val) !== -1;
    }
  };
  var KINSHIP_CHECK = {
    ' ': function _(node, kinshipRule) {
      var kinshipNode = node.parentNode;

      while (kinshipNode) {
        if (checkHit(kinshipNode, kinshipRule)) return kinshipNode;
        kinshipNode = kinshipNode.parentNode;
      }

      return null;
    },
    '>': function _(node, kinshipRule) {
      var kinshipNode = node.parentNode;
      return checkHit(kinshipNode, kinshipRule) ? kinshipNode : null;
    },
    '+': function _(node, kinshipRule) {
      var children = node.parentNode;

      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];

        if (child === node) {
          var kinshipNode = children[i - 1];
          return checkHit(kinshipNode, kinshipRule) ? kinshipNode : null;
        }
      }

      return null;
    },
    '~': function _(node, kinshipRule) {
      var children = node.parentNode;
      var foundCurrent = false;

      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (foundCurrent && checkHit(child, kinshipRule)) return child;
        if (child === node) foundCurrent = true;
      }

      return null;
    }
  };
  /**
   * Check if the node conforms to the rule
   */

  function checkHit(node, rule) {
    if (!node) return false;
    var id = rule.id,
        classList = rule.class,
        tag = rule.tag,
        pseudo = rule.pseudo,
        attr = rule.attr;

    if (id) {
      if (node.id !== id) return false;
    }

    if (classList && classList.length) {
      for (var _iterator = _createForOfIteratorHelperLoose$5(classList), _step; !(_step = _iterator()).done;) {
        var className = _step.value;
        if (!node.classList || !node.classList.contains(className)) return false;
      }
    }

    if (tag && tag !== '*') {
      if (node.tagName !== tag.toUpperCase()) return false;
    }

    if (pseudo) {
      for (var _iterator2 = _createForOfIteratorHelperLoose$5(pseudo), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
            name = _step2$value.name,
            param = _step2$value.param;
        var checkPseudo = PSEUDO_CHECK[name];
        if (!checkPseudo || !checkPseudo(node, param)) return false;
      }
    }

    if (attr) {
      for (var _iterator3 = _createForOfIteratorHelperLoose$5(attr), _step3; !(_step3 = _iterator3()).done;) {
        var _step3$value = _step3.value,
            _name = _step3$value.name,
            opr = _step3$value.opr,
            val = _step3$value.val;
        var nodeVal = node[_name] || node.getAttribute(_name);
        if (nodeVal === undefined) return false;

        if (opr) {
          // Existence operator
          var checkAttr = ATTR_CHECK[opr];
          if (!checkAttr || !checkAttr(nodeVal, val)) return false;
        }
      }
    }

    return true;
  }

  function unique(list) {
    for (var i = 0; i < list.length; i++) {
      var a = list[i];

      for (var j = i + 1; j < list.length; j++) {
        var b = list[j];
        if (a === b) list.splice(j, 1);
      }
    }

    return list;
  }

  function sortNodes(list) {
    list.sort(function (a, b) {
      var aList = [a];
      var bList = [b];
      var aParent = a.parentNode;
      var bParent = b.parentNode;

      if (aParent === bParent) {
        // Check the order
        var _children = aParent.children;
        return _children.indexOf(a) - _children.indexOf(b);
      } // A to the root list


      while (aParent) {
        aList.unshift(aParent);
        aParent = aParent.parentNode;
      } // B to the root list


      while (bParent) {
        bList.unshift(bParent);
        bParent = bParent.parentNode;
      } // Find the closest common ancestor


      var i = 0;

      while (aList[i] === bList[i]) {
        i++;
      } // Check the order


      var children = aList[i - 1].children;
      return children.indexOf(aList[i]) - children.indexOf(bList[i]);
    });
    return list;
  }

  var QuerySelector = /*#__PURE__*/function () {
    function QuerySelector() {
      this.parseCache = {};
      this.parseCacheKeys = [];
      var idReg = '#([\\\\\\w-]+)';
      var tagReg = '\\*|builtin-component|[a-zA-Z-]\\w*';
      var classReg = '\\.([\\\\\\w-]+)';
      var pseudoReg = ':([\\\\\\w-]+)(?:\\(([^\\(\\)]*|(?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\))?';
      var attrReg = '\\[\\s*([\\\\\\w-]+)(?:([*^$|~!]?=)[\'"]?([^\'"\\[]+)[\'"]?)?\\s*\\]';
      var kinshipReg = '\\s*([>\\s+~](?!=))\\s*';
      this.regexp = new RegExp("^(?:(" + idReg + ")|(" + tagReg + ")|(" + classReg + ")|(" + pseudoReg + ")|(" + attrReg + ")|(" + kinshipReg + "))");
    }

    var _proto = QuerySelector.prototype;

    _proto.setParseCache = function setParseCache(key, value) {
      if (this.parseCacheKeys.length > 50) {
        delete this.parseCache[this.parseCacheKeys.shift()];
      }

      this.parseCacheKeys.push(key);
      this.parseCache[key] = value;
      return value;
    };

    _proto.getParseCache = function getParseCache(key) {
      return this.parseCache[key];
    };

    _proto.parse = function parse(selector) {
      var segment = [{
        tag: '*'
      }];
      var regexp = this.regexp;

      var onProcess = function onProcess(all, idAll, id, tagAll, classAll, className, pseudoAll, pseudoName, pseudoParam, attrAll, attrName, attrOpr, attrVal, kinshipAll, kinship) {
        if (idAll) {
          segment[segment.length - 1].id = id;
        } else if (tagAll) {
          segment[segment.length - 1].tag = tagAll.toLowerCase();
        } else if (classAll) {
          var currentRule = segment[segment.length - 1];
          currentRule.class = currentRule.class || [];
          currentRule.class.push(className);
        } else if (pseudoAll) {
          var _currentRule = segment[segment.length - 1];
          _currentRule.pseudo = _currentRule.pseudo || [];
          pseudoName = pseudoName.toLowerCase();
          var pseudo = {
            name: pseudoName
          };
          if (pseudoParam) pseudoParam = pseudoParam.trim();

          if (pseudoName === 'nth-child') {
            // Handle nth-child pseudo-class, parameter unified processing into the format of an + b
            pseudoParam = pseudoParam.replace(/\s+/g, '');

            if (pseudoParam === 'even') {
              // 偶数个
              pseudoParam = {
                a: 2,
                b: 2
              };
            } else if (pseudoParam === 'odd') {
              pseudoParam = {
                a: 2,
                b: 1
              };
            } else if (pseudoParam) {
              var nthParsed = pseudoParam.match(/^(?:(\d+)|(\d*)?n([+-]\d+)?)$/);

              if (!nthParsed) {
                pseudoParam = {
                  a: 0,
                  b: 1
                };
              } else if (nthParsed[1]) {
                pseudoParam = {
                  a: 0,
                  b: +nthParsed[1]
                };
              } else {
                pseudoParam = {
                  a: nthParsed[2] ? +nthParsed[2] : 1,
                  b: nthParsed[3] ? +nthParsed[3] : 0
                };
              }
            } else {
              // Take the first by default
              pseudoParam = {
                a: 0,
                b: 1
              };
            }
          }

          if (pseudoParam) pseudo.param = pseudoParam;

          _currentRule.pseudo.push(pseudo);
        } else if (attrAll) {
          var _currentRule2 = segment[segment.length - 1];
          _currentRule2.attr = _currentRule2.attr || [];

          _currentRule2.attr.push({
            name: attrName,
            opr: attrOpr,
            val: attrVal
          });
        } else if (kinshipAll) {
          segment[segment.length - 1].kinship = kinship;
          segment.push({
            tag: '*'
          });
        }

        return '';
      }; // Selector resolution


      var lastParse;
      selector = selector.replace(regexp, onProcess);

      while (lastParse !== selector) {
        lastParse = selector;
        selector = selector.replace(regexp, onProcess);
      }

      return selector ? '' : segment;
    };

    _proto.exec = function exec(selector, extra) {
      selector = selector.trim().replace(/\s+/g, ' ').replace(/\s*(,|[>\s+~](?!=)|[*^$|~!]?=)\s*/g, '$1');
      var idMap = extra.idMap,
          tagMap = extra.tagMap,
          classMap = extra.classMap;
      var segment = this.getParseCache(selector);

      if (!segment) {
        segment = this.parse(selector);
        if (!segment) return [];
        this.setParseCache(selector, segment);
      }

      if (!segment[0]) return [];
      var lastRule = segment[segment.length - 1];
      var id = lastRule.id,
          classList = lastRule.class,
          tag = lastRule.tag;
      var hitNodes = [];

      if (id) {
        var node = idMap[id];
        hitNodes = node ? [node] : [];
      } else if (classList && classList.length) {
        for (var _iterator4 = _createForOfIteratorHelperLoose$5(classList), _step4; !(_step4 = _iterator4()).done;) {
          var className = _step4.value;
          var classNodes = classMap[className];

          if (classNodes) {
            for (var _iterator5 = _createForOfIteratorHelperLoose$5(classNodes), _step5; !(_step5 = _iterator5()).done;) {
              var classNode = _step5.value;
              if (hitNodes.indexOf(classNode) === -1) hitNodes.push(classNode);
            }
          }
        }
      } else if (tag && tag !== '*') {
        var tagName = tag.toUpperCase();
        var tagNodes = tagMap[tagName];
        if (tagNodes) hitNodes = tagNodes;
      } else {
        Object.keys(tagMap).forEach(function (key) {
          var tagNodes = tagMap[key];

          if (tagNodes) {
            for (var _iterator6 = _createForOfIteratorHelperLoose$5(tagNodes), _step6; !(_step6 = _iterator6()).done;) {
              var tagNode = _step6.value;
              hitNodes.push(tagNode);
            }
          }
        });
      }

      if (hitNodes.length && segment.length) {
        for (var i = hitNodes.length - 1; i >= 0; i--) {
          var checkNode = hitNodes[i];
          var isMatched = false;

          for (var j = segment.length - 1; j >= 0; j--) {
            var prevRule = segment[j - 1];
            if (j === segment.length - 1) isMatched = checkHit(checkNode, lastRule);

            if (isMatched && prevRule) {
              var kinship = prevRule.kinship;
              var checkKinship = KINSHIP_CHECK[kinship];
              if (checkKinship) checkNode = checkKinship(checkNode, prevRule);

              if (!checkNode) {
                isMatched = false;
                break;
              }
            } else {
              break;
            }
          }

          if (!isMatched) hitNodes.splice(i, 1);
        }
      }

      if (hitNodes.length) {
        hitNodes = unique(hitNodes);
        hitNodes = sortNodes(hitNodes);
      }

      return hitNodes;
    };

    return QuerySelector;
  }();

  function _createForOfIteratorHelperLoose$6(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

  function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  /**
   * 遍历 dom 树，收集类和标签对应的节点列表
   */

  function walkDomTree(node, cache) {
    var tagMap = cache.tagMap = cache.tagMap || {};
    var classMap = cache.classMap = cache.classMap || {};
    var children = node.children || [];

    for (var _iterator = _createForOfIteratorHelperLoose$6(children), _step; !(_step = _iterator()).done;) {
      var child = _step.value;
      var tagName = child.tagName,
          classList = child.classList; // 标签

      tagMap[tagName] = tagMap[tagName] || [];
      tagMap[tagName].push(child); // 类

      for (var _iterator2 = _createForOfIteratorHelperLoose$6(classList), _step2; !(_step2 = _iterator2()).done;) {
        var className = _step2.value;
        classMap[className] = classMap[className] || [];
        classMap[className].push(child);
      } // 递归遍历


      walkDomTree(child, cache);
    }
  }

  var Tree = /*#__PURE__*/function () {
    function Tree(pageId, root, nodeIdMap, document) {
      this.pageId = pageId;
      this.root = document.$$createElement(root, this);
      this.nodeIdMap = nodeIdMap;
      this.idMap = {};
      this.document = document;
      this.querySelector = new QuerySelector();
      if (nodeIdMap) nodeIdMap[root.nodeId] = this.root;
      this.walk(root, this.root);
    }
    /**
       * 遍历 ast
       */


    var _proto = Tree.prototype;

    _proto.walk = function walk(ast, parentNode) {
      var children = ast.children;
      var idMap = this.idMap;
      var nodeIdMap = this.nodeIdMap;
      var document = this.document;
      if (!children || !children.length) return; // 遍历子节点

      for (var _iterator3 = _createForOfIteratorHelperLoose$6(children), _step3; !(_step3 = _iterator3()).done;) {
        var child = _step3.value;
        var childNode = void 0;

        if (child.type === 'element') {
          childNode = document.$$createElement(child, this);
        } else if (child.type === 'text') {
          childNode = document.$$createTextNode(child, this);
        } // 处理 id 缓存


        var id = childNode.id;

        if (id && !idMap[id]) {
          idMap[id] = childNode;
        } // 处理 nodeId 缓存


        if (nodeIdMap) nodeIdMap[child.nodeId] = childNode; // 插入子节点

        parentNode.appendChild(childNode); // 遍历子节点的 ast

        this.walk(child, childNode);
      }
    }
    /**
       * 更新 idMap
       */
    ;

    _proto.updateIdMap = function updateIdMap(id, node) {
      this.idMap[id] = node;
    }
    /**
       * 根据 id 获取节点
       */
    ;

    _proto.getById = function getById(id) {
      return this.idMap[id];
    }
    /**
       * 根据标签名获取节点列表
       */
    ;

    _proto.getByTagName = function getByTagName(tagName, node) {
      var cache = {};
      walkDomTree(node || this.root, cache);
      return cache.tagMap[tagName.toUpperCase()] || [];
    }
    /**
       * 根据类名获取节点列表
       */
    ;

    _proto.getByClassName = function getByClassName(className, node) {
      var cache = {};
      walkDomTree(node || this.root, cache);
      return cache.classMap[className] || [];
    }
    /**
       * 查询符合条件的节点
       */
    ;

    _proto.query = function query(selector, node) {
      var cache = {};
      walkDomTree(node || this.root, cache);
      return this.querySelector.exec(selector, {
        idMap: this.idMap,
        tagMap: cache.tagMap,
        classMap: cache.classMap
      });
    };

    return Tree;
  }();

  var pool$4 = new Pool();

  var TextNode = /*#__PURE__*/function (_Node) {
    inheritsLoose(TextNode, _Node);

    function TextNode() {
      return _Node.apply(this, arguments) || this;
    }

    TextNode.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.textMultiplexing) {
        var instance = pool$4.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new TextNode(options, tree);
    };

    var _proto = TextNode.prototype;

    _proto.$$init = function $$init(options, tree) {
      options.type = 'text';

      _Node.prototype.$$init.call(this, options, tree);

      this.$_content = options.content || '';
    };

    _proto.$$destroy = function $$destroy() {
      _Node.prototype.$$destroy.call(this);

      this.$_content = '';
    };

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.textMultiplexing) {
        pool$4.add(this);
      }
    };

    _proto.$_triggerParentUpdate = function $_triggerParentUpdate() {
      if (this.parentNode) this.parentNode.$$trigger('$$childNodesUpdate');
    };

    _proto.cloneNode = function cloneNode() {
      return this.ownerDocument.$$createTextNode({
        content: this.$_content,
        nodeId: "b-" + tool.getId()
      });
    };

    createClass(TextNode, [{
      key: "$$domInfo",
      get: function get() {
        return {
          nodeId: this.$_nodeId,
          pageId: this.$_pageId,
          type: this.$_type,
          content: this.$_content
        };
      }
    }, {
      key: "nodeName",
      get: function get() {
        return '#text';
      }
    }, {
      key: "nodeType",
      get: function get() {
        return Node.TEXT_NODE;
      }
    }, {
      key: "nodeValue",
      get: function get() {
        return this.textContent;
      },
      set: function set(value) {
        this.textContent = value;
      }
    }, {
      key: "textContent",
      get: function get() {
        return this.$_content;
      },
      set: function set(value) {
        value += '';
        this.$_content = value;
        this.$_triggerParentUpdate();
      }
    }, {
      key: "data",
      get: function get() {
        return this.textContent;
      },
      set: function set(value) {
        this.textContent = value;
      }
    }]);

    return TextNode;
  }(Node);

  var pool$5 = new Pool();

  var Comment = /*#__PURE__*/function (_Node) {
    inheritsLoose(Comment, _Node);

    function Comment() {
      return _Node.apply(this, arguments) || this;
    }

    Comment.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.commentMultiplexing) {
        var instance = pool$5.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new Comment(options, tree);
    };

    var _proto = Comment.prototype;

    _proto.$$init = function $$init(options, tree) {
      options.type = 'comment';

      _Node.prototype.$$init.call(this, options, tree);
    };

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.commentMultiplexing) {
        pool$5.add(this);
      }
    };

    _proto.cloneNode = function cloneNode() {
      return this.ownerDocument.$$createComment({
        nodeId: "b-" + tool.getId()
      });
    };

    createClass(Comment, [{
      key: "$$domInfo",
      get: function get() {
        return {
          nodeId: this.$_nodeId,
          pageId: this.$_pageId,
          type: this.$_type
        };
      }
    }, {
      key: "nodeName",
      get: function get() {
        return '#comment';
      }
    }, {
      key: "nodeType",
      get: function get() {
        return Node.COMMENT_NODE;
      }
    }]);

    return Comment;
  }(Node);

  var Location = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(Location, _EventTarget);

    function Location(pageId) {
      var _this;

      _this = _EventTarget.call(this) || this;
      _this.$_pageId = pageId;
      _this.$_pageRoute = tool.getPageRoute(pageId); // 小程序页面路由

      _this.$_protocol = 'https:';
      _this.$_hostname = '';
      _this.$_port = '';
      _this.$_pathname = '/';
      _this.$_search = '';
      _this.$_hash = '';
      _this.$_lastHash = '';
      _this.$_lastPathname = '';
      _this.$_lastSearch = '';
      _this.$_lastHref = '';
      _this.$_allowCheck = true; // 是否检查 url 和 hash 变化

      return _this;
    }
    /**
     * 获取 url 中旧的需要进行检测的部分
     */


    var _proto = Location.prototype;

    _proto.$_getOldValues = function $_getOldValues() {
      return {
        protocol: this.$_protocol,
        hostname: this.$_hostname,
        port: this.$_port,
        pathname: this.$_pathname,
        search: this.$_search,
        hash: this.$_hash
      };
    }
    /**
     * 设置 href，不进入 history
     */
    ;

    _proto.$_setHrefWithoutEnterHistory = function $_setHrefWithoutEnterHistory(value) {
      if (!value || typeof value !== 'string') return;
      this.$$startCheckHash();

      if (!/^(([a-zA-Z0-9]+:)|(\/\/))/i.test(value)) {
        // 没有带协议
        if (value.indexOf('/') === 0) {
          // 以 / 开头，直接替换整个 pathname、search、hash
          value = "" + this.origin + value;
        } else if (value.indexOf('#') === 0) {
          // 以 # 开头，直接替换整个 hash
          value = "" + this.origin + this.$_pathname + this.$_search + value;
        } else {
          // 非以 / 开头，则替换 pathname 的最后一段、search、hash
          var _pathname = this.$_pathname.split('/');

          _pathname.pop();

          _pathname = _pathname.join('/');
          value = "" + this.origin + _pathname + "/" + value;
        }
      }

      var _Location$$$parse = Location.$$parse(value),
          protocol = _Location$$$parse.protocol,
          hostname = _Location$$$parse.hostname,
          port = _Location$$$parse.port,
          hash = _Location$$$parse.hash,
          search = _Location$$$parse.search,
          pathname = _Location$$$parse.pathname;

      var oldValues = this.$_getOldValues();
      this.$_protocol = protocol || this.$_protocol;
      this.$_hostname = hostname || this.$_hostname;
      this.$_port = port || '';
      this.$_pathname = pathname || '/';
      this.$_search = search || '';
      this.$_hash = hash || '';
      this.$$endCheckHash();
      this.$_checkUrl(oldValues);
    }
    /**
     * 进入 history
     */
    ;

    _proto.$_enterHistory = function $_enterHistory() {
      this.$$trigger('$_addToHistory', {
        event: {
          href: this.href
        }
      });
    }
    /**
     * 检查 url 变化是否需要跳转
     */
    ;

    _proto.$_checkUrl = function $_checkUrl(oldValues) {
      if (!this.$_allowCheck) return false;
      var window = cache.getWindow(this.$_pageId);

      if (this.$_protocol !== oldValues.protocol || this.$_hostname !== oldValues.hostname || this.$_port !== oldValues.port) {
        // 只能跳转相同 protocol、hostname 和 port 的 url
        var jumpUrl = this.href; // 和 web 端不同，这里恢复成原状

        this.$_protocol = oldValues.protocol;
        this.$_hostname = oldValues.hostname;
        this.$_port = oldValues.port;
        this.$_pathname = oldValues.pathname;
        this.$_search = oldValues.search;
        this.$_hash = oldValues.hash;
        window.$$trigger('pageaccessdenied', {
          event: {
            url: jumpUrl,
            type: 'jump'
          }
        });
        return false;
      }

      if (this.$_pathname !== oldValues.pathname || this.$_search !== oldValues.search) {
        var matchRoute = window.$$miniapp.getMatchRoute(this.$_pathname);

        if (matchRoute) {
          var param = ['type=jump', "targeturl=" + encodeURIComponent(this.href)];
          if (this.$_search) param.push("search=" + encodeURIComponent(this.$_search));
          if (this.$_hash) param.push("hash=" + encodeURIComponent(this.$_hash));
          param = '?' + param.join('&');
          var callMethod = window.$$miniapp.isTabBarPage(matchRoute) ? 'switchTab' : 'redirectTo';
          wx[callMethod]({
            url: "" + matchRoute + param
          });

          if (callMethod === 'switchTab') {
            // switchTab 不会销毁页面实例，所以也需要恢复成原状
            this.$_protocol = oldValues.protocol;
            this.$_hostname = oldValues.hostname;
            this.$_port = oldValues.port;
            this.$_pathname = oldValues.pathname;
            this.$_search = oldValues.search;
            this.$_hash = oldValues.hash;
          }

          return true;
        } else {
          var _jumpUrl = this.href; // 和 web 端不同，这里恢复成原状

          this.$_protocol = oldValues.protocol;
          this.$_hostname = oldValues.hostname;
          this.$_port = oldValues.port;
          this.$_pathname = oldValues.pathname;
          this.$_search = oldValues.search;
          this.$_hash = oldValues.hash;
          window.$$trigger('pagenotfound', {
            event: {
              url: _jumpUrl,
              type: 'jump'
            }
          });
          return false;
        }
      }

      return true;
    }
    /**
     * 打开一个新页面
     */
    ;

    _proto.$$open = function $$open(url) {
      url = tool.completeURL(url, this.origin, true);
      var window = cache.getWindow(this.$_pageId);
      var parseRes = Location.$$parse(url);

      if (parseRes.protocol !== this.$_protocol || parseRes.hostname !== this.$_hostname || parseRes.port !== this.$_port) {
        // 只能打开相同 protocol、hostname 和 port 的 url
        return window.$$trigger('pageaccessdenied', {
          event: {
            url: url,
            type: 'open'
          }
        });
      }

      var matchRoute = window.$$miniapp.getMatchRoute(parseRes.pathname || '/');

      if (matchRoute) {
        var param = ['type=open', "targeturl=" + encodeURIComponent(url)];
        if (this.$_search) param.push("search=" + encodeURIComponent(parseRes.search || ''));
        if (this.$_hash) param.push("hash=" + encodeURIComponent(parseRes.hash || ''));
        param = '?' + param.join('&');
        var callMethod = window.$$miniapp.isTabBarPage(matchRoute) ? 'switchTab' : 'navigateTo';
        wx[callMethod]({
          url: "" + matchRoute + param
        });
      } else {
        window.$$trigger('pagenotfound', {
          event: {
            url: url,
            type: 'open'
          }
        });
      }
    }
    /**
     * 重置实例
     */
    ;

    _proto.$$reset = function $$reset(url) {
      if (url === void 0) {
        url = '';
      }

      var _Location$$$parse2 = Location.$$parse(url),
          protocol = _Location$$$parse2.protocol,
          hostname = _Location$$$parse2.hostname,
          port = _Location$$$parse2.port,
          pathname = _Location$$$parse2.pathname,
          hash = _Location$$$parse2.hash,
          search = _Location$$$parse2.search;

      this.$_protocol = protocol || 'https:';
      this.$_hostname = hostname || '';
      this.$_port = port || '';
      this.$_pathname = pathname || '/';
      this.$_search = search || '';
      this.$_hash = hash || '';
    }
    /**
     * 解析 href
     */
    ;

    Location.$$parse = function $$parse(href) {
      if (href === void 0) {
        href = '';
      }

      href = href.trim(); // protocol

      var protocol = /^[a-zA-Z0-9]+:/i.exec(href);

      if (protocol) {
        protocol = protocol[0].toLowerCase();
        href = href.slice(protocol.length);
      } // 跳过 //


      if (href.indexOf('//') === 0) {
        href = href.slice(2);
      }

      var hostStart = 0;
      var hostEnd = -1;
      var isEnd = false;
      var host;

      for (var i = 0, len = href.length; i < len; i++) {
        var char = href[i];

        if ('\t\n\r "%\';<>\\^`{|}'.indexOf(char) >= 0) {
          // RFC 2396：不允许在 hostname 中使用的字符
          if (hostEnd === -1) hostEnd = i;
        } else if ('#/?'.indexOf(char) >= 0) {
          // host 结束符
          if (hostEnd === -1) hostEnd = i;
          isEnd = true;
        } else if (char === '@') {
          hostStart = i + 1;
          hostEnd = -1;
        }

        if (isEnd) break;
      }

      if (hostEnd === -1) {
        host = href.slice(hostStart);
        href = '';
      } else {
        host = href.slice(hostStart, hostEnd);
        href = href.slice(hostEnd);
      } // port


      var port = /:[0-9]*$/.exec(host);

      if (port) {
        port = port[0];
        host = host.slice(0, host.length - port.length);
        if (port !== ':') port = port.slice(1);
      } else {
        port = '';
      } // hostname


      for (var _i = 0, _len = host.length; _i < _len; _i++) {
        var _char = host[_i];
        var isValid = _char >= 'a' && _char <= 'z' || _char >= 'A' && _char <= 'Z' || _char >= '0' && _char <= '9' || '.-+_'.indexOf(_char) >= 0 || _char.charCodeAt(0) > 127; // 不合法的 host 字符

        if (!isValid) {
          host = host.slice(0, _i);
          href = "/" + host.slice(_i) + href;
        }
      }

      var hostname = host.length > 255 ? '' : host.toLowerCase(); // hash

      var hash;
      var searchIndex = -1;
      var hashIndex = -1;

      for (var _i2 = 0, _len2 = href.length; _i2 < _len2; _i2++) {
        if (href[_i2] === '#') {
          hash = href.slice(_i2);
          hashIndex = _i2;
          break;
        } else if (href[_i2] === '?' && searchIndex === -1) {
          searchIndex = _i2;
        }
      }

      hash = hash === '#' ? '' : hash; // search

      var search;

      if (searchIndex !== -1) {
        if (hashIndex === -1) {
          search = href.slice(searchIndex);
        } else {
          search = href.slice(searchIndex, hashIndex);
        }
      }

      search = search === '?' ? '' : search; // pathname

      var pathname;
      var firstIndex = searchIndex !== -1 && (hashIndex === -1 || searchIndex < hashIndex) ? searchIndex : hashIndex;

      if (firstIndex > 0) {
        pathname = href.slice(0, firstIndex);
      } else if (firstIndex === -1 && href.length > 0) {
        pathname = href;
      }

      if (hostname && !pathname) {
        pathname = '/';
      }

      return {
        protocol: protocol,
        hostname: hostname,
        port: port,
        pathname: pathname,
        hash: hash,
        search: search
      };
    }
    /**
     * 不触发检查的方式替换 href
     */
    ;

    _proto.$$setHrefWithoutCheck = function $$setHrefWithoutCheck(value) {
      this.$_allowCheck = false;
      this.replace(value);
      this.$_allowCheck = true;
    }
    /**
     * 开始检查 hash 变化
     */
    ;

    _proto.$$startCheckHash = function $$startCheckHash() {
      if (!this.$_allowCheck) return;
      this.$_lastHash = this.$_hash;
      this.$_lastPathname = this.$_pathname;
      this.$_lastSearch = this.$_search;
      this.$_lastHref = this.href;
    }
    /**
     * 检查 hash 变化
     */
    ;

    _proto.$$endCheckHash = function $$endCheckHash(needCheckUrlChange) {
      if (!this.$_allowCheck) return;

      if ((needCheckUrlChange || this.$_lastPathname === this.$_pathname && this.$_lastSearch === this.$_search) && this.$_lastHash !== this.$_hash) {
        this.$$trigger('hashchange', {
          event: {
            oldURL: this.$_lastHref,
            newURL: this.href
          }
        });
      }

      this.$_lastHash = '';
      this.$_lastPathname = '';
      this.$_lastSearch = '';
      this.$_lastHref = '';
    }
    /**
     * 对外属性和方法
     */
    ;

    _proto.reload = function reload() {
      var window = cache.getWindow(this.$_pageId);
      var param = ['type=jump', "targeturl=" + encodeURIComponent(this.href)];
      if (this.$_search) param.push("search=" + encodeURIComponent(this.$_search));
      if (this.$_hash) param.push("hash=" + encodeURIComponent(this.$_hash));
      param = '?' + param.join('&');
      var callMethod = window.$$miniapp.isTabBarPage(this.$_pageRoute) ? 'switchTab' : 'redirectTo';
      wx[callMethod]({
        url: "" + this.$_pageRoute + param
      });
    };

    _proto.replace = function replace(value) {
      // 和直接赋值 location.href 不同，不需要进入 history
      this.$_setHrefWithoutEnterHistory(value);
    };

    _proto.toString = function toString() {
      return this.href;
    };

    createClass(Location, [{
      key: "protocol",
      get: function get() {
        return this.$_protocol;
      },
      set: function set(value) {
        if (!value || typeof value !== 'string') return;
        var parseRes = /^([a-z0-9.+-]+)(:)?$/i.exec(value);
        var oldValues = this.$_getOldValues();

        if (parseRes) {
          if (parseRes[2] === ':') {
            this.$_protocol = value;
          } else {
            this.$_protocol = parseRes[1] + ":";
          }

          if (this.$_checkUrl(oldValues)) this.$_enterHistory();
        }
      }
    }, {
      key: "host",
      get: function get() {
        return (this.$_hostname || '') + (this.$_port ? ':' + this.$_port : '');
      },
      set: function set(value) {
        if (!value || typeof value !== 'string') return;

        var _Location$$$parse3 = Location.$$parse("//" + value),
            hostname = _Location$$$parse3.hostname,
            port = _Location$$$parse3.port;

        var oldValues = this.$_getOldValues();
        this.$_hostname = hostname || this.$_hostname;
        this.$_port = port || '';
        if (this.$_checkUrl(oldValues)) this.$_enterHistory();
      }
    }, {
      key: "hostname",
      get: function get() {
        return this.$_hostname;
      },
      set: function set(value) {
        if (!value || typeof value !== 'string') return;

        var _Location$$$parse4 = Location.$$parse("//" + value),
            hostname = _Location$$$parse4.hostname;

        var oldValues = this.$_getOldValues();
        this.$_hostname = hostname || this.$_hostname;
        if (this.$_checkUrl(oldValues)) this.$_enterHistory();
      }
    }, {
      key: "port",
      get: function get() {
        return this.$_port;
      },
      set: function set(value) {
        value = +value;
        if (typeof value !== 'number' || !isFinite(value) || value <= 0) return;
        var port = value === 80 ? '' : value + '';
        var oldValues = this.$_getOldValues();
        this.$_port = port;
        if (this.$_checkUrl(oldValues)) this.$_enterHistory();
      }
    }, {
      key: "origin",
      get: function get() {
        return this.$_protocol + "//" + this.host;
      },
      set: function set(value) {
        if (!value || typeof value !== 'string') return;
        if (!/^(([a-zA-Z0-9]+:)|(\/\/))/i.test(value)) return; // 没有带协议

        var _Location$$$parse5 = Location.$$parse(value),
            protocol = _Location$$$parse5.protocol,
            hostname = _Location$$$parse5.hostname,
            port = _Location$$$parse5.port;

        var oldValues = this.$_getOldValues();
        this.$_protocol = protocol || this.$_protocol;
        this.$_hostname = hostname || this.$_hostname;
        this.$_port = port || '';
        if (this.$_checkUrl(oldValues)) this.$_enterHistory();
      }
    }, {
      key: "pathname",
      get: function get() {
        return this.$_pathname;
      },
      set: function set(value) {
        if (typeof value !== 'string') return;
        var oldValues = this.$_getOldValues();

        if (!value || value === '/') {
          this.$_pathname = '/';
        } else {
          if (value[0] !== '/') value = "/" + value;

          var _Location$$$parse6 = Location.$$parse("//miniapp" + value),
              pathname = _Location$$$parse6.pathname;

          this.$_pathname = pathname || '/';
        }

        if (this.$_checkUrl(oldValues)) this.$_enterHistory();
      }
    }, {
      key: "search",
      get: function get() {
        return this.$_search;
      },
      set: function set(value) {
        if (typeof value !== 'string') return;
        var oldValues = this.$_getOldValues();

        if (!value || value === '?') {
          this.$_search = '';
        } else {
          if (value[0] !== '?') value = "?" + value;

          var _Location$$$parse7 = Location.$$parse("//miniapp" + value),
              search = _Location$$$parse7.search;

          this.$_search = search || '';
        }

        if (this.$_checkUrl(oldValues)) this.$_enterHistory();
      }
    }, {
      key: "hash",
      get: function get() {
        return this.$_hash;
      },
      set: function set(value) {
        if (typeof value !== 'string') return;
        this.$$startCheckHash();

        if (!value || value === '#') {
          this.$_hash = '';
        } else {
          if (value[0] !== '#') value = "#" + value;

          var _Location$$$parse8 = Location.$$parse("//miniapp" + value),
              hash = _Location$$$parse8.hash;

          this.$_hash = hash || '';
        }

        this.$$endCheckHash();
        this.$_enterHistory();
      }
    }, {
      key: "href",
      get: function get() {
        return this.$_protocol + "//" + this.host + this.$_pathname + this.$_search + this.$_hash;
      },
      set: function set(value) {
        this.$_setHrefWithoutEnterHistory(value);
        this.$_enterHistory();
      }
    }]);

    return Location;
  }(EventTarget);

  var pool$6 = new Pool();

  var HTMLAnchorElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLAnchorElement, _Element);

    function HTMLAnchorElement() {
      return _Element.apply(this, arguments) || this;
    }

    /**
     * 创建实例
     */
    HTMLAnchorElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        var instance = pool$6.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLAnchorElement(options, tree);
    }
    /**
     * 覆写父类的 $$init 方法
     */
    ;

    var _proto = HTMLAnchorElement.prototype;

    _proto.$$init = function $$init(options, tree) {
      _Element.prototype.$$init.call(this, options, tree);

      this.$_protocol = 'http:';
      this.$_hostname = '';
      this.$_port = '';
      this.$_pathname = '/';
      this.$_search = '';
      this.$_hash = '';
    }
    /**
     * 覆写父类的 $$destroy 方法
     */
    ;

    _proto.$$destroy = function $$destroy() {
      _Element.prototype.$$destroy.call(this);

      this.$_protocol = null;
      this.$_hostname = null;
      this.$_port = null;
      this.$_pathname = null;
      this.$_search = null;
      this.$_hash = null;
    }
    /**
     * 覆写父类的回收实例方法
     */
    ;

    _proto.$$recycle = function $$recycle() {
      this.$_children.forEach(function (child) {
        return child.$$recycle();
      });
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        pool$6.add(this);
      }
    }
    /**
     * 调用 $_generateHtml 接口时用于处理额外的属性，
     */
    ;

    _proto.$$dealWithAttrsForGenerateHtml = function $$dealWithAttrsForGenerateHtml(html, node) {
      var href = node.href;
      if (href) html += " href=\"" + tool.escapeForHtmlGeneration(href) + "\"";
      var target = node.target;
      if (target) html += " target=\"" + tool.escapeForHtmlGeneration(target) + "\"";
      return html;
    }
    /**
     * 调用 outerHTML 的 setter 时用于处理额外的属性
     */
    ;

    _proto.$$dealWithAttrsForOuterHTML = function $$dealWithAttrsForOuterHTML(node) {
      this.href = node.href || '';
      this.target = node.target || '';
    }
    /**
     * 调用 cloneNode 接口时用于处理额外的属性
     */
    ;

    _proto.$$dealWithAttrsForCloneNode = function $$dealWithAttrsForCloneNode() {
      return {
        href: this.href,
        target: this.target
      };
    }
    /**
     * 对外属性和方法
     */
    ;

    createClass(HTMLAnchorElement, [{
      key: "href",
      get: function get() {
        return this.$_attrs.get('href');
      },
      set: function set(value) {
        value = '' + value;

        if (value.indexOf('//') === -1) {
          var _cache$getConfig = cache.getConfig(),
              origin = _cache$getConfig.origin;

          value = origin + (value[0] === '/' ? value : "/" + value);
        }

        this.$_attrs.set('href', value);

        var _Location$$$parse = Location.$$parse(value),
            protocol = _Location$$$parse.protocol,
            hostname = _Location$$$parse.hostname,
            port = _Location$$$parse.port,
            pathname = _Location$$$parse.pathname,
            search = _Location$$$parse.search,
            hash = _Location$$$parse.hash;

        this.$_protocol = protocol || this.$_protocol;
        this.$_hostname = hostname || this.$_hostname;
        this.$_port = port || '';
        this.$_pathname = pathname || '/';
        this.$_search = search || '';
        this.$_hash = hash || '';
      }
    }, {
      key: "protocol",
      get: function get() {
        return this.$_protocol;
      }
    }, {
      key: "hostname",
      get: function get() {
        return this.$_hostname;
      }
    }, {
      key: "port",
      get: function get() {
        return this.$_port;
      }
    }, {
      key: "pathname",
      get: function get() {
        return this.$_pathname;
      }
    }, {
      key: "search",
      get: function get() {
        return this.$_search;
      }
    }, {
      key: "hash",
      get: function get() {
        return this.$_hash;
      }
    }, {
      key: "target",
      get: function get() {
        return this.$_attrs.get('target');
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('target', value);
      }
    }]);

    return HTMLAnchorElement;
  }(Element);

  var pool$7 = new Pool();

  var Image = /*#__PURE__*/function (_Element) {
    inheritsLoose(Image, _Element);

    function Image() {
      return _Element.apply(this, arguments) || this;
    }

    // Create instance
    Image.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        var instance = pool$7.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new Image(options, tree);
    } // Override the parent class's $$init instance method
    ;

    var _proto = Image.prototype;

    _proto.$$init = function $$init(options, tree) {
      var width = options.width;
      var height = options.height;
      if (typeof width === 'number' && width >= 0) options.attrs.width = width;
      if (typeof height === 'number' && height >= 0) options.attrs.height = height;

      _Element.prototype.$$init.call(this, options, tree);

      this.$_naturalWidth = 0;
      this.$_naturalHeight = 0;
      this.$_initRect();
    } // Override the parent class's destroy instance method
    ;

    _proto.$$destroy = function $$destroy() {
      _Element.prototype.$$destroy.call(this);

      this.$_naturalWidth = null;
      this.$_naturalHeight = null;
    } // Override the parent class's recovery instance method
    ;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        pool$7.add(this);
      }
    } // Update parent
    ;

    _proto.$_triggerParentUpdate = function $_triggerParentUpdate() {
      this.$_initRect();

      _Element.prototype.$_triggerParentUpdate.call(this);
    } // Init length
    ;

    _proto.$_initRect = function $_initRect() {
      var width = parseInt(this.$_attrs.get('width'), 10);
      var height = parseInt(this.$_attrs.get('height'), 10);
      if (typeof width === 'number' && width >= 0) this.$_style.width = width + "px";
      if (typeof height === 'number' && height >= 0) this.$_style.height = height + "px";
    } // Reset width & height
    ;

    _proto.$_resetRect = function $_resetRect(rect) {
      if (rect === void 0) {
        rect = {};
      }

      this.$_naturalWidth = rect.width || 0;
      this.$_naturalHeight = rect.height || 0;
      this.$_initRect();
    };

    createClass(Image, [{
      key: "src",
      get: function get() {
        return this.$_attrs.get('src') || '';
      },
      set: function set(value) {
        var _this = this;

        if (!value || typeof value !== 'string') return;
        this.$_attrs.set('src', value);
        setTimeout(function () {
          if (_this.src.indexOf('data:image') !== 0) {
            my.getImageInfo({
              src: _this.src,
              success: function success(res) {
                // Load successfully, adjust the width and height of the picture
                _this.$_resetRect(res); // Load event


                _this.$$trigger('load', {
                  event: new Event({
                    name: 'load',
                    target: _this,
                    eventPhase: Event.AT_TARGET
                  }),
                  currentTarget: _this
                });
              },
              fail: function fail() {
                // Load failed, adjust the width and height of the image
                _this.$_resetRect({
                  width: 0,
                  height: 0
                }); // Trigger error event


                _this.$$trigger('error', {
                  event: new Event({
                    name: 'error',
                    target: _this,
                    eventPhase: Event.AT_TARGET
                  }),
                  currentTarget: _this
                });
              }
            });
          }
        }, 0);
      }
    }, {
      key: "width",
      get: function get() {
        return +this.$_attrs.get('width') || 0;
      },
      set: function set(value) {
        if (typeof value !== 'number' || !isFinite(value) || value < 0) return;
        this.$_attrs.set('width', value);
        this.$_initRect();
      }
    }, {
      key: "height",
      get: function get() {
        return +this.$_attrs.get('height') || 0;
      },
      set: function set(value) {
        if (typeof value !== 'number' || !isFinite(value) || value < 0) return;
        this.$_attrs.set('height', value);
        this.$_initRect();
      }
    }, {
      key: "naturalWidth",
      get: function get() {
        return this.$_naturalWidth;
      }
    }, {
      key: "naturalHeight",
      get: function get() {
        return this.$_naturalHeight;
      }
    }]);

    return Image;
  }(Element);

  var pool$8 = new Pool();

  var HTMLInputElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLInputElement, _Element);

    function HTMLInputElement() {
      return _Element.apply(this, arguments) || this;
    }

    // Create instance
    HTMLInputElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        var instance = pool$8.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLInputElement(options, tree);
    } // Override parent class recycle method
    ;

    var _proto = HTMLInputElement.prototype;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        pool$8.add(this);
      }
    } // $_generateHtml handle other attributes
    ;

    _proto.$$dealWithAttrsForGenerateHtml = function $$dealWithAttrsForGenerateHtml(html, node) {
      var type = node.type;
      if (type) html += " type=\"" + type + "\"";
      var value = node.value;
      if (value) html += " value=\"" + value + "\"";
      var disabled = node.disabled;
      if (disabled) html += ' disabled';
      var maxlength = node.maxlength;
      if (maxlength) html += " maxlength=\"" + maxlength + "\"";
      var placeholder = node.placeholder;

      if (placeholder) {
        html += " placeholder=\"" + placeholder.replace(/"/g, '\\"') + "\"";
      }

      return html;
    } // outerHtml
    ;

    _proto.$$dealWithAttrsForOuterHTML = function $$dealWithAttrsForOuterHTML(node) {
      this.type = node.type || '';
      this.value = node.value || '';
      this.disabled = node.disabled || '';
      this.maxlength = node.maxlength;
      this.placeholder = node.placeholder || ''; // Special attr

      this.mpplaceholderclass = node.mpplaceholderclass || '';
    }
    /**
    * The cloneNode interface is invoked to handle additional properties
    */
    ;

    _proto.$$dealWithAttrsForCloneNode = function $$dealWithAttrsForCloneNode() {
      return {
        type: this.type,
        value: this.value,
        disabled: this.disabled,
        maxlength: this.maxlength,
        placeholder: this.placeholder,
        // Special field
        mpplaceholderclass: this.mpplaceholderclass
      };
    } // Attribute
    ;

    _proto.focus = function focus() {
      this.$_attrs.set('focus', true);
    };

    _proto.blur = function blur() {
      this.$_attrs.set('focus', false);
    };

    createClass(HTMLInputElement, [{
      key: "name",
      get: function get() {
        return this.$_attrs.get('name');
      },
      set: function set(value) {
        value = '' + value;
        return this.$_attrs.set('name', value);
      }
    }, {
      key: "type",
      get: function get() {
        return this.$_attrs.get('type') || 'text';
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('type', value);
      }
    }, {
      key: "value",
      get: function get() {
        var type = this.$_attrs.get('type');
        var value = this.$_attrs.get('value');

        if (!value && !this.changed) {
          value = this.$_attrs.get('defaultValue');
        }

        if ((type === 'radio' || type === 'checkbox') && value === undefined) {
          return 'on';
        }

        return value || '';
      },
      set: function set(value) {
        this.changed = true;
        value = '' + value;
        this.$_attrs.set('value', value);
      }
    }, {
      key: "readOnly",
      get: function get() {
        return !!this.$_attrs.get('readOnly');
      },
      set: function set(value) {
        this.$_attrs.set('readOnly', !!value);
      }
    }, {
      key: "disabled",
      get: function get() {
        return !!this.$_attrs.get('disabled');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('disabled', value);
      }
    }, {
      key: "maxlength",
      get: function get() {
        return this.$_attrs.get('maxlength');
      },
      set: function set(value) {
        this.$_attrs.set('maxlength', value);
      }
    }, {
      key: "placeholder",
      get: function get() {
        return this.$_attrs.get('placeholder') || '';
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('placeholder', value);
      }
    }, {
      key: "autofocus",
      get: function get() {
        return !!this.$_attrs.get('autofocus');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('autofocus', value);
      }
    }, {
      key: "checked",
      set: function set(value) {
        this.$_attrs.set('checked', value);
      },
      get: function get() {
        return this.$_attrs.get('checked') || '';
      }
    }]);

    return HTMLInputElement;
  }(Element);

  var pool$9 = new Pool();

  var HTMLTextAreaElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLTextAreaElement, _Element);

    function HTMLTextAreaElement() {
      return _Element.apply(this, arguments) || this;
    }

    /**
    * Create instance
    */
    HTMLTextAreaElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Multiplexed element node
        var instance = pool$9.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLTextAreaElement(options, tree);
    } // Override the parent class's recovery instance method
    ;

    var _proto = HTMLTextAreaElement.prototype;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        pool$9.add(this);
      }
    }
    /**
    * $_generateHtml handle other attributes
    */
    ;

    _proto.$$dealWithAttrsForGenerateHtml = function $$dealWithAttrsForGenerateHtml(html, node) {
      var type = node.type;
      if (type) html += " type=\"" + type + "\"";
      var value = node.value;
      if (value) html += " value=\"" + value + "\"";
      var disabled = node.disabled;
      if (disabled) html += ' disabled';
      var maxlength = node.maxlength;
      if (maxlength) html += " maxlength=\"" + maxlength + "\"";
      var placeholder = node.placeholder;

      if (placeholder) {
        html += " placeholder=\"" + placeholder.replace(/"/g, '\\"') + "\"";
      }

      return html;
    } // outerHtml
    ;

    _proto.$$dealWithAttrsForOuterHTML = function $$dealWithAttrsForOuterHTML(node) {
      this.type = node.type || '';
      this.value = node.value || '';
      this.disabled = node.disabled || '';
      this.maxlength = node.maxlength;
      this.placeholder = node.placeholder || ''; // Special field

      this.mpplaceholderclass = node.mpplaceholderclass || '';
    }
    /**
    * The cloneNode interface is invoked to handle additional properties
    */
    ;

    _proto.$$dealWithAttrsForCloneNode = function $$dealWithAttrsForCloneNode() {
      return {
        type: this.type,
        value: this.value,
        disabled: this.disabled,
        maxlength: this.maxlength,
        placeholder: this.placeholder,
        // Special field
        mpplaceholderclass: this.mpplaceholderclass
      };
    } // Attribute
    ;

    _proto.focus = function focus() {
      this.$_attrs.set('focus', true);
    };

    _proto.blur = function blur() {
      this.$_attrs.set('focus', false);
    };

    createClass(HTMLTextAreaElement, [{
      key: "type",
      get: function get() {
        return this.$_attrs.get('type') || 'textarea';
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('type', value);
      }
    }, {
      key: "value",
      get: function get() {
        var value = this.$_attrs.get('value');

        if (!value && !this.changed) {
          value = this.$_attrs.get('defaultValue');
        }

        return value || '';
      },
      set: function set(value) {
        this.changed = true;
        value = '' + value;
        this.$_attrs.set('value', value);
      }
    }, {
      key: "readOnly",
      get: function get() {
        return !!this.$_attrs.get('readOnly');
      },
      set: function set(value) {
        this.$_attrs.set('readOnly', !!value);
      }
    }, {
      key: "disabled",
      get: function get() {
        return !!this.$_attrs.get('disabled');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('disabled', value);
      }
    }, {
      key: "maxlength",
      get: function get() {
        return this.$_attrs.get('maxlength');
      },
      set: function set(value) {
        this.$_attrs.set('maxlength', value);
      }
    }, {
      key: "placeholder",
      get: function get() {
        return this.$_attrs.get('placeholder') || '';
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('placeholder', value);
      }
    }, {
      key: "autofocus",
      get: function get() {
        return !!this.$_attrs.get('autofocus');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('autofocus', value);
      }
    }, {
      key: "selectionStart",
      get: function get() {
        var value = +this.$_attrs.get('selection-start');
        return value !== undefined ? value : -1;
      },
      set: function set(value) {
        this.$_attrs.set('selection-start', value);
      }
    }, {
      key: "selectionEnd",
      get: function get() {
        var value = +this.$_attrs.get('selection-end');
        return value !== undefined ? value : -1;
      },
      set: function set(value) {
        this.$_attrs.set('selection-end', value);
      }
    }]);

    return HTMLTextAreaElement;
  }(Element);

  var pool$a = new Pool();

  var HTMLVideoElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLVideoElement, _Element);

    function HTMLVideoElement() {
      return _Element.apply(this, arguments) || this;
    }

    HTMLVideoElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        var instance = pool$a.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLVideoElement(options, tree);
    };

    var _proto = HTMLVideoElement.prototype;

    _proto.$$init = function $$init(options, tree) {
      var width = options.width;
      var height = options.height;
      if (typeof width === 'number' && width >= 0) options.attrs.width = width;
      if (typeof height === 'number' && height >= 0) options.attrs.height = height;

      _Element.prototype.$$init.call(this, options, tree);

      this.$_initRect();
    };

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        pool$a.add(this);
      }
    };

    _proto.$_triggerParentUpdate = function $_triggerParentUpdate() {
      this.$_initRect();

      _Element.prototype.$_triggerParentUpdate.call(this);
    };

    _proto.$_initRect = function $_initRect() {
      var width = parseInt(this.$_attrs.get('width'), 10);
      var height = parseInt(this.$_attrs.get('height'), 10);
      if (typeof width === 'number' && width >= 0) this.$_style.width = width + "px";
      if (typeof height === 'number' && height >= 0) this.$_style.height = height + "px";
    };

    createClass(HTMLVideoElement, [{
      key: "src",
      get: function get() {
        return this.$_attrs.get('src') || '';
      },
      set: function set(value) {
        if (!value || typeof value !== 'string') return;
        this.$_attrs.set('src', value);
      }
    }, {
      key: "width",
      get: function get() {
        return +this.$_attrs.get('width') || 0;
      },
      set: function set(value) {
        if (typeof value !== 'number' || !isFinite(value) || value < 0) return;
        this.$_attrs.set('width', value);
        this.$_initRect();
      }
    }, {
      key: "height",
      get: function get() {
        return +this.$_attrs.get('height') || 0;
      },
      set: function set(value) {
        if (typeof value !== 'number' || !isFinite(value) || value < 0) return;
        this.$_attrs.set('height', value);
        this.$_initRect();
      }
    }, {
      key: "autoplay",
      get: function get() {
        return !!this.$_attrs.get('autoplay');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('autoplay', value);
      }
    }, {
      key: "loop",
      get: function get() {
        return !!this.$_attrs.get('loop');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('loop', value);
      }
    }, {
      key: "muted",
      get: function get() {
        return !!this.$_attrs.get('muted');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('muted', value);
      }
    }, {
      key: "controls",
      get: function get() {
        var value = this.$_attrs.get('controls');
        return value !== undefined ? !!value : true;
      },
      set: function set(value) {
        this.$_attrs.set('controls', value);
      }
    }, {
      key: "poster",
      get: function get() {
        return this.$_attrs.get('poster');
      },
      set: function set(value) {
        if (!value || typeof value !== 'string') return;
        this.$_attrs.set('poster', value);
      }
    }, {
      key: "currentTime",
      get: function get() {
        return +this.$_attrs.get('currentTime') || 0;
      }
    }, {
      key: "buffered",
      get: function get() {
        return this.$_attrs.get('buffered');
      }
    }]);

    return HTMLVideoElement;
  }(Element);

  var pool$b = new Pool();

  var HTMLCanvasElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLCanvasElement, _Element);

    function HTMLCanvasElement() {
      return _Element.apply(this, arguments) || this;
    }

    /**
     * 创建实例
     */
    HTMLCanvasElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        var instance = pool$b.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLCanvasElement(options, tree);
    }
    /**
     * 覆写父类的 $$init 方法
     */
    ;

    var _proto = HTMLCanvasElement.prototype;

    _proto.$$init = function $$init(options, tree) {
      var width = options.width;
      var height = options.height;
      if (typeof width === 'number' && width >= 0) options.attrs.width = width;
      if (typeof height === 'number' && height >= 0) options.attrs.height = height;

      _Element.prototype.$$init.call(this, options, tree);

      this.$_node = null;
      this.$_initRect();
    }
    /**
     * 覆写父类的回收实例方法
     */
    ;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        pool$b.add(this);
      }
    }
    /**
     * 准备 canvas 节点
     */
    ;

    _proto.$$prepare = function $$prepare() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        {
          _this.addEventListener('canvasReady', function () {
            resolve(_this);
          });
        }
      });
    };

    /**
     * 更新父组件树
     */
    _proto.$_triggerParentUpdate = function $_triggerParentUpdate() {
      this.$_initRect();

      _Element.prototype.$_triggerParentUpdate.call(this);
    }
    /**
     * 初始化长宽
     */
    ;

    _proto.$_initRect = function $_initRect() {
      var width = parseInt(this.$_attrs.get('width'), 10);
      var height = parseInt(this.$_attrs.get('height'), 10);

      if (typeof width === 'number' && width >= 0) {
        this.$_style.width = width + "px";
      }

      if (typeof height === 'number' && height >= 0) {
        this.$_style.height = height + "px";
      }
    }
    /**
     * 对外属性和方法
     */
    ;

    _proto.getContext = function getContext(type) {
      if (!this.$_node) {
        console.warn('canvas is not prepared, please call $$prepare method first');
        return;
      }

      return this.$_node.getContext(type);
    };

    createClass(HTMLCanvasElement, [{
      key: "$$node",
      get: function get() {
        return this.$_node;
      }
    }, {
      key: "width",
      get: function get() {
        if (this.$_node) return this.$_node.width;else return +this.$_attrs.get('width') || 0;
      },
      set: function set(value) {
        if (typeof value !== 'number' || !isFinite(value) || value < 0) return;
        if (this.$_node) this.$_node.width = value;else this.$_attrs.set('width', value);
      }
    }, {
      key: "height",
      get: function get() {
        if (this.$_node) return this.$_node.height;else return +this.$_attrs.get('height') || 0;
      },
      set: function set(value) {
        if (typeof value !== 'number' || !isFinite(value) || value < 0) return;
        if (this.$_node) this.$_node.height = value;else this.$_attrs.set('height', value);
      }
    }]);

    return HTMLCanvasElement;
  }(Element);

  var pool$c = new Pool();

  var HTMLSelectElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLSelectElement, _Element);

    function HTMLSelectElement() {
      return _Element.apply(this, arguments) || this;
    }

    /**
     * 创建实例
     */
    HTMLSelectElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        var instance = pool$c.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLSelectElement(options, tree);
    }
    /**
     * 覆写父类的 $$init 方法
     */
    ;

    var _proto = HTMLSelectElement.prototype;

    _proto.$$init = function $$init(options, tree) {
      _Element.prototype.$$init.call(this, options, tree);

      this.$$resetOptions();
    }
    /**
     * 重置 options 显示
     */
    ;

    _proto.$$resetOptions = function $$resetOptions() {
      var value = this.value;

      if (value !== undefined) {
        this.options.forEach(function (child) {
          return child.$$updateSelected(child.value === value);
        });
      } else {
        this.options.forEach(function (child, index) {
          return child.$$updateSelected(index === 0);
        });
      }
    }
    /**
     * 覆写父类的回收实例方法
     */
    ;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        pool$c.add(this);
      }
    }
    /**
     * 调用 $_generateHtml 接口时用于处理额外的属性，
     */
    ;

    _proto.$$dealWithAttrsForGenerateHtml = function $$dealWithAttrsForGenerateHtml(html, node) {
      var value = node.value;
      if (value) html += " value=\"" + tool.escapeForHtmlGeneration(value) + "\"";
      var disabled = node.disabled;
      if (disabled) html += ' disabled';
      return html;
    }
    /**
     * 调用 outerHTML 的 setter 时用于处理额外的属性
     */
    ;

    _proto.$$dealWithAttrsForOuterHTML = function $$dealWithAttrsForOuterHTML(node) {
      this.name = node.name || '';
      this.value = node.value || '';
      this.disabled = !!node.disabled;
      this.selectedIndex = node.selectedIndex || 0;
    }
    /**
     * 调用 cloneNode 接口时用于处理额外的属性
     */
    ;

    _proto.$$dealWithAttrsForCloneNode = function $$dealWithAttrsForCloneNode() {
      return {
        value: this.value,
        disabled: this.disabled
      };
    }
    /**
     * 对外属性和方法
     */
    ;

    createClass(HTMLSelectElement, [{
      key: "name",
      get: function get() {
        return this.$_attrs.get('name');
      },
      set: function set(value) {
        value = '' + value;
        return this.$_attrs.set('name', value);
      }
    }, {
      key: "value",
      get: function get() {
        return this.$_attrs.get('value');
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('value', value); // 同步更新 selectedIndex 属性

        this.$_attrs.set('selectedIndex', this.options.findIndex(function (option) {
          return option.value === value;
        })); // 同步更新 options 的 selected

        this.$$resetOptions();
      }
    }, {
      key: "disabled",
      get: function get() {
        return !!this.$_attrs.get('disabled');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('disabled', value);
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        return +this.$_attrs.get('selectedIndex');
      },
      set: function set(value) {
        value = +value;
        this.$_attrs.set('selectedIndex', value); // 同步更新 value 属性

        this.$_attrs.set('value', this.options[value] && this.options[value].value || ''); // 同步更新 options 的 selected

        this.$$resetOptions();
      }
    }, {
      key: "options",
      get: function get() {
        // 只考虑儿子节点中的 option
        return this.$_children.filter(function (child) {
          return child.tagName === 'OPTION' && !child.disabled;
        });
      }
    }]);

    return HTMLSelectElement;
  }(Element);

  var pool$d = new Pool();

  var HTMLOptionElement = /*#__PURE__*/function (_Element) {
    inheritsLoose(HTMLOptionElement, _Element);

    function HTMLOptionElement() {
      return _Element.apply(this, arguments) || this;
    }

    /**
     * 创建实例
     */
    HTMLOptionElement.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        var instance = pool$d.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new HTMLOptionElement(options, tree);
    }
    /**
     * 覆写父类的回收实例方法
     */
    ;

    var _proto = HTMLOptionElement.prototype;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        pool$d.add(this);
      }
    }
    /**
     * 覆写父类的 $$init 方法
     */
    ;

    _proto.$$init = function $$init(options, tree) {
      _Element.prototype.$$init.call(this, options, tree);
    }
    /**
     * 调用 $_generateHtml 接口时用于处理额外的属性，
     */
    ;

    _proto.$$dealWithAttrsForGenerateHtml = function $$dealWithAttrsForGenerateHtml(html, node) {
      var value = node.value;
      if (value) html += " value=\"" + tool.tool.escapeForHtmlGeneration(value) + "\"";
      var label = node.label;
      if (label) html += " label=\"" + tool.tool.escapeForHtmlGeneration(label) + "\"";
      var selected = node.selected;
      if (selected) html += ' selected';
      return html;
    }
    /**
     * 调用 outerHTML 的 setter 时用于处理额外的属性
     */
    ;

    _proto.$$dealWithAttrsForOuterHTML = function $$dealWithAttrsForOuterHTML(node) {
      this.label = node.label || '';
      this.value = node.value || '';
      this.disabled = !!node.disabled;
      this.selected = !!node.selected;
    }
    /**
     * 更新 selected，不触发 select 的更新
     */
    ;

    _proto.$$updateSelected = function $$updateSelected(value) {
      value = !!value;
      this.$_attrs.set('selected', value);
    };

    createClass(HTMLOptionElement, [{
      key: "label",
      get: function get() {
        return this.$_attrs.get('label') || this.textContent;
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('label', value);
      }
    }, {
      key: "value",
      get: function get() {
        var value = this.$_attrs.get('value');
        return value !== undefined ? value : this.label;
      },
      set: function set(value) {
        value = '' + value;
        this.$_attrs.set('value', value);
      }
    }, {
      key: "disabled",
      get: function get() {
        return !!this.$_attrs.get('disabled');
      },
      set: function set(value) {
        value = !!value;
        this.$_attrs.set('disabled', value);
      }
    }, {
      key: "selected",
      set: function set(value) {
        this.$$updateSelected(value); // 同步更新 select 的 selectedIndex 和 value，只考虑父亲节点中 select

        var parentNode = this.parentNode;

        if (parentNode && parentNode.tagName === 'SELECT') {
          parentNode.value = this.value;
        }
      },
      get: function get() {
        return !!this.$_attrs.get('selected');
      }
    }]);

    return HTMLOptionElement;
  }(Element);

  var pool$e = new Pool();

  var NotSupport = /*#__PURE__*/function (_Element) {
    inheritsLoose(NotSupport, _Element);

    function NotSupport() {
      return _Element.apply(this, arguments) || this;
    }

    /**
     * 创建实例
     */
    NotSupport.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        var instance = pool$e.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new NotSupport(options, tree);
    }
    /**
     * 覆写父类的 $$init 方法
     */
    ;

    var _proto = NotSupport.prototype;

    _proto.$$init = function $$init(options, tree) {
      _Element.prototype.$$init.call(this, options, tree); // 处理特殊节点


      var window = cache.getWindow(this.$_pageId);
      if (window.onDealWithNotSupportDom) window.onDealWithNotSupportDom(this);
    }
    /**
     * 覆写父类的 $$destroy 方法
     */
    ;

    _proto.$$destroy = function $$destroy() {
      _Element.prototype.$$destroy.call(this);
    }
    /**
     * 覆写父类的回收实例方法
     */
    ;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        pool$e.add(this);
      }
    };

    return NotSupport;
  }(Element);

  var pool$f = new Pool();

  var BuiltInComponent = /*#__PURE__*/function (_Element) {
    inheritsLoose(BuiltInComponent, _Element);

    function BuiltInComponent() {
      return _Element.apply(this, arguments) || this;
    }

    // Create instance
    BuiltInComponent.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        var instance = pool$f.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new BuiltInComponent(options, tree);
    } // Override the parent class's recovery instance method
    ;

    var _proto = BuiltInComponent.prototype;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // Reuse element node
        pool$f.add(this);
      }
    };

    createClass(BuiltInComponent, [{
      key: "behavior",
      get: function get() {
        return this.$_attrs.get('behavior') || '';
      },
      set: function set(value) {
        if (typeof value !== 'string') return;
        this.$_attrs.set('behavior', value);
      }
    }]);

    return BuiltInComponent;
  }(Element);

  var pool$g = new Pool();

  var CustomComponent = /*#__PURE__*/function (_Element) {
    inheritsLoose(CustomComponent, _Element);

    function CustomComponent() {
      return _Element.apply(this, arguments) || this;
    }

    // Create instance
    CustomComponent.$$create = function $$create(options, tree) {
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        var instance = pool$g.get();

        if (instance) {
          instance.$$init(options, tree);
          return instance;
        }
      }

      return new CustomComponent(options, tree);
    }
    /**
     * 覆写父类的 $$init 方法
     */
    ;

    var _proto = CustomComponent.prototype;

    _proto.$$init = function $$init(options, tree) {
      this.$_behavior = options.componentName;

      _Element.prototype.$$init.call(this, options, tree);
    }
    /**
     * 覆写父类的 $$destroy 方法
     */
    ;

    _proto.$$destroy = function $$destroy() {
      _Element.prototype.$$destroy.call(this);

      this.$_behavior = null;
    }
    /**
     * 覆写父类的回收实例方法
     */
    ;

    _proto.$$recycle = function $$recycle() {
      this.$$destroy();
      var config = cache.getConfig();

      if (config.optimization.elementMultiplexing) {
        // 复用 element 节点
        pool$g.add(this);
      }
    };

    createClass(CustomComponent, [{
      key: "behavior",
      get: function get() {
        return this.$_behavior;
      }
    }]);

    return CustomComponent;
  }(Element);

  var CONSTRUCTOR_MAP = {
    A: HTMLAnchorElement,
    IMG: Image,
    INPUT: HTMLInputElement,
    TEXTAREA: HTMLTextAreaElement,
    VIDEO: HTMLVideoElement,
    CANVAS: HTMLCanvasElement,
    SELECT: HTMLSelectElement,
    OPTION: HTMLOptionElement,
    'BUILTIN-COMPONENT': BuiltInComponent
  };
  var BUILTIN_COMPONENT_LIST = ['movable-view', 'cover-image', 'cover-view', 'movable-area', 'scroll-view', 'swiper', 'swiper-item', 'view', 'icon', 'progress', 'rich-text', 'text', 'button', 'checkbox', 'checkbox-group', 'editor', 'form', 'input', 'label', 'picker', 'picker-view', 'picker-view-column', 'radio', 'radio-group', 'slider', 'switch', 'textarea', 'functional-page-navigator', 'navigator', 'audio', 'camera', 'image', 'live-player', 'live-pusher', 'video', 'map', 'canvas', 'ad', 'official-account', 'open-data', 'web-view'];
  /**
   * Check this component is builtIn component
   * @param {string} tagName - component tag name
   * @return {boolean}
   */

  function checkIsBuiltInComponent(tagName) {
    return BUILTIN_COMPONENT_LIST.indexOf(tagName) > -1;
  }

  var Document = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(Document, _EventTarget);

    function Document(pageId, nodeIdMap) {
      var _this;

      _this = _EventTarget.call(this) || this;
      var config = cache.getConfig();
      var nativeCustomComponent = config.nativeCustomComponent || {};
      _this.usingComponents = nativeCustomComponent.usingComponents || {};
      _this.$_pageId = pageId; // Used to encapsulate special tag and corresponding constructors

      var that = assertThisInitialized(_this);

      _this.$_imageConstructor = function HTMLImageElement(width, height) {
        return Image.$$create({
          tagName: 'img',
          nodeId: "b-" + tool.getId(),
          attrs: {},
          width: width,
          height: height
        }, that.$_tree);
      };

      _this.$_pageId = pageId;
      _this.$_tree = new Tree(pageId, {
        type: 'element',
        tagName: 'body',
        attrs: {},
        unary: false,
        nodeId: 'e-body',
        children: []
      }, nodeIdMap, assertThisInitialized(_this));
      _this.$_config = null; // documentElement

      _this.$_node = _this.$$createElement({
        tagName: 'html',
        attrs: {},
        nodeId: "a-" + tool.getId(),
        type: Node.DOCUMENT_NODE
      }); // documentElement's parentNode is document

      _this.$_node.$$updateParent(assertThisInitialized(_this));

      _this.$_node.scrollTop = 0; // head

      _this.$_head = _this.createElement('head'); // update body's parentNode

      _this.$_tree.root.$$updateParent(_this.$_node);

      return _this;
    } // Image constructor


    var _proto = Document.prototype;

    // Event trigger
    _proto.$$trigger = function $$trigger(eventName, options) {
      this.documentElement.$$trigger(eventName, options);
    };

    _proto.$$createElement = function $$createElement(options, tree) {
      var originTagName = options.tagName;
      var tagName = originTagName.toUpperCase();
      var componentName = checkIsBuiltInComponent(originTagName) ? originTagName : null;
      tree = tree || this.$_tree;
      var constructorClass = CONSTRUCTOR_MAP[tagName];

      if (constructorClass) {
        return constructorClass.$$create(options, tree);
      } else if (componentName) {
        // Transform to builtin-component
        options.tagName = 'builtin-component';
        options.attrs = options.attrs || {};
        options.attrs.behavior = componentName;
        return BuiltInComponent.$$create(options, tree);
      } else if (this.usingComponents[originTagName]) {
        // Transform to custom-component
        options.tagName = 'custom-component';
        options.attrs = options.attrs || {};
        options.componentName = originTagName;
        return CustomComponent.$$create(options, tree);
      } else if (!tool.isTagNameSupport(tagName)) {
        return NotSupport.$$create(options, tree);
      } else {
        return Element.$$create(options, tree);
      }
    } // Create text node
    ;

    _proto.$$createTextNode = function $$createTextNode(options, tree) {
      return TextNode.$$create(options, tree || this.$_tree);
    } // Create comment node
    ;

    _proto.$$createComment = function $$createComment(options, tree) {
      return Comment.$$create(options, tree || this.$_tree);
    } // Node type
    ;

    _proto.getElementById = function getElementById(id) {
      if (typeof id !== 'string') return;
      return this.$_tree.getById(id) || null;
    };

    _proto.getElementsByTagName = function getElementsByTagName(tagName) {
      if (typeof tagName !== 'string') return [];
      return this.$_tree.getByTagName(tagName);
    };

    _proto.getElementsByClassName = function getElementsByClassName(className) {
      if (typeof className !== 'string') return [];
      return this.$_tree.getByClassName(className);
    };

    _proto.querySelector = function querySelector(selector) {
      if (typeof selector !== 'string') return;
      return this.$_tree.query(selector)[0] || null;
    };

    _proto.querySelectorAll = function querySelectorAll(selector) {
      if (typeof selector !== 'string') return [];
      return this.$_tree.query(selector);
    };

    _proto.createElement = function createElement(tagName) {
      if (typeof tagName !== 'string') return;
      tagName = tagName.trim();
      if (!tagName) return;
      return this.$$createElement({
        tagName: tagName,
        nodeId: "b-" + tool.getId()
      });
    };

    _proto.createElementNS = function createElementNS(ns, tagName) {
      // Actually use createElement
      return this.createElement(tagName);
    };

    _proto.createTextNode = function createTextNode(content) {
      content = '' + content;
      return this.$$createTextNode({
        content: content,
        nodeId: "b-" + tool.getId()
      });
    };

    _proto.createComment = function createComment() {
      // Ignore the incoming comment content
      return this.$$createComment({
        nodeId: "b-" + tool.getId()
      });
    };

    _proto.createDocumentFragment = function createDocumentFragment() {
      return Element.$$create({
        tagName: 'documentfragment',
        nodeId: "b-" + tool.getId(),
        nodeType: Node.DOCUMENT_FRAGMENT_NODE
      }, this.$_tree);
    };

    _proto.createEvent = function createEvent() {
      var window = cache.getWindow(this.$_pageId);
      return new window.CustomEvent();
    };

    _proto.addEventListener = function addEventListener(eventName, handler, options) {
      this.documentElement.addEventListener(eventName, handler, options);
    };

    _proto.removeEventListener = function removeEventListener(eventName, handler, isCapture) {
      this.documentElement.removeEventListener(eventName, handler, isCapture);
    };

    _proto.dispatchEvent = function dispatchEvent(evt) {
      this.documentElement.dispatchEvent(evt);
    };

    createClass(Document, [{
      key: "$$imageConstructor",
      get: function get() {
        return this.$_imageConstructor;
      }
    }, {
      key: "$$pageId",
      get: function get() {
        return this.$_pageId;
      }
    }, {
      key: "nodeType",
      get: function get() {
        return Node.DOCUMENT_NODE;
      }
    }, {
      key: "documentElement",
      get: function get() {
        return this.$_node;
      }
    }, {
      key: "body",
      get: function get() {
        return this.$_tree.root;
      }
    }, {
      key: "nodeName",
      get: function get() {
        return '#document';
      }
    }, {
      key: "head",
      get: function get() {
        return this.$_head;
      }
    }, {
      key: "defaultView",
      get: function get() {
        return cache.getWindow(this.$_pageId) || null;
      }
    }]);

    return Document;
  }(EventTarget);

  /*
   * Author: 卓文理
   * Email: zhuowenligg@gmail.com
   * Date: 2020-06-05 12:21:14
   */
  var Navigator = /*#__PURE__*/function () {
    function Navigator() {
      this.$_language = '';
      this.$_wxVersion = '';
      this.$_brand = ''; // 手机品牌

      this.$_model = ''; // 手机型号

      this.$_platform = '';
      this.$_system = ''; // 操作系统版本

      this.$_userAgent = '';
    }
    /**
     * 重置实例
     */


    var _proto = Navigator.prototype;

    _proto.$$reset = function $$reset(info) {
      this.$_language = info.language;
      this.$_wxVersion = info.version;
      this.$_brand = info.brand;
      this.$_model = info.model;
      this.$_platform = info.platform;
      this.$_system = info.system; // 拼装 userAgent

      var appVersion = '5.0';
      var appleWebKitVersion = '602.3.12';
      var platformContext;

      if (this.$_platform === 'ios') {
        // 拆分系统版本号
        var systemVersion = this.$_system.split(' ');

        if (systemVersion.length >= 2) {
          systemVersion = systemVersion[1].split('.').join('_');
        } else {
          systemVersion = '';
        }

        platformContext = this.$_brand + "; CPU " + this.$_brand + " OS " + systemVersion + " like Mac OS X";
      } else if (this.$_platform === 'android') {
        platformContext = "Linux; " + this.$_system + "; " + this.$_model;
      } else {
        // 在开发者工具上，默认在 windows x64 上运行
        platformContext = 'Windows NT 6.1; win64; x64';
      }

      this.$_userAgent = this.appCodeName + "/" + appVersion + " (" + platformContext + ") AppleWebKit/" + appleWebKitVersion + " (KHTML, like Gecko) Mobile MicroMessenger/" + this.$_wxVersion + " Language/" + this.language;
    }
    /**
     * 对外属性和方法
     */
    ;

    createClass(Navigator, [{
      key: "userAgent",
      get: function get() {
        return this.$_userAgent;
      }
    }, {
      key: "appCodeName",
      get: function get() {
        return 'Mozilla';
      }
    }, {
      key: "appName",
      get: function get() {
        return 'Netscape';
      }
    }, {
      key: "language",
      get: function get() {
        return this.$_language;
      }
    }, {
      key: "languages",
      get: function get() {
        return [this.$_language];
      }
    }, {
      key: "platform",
      get: function get() {
        return this.$_platform;
      }
    }, {
      key: "product",
      get: function get() {
        return 'Gecko';
      }
    }]);

    return Navigator;
  }();

  var Screen = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(Screen, _EventTarget);

    function Screen() {
      var _this;

      _this = _EventTarget.call(this) || this;
      _this.$_width = 0;
      _this.$_height = 0;
      return _this;
    }
    /**
     * 重置实例
     */


    var _proto = Screen.prototype;

    _proto.$$reset = function $$reset(info) {
      this.$_width = info.screenWidth;
      this.$_height = info.screenHeight;
    }
    /**
     * 对外属性和方法
     */
    ;

    createClass(Screen, [{
      key: "width",
      get: function get() {
        return this.$_width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.$_height;
      }
    }]);

    return Screen;
  }(EventTarget);

  var History = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(History, _EventTarget);

    function History(location) {
      var _this;

      _this = _EventTarget.call(this) || this;
      _this.$_location = location;
      _this.$_stack = [{
        state: null,
        title: '',
        url: location.href
      }];
      _this.$_currentIndex = 0;

      _this.$_location.addEventListener('$_addToHistory', function (evt) {
        _this.$_currentIndex++;
        _this.$_stack = _this.$_stack.slice(0, _this.$_currentIndex);

        _this.$_stack.push({
          state: null,
          title: '',
          url: evt.href
        });
      });

      return _this;
    }
    /**
     * 检查是否同源
     */


    var _proto = History.prototype;

    _proto.$_checkOrigin = function $_checkOrigin(url) {
      var _Location$$$parse = Location.$$parse(url),
          protocol = _Location$$$parse.protocol,
          hostname = _Location$$$parse.hostname,
          port = _Location$$$parse.port;

      return (!protocol || this.$_location.protocol === protocol) && (!hostname || this.$_location.hostname === hostname) && (!hostname && !port || this.$_location.port === port);
    }
    /**
     * 重置实例
     */
    ;

    _proto.$$reset = function $$reset() {
      this.$_stack = [{
        state: null,
        title: '',
        url: this.$_location.href
      }];
      this.$_currentIndex = 0;
    }
    /**
     * 对外属性和方法
     */
    ;

    _proto.back = function back() {
      this.go(-1);
    };

    _proto.forward = function forward() {
      this.go(1);
    };

    _proto.go = function go(delta) {
      if (typeof delta === 'number') {
        var next = this.$_currentIndex + delta;

        if (next >= 0 && next < this.$_stack.length && this.$_currentIndex !== next) {
          this.$_currentIndex = next; // 替换 href，但不做跳转（理论上此处应该做跳转，但是在小程序环境里不适合）

          this.$_location.$$startCheckHash();
          this.$_location.$$setHrefWithoutCheck(this.$_stack[this.$_currentIndex].url);
          this.$_location.$$endCheckHash(true); // 因为不跳转，所以要强制触发 hashchange 检测

          this.$$trigger('popstate', {
            event: {
              state: this.state
            }
          });
        }
      } else {
        // 刷新当前页面
        this.$_location.reload();
      }
    };

    _proto.pushState = function pushState(state, title, url) {
      if (state === void 0) {
        state = null;
      }

      if (!url || typeof url !== 'string') return;

      if (this.$_checkOrigin(url)) {
        // 同源才允许操作
        if (title && typeof title === 'string') {
          // 设置标题
          wx.setNavigationBarTitle({
            title: title
          });
        }

        this.$_currentIndex++;
        this.$_stack = this.$_stack.slice(0, this.$_currentIndex); // 替换 href，但不做跳转

        this.$_location.$$setHrefWithoutCheck(url);
        this.$_stack.push({
          state: state,
          title: title,
          url: this.$_location.href
        });
      }
    };

    _proto.replaceState = function replaceState(state, title, url) {
      if (state === void 0) {
        state = null;
      }

      if (!url || typeof url !== 'string') return;

      if (this.$_checkOrigin(url)) {
        // 同源才允许操作
        if (title && typeof title === 'string') {
          // 设置标题
          wx.setNavigationBarTitle({
            title: title
          });
        } // 替换 href，但不做跳转


        this.$_location.$$setHrefWithoutCheck(url);
        this.$_stack.splice(this.$_currentIndex, 1, {
          state: state,
          title: title,
          url: this.$_location.href
        });
      }
    };

    createClass(History, [{
      key: "state",
      get: function get() {
        var current = this.$_stack[this.$_currentIndex];
        return current && current.state || null;
      }
    }, {
      key: "length",
      get: function get() {
        return this.$_stack.length;
      }
    }]);

    return History;
  }(EventTarget);

  function _createForOfIteratorHelperLoose$7(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$7(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }

  function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var pageUrlRouteMap = null;

  var miniapp = /*#__PURE__*/function () {
    function miniapp(pageId) {
      this.$_pageId = pageId;
      this.$_pageUrl = ''; // 页面真实 url

      this.$_subpackagesMap = {}; // 分包名映射表
    }

    var _proto = miniapp.prototype;

    /**
     * 初始化
     */
    _proto.init = function init(url) {
      if (typeof url === 'string') this.$_pageUrl = url; // 设置真实 url

      var _cache$getConfig = cache.getConfig(),
          origin = _cache$getConfig.origin,
          entry = _cache$getConfig.entry,
          router = _cache$getConfig.router,
          _cache$getConfig$runt = _cache$getConfig.runtime,
          runtime = _cache$getConfig$runt === void 0 ? {} : _cache$getConfig$runt;

      var subpackagesMap = runtime.subpackagesMap || {};
      this.$_pageUrl = this.$_pageUrl || origin + entry;
      this.$_subpackagesMap = subpackagesMap;
      this.window.location.$$reset(this.$_pageUrl);
      this.window.history.$$reset();

      if (!pageUrlRouteMap) {
        // 需要初始化页面 url - 小程序页面路由映射表
        pageUrlRouteMap = {};
        Object.keys(router).forEach(function (pageName) {
          var regexpList = [];
          router[pageName].forEach(function (pathObj) {
            // 构造正则表达式
            var regexp = new RegExp(pathObj.regexp, pathObj.options);
            regexpList.push(regexp);
          }); // 将每个页面的路由改造成函数，方便后续做匹配用

          pageUrlRouteMap[pageName] = function (pathname) {
            for (var _iterator = _createForOfIteratorHelperLoose$7(regexpList), _step; !(_step = _iterator()).done;) {
              var regexp = _step.value;
              var parseRes = regexp.exec(pathname);
              regexp.lastIndex = 0;

              if (parseRes) {
                // 匹配成功
                var packageName = subpackagesMap[pageName];
                return "/" + (packageName ? packageName + '/' : '') + "pages/" + pageName + "/index";
              }
            }

            return null;
          };
        });
      }
    }
    /**
     * 需要匹配对应路由的 route
     */
    ;

    _proto.getMatchRoute = function getMatchRoute(pathname) {
      var keys = Object.keys(pageUrlRouteMap);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        var matchRes = pageUrlRouteMap[key](pathname);
        if (matchRes) return matchRes; // 匹配成功
      }

      return null;
    }
    /**
     * 判断是否 tabBar 页面
     */
    ;

    _proto.isTabBarPage = function isTabBarPage(pageRoute) {
      var _cache$getConfig2 = cache.getConfig(),
          _cache$getConfig2$run = _cache$getConfig2.runtime,
          runtime = _cache$getConfig2$run === void 0 ? {} : _cache$getConfig2$run;

      var tabBarMap = runtime.tabBarMap || {};
      return !!tabBarMap[pageRoute];
    };

    createClass(miniapp, [{
      key: "window",
      get: function get() {
        return cache.getWindow(this.$_pageId) || null;
      }
    }, {
      key: "document",
      get: function get() {
        return cache.getDocument(this.$_pageId) || null;
      }
    }, {
      key: "config",
      get: function get() {
        return cache.getConfig();
      }
    }, {
      key: "subpackagesMap",
      get: function get() {
        return this.$_subpackagesMap;
      }
    }]);

    return miniapp;
  }();

  var LocalStorage = /*#__PURE__*/function () {
    function LocalStorage(window) {
      this.$_keys = [];
      this.$_window = window;
    }
    /**
     * 更新 storage 信息
     */


    var _proto = LocalStorage.prototype;

    _proto.$_updateInfo = function $_updateInfo() {
      try {
        var info = wx.getStorageInfoSync();
        var pages = getCurrentPages() || [];
        pages.forEach(function (page) {
          if (page && page.window) {
            page.window.localStorage.$$keys = info.keys;
          }
        });
      } catch (err) {
        console.warn('getStorageInfoSync fail');
      }
    }
    /**
     * 触发 window 的 storage 事件
     */
    ;

    _proto.$_triggerStorage = function $_triggerStorage(key, newValue, oldValue, force) {
      var _this = this;

      if (!force && newValue === oldValue) return;
      var pages = getCurrentPages() || [];
      pages.forEach(function (page) {
        if (page && page.window && page.window !== _this.$_window) {
          page.window.$$trigger('storage', {
            event: new Event({
              name: 'storage',
              target: page.window,
              $$extra: {
                key: key,
                newValue: newValue,
                oldValue: oldValue,
                storageArea: _this,
                url: _this.$_window.location.href
              }
            })
          });
        }
      });
    };

    _proto.key = function key(num) {
      if (typeof num !== 'number' || !isFinite(num) || num < 0) return null;
      return this.$_keys[num] || null;
    };

    _proto.getItem = function getItem(key) {
      if (!key || typeof key !== 'string') return null;
      return wx.getStorageSync(key) || null;
    };

    _proto.setItem = function setItem(key, data) {
      if (!key || typeof key !== 'string') return;
      data = '' + data;
      var oldValue = wx.getStorageSync(key) || null;
      wx.setStorageSync(key, data);
      this.$_updateInfo();
      this.$_triggerStorage(key, data, oldValue);
    };

    _proto.removeItem = function removeItem(key) {
      if (!key || typeof key !== 'string') return;
      var oldValue = wx.getStorageSync(key) || null;
      wx.removeStorageSync(key);
      this.$_updateInfo();
      this.$_triggerStorage(key, null, oldValue);
    };

    _proto.clear = function clear() {
      wx.clearStorageSync();
      this.$_updateInfo();
      this.$_triggerStorage(null, null, null, true);
    };

    createClass(LocalStorage, [{
      key: "$$keys",
      set: function set(keys) {
        this.$_keys = keys;
      }
      /**
       * 对外属性和方法
       */

    }, {
      key: "length",
      get: function get() {
        return this.$_keys && this.$_keys.length || 0;
      }
    }]);

    return LocalStorage;
  }();

  var SessionStorage = /*#__PURE__*/function () {
    function SessionStorage(window) {
      this.$_keys = [];
      this.$_map = {};
      this.$_window = window;
    }
    /**
     * 触发 window 的 storage 事件
     */


    var _proto = SessionStorage.prototype;

    _proto.$_triggerStorage = function $_triggerStorage(key, newValue, oldValue, force) {
      var _this = this;

      if (!force && newValue === oldValue) return;
      var pages = getCurrentPages() || [];
      pages.forEach(function (page) {
        if (page && page.window && page.window !== _this.$_window) {
          page.window.$$trigger('storage', {
            event: new Event({
              name: 'storage',
              target: page.window,
              $$extra: {
                key: key,
                newValue: newValue,
                oldValue: oldValue,
                storageArea: _this,
                url: _this.$_window.location.href
              }
            })
          });
        }
      });
    }
    /**
     * 对外属性和方法
     */
    ;

    _proto.key = function key(num) {
      if (typeof num !== 'number' || !isFinite(num) || num < 0) return null;
      return this.$_keys[num] || null;
    };

    _proto.getItem = function getItem(key) {
      if (!key || typeof key !== 'string') return null;
      return this.$_map[key] || null;
    };

    _proto.setItem = function setItem(key, data) {
      if (!key || typeof key !== 'string') return;
      data = '' + data;
      var oldValue = this.$_map[key] || null;
      this.$_map[key] = data; // 调整顺序

      var index = this.$_keys.indexOf(key);
      if (index >= 0) this.$_keys.splice(index, 1);
      this.$_keys.push(key);
      this.$_triggerStorage(key, data, oldValue);
    };

    _proto.removeItem = function removeItem(key) {
      if (!key || typeof key !== 'string') return;
      var oldValue = this.$_map[key] || null;
      delete this.$_map[key]; // 删除 key

      var index = this.$_keys.indexOf(key);
      if (index >= 0) this.$_keys.splice(index, 1);
      this.$_triggerStorage(key, null, oldValue);
    };

    _proto.clear = function clear() {
      var _this2 = this;

      this.$_keys.forEach(function (key) {
        delete _this2.$_map[key];
      });
      this.$_keys.length = 0;
      this.$_triggerStorage(null, null, null, true);
    };

    createClass(SessionStorage, [{
      key: "length",
      get: function get() {
        return this.$_keys.length;
      }
    }]);

    return SessionStorage;
  }();

  /*
   * Author: 卓文理
   * Email: zhuowenligg@gmail.com
   * Date: 2020-06-05 12:21:14
   */
  var Performance = /*#__PURE__*/function () {
    function Performance(timeOrigin) {
      this.$_timeOrigin = timeOrigin;
    }
    /**
     * 对外属性和方法
     */


    var _proto = Performance.prototype;

    _proto.now = function now() {
      return +new Date() - this.$_timeOrigin;
    };

    createClass(Performance, [{
      key: "navigation",
      get: function get() {
        console.warn('performance.navigation is not supported');
        return null;
      }
    }, {
      key: "timing",
      get: function get() {
        console.warn('performance.timing is not supported');
        return null;
      }
    }, {
      key: "timeOrigin",
      get: function get() {
        return this.$_timeOrigin;
      }
    }]);

    return Performance;
  }();

  var SUPPORT_METHOD = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];
  var STATUS_TEXT_MAP = {
    100: 'Continue',
    101: 'Switching protocols',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Suitable',
    417: 'Expectation Failed',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported'
  };

  var XMLHttpRequest = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(XMLHttpRequest, _EventTarget);

    function XMLHttpRequest(window) {
      var _this;

      _this = _EventTarget.call(this) || this;
      _this.$_window = window;
      _this.$_method = '';
      _this.$_url = '';
      _this.$_data = null;
      _this.$_status = 0;
      _this.$_statusText = '';
      _this.$_readyState = XMLHttpRequest.UNSENT;
      _this.$_header = {
        Accept: '*/*'
      };
      _this.$_responseType = '';
      _this.$_resHeader = null;
      _this.$_response = null;
      _this.$_timeout = 0;
      _this.$_startTime = null;
      _this.$_requestTask = null;
      _this.$_requestSuccess = _this.$_requestSuccess.bind(assertThisInitialized(_this));
      _this.$_requestFail = _this.$_requestFail.bind(assertThisInitialized(_this));
      _this.$_requestComplete = _this.$_requestComplete.bind(assertThisInitialized(_this));
      return _this;
    }
    /**
    * readyState 变化
    */


    var _proto = XMLHttpRequest.prototype;

    _proto.$_callReadyStateChange = function $_callReadyStateChange(readyState) {
      var hasChange = readyState !== this.$_readyState;
      this.$_readyState = readyState;
      if (hasChange) this.$$trigger('readystatechange');
    }
    /**
    * 执行请求
    */
    ;

    _proto.$_callRequest = function $_callRequest() {
      var _this2 = this;

      if (this.$_timeout) {
        this.$_startTime = +new Date();
        setTimeout(function () {
          if (!_this2.$_status && _this2.$_readyState !== XMLHttpRequest.DONE) {
            // 超时
            if (_this2.$_requestTask) _this2.$_requestTask.abort();

            _this2.$_callReadyStateChange(XMLHttpRequest.DONE);

            _this2.$$trigger('timeout');
          }
        }, this.$_timeout);
      } // 重置各种状态


      this.$_status = 0;
      this.$_statusText = '';
      this.$_readyState = XMLHttpRequest.OPENED;
      this.$_resHeader = null;
      this.$_response = null; // 头信息

      var header = Object.assign({}, this.$_header);

      if (this.$_window) {
        header.cookie = this.$_window.document.$$cookie;
      } // 补完 url


      var url = this.$_url;
      url = url.indexOf('//') === -1 ? this.$_window.location.origin + url : url;
      this.$_requestTask = wx.request({
        url: url,
        data: this.$_data || {},
        header: header,
        method: this.$_method,
        dataType: this.$_responseType === 'json' ? 'json' : 'text',
        responseType: this.$_responseType === 'arraybuffer' ? 'arraybuffer' : 'text',
        success: this.$_requestSuccess,
        fail: this.$_requestFail,
        complete: this.$_requestComplete
      });
    }
    /**
    * 请求成功
    */
    ;

    _proto.$_requestSuccess = function $_requestSuccess(_ref) {
      var data = _ref.data,
          statusCode = _ref.statusCode,
          header = _ref.header;
      this.$_status = statusCode;
      this.$_resHeader = header;
      this.$_callReadyStateChange(XMLHttpRequest.HEADERS_RECEIVED); // 处理 set-cookie

      if (this.$_window) {
        var setCookie = header['Set-Cookie'];

        if (setCookie && typeof setCookie === 'string') {
          this.$_window.document.$$setCookie(setCookie);
        }
      } // 处理返回数据


      if (data) {
        this.$_callReadyStateChange(XMLHttpRequest.LOADING);
        this.$$trigger('loadstart');
        this.$_response = data;
        this.$$trigger('loadend');
      }
    }
    /**
    * 请求失败
    */
    ;

    _proto.$_requestFail = function $_requestFail(_ref2) {
      var errMsg = _ref2.errMsg;
      this.$_status = 0;
      this.$_statusText = errMsg;
      this.$$trigger('error');
    }
    /**
    * 请求完成
    */
    ;

    _proto.$_requestComplete = function $_requestComplete() {
      this.$_startTime = null;
      this.$_requestTask = null;
      this.$_callReadyStateChange(XMLHttpRequest.DONE);

      if (this.$_status) {
        this.$$trigger('load');
      }
    }
    /**
    * 对外属性和方法
    */
    ;

    _proto.abort = function abort() {
      if (this.$_requestTask) {
        this.$_requestTask.abort();
        this.$$trigger('abort');
      }
    };

    _proto.getAllResponseHeaders = function getAllResponseHeaders() {
      var _this3 = this;

      if (this.$_readyState === XMLHttpRequest.UNSENT || this.$_readyState === XMLHttpRequest.OPENED || !this.$_resHeader) return '';
      return Object.keys(this.$_resHeader).map(function (key) {
        return key + ": " + _this3.$_resHeader[key];
      }).join('\r\n');
    };

    _proto.getResponseHeader = function getResponseHeader(name) {
      if (this.$_readyState === XMLHttpRequest.UNSENT || this.$_readyState === XMLHttpRequest.OPENED || !this.$_resHeader) return null; // 处理大小写不敏感

      var key = Object.keys(this.$_resHeader).find(function (item) {
        return item.toLowerCase() === name.toLowerCase();
      });
      var value = key ? this.$_resHeader[key] : null;
      return typeof value === 'string' ? value : null;
    };

    _proto.open = function open(method, url) {
      if (typeof method === 'string') method = method.toUpperCase();
      if (SUPPORT_METHOD.indexOf(method) < 0) return;
      if (!url || typeof url !== 'string') return;
      this.$_method = method;
      this.$_url = url;
      this.$_callReadyStateChange(XMLHttpRequest.OPENED);
    };

    _proto.setRequestHeader = function setRequestHeader(header, value) {
      if (typeof header === 'string' && typeof value === 'string') {
        this.$_header[header] = value;
      }
    };

    _proto.send = function send(data) {
      if (this.$_readyState !== XMLHttpRequest.OPENED) return;
      this.$_data = data;
      this.$_callRequest();
    };

    createClass(XMLHttpRequest, [{
      key: "timeout",
      get: function get() {
        return this.$_timeout;
      },
      set: function set(timeout) {
        if (typeof timeout !== 'number' || !isFinite(timeout) || timeout <= 0) return;
        this.$_timeout = timeout;
      }
    }, {
      key: "status",
      get: function get() {
        return this.$_status;
      }
    }, {
      key: "statusText",
      get: function get() {
        if (this.$_readyState === XMLHttpRequest.UNSENT || this.$_readyState === XMLHttpRequest.OPENED) return '';
        return STATUS_TEXT_MAP[this.$_status + ''] || this.$_statusText || '';
      }
    }, {
      key: "readyState",
      get: function get() {
        return this.$_readyState;
      }
    }, {
      key: "responseType",
      get: function get() {
        return this.$_responseType;
      },
      set: function set(value) {
        if (typeof value !== 'string') return;
        this.$_responseType = value;
      }
    }, {
      key: "responseText",
      get: function get() {
        if (!this.$_responseType || this.$_responseType === 'text') {
          return this.$_response;
        }

        return null;
      }
    }, {
      key: "response",
      get: function get() {
        return this.$_response;
      }
    }]);

    return XMLHttpRequest;
  }(EventTarget);

  XMLHttpRequest.UNSENT = 0;
  XMLHttpRequest.OPENED = 1;
  XMLHttpRequest.HEADERS_RECEIVED = 2;
  XMLHttpRequest.LOADING = 3;
  XMLHttpRequest.DONE = 4;

  function _createForOfIteratorHelperLoose$8(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$8(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }

  function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var lastRafTime = 0;
  var subscribeMap = {};
  var globalObject = {};
  var WINDOW_PROTOTYPE_MAP = {
    location: Location.prototype,
    navigator: Navigator.prototype,
    performance: Performance.prototype,
    screen: Screen.prototype,
    history: History.prototype,
    localStorage: LocalStorage.prototype,
    sessionStorage: SessionStorage.prototype,
    event: Event.prototype
  };
  var ELEMENT_PROTOTYPE_MAP = {
    attribute: Attribute.prototype,
    classList: ClassList.prototype,
    style: Style.prototype
  };

  var Window = /*#__PURE__*/function (_EventTarget) {
    inheritsLoose(Window, _EventTarget);

    function Window(pageId) {
      var _this;

      _this = _EventTarget.call(this) || this;
      var timeOrigin = +new Date();

      var that = assertThisInitialized(_this);

      _this.$_pageId = pageId;
      _this.$_outerHeight = 0;
      _this.$_outerWidth = 0;
      _this.$_innerHeight = 0;
      _this.$_innerWidth = 0;
      _this.$_location = new Location(pageId);
      _this.$_navigator = new Navigator();
      _this.$_screen = new Screen();
      _this.$_history = new History(_this.$_location);
      _this.$_miniapp = new miniapp(pageId);
      _this.$_localStorage = new LocalStorage(assertThisInitialized(_this));
      _this.$_sessionStorage = new SessionStorage(assertThisInitialized(_this));
      _this.$_performance = new Performance(timeOrigin);
      _this.$_nowFetchingWebviewInfoPromise = null; // 正在拉取 webview 端信息的 promise 实例

      _this.$_fetchDeviceInfo();

      _this.$_initInnerEvent();

      _this.$_elementConstructor = function HTMLElement() {
        return Element.$$create.apply(Element, arguments);
      };

      _this.$_customEventConstructor = /*#__PURE__*/function (_OriginalCustomEvent) {
        inheritsLoose(CustomEvent, _OriginalCustomEvent);

        function CustomEvent(name, options) {
          if (name === void 0) {
            name = '';
          }

          if (options === void 0) {
            options = {};
          }

          options.timeStamp = +new Date() - timeOrigin;
          return _OriginalCustomEvent.call(this, name, options) || this;
        }

        return CustomEvent;
      }(CustomEvent);

      _this.$_xmlHttpRequestConstructor = /*#__PURE__*/function (_OriginalXMLHttpReque) {
        inheritsLoose(XMLHttpRequest, _OriginalXMLHttpReque);

        function XMLHttpRequest() {
          return _OriginalXMLHttpReque.call(this, that) || this;
        }

        return XMLHttpRequest;
      }(XMLHttpRequest); // React environment compatibility


      _this.HTMLIFrameElement = function () {};

      return _this;
    }
    /**
     * 初始化内部事件
     */


    var _proto = Window.prototype;

    _proto.$_initInnerEvent = function $_initInnerEvent() {
      var _this2 = this;

      // 监听 location 的事件
      this.$_location.addEventListener('hashchange', function (_ref) {
        var oldURL = _ref.oldURL,
            newURL = _ref.newURL;

        _this2.$$trigger('hashchange', {
          event: new Event({
            name: 'hashchange',
            target: _this2,
            eventPhase: Event.AT_TARGET,
            $$extra: {
              oldURL: oldURL,
              newURL: newURL
            }
          }),
          currentTarget: _this2
        });
      }); // 监听 history 的事件

      this.$_history.addEventListener('popstate', function (_ref2) {
        var state = _ref2.state;

        _this2.$$trigger('popstate', {
          event: new Event({
            name: 'popstate',
            target: _this2,
            eventPhase: Event.AT_TARGET,
            $$extra: {
              state: state
            }
          }),
          currentTarget: _this2
        });
      }); // 监听滚动事件

      this.addEventListener('scroll', function () {
        var document = _this2.document; // 记录最近一次滚动事件触发的时间戳

        if (document) document.documentElement.$$scrollTimeStamp = +new Date();
      });
    }
    /**
     * 拉取设备参数
     */
    ;

    _proto.$_fetchDeviceInfo = function $_fetchDeviceInfo() {
      try {
        var info = my.getSystemInfoSync();
        this.$_outerHeight = info.screenHeight;
        this.$_outerWidth = info.screenWidth;
        this.$_innerHeight = info.windowHeight;
        this.$_innerWidth = info.windowWidth;
        this.$_screen.$$reset(info);
        this.$_navigator.$$reset(info);
      } catch (err) {// ignore
      }
    }
    /**
     * 拉取处理切面必要的信息
     */
    ;

    _proto.$_getAspectInfo = function $_getAspectInfo(descriptor) {
      if (!descriptor || typeof descriptor !== 'string') return;
      descriptor = descriptor.split('.');
      var main = descriptor[0];
      var sub = descriptor[1];
      var method = descriptor[1];
      var type = descriptor[2];
      var prototype; // Find object prototypes

      if (main === 'window') {
        if (WINDOW_PROTOTYPE_MAP[sub]) {
          prototype = WINDOW_PROTOTYPE_MAP[sub];
          method = type;
          type = descriptor[3];
        } else {
          prototype = Window.prototype;
        }
      } else if (main === 'document') {
        prototype = Document.prototype;
      } else if (main === 'element') {
        if (ELEMENT_PROTOTYPE_MAP[sub]) {
          prototype = ELEMENT_PROTOTYPE_MAP[sub];
          method = type;
          type = descriptor[3];
        } else {
          prototype = Element.prototype;
        }
      } else if (main === 'textNode') {
        prototype = TextNode.prototype;
      } else if (main === 'comment') {
        prototype = Comment.prototype;
      }

      return {
        prototype: prototype,
        method: method,
        type: type
      };
    }
    /**
     * 暴露给小程序用的对象
     */
    ;

    /**
     * 销毁实例
     */
    _proto.$$destroy = function $$destroy() {
      _EventTarget.prototype.$$destroy.call(this);

      var pageId = this.$_pageId;
      Object.keys(subscribeMap).forEach(function (name) {
        var handlersMap = subscribeMap[name];
        if (handlersMap[pageId]) handlersMap[pageId] = null;
      });
    }
    /**
     * 小程序端的 getComputedStyle 实现
     * https://developers.weixin.qq.com/miniapp/dev/api/wxml/NodesRef.fields.html
     * https://miniapp.open.taobao.com/docV3.htm?source=search&docId=1009&docType=20
     */
    ;

    _proto.$$getComputedStyle = function $$getComputedStyle(dom, computedStyle) {
      var _this3 = this;

      if (computedStyle === void 0) {
        computedStyle = [];
      }

      tool.flushThrottleCache(); // 先清空 setData

      return new Promise(function (resolve, reject) {
        if (dom.tagName === 'BODY') {
          _this3.$$createSelectorQuery().select('.miniapp-root').fields({
            computedStyle: computedStyle
          }, function (res) {
            return res ? resolve(res) : reject();
          }).exec();
        } else {
          _this3.$$createSelectorQuery().select(".miniapp-root >>> .node-" + dom.$$nodeId).fields({
            computedStyle: computedStyle
          }, function (res) {
            return res ? resolve(res) : reject();
          }).exec();
        }
      });
    }
    /**
     * 强制清空 setData 缓存
     */
    ;

    _proto.$$forceRender = function $$forceRender() {
      tool.flushThrottleCache();
    }
    /**
     * 触发节点事件
     */
    ;

    _proto.$$trigger = function $$trigger(eventName, options) {
      var _this4 = this;

      if (options === void 0) {
        options = {};
      }

      if (eventName === 'error' && typeof options.event === 'string') {
        var errStack = options.event;
        var errLines = errStack.split('\n');
        var message = '';

        for (var i = 0, len = errLines.length; i < len; i++) {
          var line = errLines[i];

          if (line.trim().indexOf('at') !== 0) {
            message += line + '\n';
          } else {
            break;
          }
        }

        var error = new Error(message);
        error.stack = errStack;
        options.event = new this.$_customEventConstructor('error', {
          target: this,
          $$extra: {
            message: message,
            filename: '',
            lineno: 0,
            colno: 0,
            error: error
          }
        });
        options.args = [message, error]; // window.onerror 比较特殊，需要调整参数

        if (typeof this.onerror === 'function' && !this.onerror.$$isOfficial) {
          var oldOnError = this.onerror;

          this.onerror = function (event, message, error) {
            oldOnError.call(_this4, message, '', 0, 0, error);
          };

          this.onerror.$$isOfficial = true;
        }
      }

      _EventTarget.prototype.$$trigger.call(this, eventName, options);
    }
    /**
     * 获取原型
     */
    ;

    _proto.$$getPrototype = function $$getPrototype(descriptor) {
      if (!descriptor || typeof descriptor !== 'string') return;
      descriptor = descriptor.split('.');
      var main = descriptor[0];
      var sub = descriptor[1];

      if (main === 'window') {
        if (WINDOW_PROTOTYPE_MAP[sub]) {
          return WINDOW_PROTOTYPE_MAP[sub];
        } else if (!sub) {
          return Window.prototype;
        }
      } else if (main === 'document') {
        if (!sub) {
          return Document.prototype;
        }
      } else if (main === 'element') {
        if (ELEMENT_PROTOTYPE_MAP[sub]) {
          return ELEMENT_PROTOTYPE_MAP[sub];
        } else if (!sub) {
          return Element.prototype;
        }
      } else if (main === 'textNode') {
        if (!sub) {
          return TextNode.prototype;
        }
      } else if (main === 'comment') {
        if (!sub) {
          return Comment.prototype;
        }
      }
    }
    /**
     * 扩展 dom/bom 对象
     */
    ;

    _proto.$$extend = function $$extend(descriptor, options) {
      if (!descriptor || !options || typeof descriptor !== 'string' || typeof options !== 'object') return;
      var prototype = this.$$getPrototype(descriptor);
      var keys = Object.keys(options);
      if (prototype) keys.forEach(function (key) {
        return prototype[key] = options[key];
      });
    }
    /**
     * 对 dom/bom 对象方法追加切面方法
     */
    ;

    _proto.$$addAspect = function $$addAspect(descriptor, func) {
      if (!descriptor || !func || typeof descriptor !== 'string' || typeof func !== 'function') return;

      var _this$$_getAspectInfo = this.$_getAspectInfo(descriptor),
          prototype = _this$$_getAspectInfo.prototype,
          method = _this$$_getAspectInfo.method,
          type = _this$$_getAspectInfo.type; // Processing section


      if (prototype && method && type) {
        var methodInPrototype = prototype[method];
        if (typeof methodInPrototype !== 'function') return;

        if (!methodInPrototype.$$isHook) {
          prototype[method] = function () {
            var beforeFuncs = prototype[method].$$before || [];
            var afterFuncs = prototype[method].$$after || [];

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            if (beforeFuncs.length) {
              for (var _iterator = _createForOfIteratorHelperLoose$8(beforeFuncs), _step; !(_step = _iterator()).done;) {
                var beforeFunc = _step.value;
                var isStop = beforeFunc.apply(this, args);
                if (isStop) return;
              }
            }

            var res = methodInPrototype.apply(this, args);

            if (afterFuncs.length) {
              for (var _iterator2 = _createForOfIteratorHelperLoose$8(afterFuncs), _step2; !(_step2 = _iterator2()).done;) {
                var afterFunc = _step2.value;
                afterFunc.call(this, res);
              }
            }

            return res;
          };

          prototype[method].$$isHook = true;
          prototype[method].$$originalMethod = methodInPrototype;
        } // Append the section method


        if (type === 'before') {
          prototype[method].$$before = prototype[method].$$before || [];
          prototype[method].$$before.push(func);
        } else if (type === 'after') {
          prototype[method].$$after = prototype[method].$$after || [];
          prototype[method].$$after.push(func);
        }
      }
    }
    /**
     * 删除对 dom/bom 对象方法追加前置/后置处理
     */
    ;

    _proto.$$removeAspect = function $$removeAspect(descriptor, func) {
      if (!descriptor || !func || typeof descriptor !== 'string' || typeof func !== 'function') return;

      var _this$$_getAspectInfo2 = this.$_getAspectInfo(descriptor),
          prototype = _this$$_getAspectInfo2.prototype,
          method = _this$$_getAspectInfo2.method,
          type = _this$$_getAspectInfo2.type;

      if (prototype && method && type) {
        var methodInPrototype = prototype[method];
        if (typeof methodInPrototype !== 'function' || !methodInPrototype.$$isHook) return;

        if (type === 'before' && methodInPrototype.$$before) {
          methodInPrototype.$$before.splice(methodInPrototype.$$before.indexOf(func), 1);
        } else if (type === 'after' && methodInPrototype.$$after) {
          methodInPrototype.$$after.splice(methodInPrototype.$$after.indexOf(func), 1);
        }

        if ((!methodInPrototype.$$before || !methodInPrototype.$$before.length) && (!methodInPrototype.$$after || !methodInPrototype.$$after.length)) {
          prototype[method] = methodInPrototype.$$originalMethod;
        }
      }
    }
    /**
     * 订阅广播事件
     */
    ;

    _proto.$$subscribe = function $$subscribe(name, handler) {
      if (typeof name !== 'string' || typeof handler !== 'function') return;
      var pageId = this.$_pageId;
      subscribeMap[name] = subscribeMap[name] || {};
      subscribeMap[name][pageId] = subscribeMap[name][pageId] || [];
      subscribeMap[name][pageId].push(handler);
    }
    /**
     * 取消订阅广播事件
     */
    ;

    _proto.$$unsubscribe = function $$unsubscribe(name, handler) {
      var pageId = this.$_pageId;
      if (typeof name !== 'string' || !subscribeMap[name] || !subscribeMap[name][pageId]) return;
      var handlers = subscribeMap[name][pageId];

      if (!handler) {
        // 取消所有 handler 的订阅
        handlers.length = 0;
      } else if (typeof handler === 'function') {
        var index = handlers.indexOf(handler);
        if (index !== -1) handlers.splice(index, 1);
      }
    }
    /**
     * 发布广播事件
     */
    ;

    _proto.$$publish = function $$publish(name, data) {
      if (typeof name !== 'string' || !subscribeMap[name]) return;
      Object.keys(subscribeMap[name]).forEach(function (pageId) {
        var handlers = subscribeMap[name][pageId];

        if (handlers && handlers.length) {
          handlers.forEach(function (handler) {
            if (typeof handler !== 'function') return;

            try {
              handler.call(null, data);
            } catch (err) {
              console.error(err);
            }
          });
        }
      });
    }
    /**
     * 对外属性和方法
     */
    ;

    _proto.open = function open(url) {
      // 不支持 windowName 和 windowFeatures
      this.location.$$open(url);
    };

    _proto.close = function close() {
      my.navigateBack({
        delta: 1
      });
    };

    _proto.getComputedStyle = function getComputedStyle() {
      // 不作任何实现，只作兼容使用
      console.warn('window.getComputedStyle is not supported, please use window.$$getComputedStyle instead of it');
      return {
        // vue transition 组件使用
        transitionDelay: '',
        transitionDuration: '',
        animationDelay: '',
        animationDuration: ''
      };
    };

    _proto.requestAnimationFrame = function requestAnimationFrame(callback) {
      if (typeof callback !== 'function') return;
      var now = new Date();
      var nextRafTime = Math.max(lastRafTime + 16, now);
      return setTimeout(function () {
        callback(nextRafTime);
        lastRafTime = nextRafTime;
      }, nextRafTime - now);
    };

    _proto.cancelAnimationFrame = function cancelAnimationFrame(timeId) {
      return clearTimeout(timeId);
    };

    createClass(Window, [{
      key: "$$miniapp",
      get: function get() {
        return this.$_miniapp;
      }
      /**
       * 获取全局共享对象
       */

    }, {
      key: "$$global",
      get: function get() {
        return globalObject;
      }
    }, {
      key: "document",
      get: function get() {
        return cache.getDocument(this.$_pageId) || null;
      }
    }, {
      key: "location",
      get: function get() {
        return this.$_location;
      },
      set: function set(href) {
        this.$_location.href = href;
      }
    }, {
      key: "navigator",
      get: function get() {
        return this.$_navigator;
      }
    }, {
      key: "CustomEvent",
      get: function get() {
        return this.$_customEventConstructor;
      }
    }, {
      key: "self",
      get: function get() {
        return this;
      }
    }, {
      key: "localStorage",
      get: function get() {
        return this.$_localStorage;
      }
    }, {
      key: "sessionStorage",
      get: function get() {
        return this.$_sessionStorage;
      }
    }, {
      key: "screen",
      get: function get() {
        return this.$_screen;
      }
    }, {
      key: "history",
      get: function get() {
        return this.$_history;
      }
    }, {
      key: "outerHeight",
      get: function get() {
        return this.$_outerHeight;
      }
    }, {
      key: "outerWidth",
      get: function get() {
        return this.$_outerWidth;
      }
    }, {
      key: "innerHeight",
      get: function get() {
        return this.$_innerHeight;
      }
    }, {
      key: "innerWidth",
      get: function get() {
        return this.$_innerWidth;
      }
    }, {
      key: "Image",
      get: function get() {
        return this.document.$$imageConstructor;
      }
    }, {
      key: "setTimeout",
      get: function get() {
        return setTimeout.bind(null);
      }
    }, {
      key: "clearTimeout",
      get: function get() {
        return clearTimeout.bind(null);
      }
    }, {
      key: "setInterval",
      get: function get() {
        return setInterval.bind(null);
      }
    }, {
      key: "clearInterval",
      get: function get() {
        return clearInterval.bind(null);
      }
    }, {
      key: "HTMLElement",
      get: function get() {
        return this.$_elementConstructor;
      }
    }, {
      key: "Element",
      get: function get() {
        return Element;
      }
    }, {
      key: "Node",
      get: function get() {
        return Node;
      }
    }, {
      key: "RegExp",
      get: function get() {
        return RegExp;
      }
    }, {
      key: "Math",
      get: function get() {
        return Math;
      }
    }, {
      key: "Number",
      get: function get() {
        return Number;
      }
    }, {
      key: "Boolean",
      get: function get() {
        return Boolean;
      }
    }, {
      key: "String",
      get: function get() {
        return String;
      }
    }, {
      key: "Date",
      get: function get() {
        return Date;
      }
    }, {
      key: "Symbol",
      get: function get() {
        return Symbol;
      }
    }, {
      key: "parseInt",
      get: function get() {
        return parseInt;
      }
    }, {
      key: "parseFloat",
      get: function get() {
        return parseFloat;
      }
    }, {
      key: "performance",
      get: function get() {
        return this.$_performance;
      }
    }, {
      key: "SVGElement",
      get: function get() {
        // 不作任何实现，只作兼容使用
        console.warn('window.SVGElement is not supported');
        return function () {};
      }
    }, {
      key: "XMLHttpRequest",
      get: function get() {
        return this.$_xmlHttpRequestConstructor;
      }
    }]);

    return Window;
  }(EventTarget);

  var index = {
    createPage: function createPage(route, config) {
      if (config) cache.setConfig(config);
      var pageId = "p-" + tool.getId() + "-/" + route;
      var window = new Window(pageId);
      var nodeIdMap = {};
      var document = new Document(pageId, nodeIdMap);
      cache.init(pageId, {
        window: window,
        document: document,
        nodeIdMap: nodeIdMap
      });
      return {
        pageId: pageId,
        window: window,
        document: document
      };
    },
    destroyPage: function destroyPage(pageId) {
      cache.destroy(pageId);
    },
    createApp: function createApp() {
      return new Window('app');
    },
    // For miniapp-element
    $$adapter: {
      cache: cache,
      EventTarget: EventTarget,
      Event: Event,
      tool: tool
    }
  };

  return index;

})));
