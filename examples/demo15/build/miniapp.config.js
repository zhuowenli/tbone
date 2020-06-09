module.exports = {
    origin: 'https://test.miniapp.com',
    entry: '/',
    router: {
        index: ['/'],
        bar: ['/bar'],
        scatter: ['/scatter'],
        pie: ['/pie'],
        line: ['/line'],
        funnel: ['/funnel'],
        gauge: ['/gauge'],
        k: ['/k'],
        radar: ['/radar'],
        heatmap: ['/heatmap'],
        tree: ['/tree'],
        treemap: ['/treemap'],
        sunburst: ['/sunburst'],
        map: ['/map'],
        graph: ['/graph'],
        boxplot: ['/boxplot'],
        parallel: ['/parallel'],
        sankey: ['/sankey'],
        themeriver: ['/themeriver'],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
    },
    // app.json
    generate: {
        autoBuildNpm: 'yarn',
        window: {
            defaultTitle: '@zhuowenli\'s tbone demo',
            titleBarColor: '#ffffff',
            navigationBarForceEnable: true
        },
    },

    // mini.project.json
    projectConfig: {
        cloud: {
            type: 'CLOUDAPP'
        },
        miniappRoot: '.',
        component2: true,
        axmlStrictCheck: true,
        enableParallelLoader: true,
        enableDistFileMinify: true,
    },

    // package.json
    packageConfig: {
        author: 'zhuowenli',
    },
}
