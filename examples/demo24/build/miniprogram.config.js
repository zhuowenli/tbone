module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        page1: ['/a'],
        page2: ['/b'],
        page3: ['/c'],
    },
    redirect: {
        notFound: 'page1',
        accessDenied: 'page1',
    },
    runtime: {
        cookieStore: 'globalstorage',
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo24',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
