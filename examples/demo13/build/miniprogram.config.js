module.exports = {
  origin: 'https://test.miniapp.com',
  entry: '/test/aaa',
  router: {
    index: ['/test/aaa'],
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
    projectname: 'tbone-demo13',
  },
  packageConfig: {
    author: 'wechat-miniapp',
  },
}