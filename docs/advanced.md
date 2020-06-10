# 进阶用法

因为 Web 端和小程序端的差异性，此文档提供了一些进阶用法、优化方式和开发建议。

## 环境判断

对于开发者来说，可能需要针对不同端做一些特殊的逻辑，因此也就需要一个方法来判断区分不同的环境。tbone 推荐的做法是通过 webpack 注入一个环境变量：

```js
// webpack.mp.config.js
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.isMiniapp': true,
        }),
        // ... other options
    ],
    // ... other options
}
```

后续在业务代码中，就可以通过 `process.env.isMiniapp` 来判断是否在小程序环境：

```js
if (process.env.isMiniapp) {
    console.log('in miniapp')
} else {
    console.log('in web')
}
```

## 多页开发

对于多页面的应用，在 Web 端可以直接通过 a 标签或者 location 对象进行跳转，但是在小程序中则行不通；同时 Web 端的页面 url 实现和小程序页面路由也是完全不一样的，因此对于多页开发最大的难点在于如何进行页面跳转。

1. 修改 webpack 配置

    对于多页应用，此处和 Web 端一致，有多少个页面就需要配置多少个入口文件。如下例子，这个应用中包含 page1、page2 和 page2 三个页面：

    ```js
    // webpack.mp.config.js
    module.exports = {
        entry: {
            page1: path.resolve(__dirname, '../src/page1/main.mp.js'),
            page2: path.resolve(__dirname, '../src/page2/main.mp.js'),
            page3: path.resolve(__dirname, '../src/page3/main.mp.js'),
        },
        // ... other options
    }
    ```

2. 修改 webpack 插件配置

    `mp-webpack-plugin` 这个插件的配置同样需要调整，需要开发者提供各个页面对应的 url 给 tbone。

    ```js
    module.exports = {
        origin: 'https://test.miniapp.com',
        entry: '/page1',
        router: {
            page1: ['/(home|page1)?', '/test/(home|page1)'],
            page2: ['/test/page2/:id'],
            page3: ['/test/page3/:id'],
        },
        // ... other options
    }
    ```

    其中 `origin` 即 `window.location.origin` 字段，使用 tbone 的应用所有页面必须同源，不同源的页面禁止访问。`entry` 页面表示这个应用的入口 url。`router` 配置则是各个页面对应的 url，可以看到每个页面可能不止对应一个 url，而且这里的 url 支持参数配置。

    有了以上几个配置后，就可以在 tbone 内使用 `a` 标签或者 `location` 对象进行跳转。tbone 会将要跳转的 url 进行解析，然后根据配置中的 `origin` 和 `router` 查找出对应的页面，然后拼出页面在小程序中的路由，最后通过小程序 API 进行跳转（利用 `my.redirectTo` 等方法）。

    > PS：具体例子可参考 [demo5] 和 [demo7]

## 使用小程序内置组件

需要明确的是，如果没有特殊需求的话，请尽量使用 html 标签来编写代码，使用内置组件时请按需使用。这是因为绝大部分内置组件外层都会被包裹一层自定义组件，如果自定义组件的实例数量达到一定量级的话，理论上是会对性能造成一定程度的影响，所以对于 view、text、image 等会被频繁使用的内置组件，如果没有特殊需求的话请直接使用 div、span、img 等 html 标签替代。

部分内置组件可以直接使用 html 标签替代，比如 input 组件可以使用 input 标签替代。目前已支持的可替代组件列表：

* `<input />` --> input 组件
* `<input type="radio" />` --> radio 组件
* `<input type="checkbox" />` --> checkbox 组件
* `<label><label>` --> label 组件
* `<textarea></textarea>` --> textarea 组件
* `<img />` --> image 组件
* `<video></video>`  --> video 组件
* `<canvas></canvas>` --> canvas 组件

还有一部分内置组件在 html 中没有标签可替代，那就需要使用 `my-component` 标签或者使用 `my-` 前缀，基本用法如下：

