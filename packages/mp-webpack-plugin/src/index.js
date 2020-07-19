const path = require('path');
const fs = require('fs');
const execa = require('execa');
const ConcatSource = require('webpack-sources').ConcatSource;
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
const { RawSource } = require('webpack-sources');
const pathToRegexp = require('path-to-regexp');
const colors = require('colors/safe');
const adjustCss = require('./tool/adjust-css');
const _ = require('./tool/utils');

const PluginName = 'MpPlugin';
const appJsTmpl = fs.readFileSync(path.resolve(__dirname, './tmpl/app.tmpl.js'), 'utf8');
const pageJsTmpl = fs.readFileSync(path.resolve(__dirname, './tmpl/page.tmpl.js'), 'utf8');
const appDisplayAcssTmpl = fs.readFileSync(path.resolve(__dirname, './tmpl/app.display.tmpl.acss'), 'utf8');
const appExtraAcssTmpl = fs.readFileSync(path.resolve(__dirname, './tmpl/app.extra.tmpl.acss'), 'utf8');
const appAcssTmpl = fs.readFileSync(path.resolve(__dirname, './tmpl/app.tmpl.acss'), 'utf8');
const customComponentJsTmpl = fs.readFileSync(path.resolve(__dirname, './tmpl/custom-component.tmpl.js'), 'utf8');
const projectConfigJsonTmpl = require('./tmpl/mini.project.tmpl.json');
const packageConfigJsonTmpl = require('./tmpl/package.tmpl.json');
const { packageConfig } = require('../../../examples/demo1/build/miniapp.config');

process.env.isminiapp = true; // 设置环境变量
const globalVars = [
    'HTMLElement',
    'Element',
    'Node',
    'localStorage',
    'sessionStorage',
    'navigator',
    'history',
    'location',
    'performance',
    'Image',
    'CustomEvent',
    'Event',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'getComputedStyle',
    'XMLHttpRequest',
];

/**
 * 添加文件
 */
function addFile(compilation, filename, content) {
    compilation.assets[filename] = {
        source: () => content,
        size: () => Buffer.from(content).length,
    };
}

/**
 * 给 chunk 头尾追加内容
 */
function wrapChunks(compilation, chunks, globalVarsConfig) {
    chunks.forEach(chunk => {
        chunk.files.forEach(fileName => {
            if (ModuleFilenameHelpers.matchObject({ test: /\.js$/ }, fileName)) {
                // 页面 js
                const headerContent = 'module.exports = function(window, document) {var App = function(options) {window.appOptions = options};' + globalVars.map(item => `var ${item} = window.${item}`).join(';') + ';';
                let customHeaderContent = globalVarsConfig.map(item => `var ${item[0]} = ${item[1] ? item[1] : 'window[\'' + item[0] + '\']'}`).join(';');
                customHeaderContent = customHeaderContent ? customHeaderContent + ';' : '';
                const footerContent = '}';

                compilation.assets[fileName] = new ConcatSource(headerContent + customHeaderContent, compilation.assets[fileName], footerContent);
            }
        });
    });
}

/**
 * 获取依赖文件路径
 */
function getAssetPath(assetPathPrefix, filePath, assetsSubpackageMap, backwardStr = '../../') {
    if (assetsSubpackageMap[filePath]) assetPathPrefix = ''; // 依赖在分包内，不需要补前缀
    return `${assetPathPrefix}${backwardStr}common/${filePath}`;
}

class MpPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        const options = this.options;
        const generateConfig = options.generate || {};

        compiler.hooks.emit.tapAsync(PluginName, (compilation, callback) => {
            const outputPath = compilation.outputOptions.path;
            const entryNames = Array.from(compilation.entrypoints.keys());
            const appJsEntryName = generateConfig.appEntry || generateConfig.app || ''; // 取 app 是为了兼容旧版本的一个 bug
            const globalConfig = options.global || {};
            const pageConfigMap = options.pages || {};
            const subpackagesConfig = generateConfig.subpackages || {};
            const tabBarConfig = generateConfig.tabBar || {};
            const myCustomComponentConfig = generateConfig.myCustomComponent || {};
            const myCustomComponentRoot = myCustomComponentConfig.root;
            const myCustomComponents = myCustomComponentConfig.usingComponents || {};
            const pages = [];
            const subpackagesMap = {}; // 页面名-分包名
            const assetsMap = {}; // 页面名-依赖
            const assetsReverseMap = {}; // 依赖-页面名
            const assetsSubpackageMap = {}; // 依赖-分包名
            const tabBarMap = {};
            let needEmitConfigToSubpackage = false; // 是否输出 config.js 到分包内

            // 收集依赖
            for (const entryName of entryNames) {
                const assets = { js: [], css: [] };
                const filePathMap = {};
                const extRegex = /\.(css|js|acss)(\?|$)/;
                const entryFiles = compilation.entrypoints.get(entryName).getFiles();
                entryFiles.forEach(filePath => {
                    // 跳过非 css 和 js
                    const extMatch = extRegex.exec(filePath);
                    if (!extMatch) return;

                    // 跳过已记录的
                    if (filePathMap[filePath]) return;
                    filePathMap[filePath] = true;

                    // 记录
                    let ext = extMatch[1];
                    ext = ext === 'acss' ? 'css' : ext;
                    assets[ext].push(filePath);

                    // 插入反查表
                    assetsReverseMap[filePath] = assetsReverseMap[filePath] || [];
                    if (assetsReverseMap[filePath].indexOf(entryName) === -1) assetsReverseMap[filePath].push(entryName);

                    // 调整 css 内容
                    if (ext === 'css') {
                        compilation.assets[filePath] = new RawSource(adjustCss(compilation.assets[filePath].source()));
                    }
                });

                assetsMap[entryName] = assets;
            }

            // 处理分包配置
            Object.keys(subpackagesConfig).forEach(packageName => {
                const pages = subpackagesConfig[packageName] || [];
                pages.forEach(entryName => {
                    subpackagesMap[entryName] = packageName;

                    // 寻找私有依赖，放入分包
                    const assets = assetsMap[entryName];
                    if (assets) {
                        [...assets.js, ...assets.css].forEach(filePath => {
                            const requirePages = assetsReverseMap[filePath] || [];
                            if (_.includes(pages, requirePages) && compilation.assets[filePath]) {
                                // 该依赖为分包内页面私有
                                assetsSubpackageMap[filePath] = packageName;
                                compilation.assets[`../${packageName}/common/${filePath}`] = compilation.assets[filePath];
                                delete compilation.assets[filePath];
                            }
                        });
                    }
                });
            });

            // 剔除 app.js 入口
            const appJsEntryIndex = entryNames.indexOf(appJsEntryName);
            if (appJsEntryIndex >= 0) entryNames.splice(appJsEntryIndex, 1);

            // 处理自定义组件字段
            Object.keys(myCustomComponents).forEach(key => {
                if (typeof myCustomComponents[key] === 'string') {
                    myCustomComponents[key] = {
                        path: myCustomComponents[key],
                    };
                }
            });

            if (generateConfig.app === 'noemit') {
                // generate.app 值为 noemit 且只有分包输出时，将 config.js 输出到分包内
                needEmitConfigToSubpackage = !entryNames.find(entryName => !subpackagesMap[entryName]);
            }

            // 处理各个入口页面
            for (const entryName of entryNames) {
                const assets = assetsMap[entryName];
                const pageConfig = pageConfigMap[entryName] = Object.assign({}, globalConfig, pageConfigMap[entryName] || {});
                const pageBackgroundColor = pageConfig && (pageConfig.pageBackgroundColor || pageConfig.backgroundColor); // 兼容原有的 backgroundColor
                const reachBottom = pageConfig && pageConfig.reachBottom;
                const reachBottomDistance = pageConfig && pageConfig.reachBottomDistance;
                const pullDownRefresh = pageConfig && (pageConfig.pullDownRefresh || packageConfig.pullRefresh);
                // const rem = pageConfig && pageConfig.rem
                // const pageStyle = pageConfig && pageConfig.pageStyle
                const pageExtraConfig = pageConfig && pageConfig.extra || {};
                const packageName = subpackagesMap[entryName];
                const pageRoute = `${packageName ? packageName + '/' : ''}pages/${entryName}/index`;
                const assetPathPrefix = packageName && !needEmitConfigToSubpackage ? '../' : '';

                // 页面 js
                const pageJsContent = pageJsTmpl
                    .replace('/* CONFIG_PATH */', `${assetPathPrefix}../../config`)
                    .replace('/* INIT_FUNCTION */', `function init(window, document) {${assets.js.map(js => 'require(\'' + getAssetPath(assetPathPrefix, js, assetsSubpackageMap) + '\')(window, document)').join(';')}}`);

                addFile(compilation, `../${pageRoute}.js`, pageJsContent);

                // 页面 axml
                const pageAxmlContent = `<element a:if="{{pageId}}" class="{{bodyClass}}" style="{{bodyStyle}}" data-private-node-id="e-body" data-private-page-id="{{pageId}}" ${myCustomComponentRoot ? 'generic:custom-component="custom-component"' : ''}></element>`;
                // if (rem || pageStyle) {
                //     pageAxmlContent =
                //     `<page-meta ${rem ? 'root-font-size="{{rootFontSize}}"' : ''} ${pageStyle ? 'page-style="{{pageStyle}}"' : ''}></page-meta>`
                //     + pageAxmlContent
                // }
                addFile(compilation, `../${pageRoute}.axml`, pageAxmlContent);

                // 页面 acss
                let pageAcssContent = assets.css.map(css => `@import "${getAssetPath(assetPathPrefix, css, assetsSubpackageMap)}";`).join('\n');
                if (pageBackgroundColor) pageAcssContent = `page { background-color: ${pageBackgroundColor}; }\n` + pageAcssContent;
                addFile(compilation, `../${pageRoute}.acss`, adjustCss(pageAcssContent));

                // 页面 json
                const pageJson = {
                    ...pageExtraConfig,
                    pullRefresh: !!pullDownRefresh,
                    usingComponents: {
                        element: '@zhuowenli/miniapp-element',
                    },
                };
                if (myCustomComponentRoot) {
                    pageJson.usingComponents['custom-component'] = `${assetPathPrefix}../../custom-component/index`;
                }
                if (reachBottom && typeof reachBottomDistance === 'number') {
                    pageJson.onReachBottomDistance = reachBottomDistance;
                }
                const pageJsonContent = JSON.stringify(pageJson, null, '\t');
                addFile(compilation, `../${pageRoute}.json`, pageJsonContent);

                // 记录页面路径
                if (!packageName) pages.push(pageRoute);
            }

            // 追加 webview 页面
            if (options.redirect && (options.redirect.notFound === 'webview' || options.redirect.accessDenied === 'webview')) {
                addFile(compilation, '../pages/webview/index.js', 'Page({data:{url:\'\'},onLoad: function(query){this.setData({url:decodeURIComponent(query.url)})}})');
                addFile(compilation, '../pages/webview/index.axml', '<web-view src="{{url}}"></web-view>');
                addFile(compilation, '../pages/webview/index.acss', '');
                addFile(compilation, '../pages/webview/index.json', '{"usingComponents":{}}');
                pages.push('pages/webview/index');
            }

            const appConfig = generateConfig.app || 'default';
            const isEmitApp = appConfig !== 'noemit';
            const isEmitProjectConfig = appConfig !== 'noconfig';

            if (isEmitApp) {
                // app js
                const appAssets = assetsMap[appJsEntryName] || { js: [], css: [] };
                const appJsContent = appJsTmpl
                    .replace('/* INIT_FUNCTION */', `var fakeWindow = {};var fakeDocument = {};${appAssets.js.map(js => 'require(\'' + getAssetPath('', js, assetsSubpackageMap, '') + '\')(fakeWindow, fakeDocument);').join('')}var appConfig = fakeWindow.appOptions || {};`);
                addFile(compilation, '../app.js', appJsContent);

                // app acss
                const appAcssConfig = generateConfig.appAcss || 'default';
                let appAcssContent = appAcssConfig === 'none' ? '' : appAcssConfig === 'display' ? appDisplayAcssTmpl : appAcssTmpl;
                if (appAssets.css.length) {
                    appAcssContent += `\n${appAssets.css.map(css => `@import "${getAssetPath('', css, assetsSubpackageMap, '')}";`).join('\n')}`;
                }
                appAcssContent = adjustCss(appAcssContent);
                if (appAcssConfig !== 'none' && appAcssConfig !== 'display') {
                    appAcssContent += '\n' + appExtraAcssTmpl;
                }
                addFile(compilation, '../app.acss', appAcssContent);

                // app json
                const userAppJson = options.appExtraConfig || {};
                const appJson = {
                    pages,
                    window: generateConfig.window || {},
                    tabBar: tabBarConfig || {},
                    ...userAppJson,
                };
                const appJsonContent = JSON.stringify(appJson, null, '\t');
                addFile(compilation, '../app.json', appJsonContent);

                if (isEmitProjectConfig) {
                    // mini.project.json
                    const userProjectConfigJson = options.projectConfig || {};
                    // 这里需要深拷贝，不然数组相同引用指向一直 push
                    const projectConfigJson = JSON.parse(JSON.stringify(projectConfigJsonTmpl));
                    const projectConfigJsonContent = JSON.stringify(_.merge(projectConfigJson, userProjectConfigJson), null, '\t');
                    const projectConfigPath = generateConfig.projectConfig ? path.join(path.relative(outputPath, generateConfig.projectConfig), './mini.project.json') : '../mini.project.json';
                    addFile(compilation, projectConfigPath, projectConfigJsonContent);
                }

                // sitemap.json
                const userSitemapConfigJson = options.sitemapConfig;
                if (userSitemapConfigJson) {
                    const sitemapConfigJsonContent = JSON.stringify(userSitemapConfigJson, null, '\t');
                    addFile(compilation, '../sitemap.json', sitemapConfigJsonContent);
                }
            }

            // config js
            const router = {};
            if (options.router) {
                // 处理 router
                Object.keys(options.router).forEach(key => {
                    const pathObjList = [];
                    let pathList = options.router[key];
                    pathList = Array.isArray(pathList) ? pathList : [pathList];

                    for (const pathItem of pathList) {
                        // 将每个 route 转成正则并进行序列化
                        if (!pathItem || typeof pathItem !== 'string') continue;

                        const keys = [];
                        const regexp = pathToRegexp(pathItem, keys);
                        const pattern = regexp.valueOf();

                        pathObjList.push({
                            regexp: pattern.source,
                            options: `${pattern.global ? 'g' : ''}${pattern.ignoreCase ? 'i' : ''}${pattern.multiline ? 'm' : ''}`,
                        });
                    }
                    router[key] = pathObjList;
                });
            }
            const configJsContent = 'module.exports = ' + JSON.stringify({
                origin: options.origin || 'https://miniapp.default',
                entry: options.entry || '/',
                router,
                runtime: Object.assign({
                    subpackagesMap,
                    tabBarMap,
                    usingComponents: myCustomComponentConfig.usingComponents || {},
                }, options.runtime || {}),
                pages: pageConfigMap,
                redirect: options.redirect || {},
                optimization: options.optimization || {},
            }, null, '\t');
            if (needEmitConfigToSubpackage) {
                Object.keys(subpackagesConfig).forEach(packageName => {
                    addFile(compilation, `../${packageName}/config.js`, configJsContent);
                });
            } else {
                addFile(compilation, '../config.js', configJsContent);
            }

            // package.json
            const userPackageConfigJson = options.packageConfig || {};
            const packageConfigJson = Object.assign({}, packageConfigJsonTmpl);
            const packageConfigJsonContent = JSON.stringify(_.merge(packageConfigJson, userPackageConfigJson), null, '\t');
            addFile(compilation, '../package.json', packageConfigJsonContent);

            // node_modules
            addFile(compilation, '../node_modules/.miniapp', '');

            // 自定义组件，生成到 miniapp_npm 中
            if (myCustomComponentRoot) {
                _.copyDir(myCustomComponentRoot, path.resolve(outputPath, '../custom-component/components'));

                const realUsingComponents = {};
                const names = Object.keys(myCustomComponents);
                names.forEach(key => realUsingComponents[key] = `./components/${myCustomComponents[key].path}`);

                // custom-component/index.js
                addFile(compilation, '../custom-component/index.js', customComponentJsTmpl);

                // custom-component/index.axml
                addFile(compilation, '../custom-component/index.axml', names.map((key, index) => {
                    const { props = [], events = [] } = myCustomComponents[key];
                    return `<${key} a:${index === 0 ? 'if' : 'elif'}="{{name === '${key}'}}" id="{{id}}" class="{{class}}" style="{{style}}" ${props.map(name => name + '="{{' + name + '}}"').join(' ')} ${events.map(name => 'bind' + name + '="on' + name + '"').join(' ')}><slot/></${key}>`;
                }).join('\n'));

                // custom-component/index.acss
                addFile(compilation, '../custom-component/index.acss', '');

                // custom-component/index.json
                addFile(compilation, '../custom-component/index.json', JSON.stringify({
                    component: true,
                    usingComponents: realUsingComponents,
                }, null, '\t'));
            }

            callback();
        });

        // 处理头尾追加内容
        compiler.hooks.compilation.tap(PluginName, compilation => {
            const globalVarsConfig = generateConfig.globalVars || [];
            if (this.afterOptimizations) {
                compilation.hooks.afterOptimizeChunkAssets.tap(PluginName, chunks => {
                    wrapChunks(compilation, chunks, globalVarsConfig);
                });
            } else {
                compilation.hooks.optimizeChunkAssets.tapAsync(PluginName, (chunks, callback) => {
                    wrapChunks(compilation, chunks, globalVarsConfig);
                    callback();
                });
            }
        });

        // 处理自动安装小程序依赖
        let hasBuiltNpm = false;
        compiler.hooks.done.tapAsync(PluginName, (stats, callback) => {
            const autoBuildNpm = generateConfig.autoBuildNpm || false;
            const distDir = path.dirname(stats.compilation.outputOptions.path);

            hasBuiltNpm = _.isFileExisted(path.resolve(distDir, './node_modules/@zhuowenli/miniapp-element/package.json')) && _.isFileExisted(path.resolve(distDir, './node_modules/@zhuowenli/miniapp-render/package.json'));

            if (hasBuiltNpm || !autoBuildNpm) {
                if (hasBuiltNpm) console.log(colors.bold('\ndependencies has been built\n'));
                return callback();
            }

            // const build = () => {
            //     _.copyDir(
            //         path.resolve(distDir, './node_modules/@zhuowenli/miniapp-element/dist/ali'),
            //         path.resolve(distDir, './miniapp_npm/miniapp-element')
            //     );
            //     _.copyDir(
            //         path.resolve(distDir, './node_modules/@zhuowenli/miniapp-render/dist/ali'),
            //         path.resolve(distDir, './miniapp_npm/miniapp-render')
            //     );
            //     callback();
            // };
            console.log(colors.bold('\nstart building dependencies...\n'));

            const command = autoBuildNpm === 'yarn' ? 'yarn' : 'npm';
            execa(command, ['install', '--production'], { cwd: distDir }).then(({ exitCode }) => {
                if (!exitCode) {
                    console.log(colors.bold(`\nbuilt dependencies ${colors.green('successfully')}\n`));
                    // build()
                    // eslint-disable-next-line promise/no-callback-in-promise
                    callback();
                } else {
                    console.log(colors.bold(`\nbuilt dependencies ${colors.red('failed')}, please enter "${colors.yellow(distDir)}" and run install manually\n`));
                    // eslint-disable-next-line promise/no-callback-in-promise
                    callback();
                }
            }).catch(() => {
                console.log(colors.bold(`\nbuilt dependencies ${colors.red('failed')}, please enter "${colors.yellow(distDir)}" and run install manually\n`));
                // eslint-disable-next-line promise/no-callback-in-promise
                callback();
            });
        });
    }
}

module.exports = MpPlugin;
