<template>
  <div v-wechat-title='$route.meta.title'>
    <div class='view'>
       <div class='hasTop'>
          <div class='hasLogo'>
             <img src="../../assets/image/login/logo.png">
             <p>让天下所有人找到真爱</p>
            </div>
            <div class='hasOption'>
              <span :class='classNameA' @click='tabS(1)'>登录</span>
              <span :class='classNameB' @click='tabS(2)'>注册</span>
            </div>    
       </div> 
       <div class='hasLogin' v-if="loginTemp">
          <div class='list user'>
            <input type="text"  placeholder="请输入账号/手机号" 
            maxlength="11" @blur="checkBlur('phone',phone)"  v-model='phone'>
          </div>
          <div class='list psd'>
            <input type="password"  placeholder="请输入密码" minlength="6" maxlength="18"
            @blur="checkBlur('psd',psd)"  v-model='psd'>
            <router-link to="*" class='forget'>忘记密码？</router-link>
          </div>
          <div :class="isLogin?'loginBtn':'loginDel'" @click='login'>登录</div>
      </div>
          <div class='hasReigter' v-if="reigterTemp">
                 <div class='list reigterUser'>
                    <input type="text"  placeholder="请输入账号/手机号" 
                    maxlength="11" @blur="checkBlur('regPhone',phone)"  v-model='phone'>
                 </div>
                 <div class='list reigterCode'>
                    <input type="text"  placeholder="请输入验证码" 
                    maxlength="4" @blur="checkBlur('code',code)"  v-model='code'>
                    <span @click='codeTime()'>{{msg}}</span>
                 </div>
                 <div class='list psd'>
                  <input type="password"  placeholder="请输入6-18密码" minlength="6" maxlength="18"
                  @blur="checkBlur('regPsd',psd)"  v-model='psd'>
                   <div :class="isReigter?'regiterBtn':'regiterDel'" @click='reigter'>完成</div>
                </div>
                 <div class='list invite'>
                  <input type="text"  placeholder="请输入邀请码(选填)" maxlength="8"
                  @blur="checkBlur('invite',invite)"  v-model='invite'>
                </div>
          </div> 
    </div>
    <div id='popup'></div>
  </div>
</template>
<script>
import { checkPhone, checkPsd,showEl,setLoc } from '../../assets/js/fn.js'
     export default{
         name:'login',
         data(){
              return{
                loginTemp:true,
                reigterTemp:false,
                isLogin:false,//能否登录
                isReigter:false,//能否注册
                phone:'',
                code:'',
                code2:1234,
                psd:'',
                invite:'',//邀请码
                time:60,
                msg:'获取验证码',
                isTime:true,
                classNameA:'hasOptionA',
                classNameB:'hasOptionB',
                loginSen:{
                   username:undefined,
                   password:undefined,
                   cmd:this.$api.login,
                   type:0
                },
                reigterSen:{
                  phone:undefined,
                  password:undefined,
                  code:undefined,
                  cmd:this.$api.reigter
                }
              }
         },
         created:function(){
           
         },
         mounted:function(){

         },
         methods:{
            tabS(name){
              if(name=='1'){
                this.loginTemp=true
                this.reigterTemp=false
                this.classNameA='hasOptionA'
                this.classNameB='hasOptionB'
              }else{
                this.loginTemp=false
                this.reigterTemp=true
                this.classNameA='hasOptionB'
                this.classNameB='hasOptionA'
              }
            },
            // 失焦
            checkBlur(...arg){
              // 登陆 处理
              if(arg[0]=='phone'){
                 checkPhone(arg[1])?
                 this.loginSen.username=this.phone
                 :(this.loginSen.username=undefined,showEl('手机号有误',2000));
               }else if(arg[0]=='psd'){
                   checkPsd(arg[1])?
                   this.loginSen.password=this.psd
                   :(this.loginSen.password=undefined,showEl('密码格式不对',2000));
              }else if(arg[0]=='regPhone'){
                 checkPhone(arg[1])?
                 (this.reigterSen.phone=this.phone)
                 :(this.reigterSen.phone=undefined,showEl('手机号有误',2000));
              }else if(arg[0]=='code'){
                  this.code2==arg[1]?
                  this.reigterSen.code=this.code2
                  :(this.reigterSen.code=undefined,showEl('验证码有误',2000))
              }else if(arg[0]=='regPsd'){
                  checkPsd(arg[1])?
                   this.reigterSen.password=this.psd
                   :(this.reigterSen.password=undefined,showEl('密码格式不对',2000));
              }else{
                this.reigterSen.invite=arg[1];
              }    
              this.loginSen.username!=undefined
                   &&this.loginSen.password!=undefined?
                     this.isLogin=true: this.isLogin=false;
              this.reigterSen.phone!=undefined
                   &&this.reigterSen.password!=undefined
                   &&this.code1!=this.reigterSen.code?
                     this.isReigter=true: this.isReigter=false;  
            },
            // 获取验证码
            codeTime(){
               if(this.isTime){
                  this.isTime=false
                  let timer=setInterval(()=>{
                    this.time--;
                    if(this.time<=0){
                       this.time=60;
                       clearInterval(timer);
                       this.msg='发送验证码';this.isTime=true;             
                    }else{
                      this.msg=this.time+'s后再次发送' 
                    }
                  },1000)
                  console.log('发送ajax')
               }
            },
            // 登陆
            login(){
               if(this.isLogin){
                 showEl('登陆成功',1500);
                 setLoc('isLogin',1)
                     setTimeout(() => {
                       this.$router.push('/index')
                     }, 2000);
               }else{
                 return;
               }
            },
            // 注册
            reigter(){
              if(this.isReigter){
                showEl('注册成功',1500);
                setLoc('isLogin',1)
                  setTimeout(() => {
                       this.$router.push('/index')
                     }, 2000);
              }
            } 
         },
     }