```html
<!-- my-component 标签用法 -->
<my-component behavior="picker" mode="region" @change="onChange">选择城市</my-component>
<my-component behavior="button" open-type="share" @click="onClickShare">分享</my-component>

<!-- my- 前缀用法 -->
<my-picker mode="region" @change="onChange">选择城市</my-picker>
<my-button open-type="share" @click="onClickShare">分享</my-button>
```

如果使用 `my-component` 标签表示要渲染小程序内置组件，然后 behavior 字段表示要渲染的组件名；其他组件属性传入和官方文档一致，事件则采用 vue 的绑定方式。

`my-component` 或 `my-` 前缀已支持内置组件列表：

* cover-image 组件
* cover-view 组件
* movable-area 组件
* movable-view 组件
* scroll-view 组件
* swiper 组件
* swiper-item 组件
* view 组件
* icon 组件
* progress 组件
* text 组件
* button 组件
* editor 组件
* form 组件
* picker 组件
* picker-view 组件
* picker-view-column 组件
* slider 组件
* switch 组件
* navigator 组件
* camera 组件
* image 组件
* map 组件
* web-view 组件

内置组件的子组件会被包裹在一层自定义组件里面，因此内置组件和子组件之间会隔着一层容器，该容器会追加 h5-virtual 到 class 上。

生成的结构大致如下：

```html
<!-- 源码 -->
<div>
    <canvas>
        <div></div>
        <div></div>
    </canvas>
    <my-map>
        <div></div>
        <div></div>
    </my-map>
    <my-scroll-view>
        <div></div>
        <div></div>
    </my-scroll-view>
</div>

<!-- 生成的结构 -->
<view>
    <canvas class="h5-canvas my-canvas my-comp-canvas">
        <element class="h5-virtual">
            <cover-view></cover-view>
            <cover-view></cover-view>
        </element>
    </canvas>
    <map class="h5-my-component my-map my-comp-map">
        <element class="h5-virtual">
            <cover-view></cover-view>
            <cover-view></cover-view>
        </element>
    </map>
    <element class="h5-my-component my-scroll-view">
        <scroll-view class="my-comp-scroll-view">
            <view></view>
            <view></view>
        </scroll-view>
    </element>
</view>
```

> PS：button 标签不会被渲染成 button 内置组件，同理 form 标签也不会被渲染成 form 内置组件，如若需要请按照上述原生组件使用说明使用。
> PS：因为自定义组件的限制，movable-area/movable-view、swiper/swiper-item、picker-view/picker-view-column 这三组组件必须作为父子存在才能使用，比如 swiper 组件和 swiper-item 必须作为父子组件才能使用，如：

```html
<my-swiper>
    <my-swiper-item>A</my-swiper-item>
    <my-swiper-item>B</my-swiper-item>
    <my-swiper-item>C</my-swiper-item>
</my-swiper>
```

> PS：默认 canvas 内置组件的 touch 事件为通用事件的 Touch 对象，而不是 CanvasTouch 对象，如果需要用到 CanvasTouch 对象的话可以改成监听 `canvastouchstart`、`canvastouchmove`、`canvastouchend` 和 `canvastouchcancel` 事件。
> PS：原生组件下的子节点，div、span 等标签会被渲染成 cover-view，img 会被渲染成 cover-image，如若需要使用 button 内置组件请使用 `my-component` 或 `my-` 前缀。
> PS：如果将插件配置 runtime.myComponent 的值配置为 `noprefix`，则可以用不带前缀的方式使用内置组件。
> PS：某些 Web 框架（如 react）会强行将节点属性值转成字符串类型。对于普通类型数组（如 my-picker 组件的 value 属性），字符串化会变成`,`连接，tbone 会自动做解析，开发者无需处理；对于对象数组（如 my-picker 组件的 range 属性），如遇到被自动转成字符串的情况，开发者需要将此对象数组转成 json 串传入。
> PS：某些框架对于布尔值的属性会进行丢弃（比如 react），不会执行 setAttribute 操作，对于这种情况可以使用有值的字符串和空串来代替 true 和 false，也可以通过手动调用 setAttribute 来设置属性。
> PS：具体例子可参考 [demo3]

