module.exports = {
	origin: 'https://test.miniprogram.com',
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
		navigationBarTitleText: 'miniprogram-project',
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
		author: 'wechat-miniprogram',
	},
}