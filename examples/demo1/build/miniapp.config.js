module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/test/aaa',
    router: {
        index: [
            '/test/aaa',
            '/test/bbb',
        ],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
    },

    // app.json
    generate: {
        globalVars: [
            ['TEST_VAR_STRING', '\'miniapp\''],
            ['TEST_VAR_NUMBER', '123'],
            ['TEST_VAR_BOOL', 'true'],
            ['TEST_VAR_FUNCTION', 'function() {return \'I am function\'}'],
            ['TEST_VAR_OTHERS', 'window.document'],
            ['open'],
        ],
        autoBuildNpm: 'yarn',
        window: {
            defaultTitle: '欢乐逛',
            titleBarColor: '#ffffff',
            navigationBarForceEnable: true
        },
        tabBar: {
            color: '#000000',
            selectedColor: '#d92424',
            backgroundColor: '#ffffff',
            fontSize: '20px',
            iconWidth: '44px',
            list: [
                {
                    pagePath: 'pages/index/index',
                    iconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/home.png',
                    selectedIconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/home-active.png',
                    text: '首页'
                },
                {
                    pagePath: 'pages/promotion/index',
                    iconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/promotion.png',
                    selectedIconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/promotion-active.png',
                    text: '促销'
                },
                {
                    pagePath: 'pages/baobei/index',
                    iconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/baobei.png',
                    selectedIconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/baobei-active.png',
                    text: '宝贝'
                },
                {
                    pagePath: 'pages/order/index',
                    iconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/order.png',
                    selectedIconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/order-active.png',
                    text: '订单'
                },
                {
                    pagePath: 'pages/my/index',
                    iconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/my.png',
                    selectedIconPath: 'https://alicdn.dancf.com/miniapp-qianniu/static/my-active.png',
                    text: '我的'
                }
            ]
        }
    },

    // mini.project.json
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

    // package.json
    packageConfig: {
        author: 'lvjian',
    },
}
