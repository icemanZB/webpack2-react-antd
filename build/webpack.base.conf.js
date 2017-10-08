let config = require('./config'),
    fs     = require('fs'),
    path   = require('path');

module.exports = {
	entry  : {
		'index': './src/index.js'
	},
	output : {
		path         : config.build.assetsPublicPath,
		// 他就是一个占位符，在 html 中引用的 js 路径，就会被替换为绝对地址，并且以这个开头的路径
		publicPath   : config.dev.assetsPublicPath,
		filename     : '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		// 告诉 webpack 解析模块时应该搜索的目录，避免向上递归搜索的方式去寻找
		modules   : [path.resolve(__dirname, "src"), "node_modules"],
		alias     : {
			'src': config.commonPath.src
		}
	},
	module : {
		// 如果你确定一个模块中，没有其它新的依赖，就可以配置这项
		// Webpack 将不再扫描这个文件中的依赖，这对于比较大型类库，将能促进性能表现。
		// noParse: /node_modules\/(element-ui\.js)/,
		rules: [
			{
				test   : /\.jsx?$/,
				// cacheDirectory=true 使用 babel 缓存
				loader : 'babel-loader?cacheDirectory=true',
				exclude: /node_modules/,
				include: path.join(__dirname, '..', 'src')
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use : ['file-loader']
			}
		]
	}
};