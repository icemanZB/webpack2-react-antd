let path                  = require('path'),
    webpack               = require('webpack'),
    merge                 = require('webpack-merge'),
    baseWebpackConfig     = require('./webpack.base.conf'),
    HtmlWebpackPlugin     = require('html-webpack-plugin'),
    ExtractTextPlugin     = require('extract-text-webpack-plugin'),
    OptimizeCSSPlugin     = require('optimize-css-assets-webpack-plugin'),
    CleanWebpackPlugin    = require('clean-webpack-plugin'),
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    config                = require('./config'),
    utils                 = require('./utils');

module.exports = merge(baseWebpackConfig, {
	module : {
		rules: [{
			test: /\.css$/,
			use : ExtractTextPlugin.extract({
				fallback: "style-loader",
				use     : [{
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
		filename     : `js/[name].js?v=${utils.getVersion()}`,
		chunkFilename: `js/[name].js?v=${utils.getVersion()}`
	},
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),

		// clean-webpack-plugin ^0.1.16 版本接口改了
		new CleanWebpackPlugin('dist', {
			root   : path.resolve(__dirname, '..'),
			verbose: true
		}),

		new webpack.optimize.UglifyJsPlugin({
			output  : {
				comments: false
			},
			compress: {
				warnings: false
			}
		}),

		new ExtractTextPlugin(`css/[name].css?v=${utils.getVersion()}`),

		// OptimizeCSSPlugin
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),

		new HtmlWebpackPlugin({
			filename      : path.resolve(__dirname, '../dist/index.html'),
			template      : path.resolve(__dirname, '../src/index_build.html'),
			title         : 'react',
			inject        : true,
			minify        : {
				removeComments       : true,
				collapseWhitespace   : true,
				removeAttributeQuotes: true
			},
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