const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    
    // 路径相关
    resolve: {
        // @代表从src开始的路径
        alias : {
            '@' : path.resolve(__dirname, 'src') 
        },
        // 省略后缀
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css', 'less'],
    },
    entry: {
        index: "./src/pages/index.js",         
        index1: "./src/pages/index1.js"
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name].bundle.js',
        chunkFilename: "[id].chunk.js"
    },
    module: {
        rules: [
            // {  
            //     test : /\.css$/,
            //     use : ExtractTextPlugin.extract({ 
            //         fallback: 'style-loader',
            //         use: 'css-loader',
            //     }),
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.less$/,
                use: ['less-loader']
            }
        ]
    },
    plugins: [
         // 引入插件，配置文件名，这里同样可以使用 [hash]
        // new ExtractTextPlugin('index.css'),
        new HtmlWebpackPlugin({
            hash : true,          
            filename: 'html/index1.html', // 配置输出文件名和路径
            template: './src/index1.html', // 配置文件模板
            chunks : ['index1']//这个能自动将该html的入口js引用
        }), // Generates default index.html
        new HtmlWebpackPlugin({                      
            filename: 'html/index.html', // 配置输出文件名和路径
            template: './src/index.html', // 配置文件模板
            chunks : ['index']            
        })
    ],
    devServer: {
        contentBase: "/dist", 
        historyApiFallback: true, 
        inline: true //实时刷新
    },
};