module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        page1: ['/a'],
        page2: ['/b'],
        page3: ['/c'],
        page4: ['/d/:id'],
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
        // subpackages: {
        //     package1: ['page2'],
        //     package2: ['page3', 'page4'],
        // },
        // preloadRule: {
        //     page2: {
        //         network: 'all',
        //         packages: ['package2'],
        //     },
        // },
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
