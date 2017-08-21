let config = require('./config'),
    fs     = require('fs'),
    path   = require('path');

module.exports = {
	entry  : {
		'index': './src/index.js'
	},
	output : {
		path         : config.build.assetsPublicPath,
		publicPath   : config.dev.assetsPublicPath,
		filename     : '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias     : {
			'src': config.commonPath.src
		}
	},
	module : {
		rules: [
			{
				test   : /\.jsx?$/,
				loader : 'babel-loader',
				include: path.join(__dirname, '..', 'src')
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use : ['file-loader']
			}
		]
	}
};