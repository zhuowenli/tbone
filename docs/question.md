# Q&A

## 限制

此方案虽然将整个 Web 端框架包含进来并提供了适配层，但是也不是银弹，无法满足所有场景，限制的原因主要出于以下两种：

* 开发资源不足，比如小程序部分内置组件暂不支持。
* 小程序本身的运行机制限制。

## 答疑

**Q**：kbone 主要有哪些依赖包？如何安装升级 kbone 依赖？<br/>
**A**：kbone 依赖主要包含三个：`mp-webpack-plugin`、`miniprogram-element` 和 `miniprogram-render`。其中 `mp-webpack-plugin` 是一个 webpack 插件，需要安装在项目目录中。`miniprogram-element` 和 `miniprogram-render` 则是小程序代码的依赖，需要安装在小程序目录中。默认情况下，使用 webpack 和 `mp-webpack-plugin` 生成小程序代码的时候，会在小程序目录生成 pakckage.json，直接在小程序目录执行 `npm install` 就会在小程序目录下安装 `miniprogram-element` 和 `miniprogram-render`。升级过程和安装同理。

<br/>

**Q**：对于像 getBoundingClientRect 等接口，有没有什么兼容方案？<br/>
**A**：部分无法直接适配的接口会以 [dom/bom 扩展 api](../domextend/) 的方式提供。

<br/>

**Q**：是不是小程序里的所有页面必须同源？<br/>
**A**：目前的设计是这样的，遇到不同源的页面会提供事件提示和异常页面跳转配置。

<br/>

**Q**：能否支持异步组件？<br/>
**A**：受限于小程序环境，目前无法支持。

<br/>

**Q**：为什么无法支持 scoped style？<br/>
**A**：因为小程序不支持动态追加未声明的属性。

<br/>

**Q**：为什么使用 reduce-loader 不生效？<br/>
**A**：请检查一下是否给 script 标签设了 `type="ts"`，如果是的话可以去掉这个属性再试试，目前 ts-loader 对行内 loader 的支持不够完善。

<br/>

**Q**：为什么 iframe 标签无法支持？<br/>
**A**：小程序里的 web-view 组件提供了类似 iframe 标签的实现，但是 web-view 组件不支持自定义大小，故放弃了对 iframe 的支持。

<br/>

**Q**：为什么 vue 的 transition 组件的使用效果不如预期？<br/>
**A**：transition 组件内部使用了同步接口 window.getComputedStyle，故无法完美支持。

<br/>

**Q**：对于异步请求要如何兼容？<br/>
**A**：内置的 XMLHttpRequest 对象可以满足大部分场景；对于上传文件等场景需要自行兼容，比如可以选用 wx.uploadFile 来实现文件上传。

<br/>

