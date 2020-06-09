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
    runtime: {
        cookieStore: 'globalstorage',
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
}
