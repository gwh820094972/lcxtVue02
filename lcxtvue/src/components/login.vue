<template>

    <div  v-show="isLogin===false" class="login_container">
        <div class="login_box">
<!--            登录表单区-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form" >
                <el-form-item    label="" prop="username" class="login_item">
                    <el-input   v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
<!--                通过修改 titile 和 type 控制成功与否-->
                <el-alert class="usernameCheck"
                          :title=userMessage
                          :type=userState
                          show-icon>
                </el-alert>
                <el-form-item label="" prop="password" class="login_item">
                    <el-input   type="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" ></el-input>
                </el-form-item>
                <el-alert class="passwordCheck"
                          :title= passwordMessage
                          :type= passwordState
                          show-icon>
                </el-alert>
                <!--  按钮区  -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="$emit('registerEvent')" > 注册 </el-button>
                    <router-link to="/register"></router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return{
                userInfo:{
                    token:'',
                    id:null,
                    username:'',
                    password:'',
                    balance:null,
                    email:'',
                    bankCardNum:"",
                    authority:'',

                }
                ,
                isLogin:false,
                loginForm:{
                    username:'user1',
                    password:'123456',
                },
                userMessage:'请输入长度在 3 到 12 个字符的用户名',
                userState:"info",
                passwordMessage:'请输入长度在 6 到 12 个字符的密码',
                passwordState:"info",
                timer:null,
                //表单验证规则
                rules: {
                    username: [  //必填，提示，失去焦点时触发，长度
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            register(){
                // this.$router.push('/register')
            },
            login(){
                let data = this.$getCode(this.loginForm.password);
                var that = this;
                //通过表单预验证验证结果为true，才发送axios请求
                this.$refs.loginFormRef.validate(async boolean=>{
                    // console.log(boolean);
                    if(!boolean) return ;
                    const result = await this.$http.post('api2/seller/user/login',{},
                        {headers:{
                                'username':this.loginForm.username,
                                'password':this.loginForm.password,
                                'authId':"1000",
                                'sign': data
                            }
                        })
                    if(result.status == 200&&result.data=="账号不存在" ){
                        that.userMessage="账号不存在";
                        that.userState="error"
                        return console.log("账号不存在")

                    }else if(result.status == 200&&result.data=="账号或密码错误。"){
                        that.passwordMessage="账号或密码错误";
                        that.passwordState="error";
                        that.userMessage="用户名存在";
                        that.userState="success"
                            return console.log("账号或密码错误")
                    }else if(result.status == 200&&result.data!="账号或密码错误。"&&result.data!="账号不存在"){
                        that.userMessage="用户名存在";
                        that.userState="success"
                        that.passwordMessage="登录成功";
                        that.passwordState="success"
                        that.userInfo.token = result.data;
                        sessionStorage.setItem("token",result.data);
                        // console.log(sessionStorage.getItem("token"));
                        //获取用户信息
                        that.getUserInfo(result.data);
                        //登录成功隐藏登录界面
                        that.timer = setTimeout(()=>{
                            this.isLogin = true;
                           clearTimeout( that.timer);},1000);
                    }
                })
            },
            //获取用户信息方法，并记住
            async getUserInfo(token){
                var result = await this.$http.get("api2/seller/user/userInfo?token="+token);

                this.$store.commit('getUserToken',token);
                this.$store.commit('getUserId',result.data.id);
                this.$store.commit('getUserUsername',result.data.username);
                this.$store.commit('getUserBalance',result.data.balance);
                this.$store.commit('getUserBankCardNum',result.data.bankCardNum);
                this.$store.commit('getUserEmail',result.data.email);
                this.$store.commit('getUserAuthority',result.data.authority);
                this.$store.commit('getUserAuthority',result.data.authority);


                this.userInfo.token = this.$store.state.userInfo.token;
                this.userInfo.id = this.$store.state.userInfo.id;
                this.userInfo.username = this.$store.state.userInfo.username;
                this.userInfo.password = this.$store.state.userInfo.password;
                this.userInfo.balance = this.$store.state.userInfo.balance;
                this.userInfo.email = this.$store.state.userInfo.email;
                this.userInfo.bankCardNum =this.$store.state.userInfo.bankCardNum;
                this.userInfo.authority =this.$store.state.userInfo.authority;

                // console.log(this.$store.state.userInfo);
                // console.log(this.userInfo);

            }

        },
        mounted() {
            //读取存在本地的用户信息
            if(sessionStorage.getItem('token') !=null){
                this.getUserInfo(sessionStorage.getItem('token'));
              // this.userInfo.token = sessionStorage.getItem('token');
              // this.userInfo.id = sessionStorage.getItem('id');
              // this.userInfo.username = sessionStorage.getItem('username');
              // this.userInfo.password = sessionStorage.getItem('password');
              // this.userInfo.balance = sessionStorage.getItem('balance');
              // this.userInfo.email = sessionStorage.getItem('email');
              // this.userInfo.bankCardNum = sessionStorage.getItem('bankCardNum');
            }
        }


    }
</script>

<style scoped>
.login_container{
    position: relative;
}
.login_box{
    z-index: 1000;
    position: absolute;
    width: 380px;
    height: 300px;
    background: #eee;
    border-radius: 5px;
    position:absolute;
    left: 77%;
    /*移动减去自身的50%，以移动到中间*/
    /*transform: translate(-50%,-50%);*/

    transform: translate(-50%,22%);
}
.login_form{
    position: absolute;
   left: 50%;
   top: 50%;
    transform: translate(-50%,-43%);
    width: 100%;
    padding: 0px 30px;
    /*为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。 */
    /* 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。*/
    box-sizing: border-box;
}
.login_item{
    margin: 35px 0px;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.usernameCheck{
    line-height: 10px;
    height: 30px;
    width: 86%;
    position: absolute;
    top: 79px;

}
.passwordCheck{
    line-height: 10px;
    height: 30px;
    width: 86%;
    position: absolute;
    top: 155px;

}
</style>
