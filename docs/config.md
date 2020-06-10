# 配置

以下是 webpack 插件 [@zhuowenli/mp-webpack-plugin] 的配置说明。

## 页面名称

webpack 构建中 `entry` 配置项里的 key，如下 webpack 配置中 `page1`，`page2` 和 `page3` 即是页面名称：

```js
// 注意这里是 webpack 配置
{
    entry: {
        page1: path.resolve(__dirname, '../src/page1/main.mp.js'),
        page2: path.resolve(__dirname, '../src/page2/main.mp.js'),
        page3: path.resolve(__dirname, '../src/page3/main.mp.js'),
    },
    // 其他配置...
}
```

## origin

页面 origin，默认是 `https://www.mimiapp.dev`。

> PS：因为是所有页面共用一个 orgin，所以要求所有页面必须同源，不然无法正常跳转。

## entry

入口页面路由，默认是 `/`。

## router

页面路由，用于页面间跳转。其值是一个以[页面名称](#页面名称)作为 key 的对象，每项的值是该页面可以响应的路由。

路由可以是多个值，同时支持动态路由。

```js
// miniapp.config.js 配置
{
    router: {
        home: [
            '/(home|index)?',
            '/test/(home|index)',
        ],
        list: [
            '/test/list/:id',
        ],
        detail: [
            '/test/detail/:id',
        ],
        profile: [
            '/test/profile',
        ],
    },
    // 其他配置...
}
```

## redirect

特殊路由跳转。

### redirect.notFound

跳转遇到同一个 origin 但是不在 router 里的页面时处理方式，支持的值：

* `none`：**默认值**，什么都不做
* `webview`：使用 web-view 组件打开
* `error`：抛出异常
* [页面名称](#页面名称)：会跳转到对应页面，这个页面必须在主包中

```js
// miniapp.config.js 配置
{
    redirect: {
        notFound: 'home',
    },
    // 其他配置...
}
```

### redirect.accessDenied

跳转到 origin 之外的页面时处理方式，值同 [redirect.notFound](#redirect-notfound)。

## generate

构建输出配置。

### generate.tabBar

小程序 tabBar，详细注意事项可参考[官方文档](https://miniapp.open.taobao.com/docV3.htm?docId=117457&docType=1#ss2)。其值和官方配置基本一致：

* `iconPath` 和 `selectedIconPath` 只支持网络图片，需要指定对应图片的 URL

```js
// miniapp.config.js 配置
{
    generate: {
        tabBar: {
            textColor: '#000000',
            selectedColor: '#07c160',
            backgroundColor: '#ffffff',
            items: [{
                pagePath: 'pages/page1/index',
                name: 'page1',
                icon: 'https://alicdn.dancf.com/miniapp-qianniu/static/home.png',
                activeIcon: 'https://alicdn.dancf.com/miniapp-qianniu/static/home-active.png'
            }, {
                pageName: 'pages/page2/index',
                name: 'page2',
                icon: 'https://alicdn.dancf.com/miniapp-qianniu/static/baobei.png',
                activeIcon: 'https://alicdn.dancf.com/miniapp-qianniu/static/baobei-active.png'
            }],
        },
    },
    // 其他配置...
}
```

### generate.window

小程序 window 配置，详细注意事项可参考[官方文档](https://miniapp.open.taobao.com/docV3.htm?docId=117457&docType=1#ss1)。其值和官方配置基本一致：

```js
// miniapp.config.js 配置
{
    window: {
        defaultTitle: 'zhuowenli\'s miniapp',
        pullRefresh: true,
        allowsBounceVertical: '',
        transparentTitle: '',
        navigationBarBackgroundBg: '#ffffff',
        navigationBarTextStyle: '',
        navigationBarForceEnable: true
        titleImage: '',
        titleBarColor: '#000000',
        showNavigationBarLogo: true,
    },
    // 其他配置...
}
```

### generate.myCustomComponent

小程序自定义组件使用配置，如果需要在 tbone 项目中使用现有的小程序自定义组件，必须先在此处声明方可使用。需要声明的字段：

* `root`：所有要使用的自定义组件所在的根目录，构建时这个目录会被完整拷贝到小程序目录下
* `usingComponents`：要使用的自定义组件配置

其中每个自定义组件的配置都需要指明其相对于 `root` 的路径，如果需要传递 properties 到这个自定义组件里面，则需要配置 `props` 字段，如果需要监听这个自定义组件的事件，则需要配置 `events` 字段。

```js
// miniapp.config.js 配置
{
    generate: {
        myCustomComponent: {
            root: path.join(__dirname, '../src/custom-components'),
            usingComponents: {
                'comp-a': 'comp-a/index',
                'comp-b': {
                    path: 'comp-b/index',
                    props: ['propa', 'propb'], // 组件 properties，如果在相应的 dom 节点上设置了和列表中的 property 同名的 attribute，那么它会同步到组件的 properties 上
                    events: ['someevent'], // 组件事件，会转化成 dom 事件触发到对应的 dom 节点上
                },
            },
        },
    },
    // 其他配置...
}
```

### generate.globalVars

注入全局变量，每一项为 `[key, value]` 的结构。构建时会将需要注入的全局变量声明在所有要执行的代码之前，以方便代码里直接使用。

如果配置了 `['TEST_VAR_STRING', '\'miniprogram\'']`，则会生成类似 `var TEST_VAR_STRING = 'miniprogram'` 的声明语句；不指定 value 的话，则会从 window 下读取，如 `['CustomEvent']` 则会生成类似 `var CustomEvent = window.CustomEvent` 的声明语句。

```js
// miniapp.config.js 配置
{
    generate: {
        globalVars: [
            ['TEST_VAR_STRING', '\'miniprogram\''],
            ['TEST_VAR_NUMBER', '123'],
            ['TEST_VAR_BOOL', 'true'],
            ['TEST_VAR_FUNCTION', 'function() {return \'I am function\'}'],
            ['TEST_VAR_OTHERS', 'window.document'],
            ['CustomEvent'],
        ],
    },
    // 其他配置...
}
```

### generate.autoBuildNpm

构建完成后是否自动安装小程序依赖，支持的值：

* `false`：**默认值**，不自动安装依赖
* `true/'npm'`：使用 npm 自动安装依赖
* `'yarn'`：使用 yarn 自动安装依赖

## runtime

运行时配置。

### runtime.cookieStore

cookie 存储方式，支持的值：

* `default`：**默认值**，存储在小程序的 storage 中，所有页面共享
* `storage`：存储在小程序的 storage 中，页面间不共享
* `memory`：存储在内存中，页面间不共享
* `globalstorage`：同 `default`
* `globalmemory`：存储在内存中，所有页面共享

## pages

各个页面的单独配置，可以为单个页面做个性化处理，覆盖全局配置。参考[官方文档](https://miniapp.open.taobao.com/docV3.htm?docId=117169&docType=1)

```js
// miniapp.config.js 配置
{
    pages: {
        home: {
            pullDownRefresh: true,
        },
        list: {
            loadingText: '加载中...',
            share: false,
        },
    },
    // 其他配置...
}
```

## optimization

优化配置，控制优化级别，通常使用默认配置即可。

### optimization.domSubTreeLevel

将多少层级的 dom 子树作为一个自定义组件渲染，支持 `1 - 10`，默认值为 `10`。

### optimization.elementMultiplexing

element 对象复用，默认 `true`。当页面被关闭时会回收对象，但是如果有地方保留有对象引用的话，注意要关闭此项，否则可能出问题

### optimization.textMultiplexing

文本节点对象复用，默认 `true`。注意事项同 [optimization.elementMultiplexing](#optimization-elementmultiplexing)。

### optimization.commentMultiplexing

注释节点对象复用，默认 `true`。注意事项同 [optimization.elementMultiplexing](#optimization-elementmultiplexing)。

### optimization.domExtendMultiplexing

节点相关对象复用，如 style、classList 对象等，默认 `true`。注意事项同 [optimization.elementMultiplexing](#optimization-elementmultiplexing)。

### optimization.styleValueReduce

如果设置 style 属性时存在某个属性的值超过一定值，则进行删减，默认空，即不做删减。

一个常见的例子是样式中的 backgroundImage 如果设置一张非常大的图片的 base64 串，那么它的值可能就会很大。如果配置了其值为 5000，那么这个 base64 串长度如果超过了 5000 就会被删减，backgroundImage 的值置为 `undefined`。

```js
// mp-webpack-plugin 配置
{
    optimization: {
        styleValueReduce: 5000,
    },
    // 其他配置...
}
```

### optimization.attrValueReduce

如果设置 dom 属性时存在某个属性的值超过一定值，则进行删减，默认空，即不做删减。使用场景可参考 [optimization.styleValueReduce](#optimization-stylevaluereduce)。

## projectConfig

项目配置，会被合并到 `mini.project.json`。

```js
// miniapp.config.js 配置
{
    projectConfig: {
        cloud: {
            type: 'CLOUDAPP'
        },
        miniappRoot: '.',
        component2: true,
        axmlStrictCheck: true,
        enableParallelLoader: true,
        enableDistFileMinify: true,
    },
    // 其他配置...
}
```

## packageConfig

包配置，会被合并到 package.json。

```js
// miniapp.config.js 配置
{
    packageConfig: {
        author: 'zhuowenli',
    },
    // 其他配置...
}
```

[@zhuowenli/mp-webpack-plugin]: https://www.npmjs.com/package/@zhuowenli/mp-webpack-plugin

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
