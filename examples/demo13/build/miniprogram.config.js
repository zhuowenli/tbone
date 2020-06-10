module.exports = {
  origin: 'https://test.miniprogram.com',
  entry: '/test/aaa',
  router: {
    index: ['/test/aaa'],
  },
  redirect: {
    notFound: 'index',
    accessDenied: 'index',
  },
  app: {
    navigationBarTitleText: 'miniprogram-project',
  },
  projectConfig: {
    appid: '',
    projectname: 'tbone-demo13',
  },
  packageConfig: {
    author: 'wechat-miniprogram',
  },
}