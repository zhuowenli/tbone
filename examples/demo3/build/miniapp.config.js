module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        index: [
            '/',
        ],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
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
