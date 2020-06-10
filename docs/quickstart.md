# 快速上手

为了可以让开发者可以更自由地进行项目的搭建，以下提供了两种快速开发方案，任选其一即可：

## 使用 tbone-cli 快速开发

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

## 手动配置开发

此方案基于 webpack 构建实现，如果你不想要使用官方提供的模板，想要更灵活地搭建自己的项目，又或者是想对已有的项目进行改造，则需要自己补充对应配置来实现 tbone 项目的构建。

一般需要补充两个配置：

* 构建到小程序代码的[webpack 配置](https://webpack.js.org/configuration/)
* 使用 webpack 构建中使用到的特殊插件 [@zhuowenli/mp-webpack-plugin 配置](https://wechat-miniprogram.github.io/kbone/docs/config/)

[点此可以查看](https://wechat-miniprogram.github.io/kbone/docs/guide/tutorial.html)具体配置方式和操作流程。

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
