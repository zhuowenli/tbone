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