**Q**：能否使用小程序内置组件？<br/>
**A**：目前代码里预埋进了能力，但是仅支持部分组件，用法可阅读[开发文档](../guide/advanced/#使用小程序内置组件)，后续会慢慢补齐。

<br/>

**Q**：为什么 img 标签有 mode 属性和没有 mode 属性表现会不太一样？<br/>
**A**：因为 img 标签有 mode 属性在底层会被渲染成 background-image 模式（即小程序 image 组件默认的形态），没有 mode 属性会被渲染成和 web 端相同的 img 模式。

<br/>

**Q**：为什么不支持 radio-group/checkbox-group 内置组件？<br/>
**A**：因为 radio-group/checkbox-group 内置组件下的 radio/checkbox 不支持跨自定义组件，可以使用 input 的 change 事件来替代 radio-group/checkbox-group 的 change 事件，通过获取 input 的 checked/value 也可以获取到其状态（类似 web 端的表现）。

<br/>

**Q**：项目中用到的图片等静态资源要如何处理？<br/>
**A**：目前暂不支持相对路径，故静态资源可以考虑转成 base64 或者使用网络地址。

<br/>

**Q**：能否支持分包？<br/>
**A**：分包和分包预下载已支持，具体可参考 mp-webpack-plugin 的 runtime 配置项。独立分包可通过 [generate.app](../config/#generate-app) 配置变相支持。

<br/>

**Q**：为什么 label 不支持 button 组件？<br/>
**A**：因为小程序 label 组件不支持跨 shadow-tree 绑定，所以 label 标签的效果其实是在逻辑层监听点击事件后模拟出来。而 button 支持的复杂特性都需要用户亲自点击触发，无法在逻辑层模拟触发，故不支持。

<br/>

**Q**：为什么使用小程序内置组件的时候，对于父子节点会相互影响的样式表现（比如 flex）会不太符合预期？<br/>
**A**：绝大部分小程序内置组件在渲染时会**插入一层容器节点**，所以会对部分样式有影响。对于这种情况，可以参考[这篇文档](../guide/advanced.html#%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6)里提到的的方式来处理。

<br/>

**Q**: 为什么使用小程序内置组件的时候样式有时候会不生效？<br/>
**A**: 和上一个问题的原因相同，对于这种情况，可以参考[这篇文档](../guide/advanced.html#%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6)里提到的的方式来处理。

<br/>

**Q**：为什么 scroll-view 的 scroll-into-view 属性有时可用有时不可用？<br/>
**A**：因为 scroll-into-view 找寻的节点只能在当前 shadow-tree 下，因此只有传入 `domSubTreeLevel` 配置对应层级内的 div、img 标签对应的 id 方能生效。如果 `domSubTreeLevel` 的值为 5，那么只有 scroll-view 下 5 层节点内的 div、img 标签上的 id 可以作为该 scroll-view 上 scroll-into-view 的值。

<br/>

**Q**：vue 会将值为 false 的属性剔除，对于默认值为 true 的属性想要设置成 false 要怎么办？<br/>
**A**：可以将该属性设置成其他 falsy 的值，比如空串。例子：`<textarea adjust-position="" />`。

<br/>

**Q**：页面做更新的时候，有时候很快，有时候很慢，这是怎么回事？<br/>
**A**：更新慢的时候，通常这是一棵比较矮胖的 dom 树，所有节点都在一个自定义组件里面了，导致小程序基础课做更新 diff 时，特别慢。这种情况可以将频繁更新的部分包裹在一个 wx-view 标签内，这样会强制创建新的自定义组件。此方法有利有弊，自定义组件过多也会导致渲染变慢，所以需要根据实际情况进行调整，不能一味的使用 wx-view。

<br/>

**Q**：已知 location.href，如何封装成对应的小程序的页面路由？<br/>
**A**：先找到对应的页面路径，假设是 `pages/home/index`，那么封装方式：<span style="word-break: break-all;">`/pages/home/index?type=${type}&targeturl=${encodeURIComponent(location.href)}&search=${encodeURIComponent(location.search)}&hash=${encodeURIComponent(location.hash)}`</span>。type 支持 open（新开页面）、jump（页面内跳转）和 share（分享进入），一般在配置体验版、添加工具模式等情况下使用 type=open 即可；targeturl 是经过编码的 location.href；search 和 hash 可传可不传，如若不传，则取 targeturl 中的 search 和 hash 进行解析。

<br/>

**Q**：为什么我新增页面后重新构建，代码包会变大那么多？<br/>
**A**：新增页面后，依赖会重新调整输出，但是 kbone 的 demo 中输出是增量的，所以并没有清理旧的输出文件，因此代码包里会残留废弃文件。开发者可在执行构建命令前对输出目录进行一次清理（比如使用 rimraf），即可保证输出目录是纯净的。

<br/>

**Q**：react/preact 进行多页开发的时候，在页面关闭时没有执行 componentWillUnmount 钩子要怎么处理？<br/>
**A**：react/preact 并没有提供根组件实例的销毁方法（如 vue.$destroy），因此开发者可自行监听 wxunload 或 beforeunload 事件来进行页面的销毁工作，比如调用 render 方法渲染一个空节点，强行触发页面组件的 componentWillUnmount 钩子。

## 反馈

如果还遇到其他问题，可在 [issue](https://github.com/zhuowenli/tbone/issues) 中反馈。

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
