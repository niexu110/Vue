import { getLoc, clearKey, setLoc} from '../assets/js/fn.js'

export default{
     _setUseInfo(state,data){
             state.userInfo=data.type;
             state.common=data.data
             console.log(state.userInfo)
             setLoc('isLogin',data.type)
       },
      _loginOut(state){
           clearKey();
           state.userInfo=0;
           state.common={} 
           
      } 
}