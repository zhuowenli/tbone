module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        page1: ['/'],
        page2: ['/page2'],
        page3: ['/page3'],
        page4: ['/page4'],
    },
    redirect: {
        notFound: 'page1',
        accessDenied: 'page1',
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo22',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
