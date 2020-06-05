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
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo16',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
