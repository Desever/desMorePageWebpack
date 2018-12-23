var webpack = require('webpack');
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//引入webpack插件配置
const webpackPluginsConfig=require("./config/plugins.config")(__dirname,'pro');
console.log("========================================欢迎使用des多页应用Webpack配置pro中=================================");
module.exports = {
	// 配置入口
	entry: webpackPluginsConfig.entry,
	// 配置出口
	output: {
		path: __dirname + "/dist",
		filename: 'js/[name].[hash:12].js',
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.(htm|html)$/,
				use: [
				  'raw-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,//针对CSS结尾的文件设置LOADER
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require("autoprefixer")("last 100 versions")]
						}
					}
				]
			},
			{
				test: /\.less/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					'less-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require("autoprefixer")("last 100 versions")]
						}
					}
	            ]
			},
			
			//图片链接写入
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [{
					loader: "file-loader",
					options: {
						outputPath: 'img/'
					}
				}]
			}
		]
	},
	plugins:webpackPluginsConfig.addPageArray,

	optimization: {
		splitChunks: {
		  cacheGroups: {
			// 注意: priority属性
			// 其次: 打包业务中公共代码
			common: {
			  name: "common",
			  chunks: "all",
			  minSize: 1,
				priority: 0
			},
			// 首先: 打包node_modules中的文件
			vendor: {
			  name: "vendor",
			  test: /[\\/]node_modules[\\/]/,
			  chunks: "all",
			  priority: 10
			}
		  }
		}
	  },
	

	// 起本地服务，我起的dist目录
	devServer: {
		contentBase:path.resolve(__dirname, 'dist'),
		inline: true,
		hot: true,
		host: '192.168.1.107', //我的局域网ip
	}
}