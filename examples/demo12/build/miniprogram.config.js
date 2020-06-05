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
	generate: {
		app: 'noemit',
	},
	app: {
		navigationBarTitleText: 'miniapp-project',
	},
	projectConfig: {
		appid: '',
        projectname: 'tbone-demo12',
	},
	packageConfig: {
		author: 'wechat-miniapp',
	},
}