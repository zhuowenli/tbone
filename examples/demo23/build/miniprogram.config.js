module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/test',
    router: {
        index: ['/test'],
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
        projectname: 'tbone-demo23',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
