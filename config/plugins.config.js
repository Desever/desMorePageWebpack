const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const WebpackBar = require('webpackbar');
//页面生成数组
const {pageArray}=require("./page.config");



//根目录rootDoc
var webpackPluginsConfig=function(rootDoc,env){

    var addPageArray=[

        //打包进度
        new WebpackBar(),

        //复制文件
        new CopyWebpackPlugin([{
            from: './src/plugin/',
            to: rootDoc + "/dist/plugin"
        }]),
        
        //输出css文件
        new MiniCssExtractPlugin({　　
            filename: "style/[name].[chunkhash:12].css"
        }),

        //压缩css
        new optimizeCss(),
    
       
    ]
    for(var i=0;i<pageArray.length;i++){
        addPageArray.push(
            //首页
            new HtmlWebpackPlugin({
                filename: rootDoc + `/dist/${pageArray[i]}.html`,
                inject: 'footer',
                template: 'html-withimg-loader!' + rootDoc + `/src/${pageArray[i]}.html`,
                chunks: ["vendor","common",pageArray[i],],
                inlineSource: '.(js|css)$',
                loader: "raw-loader"
            })
        )
    }


    //如果是生产环境，删除dist文件
    if(env=="pro"){
        
        addPageArray.push(
             //设置每一次build之前先删除dist
            new CleanWebpackPlugin(
                //匹配删除的文件
                ['dist/*', 'dist/*', ], {
                    //根目录
                    root: rootDoc,
                    //开启在控制台输出信息
                    verbose: true,
                    //启用删除文件
                    dry: false
                }
            )
        )
    }


    //入口文件实例化
    var entry={};
    for(var i=0;i<pageArray.length;i++){
        entry[pageArray[i]]=`${rootDoc}/src/js/${pageArray[i]}.js`
    }
    return {
        addPageArray:addPageArray,
        entry:entry
    };
}

module.exports = webpackPluginsConfig;