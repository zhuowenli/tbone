module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        page1: ['/a'],
        page2: ['/b'],
        page3: ['/c'],
    },
    redirect: {
        notFound: 'page1',
        accessDenied: 'page1',
    },
    // app.json
    generate: {
        autoBuildNpm: 'yarn',
        window: {
            defaultTitle: 'zhuowenli\'s miniapp',
            titleBarColor: '#ffffff',
            navigationBarForceEnable: true
        },
        tabBar: {
            color: '#000000',
            selectedColor: '#07c160',
            backgroundColor: '#ffffff',
            items: [{
                pagePath: 'pages/page1/index',
                text: 'page1',
                icon: 'https://alicdn.dancf.com/miniapp-qianniu/static/home.png',
                activeIcon: 'https://alicdn.dancf.com/miniapp-qianniu/static/home-active.png'
            }, {
                pageName: 'pages/page2/index',
                text: 'page2',
                icon: 'https://alicdn.dancf.com/miniapp-qianniu/static/baobei.png',
                activeIcon: 'https://alicdn.dancf.com/miniapp-qianniu/static/baobei-active.png'
            }],
        },
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
