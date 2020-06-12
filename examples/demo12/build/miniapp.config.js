module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/view1',
    router: {
        index: ['/view1', '/view2'],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
    },
    // app.json
    generate: {
        autoBuildNpm: 'yarn',
        window: {
            defaultTitle: 'zhuowenli\'s miniapp',
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
        author: 'lvjian',
    },
};
