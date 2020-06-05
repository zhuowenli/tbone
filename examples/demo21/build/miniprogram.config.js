module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        page1: ['/'],
        page2: ['/detail'],
    },
    redirect: {
        notFound: 'page1',
        accessDenied: 'page1',
    },
    generate: {
        app: 'noemit',
        subpackages: {
            package1: ['page1', 'page2'],
        },
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo21',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