## 使用小程序自定义组件

需要明确的是，如果可以使用 Web 端组件技术实现的话请尽量使用 Web 端技术（如 vue、react 组件），使用自定义组件请按需使用。这是因为自定义组件外层会被包裹上 tbone 的自定义组件，而当自定义组件的实例数量达到一定量级的话，理论上是会对性能造成一定程度的影响。

要在 tbone 中使用自定义组件，需要将所有自定义组件和其依赖放到一个固定的目录，这个目录可以自己拟定，假设这个目录为 `src/custom-components`：

1. 修改 webpack 插件配置

    在 `@zhuowenli/mp-webpack-plugin` 这个插件的配置中的 generate 字段内补充 **myCustomComponent**，其中 root 是组件根目录，即上面提到的目录：`src/custom-component`，`usingComponents` 则用来配置要用到的自定义组件。

    ```js
    module.exports = {
        generate: {
            myCustomComponent: {
                root: path.join(__dirname, '../src/custom-components'),
                usingComponents: {
                    'comp-a': 'comp-a/index',
                    'comp-b': {
                        path: 'comp-b/index',
                        props: ['propa', 'propb'],
                        events: ['someevent'],
                    },
                },
            },
        },
        // ... other options
    }
    ```

    `usingComponents` 里的声明和小程序页面的 `usingComponents` 字段类似。键为组件名，值可以为组件相对 root 字段的路径，也可以是一个配置对象。这个配置对象的 path 为组件相对路径，`props` 表示要这个组件会被用到的 properties，`events` 表示这个组件会被监听到的事件。

2. 将自定义组件放入组件根目录

    下面以 comp-b 组件为例：

    ```html
    <!-- comp-b.axml -->
    <view>comp-b</view>
    <view>propa: {{propa}} -- propb: {{propb}}</view>
    <button bindtap="onTap">click me</button>
    <slot></slot>
    ```

    ```js
    // comp-b.js
    Component({
        properties: {
            propa: {type: String, value: ''},
            propb: {type: String, value: ''},
        },
        methods: {
            onTap() {
                this.triggerEvent('someevent')
            },
        },
    })
    ```

3. 使用自定义组件

    假设使用 vue 技术，然后下面同样以 comp-b 组件为例：

    ```html
    <template>
        <div>
            <comp-b :propa="propa" :propb="propb" @someevent="onEvent">
                <div>comp-b slot</div>
            </comp-b>
        </div>
    </template>
    <script>
    export default {
        data() {
            return {propa: 'propa-value', propb: 'propb-value'}
        },
        methods: {
            onEvent(evt) {
                console.log('someevent', evt)
            },
        },
    }
    </script>
    ```

> PS：如果使用 react 等其他框架其实和 vue 同理，因为它们的底层都是调用 document.createElement 来创建节点。当在 webpack 插件配置声明了这个自定义组件的情况下，在调用 document.createElement 创建该节点时会被转换成创建 my-custom-component 标签，类似于内置组件的 my-component 标签。
> PS：具体例子可参考 [demo]

## 自定义 app.js 和 app.acss

在开发过程中，可能需要监听 app 的生命周期，这就需要开发者自定义 app.js。

1. 修改 webpack 配置

    首先需要在 webpack 配置中补上 app.js 的构建入口，比如下面代码的 `miniapp-app` 入口：

    ```js
    // webpack.mp.config.js
    module.exports = {
        entry: {
            'miniapp-app': path.resolve(__dirname, '../src/app.js'),

            page1: path.resolve(__dirname, '../src/page1/main.mp.js'),
            page2: path.resolve(__dirname, '../src/page2/main.mp.js'),
        },
        // ... other options
    }
    ```

