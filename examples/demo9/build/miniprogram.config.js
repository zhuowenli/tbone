const path = require('path')

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
    generate: {
        tabBar: {
            color: '#000000',
            selectedColor: '#07c160',
            backgroundColor: '#ffffff',
            list: [{
                pageName: 'page1',
                text: 'page1',
                iconPath: path.resolve(__dirname, '../src/img/page1.png'),
                selectedIconPath: path.resolve(__dirname, '../src/img/page1-sel.png'),
            }, {
                pageName: 'page2',
                text: 'page2',
                iconPath: path.resolve(__dirname, '../src/img/page2.png'),
                selectedIconPath: path.resolve(__dirname, '../src/img/page2-sel.png'),
            }],
        },
    },
    app: {
        navigationBarTitleText: 'miniapp-project',
    },
    projectConfig: {
        appid: '',
        projectname: 'tbone-demo9',
    },
    packageConfig: {
        author: 'wechat-miniapp',
    },
}
