const path = require('path')

module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        index: ['/'],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
    },
    // app.json
    generate: {
        myCustomComponent: {
            root: path.join(__dirname, '../src/custom-components'),
            usingComponents: {
                'comp-a': {
                    path: 'comp-a',
                    props: ['prefix', 'suffix'],
                    events: ['someevent'],
                },
                'comp-b': {
                    path: 'comp-b/index',
                    props: ['prefix'],
                },
                'comp-c': 'comp-c',
            },
        },
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
