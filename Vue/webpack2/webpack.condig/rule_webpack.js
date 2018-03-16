const rule={};
rule.path ={
     rules: [
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
                    use: ["css-loader", 'postcss-loader']
               })
          },
          //    图片处理
          {
               test: /\.(png|jpg|gif)/,
               use: [{
                    //   
                    loader: 'url-loader',
                    //   大于5000字节自动拷贝小于的话是base64码
                    options: {
                         limit: 5000,
                         //   打包生成到image文件下
                         outputPath: 'image/'
                    }
               }]
          },
          //    html打包
          {
               test: /\.(htm|html)$/i,
               use: ['html-withimg-loader']
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
                    use: [{
                         loader: 'css-loader'
                    }, {
                         loader: 'less-loader'
                    }],
                    fallback: "style-loader",
               })
          },
          //   js转换
          {
               test: /\.(jsx|js)$/,
               use: [
                    {
                         loader: 'babel-loader',
                    }],
               //   去除掉node_modules文件里面
               exclude: '/node_modules/'
          }
     ]
},
module.exports = rule;