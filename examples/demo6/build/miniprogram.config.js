module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/test/aaa',
    router: {
        index: [
            '/test/aaa',
            '/test/bbb',
        ],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo6',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
