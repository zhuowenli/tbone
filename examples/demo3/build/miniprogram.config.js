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
    generate: {
        appWxss: 'none',
    },
    runtime: {
        // wxComponent: 'noprefix',
        wxComponent: 'default',
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    global: {
        windowScroll: true,
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo3',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
