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
    generate: {
        wxCustomComponent: {
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
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo10',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
