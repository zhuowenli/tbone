module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        page1: ['/'],
        page2: ['/page2'],
        page3: ['/page3'],
        page4: ['/page4'],
    },
    redirect: {
        notFound: 'page1',
        accessDenied: 'page1',
    },
    // app.json
    generate: {
        autoBuildNpm: 'yarn',
        window: {
            defaultTitle: '@zhuowenli\'s tbone demo',
            titleBarColor: '#ffffff',
            navigationBarForceEnable: true
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
        author: 'zhuowenli',
    },
}
