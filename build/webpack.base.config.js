/**
 * 公共配置
 */
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
//提供打包日志输出
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

//拼接dirname 和传入的文件路径 得到绝对路径
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProd ? 'production' : 'development',
    output: {
        path: resolve('../dist/'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            // 路径别名，@ 指向 src
            '@': resolve('../src/'),
            'public': path.resolve(__dirname, '../public')
        },
        // 可以省略的扩展名
        // 当省略扩展名的时候，按照从前往后的顺序依次解析
        extensions: ['.js', '.vue', '.json']
    },

    //source map
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

    module: {
        rules: [
            // 处理图片资源
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit:8192,
                        esModule:false
                    },
                }, ],
            },

            // 处理字体资源
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },

            // 处理 .vue 资源
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { 
                test: /\.scss$/,
                loaders: ["vue-style-loader","css-loader", "sass-loader"]
            },
            // 处理 CSS 资源
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },

            // CSS 预处理器，参考：https://vue-loader.vuejs.org/zh/guide/pre-processors.html
            // 例如处理 Less 资源
            // {
            //   test: /\.less$/,
            //   use: [
            //     'vue-style-loader',
            //     'css-loader',
            //     'less-loader'
            //   ]
            // },
        ]
    },
    plugins: [
        //打包.vue资源
        new VueLoaderPlugin(),
        //打包错误日志输出
        new FriendlyErrorsWebpackPlugin(),
        new CopyPlugin([{from:'./public',to:'public',writeToDisk:true}])
    ]
}