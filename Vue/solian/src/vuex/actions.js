
export default{
      _setLogin({commit},data){
            // 可以在这里发送请求验证用户登录信息
            let res={
                  data:data,
                  type:data.isType  
            }
            commit('_setUseInfo', res)
            data.callBack && data.callBack();
           
      },
       _setReiger({commit},data){
            // 可以在这里发送请求验证用户登录信息
            let res={
                  data:data,
                  type:data.isType  
            }
            commit('_setUseInfo', res)
            data.callBack && data.callBack();
           
      }
}