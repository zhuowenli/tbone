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
    generate: {
        subpackages: {
            package1: ['page2'],
            package2: ['page3', 'page4'],
        },
        preloadRule: {
            page2: {
                network: 'all',
                packages: ['package2'],
            },
        },
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo7',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
