const path=require('path');
// js打包引入 uglify
const uglify=require('uglifyjs-webpack-plugin');
module.exports={
     // 入口 多入口
      entry:{
          //  名字自定义
           entry:'./src/entry.js',
           entry2:'./src/entry2.js'
      },
     //  出口 多出口
      output:{
          //  node的语法 path绝对路径
           path:path.resolve(__dirname,'dist'),
          //  打包名字 多出口[xxx].js,单出口bundle.js
           filename:'[name].js'   
      },
     //模块，如解读css,图片如何转换，压缩  
     module:{
          // 打包css rules 规则 less sass等
          rules:[
               {
                    // 找到css 文件 正则表达
                  test:/\.css$/,
                  //    用哪些 use loader
                  use:["style-loader","css-loader"]
               }
          ]
     },
     // 插件  用户生产模块和各项功能
     plugins:[
          new uglify()
     ],
     // 配置webpack开发服务功能
     devServer:{
          // 基本目录结构
          contentBase: path.resolve(__dirname, 'dist'),
          // 服务器地址
          host:'192.168.1.112',
          // 服务器压缩
          compress:true,
          // 端口
          port:8010
     }
}