2. 修改 webpack 插件配置

    在 webpack 配置补完入口，还需要在 `@zhuowenli/mp-webpack-plugin` 这个插件的配置中补充说明，不然 tbone 会将 `miniapp-app` 入口作为页面处理。

    ```js
    module.exports = {
        generate: {
            appEntry: 'miniapp-app',
        },
        // ... other options
    }
    ```

    如上，将 webpack 构建中的入口名称设置在插件配置的 `generate.app` 字段上，那么构建时 tbone 会将这个入口的构建作为 app.js 处理。

3. 补充 src/app.js

    ```js
    // 自定义 app.acss
    import './app.css'

    App({
        onLaunch(options) {},
        onShow(options) {
            // 获取当前页面实例
            const pages = getCurrentPages() || []
            const currentPage = pages[pages.length - 1]

            // 获取当前页面的 window 对象和 document 对象
            if (currentPage) {
                console.log(currentPage.window)
                console.log(currentPage.document)
            }
        },
        onHide() {},
        onError(err) {},
        onPageNotFound(options) {},
    })
    ```

    > PS：app.js 不属于任何页面，所以没有真正的 window 和 document 对象，所有依赖这两个对象实现的代码在这里无法被直接使用。

## 扩展 dom/bom 对象和 API

tbone 能够满足大多数常见的开发场景，但是当遇到当前 dom/bom 接口不能满足的情况时，tbone 也提供了一系列 API 来扩展 dom/bom 对象和接口。

这里需要注意的是，下述所有对于 dom/bom 对象的扩展都是针对所有页面的，也就是说有一个页面对其进行了扩展，所有页面都会生效，因此在使用扩展时建议做好处理标志，然后判断是否已经被扩展过。

* 使用 window.$$extend 对 dom/bom 对象追加属性/方法

举个例子，假设需要对 `window.location` 对象追加一个属性 testStr 和一个方法 testFunc，可以编写如下代码：

```js
window.$$extend('window.location', {
    testStr: 'I am location',
    testFunc() {
        return `Hello, ${this.testStr}`
    },
})
```

这样便可以通过 `window.location.testStr` 获取新追加的属性，同时可以通过 `window.location.testFunc()` 调用新追加的方法。

* 使用 window.$$getPrototype 获取 dom/bom 对象的原型

如果遇到追加属性和追加方法都无法满足需求的情况下，可以获取到对应对象的原型进行操作：

```js
const locationPrototype = window.$$getPrototype('window.location')
```

如上例子，locationPrototype 便是 window.location 对象的原型。

* 对 dom/bom 对象方法追加前置/后置处理

除了上述的给对象新增和覆盖方法，还可以对已有的方法进行前置/后置处理。

前置处理即表示此方法会在执行原始方法之前执行，后置处理则是在之后执行。前置处理方法接收到的参数和原始方法接收到的参数一致，后置处理方法接收到的参数则是原始方法执行后返回的结果。下面给一个简单的例子：

```js
const beforeAspect = function(...args) {
    // 在执行 window.location.testFunc 前被调用，args 为调用该方法时传入的参数
}
const afterAspect = function(res) {
    // 在执行 window.location.testFunc 后被调用，res 为该方法返回结果
}
window.$$addAspect('window.location.testFunc.before', beforeAspect)
window.$$addAspect('window.location.testFunc.after', afterAspect)

window.location.testFunc('abc', 123) // 会执行 beforeAspect，再调用 testFunc，最后再执行 afterAspect
```

> PS：具体 API 可参考 [dom/bom 扩展 API](./domextend) 文档。

## 事件系统

tbone 里节点事件没有直接复用小程序的捕获冒泡事件体系，原因在于：

* 小程序事件和 Web 事件不完全对齐，比如 input 事件在小程序里是不冒泡的。
* 小程序自定义组件是基于 Web Components 的概念设计的，对于跨自定义组件的情况，无法准确获取事件的源节点。

