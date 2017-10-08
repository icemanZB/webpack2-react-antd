let path                  = require('path'),
    webpack               = require('webpack'),
    merge                 = require('webpack-merge'),
    baseWebpackConfig     = require('./webpack.base.conf'),
    HtmlWebpackPlugin     = require('html-webpack-plugin'),
    ExtractTextPlugin     = require('extract-text-webpack-plugin'),
    OptimizeCSSPlugin     = require('optimize-css-assets-webpack-plugin'),
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    config                = require('./config'),
    utils                 = require('./utils');

module.exports = merge(baseWebpackConfig, {
	module : {
		rules: [
			{
				test: /\.css$/,
				use : ExtractTextPlugin.extract({
					fallback: "style-loader",
					use     : [
						{
							loader : 'css-loader',
							options: {
								modules      : true,
								importLoaders: 1
							}
						},
						{
							loader : 'postcss-loader',
							options: {
								plugins: function () {
									return [require('autoprefixer')()];
								}
							}
						}
					]
				})
			},
			{
				test: /\.less$/,
				use : ExtractTextPlugin.extract({
					fallback: "style-loader",
					use     : [
						'css-loader',
						{
							loader : 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')()]
							}
						},
						'less-loader'
					]
				})
			}
		]
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output : {
		path         : config.build.assetsRoot,
		// 给 filename 增加相对路径
		filename     : `js/[name].js?v=${utils.getVersion()}`,
		chunkFilename: `js/[name].js?v=${utils.getVersion()}`
	},
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),

		/*new webpack.optimize.UglifyJsPlugin({
			output  : {
				comments: false
			},
			compress: {
				warnings: false
			}
		}),*/

		new ExtractTextPlugin(`css/[name].css?v=${utils.getVersion()}`),

		// OptimizeCSSPlugin
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		//压缩css代码的，还能去掉extract-text-webpack-plugin插件抽离文件产生的重复代码，因为同一个css可能在多个模块中出现所以会导致重复代码，一般都是配合使用
		/*new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),*/

		
		new HtmlWebpackPlugin({
			// 这里也指定了一个相对路径，可以直接写文件名
			// filename      : path.resolve(__dirname, '../dist/index.html'),
			// // 当 output : { path : config.build.assetsRoot }指向的这个目录时，插件的输出目录页会指向 output 中的 path
			filename	  :'index.html',
			template      : path.resolve(__dirname, '../src/index_build.html'),
			title         : 'react',
			inject        : true,
			/*minify        : {
				removeComments       : true,  // 删除注释
				collapseWhitespace   : true,  // 删除空格
				removeAttributeQuotes: true
			},*/
			chunksSortMode: 'dependency'
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module) {
				return (
					module.resource &&
					/\.js|\.less$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name  : 'mainfest',
			chunks: ['vendor']
		}),

		new TransferWebpackPlugin(
			[{
				from: 'static/',
				to  : '/static/'
			}], config.commonPath.rootPath
		)


	]
});