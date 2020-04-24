<template>
    <div v-show="isRegister==false" class="register_container">

        <div class="register_box">
            <!--            登录表单区-->
            <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-width="0px" class="register_form">
                <el-form-item    label="" prop="username" class="register_item">
                    <el-input   v-model="registerForm.username" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <el-alert class="usernameCheck"
                          :title=userMessage
                          :type= userState
                          show-icon>
                </el-alert>
                <el-form-item label="" prop="password" class="register_item">
                    <el-input   type="text" v-model="registerForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" ></el-input>
                </el-form-item>
                <el-alert class="password"
                          :title=passwordMessage
                          :type=passwordState
                          show-icon>
                </el-alert>
                <el-form-item label="" prop="checkPassword" class="register_item">
                    <el-input   type="text" v-model="registerForm.checkPassword" placeholder="请确认密码" prefix-icon="el-icon-lock" ></el-input>
                </el-form-item>
                <el-alert class="passwordCheck"
                        :title=passwordCheckMessage
                        :type= passwordCheckState
                        show-icon>
                </el-alert>
                <el-form-item label="" prop="email" class="register_item">
                    <el-input   type="text" v-model="registerForm.email" placeholder="请输入邮箱" prefix-icon="el-icon-message" ></el-input>
                </el-form-item>
                <el-form-item label="" prop="cardNum" class="register_item">
                    <el-input   type="text" v-model="registerForm.cardNum" placeholder="请输入绑定的银行卡号" prefix-icon="el-icon-s-finance" ></el-input>
                </el-form-item>
                <!--  按钮区  -->
                <el-form-item class="btns">
                    <el-button @click="register" type="primary">注册</el-button>
                </el-form-item>
                <a  @click="$emit('loginEvent')" class="return" href="javascript:;"> 返回登录</a>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
            name: "register",
            data() {
                return{
                    registerForm:{
                        token:'',
                        username:'user4',
                        password:'123456',
                        checkPassword:'123456',
                        email:'123456',
                        cardNum:'123456',
                    },
                    userMessage:'请输入长度在 3 到 12 个字符的用户名',
                    userState:"info",
                    passwordMessage:'请输入长度在 6 到 12 个字符密码',
                    passwordState:"info",
                    passwordCheckMessage:'请确认密码',
                    passwordCheckState:"info",
                    isRegister:false,
                    //表单验证规则
                    rules: {
                        username: [  //必填，提示，失去焦点时触发，长度
                            {required: true, message: '请输入用户名', trigger: 'blur'},
                            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                        ],
                        password: [
                            {required: true, message: '请输入密码', trigger: 'blur'},
                            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                        ],
                        checkPassword:[
                            {required: true, message: '请确认密码', trigger: 'blur'},
                            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                        ],
                        email:[
                            {required: true, message: '请输入邮箱账号', trigger: 'blur'},

                        ],
                        cardNum:[
                            {required: true, message: '请输入要绑定的银行卡号', trigger: 'blur'},

                        ]
                    }
                }
            },
            methods:{
                register(){
                    var that = this;
                    //通过表单预验证验证结果为true，才发送axios请求
                    this.$refs.registerFormRef.validate(async boolean=>{
                        // console.log(boolean);
                        if(  that.registerForm.password != that.registerForm.checkPassword) return;
                        if(!boolean) return ;
                        const result = await this.$http.post('api2/seller/user/register',{
                                "username":this.registerForm.username,
                                "password":this.registerForm.password,
                                "bankCardNum":this.registerForm.cardNum,
                                "email":this.registerForm.email
                            }
                           )
                        if(result.status == 200 && result.data=="户名已经存在"){

                            that.userMessage='户名已经存在',
                            that.userState="error"

                        }else if(result.status == 200 && result.data!="户名已经存在"){
                            that.userMessage='注册成功',
                                that.userState="success"
                            this.passwordCheckState="success"
                            this.passwordState="success"
                            this.passwordMessage='可以使用的密码',
                                this.passwordCheckMessage='两次输入的密码一致',
                               sessionStorage.setItem("token",result.data) ;
                            this.getUserInfo(result.data);
                            // 注册成功隐藏注册界面
                            that.timer = setTimeout(()=>{
                                    this.isRegister = true;
                                clearTimeout( that.timer);},1000);

                        }
                    })
                },
                //获取用户信息方法，并记住
                async getUserInfo(token){
                    var result = await this.$http.get("api2/seller/user/userInfo?token="+token
                    )
                    // sessionStorage.setItem("id",result.data.id);
                    // sessionStorage.setItem("username",result.data.username);
                    // sessionStorage.setItem("password",result.data.password);
                    // sessionStorage.setItem("balance",result.data.balance);
                    // sessionStorage.setItem("email",result.data.email);
                    // sessionStorage.setItem("bankCardNum",result.data.bankCardNum);

                    this.$store.commit('getUserToken',token);
                    this.$store.commit('getUserId',result.data.id);
                    this.$store.commit('getUserUsername',result.data.username);
                    this.$store.commit('getUserBalance',result.data.balance);
                    this.$store.commit('getUserBankCardNum',result.data.bankCardNum);
                    this.$store.commit('getUserEmail',result.data.email);
                    this.$store.commit('getUserAuthority',result.data.authority);

                    console.log(this.$store.state.userInfo);
                }
            },
       watch: {
           newCheckPassword : function (newValue){
            if(newValue !== this.registerForm.password){
                this.passwordCheckMessage='两次输入的密码不一致',
                 this.passwordCheckState="error"

            }else  {
                this.passwordCheckMessage='两次输入的密码一致',
                    this.passwordCheckState="success"
            }
           },
           newPassword : function (newValue){
               if(newValue !== this.registerForm.checkPassword){
                   this.passwordCheckMessage='两次输入的密码不一致',
                       this.passwordCheckState="error"

               }else  {
                   this.passwordCheckMessage='两次输入的密码一致',
                       this.passwordCheckState="success"
               }
           }
        },
        computed: {
            newCheckPassword() {
                return this.registerForm.checkPassword;
            },
            newPassword() {
                return this.registerForm.password;
            }
        },
    }
</script>

<style scoped>
    .register_container{
        position: relative;
    }
    .register_box{

        z-index: 1000;
        position:absolute;
        width: 450px;
        height: 445px;
        background: #eee;
        border-radius: 5px;
        left: 77%;
        /*top: 50%;*/
        /*移动减去自身的50%，以移动到中间*/
        /*transform: translate(-50%,-50%);*/

        transform: translate(-50%,0%);

    }
    .register_form{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-43%);
        width: 100%;
        padding: 0px 30px;
        /*为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。 */
        /* 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。*/
        box-sizing: border-box;
    }
    .register_item{
        margin: 35px 0px;
    }
    .btns{
        position: absolute;
        display: flex;
        justify-content: center;
        bottom: -40px;
        left: 50%;
        transform: translate(-50%);
    }
    .usernameCheck{
        line-height: 10px;
        height: 30px;
        width: 86%;
        position: absolute;
        top: 79px;

    }
    .password{
        line-height: 10px;
        height: 30px;
        width: 86%;
        position: absolute;
        top: 155px;
    }
    .passwordCheck{
        line-height: 10px;
        height: 30px;
        width: 86%;
        position: absolute;
        top: 230px;

    }
    .return{
        position: absolute;
        text-decoration: none;
        right: 5%;
        bottom: -4%;
        color:#3282ff
    }
</style>
