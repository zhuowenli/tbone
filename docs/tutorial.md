# tbone 项目搭建流程

此方案基于 webpack 构建实现，构建 web 端代码的流程无需做任何调整，此处只介绍如何将源码构建成小程序端代码。

## 编写 webpack 配置

新建一个 webpack.mp.config.js 文件，用于小程序端代码的构建，假设你要构建的小程序代码放到 `./dist` 目录中：

```js
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const MpPlugin = require('mp-webpack-plugin') // 用于构建小程序代码的 webpack 插件

const isOptimize = true // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩

module.exports = {
    mode: 'production',
    entry: {
        // js 入口
        home: path.resolve(__dirname, '../src/home/main.mp.js'),
        list: path.resolve(__dirname, '../src/list/main.mp.js'),
        detail: path.resolve(__dirname, '../src/detail/main.mp.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist/common'), // 放到小程序代码目录中的 common 目录下
        filename: '[name].js', // 必需字段，不能修改
        library: 'createApp', // 必需字段，不能修改
        libraryExport: 'default', // 必需字段，不能修改
        libraryTarget: 'window', // 必需字段，不能修改
    },
    target: 'web', // 必需字段，不能修改
    optimization: {
        runtimeChunk: false, // 必需字段，不能修改
        splitChunks: { // 代码分割配置，不建议修改
            chunks: 'all',
            minSize: 1000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 100,
            maxInitialRequests: 100,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },

        minimizer: isOptimize ? [
            // 压缩CSS
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.(css|wxss)$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                        minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
                    }],
                },
                canPrint: false
            }),
            // 压缩 js
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
            })
        ] : [],
    },
    module: {
        rules: [
            // loaders 配置。这里需要注意的是，部分在 wxss 不支持的样式需要剔除，比如 ie hack 代码，可以使用 postcss 的 stylehacks 插件剔除；对于资源文件来说，需要转成 base64 或者线上资源链接，下面是一个简单的示例：
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 1024,
            //             name: '[name]_[hash:hex:6].[ext]',
            //             publicPath: 'https://test.miniapp.com/res', // 对于资源文件直接使用线上的 cdn 地址
            //             emitFile: false,
            //         }
            //     }],
            // },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.isMiniapp': process.env.isMiniapp, // 注入环境变量，用于业务代码判断
        }),
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
        new VueLoaderPlugin(),
        new MpPlugin({
            // 插件配置，下面会详细介绍
        }),
    ],
}
```

## 编写 webpack 插件配置

这里的 webpack 插件配置即上面提到的 `MpPlugin` 的配置，内容如下：

```js
module.exports = {
    // 页面 origin，默认是 https://miniapp.default
    origin: 'https://test.miniapp.com',
    // 入口页面路由，默认支是 /
    entry: '/',
    // 页面路由，用于页面间跳转
    router: {
        // 路由可以是多个值，持动态路由
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
    },
    // 项目配置，会被合并到 mini.project.json
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
}
```

更多详细配置信息可以[点此查看](./config)。

## 新增入口文件

此处小程序 webpack 配置所使用的入口文件和 web 端有一定区别，假设 web 端是这样的：

```js
import Vue from 'vue'
import App from './App.vue'

// 注入到页面上的 id 为 app 的 dom 节点上
new Vue({
    el: '#app',
    render: h => h(App)
})
```

那么小程序端所用到的入口则需要调整成如下：

```js
import Vue from 'vue'
import App from './App.vue'

// 需要将创建根组件实例的逻辑封装成方法
export default function createApp() {
    // 在小程序中如果要注入到 id 为 app 的 dom 节点上，需要主动创建
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    return new Vue({
        el: '#app',
        render: h => h(App)
    })
}
```

这是因为小程序中各个页面的逻辑端是统一跑在 appService 上的，需要对各个页面做隔离。为了方便做后续操作，需要将创建根组件实例的逻辑封装成方法暴露给适配层，调用此方法时会返回根组件实例。

## 执行构建

1. 构建小程序代码：

    ```bash
    webpack --config webpack.mp.config.js
    ```

2. 进入小程序代码目录，安装小程序依赖包：

    ```bash
    cd miniapp
    npm install
    ```

3. 使用小程序开发者工具直接打开此目录，并点击工具菜单下的构建 npm 按钮，之后便可预览构建好的小程序了。

## 例子

我们准备了若干 demo，可以[点此查看](https://github.com/zhuowenli/tbone/tree/master/examples)。

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
