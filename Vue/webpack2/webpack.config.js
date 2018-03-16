const path=require('path');
const glob=require('glob');
const uglify=require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractText=require('extract-text-webpack-plugin');
const PurifyCss=require('purifyCss-webpack');
const entry=require('./webpack.condig/entry_webpack.js');
const webpack=require('webpack');
const copyWebpackPlugin=require('copy-webpack-plugin');
//打包是否是开发和生产环境 dev 生产环境
console.log(encodeURIComponent(process.env.type));
if(process.env.type==2){
    var website = {
        publicPath: 'http://jspang.com:1717/'
    };
}else{
    // 绝对路径 防止出现找不到图片
    var website = {
        publicPath: 'http://192.168.1.98:1258/'
    };
}
module.exports={
    // devtool调试模式  打包调试 项目上线必须去除devtool
    // source-map 独立 map 打包慢，详细 行列
    // cheap-moudle-source-map 独立 map 不包括列告诉你在哪行出错
    // eval-source-map  开发阶段打包，性能存在安全隐患  小的项目
    // cheap-moudle-eval-source-map 列
    //  devtool:'cheap-moudle-source-map',
      // 入口  
      entry:entry.path,
     //  出口
      output:{
           path:path.resolve(__dirname,'dist'),
           filename:'[name].js',
           //    配置公用路径
           publicPath:website.publicPath
      },
     //  压缩 css,js 图片等
      module:{
          rules:[
            //   打包方法
               /*{
                    test:/\.css$/,
                    // use  可以是loader  可以是 use[{loader:"xxxx-loader"}]
                    use:['style-loadder','css-loader']
               },*/
            //    css不打包方法
              {
                  test: /\.css$/,
                  use: extractText.extract({
                      fallback: "style-loader",
                      use: ["css-loader",'postcss-loader']
                  })
                },
            //    图片处理
               {
                  test:/\.(png|jpg|gif)/,
                  use:[{
                    //   
                      loader:'url-loader',
                    //   大于5000字节自动拷贝小于的话是base64码
                      options:{
                          limit:5000,
                        //   打包生成到image文件下
                          outputPath:'image/'
                      }
                  }]
               },
            //    html打包
               {
                   test:/\.(htm|html)$/i,
                   use:['html-withimg-loader']
               },
            //    不分离less
             /*  {
                   test:/\.less$/,
                   use:[{
                       loader:'style-loader'
                   },{
                       loader:'css-loader'
                   },{
                       loader:'less-loader'
                   }]
               },*/
            //    分离
              {
                  test: /\.less$/,
                  use: extractText.extract({
                      use:[{
                          loader:'css-loader'
                      },{
                          loader:'less-loader'
                      }],
                      fallback: "style-loader", 
                  })
              },
            //   js转换
              {
                  test:/\.(jsx|js)$/,
                  use:[
                      {
                      loader:'babel-loader',
                  }],
                //   去除掉node_modules文件里面
                  exclude:'/node_modules/'
              }
          ] 
      },
     //  插件引入  
      plugins:[
        //   静态资源集中处理
         new copyWebpackPlugin([{
             from:__dirname+'/src/public',
             to:'./public'
         }]),
        //   第三方库抽离开插件
          new webpack.optimize.CommonsChunkPlugin({
             name:['jquery','vue'],
             filename:"assets/js/[name].min.js",
             minChunks:2
          }),
        //   引入第三方库
          new webpack.ProvidePlugin({
             $:"jquery",    
          }),
        //   压缩js 
        // new uglify(),
        // 压缩html
        new htmlPlugin({
            // 压缩
            minify:{
                // 去引号
                removeAttributeQuotes:true
            },
            // 参数防止缓存
            hash:true,
            // 模板路径
            template:'./src/index.html'
        }),
        // 分离 css插件
        new extractText('css/index.css'),
        // 去掉没用的css插件
        new PurifyCss({
            // 配置 搜索src 下的所有html
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        }),
        // 签名版权所有
        new webpack.BannerPlugin('前端开发人员：聂旭')
      ],
      // 配置webpack开发服务功能
      devServer:{
          //  基本目录结构 路径
           contentBase: path.resolve(__dirname, 'dist'),
          //  http地址
           host:'192.168.1.104',
           // 服务器压缩
           compress: true,
           //  端口
           port:1258  
      },
    //   监测自动打包
      watchOptions:{
          //   检测修改时间
          poll:1000,
        //   禁止重复打包
          aggregateTimeout:500,
        //   不包括什么
          ignored:/node_modules/
      }
};