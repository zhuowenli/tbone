/*
 * Author: 卓文理
 * Email: zhuowenligg@gmail.com
 * Date: 2020-06-29 14:37:33
 */

const path = require('path');
const { createConfig } = require('./build-tools');

const target = {
    chrome: 52,
    firefox: 48,
    safari: 9,
    ie: 11
};

module.exports = createConfig({
    entry: {
        main: path.join(__dirname, '../src/main.js'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    devtool: '#cheap-module-source-map'
}, target);
