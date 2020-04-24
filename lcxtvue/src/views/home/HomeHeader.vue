<template>
       <div class="header_container">
       <div class="header_box">
              <div class="header_img">
                  <a href="javascript:;">
                      <img src="../../assets/logo.png" height="30" width="30"/>
                      <span>XX理财</span>
                  </a>

              </div>
              <div class="header_right">
                  <div  class="option" :class="sign=='personalCenter'?'active':''" @click="exchangeSignCenter('personalCenter')"><span class="other" ><a href="javascript:;">个人中心</a></span></div>
<!--                  <div v-show="!isLogin" class="option" :class="sign==4?'active':''" @click="exchangeSign(4,)"><span class="login" ><a href="javascript:;">登录/注册</a></span></div>-->
                  <div class="option" :class="sign=='helpCenter'?'active':''" @click="exchangeSign('helpCenter')"><span class="other" ><a href="javascript:;">帮助中心</a></span></div>
                  <div class="option" :class="sign=='withdrawal'?'active':''" @click="exchangeSign('withdrawal')"><span class="other" ><a href="javascript:;">余额提现</a></span></div>
                  <div class="option" :class="sign=='recharge'?'active':''" @click="exchangeSign('recharge')"><span class="other" ><a href="javascript:;">余额充值</a></span></div>
                  <div class="option" :class="{active:sign=='homeMain'}" @click="exchangeSign('homeMain')"><span class="other" ><router-link to="homeMain">首页</router-link></span></div>
              </div>

       </div>
        <Login @registerEvent="registerMethod" v-show="login"> </Login>
        <Register @loginEvent="LoginMethod" v-if="register" ></Register>
       </div>
</template>

<script>

   import Login from '../../components/login';
   import Register from '../../components/register';


   export default {
        name: "HomeHeader",
        data(){
            return{
                sign:1,
                isLogin:true,
                login:false,
                register:false,
                // isLogin:false,

            }
        },
       mounted(){
           this.isLoginMethod();
           if(sessionStorage.getItem('componentName')){
               this.sign =sessionStorage.getItem('componentName');
           }
       },
       components:{
           Login,
           Register,
       },
        methods:{
            exchangeSign(componentName){
                if(this.$store.state.userInfo.token==''){
                    const timer = null;
                    clearTimeout(timer);
                    // this.popup=!this.popup;
                    this.$store.commit('exchangePopup');
                    setTimeout(()=>{
                        this.$store.commit('exchangePopup');
                        clearTimeout(timer);
                    },900)
                }else {
                    this.sign =componentName;
                    sessionStorage.setItem('componentName',componentName)
                    this.$router.push('/'+componentName).catch(err => {err})

                }
            },
            exchangeSignCenter(){
                if(this.$store.state.userInfo.token==''){
                    const timer = null;
                    clearTimeout(timer);
                    // this.popup=!this.popup;
                    this.$store.commit('exchangePopup');
                    setTimeout(()=>{
                        this.$store.commit('exchangePopup');
                        clearTimeout(timer);
                    },900)
                }else {
                    if(this.$store.state.userInfo.authority==='user'){
                        this.sign ="personalCenter";
                        sessionStorage.setItem('componentName',"personalCenter")
                        this.$router.push('/personalCenter').catch(err => {err})
                    }else if(this.$store.state.userInfo.authority==='admin'){
                        this.sign ="personalCenter";
                        sessionStorage.setItem('componentName',"admin")
                        this.$router.push('/admin').catch(err => {err})
                    }


                }
            },
            //登录成功，登录隐藏事件
            isLoginMethod(){
              if(sessionStorage.getItem('token')){
                var timer = setTimeout(()=>{
                      this.login = false;
                      this.register = false;
                      clearTimeout(timer);
                  },400)
              }else {
                  this.login=true
              }
            },
            //点击注册，登录界面隐藏,显示登录界面事件
            registerMethod(){
              this.login=false;
              this.register=true;
            },
            //点击登录，注册界面隐藏,显示注册界面事件
            LoginMethod(){
                this.login=true;
                this.register=false;
            },
        }
    }
</script>

<style scoped>
       .header_container{
              width: 100%;
              height: 80px;;
              box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.05);
       }
       .header_box{
              width: 88%;
              height: 100%;
              margin: 0 auto;
              overflow: hidden;
       }
       .header_img{
              width: 12%;
              float: left;
       }
       .header_img img{
           margin-top: 25px;
           margin-left: 20px;
       }
       .header_img span{
              font-size: 1.5rem;
              font-style:italic;
              font-weight: bold;
              color:#606266;
              font-family:microsoft yahei;
              line-height: 80px;
              vertical-align: top;

       }
       .header_img  a{
           text-decoration: none;
       }
       .header_right{
           line-height: 80px;

       }
    .header_right .option{
        float: right;
        height: 80px;
        margin:auto 40px;
        font-weight: bold;
        font-size: 0.95rem;
        font-family:microsoft yahei;
        /*border-bottom: 4px solid #228bff;*/
        box-sizing: border-box;
    }

    .header_right .option a{
        color:#606266;
        text-decoration: none;
       }
    .header_right .other a:hover {
         color: #0d7bff;
    }
    .header_right .option .login{
        display: inline-block;
        line-height: 30px;
        padding: 2px 7px;
        background-image: linear-gradient(260deg, #5aa5ff, #0d7bff);
        border-radius: 3px;
        box-shadow: 1px 1px 0.5px 1px rgba(0, 0, 0, 0.05);
    }
    .header_right .option .login a{
           color: white;
    }
    .active{
        border-bottom: 4px solid #228bff;

    }
</style>
