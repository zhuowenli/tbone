# tbone 是什么

tbone 是一个致力于[淘宝小程序]和 Web 端同构的解决方案，在 [kbone] 的基础上支持了淘宝、支付宝小程序。

## 介绍

[淘宝小程序]和[支付宝小程序]的底层模型和 Web 端不同，我们想直接把 Web 端的代码挪到小程序环境内执行是不可能的。tbone 的诞生就是为了解决这个问题，它实现了一个适配器，在适配层里模拟出了浏览器环境，让 Web 端的代码可以不做什么改动便可运行在小程序里。

由于 tbone 小程序运行时方案与 [kbone] 同源，因此此处可以直接查看 [kbone] 对于[运行时方案原理的解释](https://wechat-miniprogram.github.io/kbone/docs/guide/principle.html) 。tbone 小程序运行时方案上层通过 [@zhuowenli/mp-webpack-plugin] 进行小程序代码的编译。底层上使用 [@zhuowenli/miniapp-render] 和 [@zhuowenli/miniapp-element] 进行适配。

使用该方案的优点是开发者可以自如地使用任何语法而不会再受到限制，缺点是性能上存在一定的损耗。因此，何时启用运行时方案，取决于你对小程序的性能要求有多高。

因为 tbone 是通过提供适配器的方式来实现同构，所以它的优势很明显：

* 大部分流行的前端框架都能够在 tbone 上运行，比如 Vue、React、Preact 等。
* 支持更为完整的前端框架特性，因为 tbone 不会对框架底层进行删改（比如 Vue 中的 `v-html` 指令、Vue Router 插件）。
* 提供了常用的 dom/bom 接口，让用户代码无需做太大改动便可从 Web 端迁移到小程序端。
* 在小程序端运行时，仍然可以使用小程序本身的特性（比如像 `rich-text` 内置组件）。
* 提供了一些 Dom 扩展接口，让一些无法完美兼容到小程序端的接口也有替代使用方案（比如 `getComputedStyle` 接口）。

[淘宝小程序]: https://miniapp.open.taobao.com/docV3.htm?docId=117200&docType=1
[支付宝小程序]: https://opendocs.alipay.com/mini/developer
[kbone]: https://github.com/Tencent/kbone
[@zhuowenli/mp-webpack-plugin]: https://www.npmjs.com/package/@zhuowenli/mp-webpack-plugin
[@zhuowenli/miniapp-render]: https://www.npmjs.com/package/@zhuowenli/miniapp-render
[@zhuowenli/miniapp-element]: https://www.npmjs.com/package/@zhuowenli/miniapp-element