故在 tbone 里的节点事件是在源节点里监听到后，就直接在 tbone 仿造出的 dom 树中进行捕获冒泡。此处使用的事件绑定方式均采用 bindxxx 的方式，故在小程序中最初监听到的事件一定是在源节点监听到的。比如用户触摸屏幕后，会触发 touchstart 事件，在节点 a 上监听到 touchstart 事件后，后续监听到同一行为触发的 touchstart 均会被抛弃，后续的捕获冒泡阶段会在仿造 dom 树中进行。

目前除了内置组件特有的事件外（比如图片的 load 事件），普通节点只有 **touchstart**、**touchmove**、**touchend**、**touchcancel** 和 **tap** 会被监听，其中 tap 会被转化为 **cick** 事件来触发。

因为此处事件监听方式默认是 bindxxx，但是对于一些特殊场景可能需要使用小程序的 capture-bind:xxx（比如无法在源节点监听到事件的场景）、catchxxx（比如需要阻止触摸引起滚动的场景） 和动画事件的情况，对于此可以使用特殊节点 `my-capture`、`my-catch` 和 `my-animation`：

```html
<!-- 使用小程序原生方式监听 capture 事件 -->
<my-capture @touchstart="onCaptureTouchStart" @click="onCaptureClick"></my-capture>
<!-- 使用小程序原生方式监听 catch 事件 -->
<my-catch @click="onCaptureClick"></my-catch>
<!-- 监听动画事件 -->
<my-animation @animationstart="onAnimationStart" @transitionend="onTransitionEnd"></my-animation>
```

其中 `my-capture` 和 `my-catch` 节点上面绑定的 **touchstart**、**touchmove**、**touchend**、**touchcancel** 和 **tap** 五个事件会被使用 capture-bind:xxx 和 catchxxx 的方式监听，脱离了 tbone 的事件捕获冒泡体系，所以只会在此节点单独触发。

> PS：这三种特殊节点的内部实现和内置组件一致，故书写方式和样式处理均可参考内置组件的使用方案。

## 跨页面通信和跨页面数据共享

在 tbone 中，每个页面拥有独立的 window 对象，页面与页面间是相互隔离的，为此需要一个跨页面通信和跨页面数据共享的方式。

1. 在页面中订阅广播消息

```js
// 页面1
window.$$subscribe('hello', data => {
    console.log('receive a msg: ', data)
})
```

2. 在其他页面中发布广播消息

```js
// 页面2
window.$$publish('hello', 'I am june')
```

在订阅了此消息的页面则会输出 `receive a msg: I am june`。

> PS：如果需要取消订阅消息，可以使用 window.$$unsubscribe 接口进行取消。
> PS：页面关闭后，会取消该页面所有的订阅。

如果需要跨页面数据进行共享，可以使用 window.$$global 对象，所有页面的 window.$$global 均会指向同一个对象：

```js
// 页面1
window.$$global.name = 'june'

// 页面2
console.log(window.$$global.name) // 输出 june
```

> PS：具体 API 可参考 [dom/bom 扩展 API](./domextend) 文档。

[demo]: https://github.com/zhuowenli/tbone/tree/master/examples/demo
[demo3]: https://github.com/zhuowenli/tbone/tree/master/examples/demo3
[demo5]: https://github.com/zhuowenli/tbone/tree/master/examples/demo5
[demo7]: https://github.com/zhuowenli/tbone/tree/master/examples/demo7

## 目录

* [指南](/tbone)
* [快速上手](/tbone/quickstart)
* [tbone 项目搭建流程](/tbone/tutorial)
* [配置](/tbone/config)
* [dom/bom 扩展 API](/tbone/domextend)
* [进阶用法](/tbone/advanced)
* [代码优化](/tbone/optimize)
* [原理](/tbone/principle)
* [Q&A](/tbone/question)
