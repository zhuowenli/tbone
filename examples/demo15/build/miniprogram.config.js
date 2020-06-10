module.exports = {
	origin: 'https://test.miniprogram.com',
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
		autoBuildNpm: false,
	},
	app: {
		navigationBarTitleText: 'miniprogram-project',
	},
	projectConfig: {
		appid: '',
        projectname: 'tbone-demo15',
	},
	packageConfig: {
		author: 'wechat-miniprogram',
	},
}