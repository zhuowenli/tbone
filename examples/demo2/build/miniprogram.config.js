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
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    global: {
        extra: {
            navigationBarTextStyle: 'black',
        },
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo2',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