</script>
<style lang="less" scoped>
  .view{
    padding:0;
    .hasTop{
      position: relative;width:7.5rem;height:4.2rem;background:url('../../assets/image/login/bg.png')no-repeat;
      background-size:7.5rem;
      .hasLogo{
        position: absolute;left:0;top:1.4rem;width:7.5rem;height:auto;text-align: center;
        img{height:.5rem;}
        p{font-size:.3rem;color:#fff;padding-top:.1rem;}
      }
      .hasOption{
        width:7.5rem;height:auto;display: flex;position: absolute;left:0;bottom:0;
        .hasOptionA{
          width:50%;height:1rem;line-height:1rem;color:#f83444;text-align:center;font-size:.28rem;
          background:url('../../assets/image/login/branch.png')no-repeat bottom;
          background-size:.25rem;
        }
        .hasOptionB{
           width:50%;height:1rem;line-height:1rem;color:#fff;text-align:center;font-size:.28rem;
        }
      }     
    }  
  }
  .list{
    height:1.4rem;border-bottom:1px solid #ddd;
    input{color:#333;width:4rem;height:.6rem;font-size:.3rem;margin-left:1.2rem;margin-top:.6rem;}
    span{position: absolute;right:.3rem;top:.7rem; color:#f83444;font-size:.28rem;}
  }
  .user{background:url('../../assets/image/login/user.png') no-repeat .3rem .6rem;background-size:.4rem;}
  .psd{background:url('../../assets/image/login/password.png') no-repeat .3rem .6rem;background-size:.4rem;}
  .forget{position:absolute;right:.3rem;top:.7rem;color:#999;font-size:.3rem; }
  .loginDel{
    width:6.9rem;height:.9rem;line-height:.9rem;font-size:.32rem;color:#fff;text-align:center;
    border-radius:40px;background:#fdc2c7;margin: .5rem auto;   
  }
  .loginBtn{
    width:6.9rem;height:.9rem;line-height:.9rem;font-size:.32rem;color:#fff;text-align:center;
    border-radius:40px;background:rgb(248, 52, 68);margin: .5rem auto;   
  }
  // 注册
  .reigterUser{background:url('../../assets/image/login/tell.png') no-repeat .3rem .6rem;background-size:.4rem;}
  .reigterCode{background:url('../../assets/image/login/code.png') no-repeat .3rem .6rem;background-size:.4rem;}
  .invite{background:url('../../assets/image/login/invite.png') no-repeat .3rem .6rem;background-size:.4rem;}
  .regiterBtn{
    width:2rem;height:.8rem;line-height:.8rem;font-size:.32rem;color:#fff;text-align:center;
    border-radius:40px;background:rgb(248, 52, 68);position: absolute;right:.3rem;top:.4rem;} 
  .regiterDel{
    width:2rem;height:.8rem;line-height:.8rem;font-size:.32rem;color:#fff;text-align:center;
    border-radius:40px;background:#fdc2c7;position: absolute;right:.3rem;top:.4rem;} 
</style>

