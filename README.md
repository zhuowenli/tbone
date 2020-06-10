# Tbone

tbone 是一个致力于[淘宝小程序]和 Web 端同构的解决方案，在 [kbone] 的基础上支持了淘宝、支付宝小程序。

## 简介

[淘宝小程序]和[支付宝小程序]的底层模型和 Web 端不同，我们想直接把 Web 端的代码挪到小程序环境内执行是不可能的。tbone 的诞生就是为了解决这个问题，它实现了一个适配器，在适配层里模拟出了浏览器环境，让 Web 端的代码可以不做什么改动便可运行在小程序里。

由于 tbone 小程序运行时方案与 [kbone] 同源，因此此处可以直接查看 [kbone] 对于[运行时方案原理的解释](https://wechat-miniprogram.github.io/kbone/docs/guide/principle.html) 。tbone 小程序运行时方案上层通过 [@zhuowenli/mp-webpack-plugin] 进行小程序代码的编译。底层上使用 [@zhuowenli/miniapp-render] 和 [@zhuowenli/miniapp-element] 进行适配。

使用该方案的优点是开发者可以自如地使用任何语法而不会再受到限制，缺点是性能上存在一定的损耗。因此，何时启用运行时方案，取决于你对小程序的性能要求有多高。

## 使用

为了可以让开发者可以更自由地进行项目的搭建，以下提供了三种方式，任选其一即可：

### 使用 tbone-cli 快速开发

对于新项目，可以使用 `tbone-cli` 来创建项目，首先安装 `tbone-cli`:

```bash
npm install -g tbone-cli
```

创建项目：

```bash
tbone init my-app
```

进入项目，按照 README.md 的指引进行开发：

```bash
// 开发小程序端
npm run mp

// 开发 Web 端
npm run web

// 构建 Web 端
npm run build
```

> PS：项目基于 webpack 构建，关于 webpack 方面的配置可以[点此查看](https://webpack.js.org/configuration/)，而关于小程序构建相关的详细配置细节可以[参考此文档](https://wechat-miniprogram.github.io/kbone/docs/guide/tutorial.html)。

<!-- ### 使用模板快速开发

除了使用 tbone-cli 外，也可以直接将现有模板 clone 下来，然后在模板基础上进行开发改造：

* [Vue 项目模板](https://github.com/zhuowenli/tbone-template-vue)
* [React 项目模板](https://github.com/zhuowenli/tbone-template-react)

项目 clone 下来后，按照项目中 README.md 的指引进行开发。 -->

### 手动配置开发

此方案基于 webpack 构建实现，如果你不想要使用官方提供的模板，想要更灵活地搭建自己的项目，又或者是想对已有的项目进行改造，则需要自己补充对应配置来实现 tbone 项目的构建。

一般需要补充两个配置：

* 构建到小程序代码的[webpack 配置](https://webpack.js.org/configuration/)
* 使用 webpack 构建中使用到的特殊插件 [@zhuowenli/mp-webpack-plugin 配置](https://wechat-miniprogram.github.io/kbone/docs/config/)

[点此可以查看](https://wechat-miniprogram.github.io/kbone/docs/guide/tutorial.html)具体配置方式和操作流程。

## 文档

更为详细的说明和指引，可点击[查看文档](https://wechat-miniprogram.github.io/kbone/docs/)。

## TODOS

* [ ] 云函数适配
* [ ] 原生 select 组件适配
* [ ] 原生 canvas 组件适配
* [ ] Echarts 适配

## License

[MIT](./LICENSE)

[淘宝小程序]: https://miniapp.open.taobao.com/docV3.htm?docId=117200&docType=1
[支付宝小程序]: https://opendocs.alipay.com/mini/developer
[kbone]: https://github.com/Tencent/kbone
[@zhuowenli/mp-webpack-plugin]: https://www.npmjs.com/package/@zhuowenli/mp-webpack-plugin
[@zhuowenli/miniapp-render]: https://www.npmjs.com/package/@zhuowenli/miniapp-render
[@zhuowenli/miniapp-element]: https://www.npmjs.com/package/@zhuowenli/miniapp-element
