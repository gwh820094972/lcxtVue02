<template>

    <div class="change_info_container">
        <div class="change_info_contianer_top">
            <div class="username">
                <div class="change_info_contianer_top_top">
                    当前账号:
                </div>
                <div class="change_info_contianer_top_end">
                    <span >{{this.$store.state.userInfo.username}}</span>
                </div>
            </div>
            <div class="bankCardNum">
                <div class="change_info_contianer_top_top">
                    绑定银行卡账号:
                </div>
                <div class="change_info_contianer_top_end">
                    <span >{{this.$store.state.userInfo.bankCardNum}}</span>
                </div>
            </div>
            <div class="email">
                <div class="change_info_contianer_top_top">
                邮箱:
            </div>
                <div class="change_info_contianer_top_end">
                    <span >{{this.$store.state.userInfo.email}}</span>
                </div>
            </div>

        </div>
        <div class="change_info_contianer_end">
            <div class="change_info_box">
                <div class="change_info_box2">
                    <span>请输入要修改的信息</span>

                    <el-input prefix-icon="el-icon-lock" placeholder="请输入新密码" class="newPasswordInput" v-model="newPasswordInput" show-password></el-input>
                    <el-alert
                            :title=newPasswordTitle
                            :type=newPasswordType
                            show-icon>
                    </el-alert>
                    <el-input v-model="emailInput" prefix-icon="el-icon-message" class="emailInput" placeholder="请输新邮箱号"></el-input>
                    <el-alert
                            :title=emailTitle
                            :type=emailType
                            show-icon>
                    </el-alert>
                    <el-input v-model="bankCardNumInput" prefix-icon="el-icon-s-finance" class="bankCardNumInput"  placeholder="请输入新绑定银行卡号"></el-input>
                    <el-alert
                            :title=bankCardNumTitle
                            :type=bankCardNumType
                            show-icon>
                    </el-alert>
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入密码"  class="passwordInput" v-model="passwordInput" show-password></el-input>
                    <el-alert
                            :title=passwordTitle
                            :type=passwordType
                            show-icon>
                    </el-alert>
                    <el-button @click="modify"  class="btn" type="primary">修改</el-button>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ChangeInfo",
        data(){
            return{
                passwordInput:'',
                newPasswordInput:'',
                bankCardNumInput:'',
                emailInput:'',
                newPasswordTitle:'可以输入3到12个字符的新密码',
                newPasswordType:'info',
                emailTitle:'可以输入新邮箱号',
                emailType:'info',
                bankCardNumType:'info',
                bankCardNumTitle:'可以更改绑定银行卡号',
                bankCardNumType:'info',
                passwordTitle:'请输入用户密码',
                passwordType:'info',

            }
        },
        methods:{
            async modify(){
                if(this.newPasswordInput.length!==0){
                    if(this.newPasswordInput.length>12||this.newPasswordInput.length<3){
                        this.newPasswordTitle="可以输入3到12个字符的新密码"
                        this.newPasswordType='error'
                        this.passwordTitle='修改信息失败';
                        this.passwordType='error';
                        return  false
                    }else {
                        this.newPasswordTitle="可以更改新密码"
                        this.newPasswordType='success'
                    }
                }
                let data = this.$getCode(sessionStorage.getItem('token'));
                const result = await this.$http.post("api2/seller/user/modify",{},
                {
                    headers:{
                        "token":this.$store.state.userInfo.token,
                        'authId': "1000",
                        'sign': data,
                        "password":this.passwordInput,
                        "newPassword":this.newPasswordInput,
                        "bankCardNum":this.bankCardNumInput,
                        "email":this.emailInput
                    }
                })

                if(result.data==="用户密码输入错误"){
                         this.passwordTitle='用户密码错误';
                        this.passwordType='error';
               }else if ( result.status===200&&result.data!=="用户密码输入错误"){
                    this.passwordTitle='修改信息成功';
                    this.passwordType='success';
                  this.getUserInfo(result.data);
                }
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
                console.log(this.$store.state.userInfo);
            }
        },
        watch:{


        }
    }
</script>

<style scoped>
.change_info_container{
    overflow: hidden;
    height: 100%;
    width: 100%;
    background: #eaecef;
}
.change_info_contianer_top{
    height: 15%;
    width: 100%;
    color: white;
    font-size: 1.5rem;
}
.change_info_contianer_top div{
    text-align: center;
}
.change_info_contianer_top .username{
    margin-top: 3%;
    width: 25%;
    height: 100%;
    display: inline-block;
}
.change_info_contianer_top .bankCardNum{
    margin-top: 3%;
    width: 45%;
    height: 100%;
    display: inline-block;
}
.change_info_contianer_top .email{
    margin-top: 3%;
    width: 25%;
    height: 100%;
    display: inline-block;
}
.change_info_contianer_end{
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-top: 1%;
    overflow: hidden;
    background: white;
    height: 100%;

}
.change_info_box{
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 5%;
    overflow: hidden;
    height: 60%;
    width: 60%;
    background: #eaecef;

}
    .change_info_box2{
        margin: 0 auto;
        text-align: center;
        width: 80%;
    }
.change_info_box2 span{
    display: inline-block;
    color: #5e5e5e;
    font-size: 1.3rem;
    margin-top: 10%;

}
    .newPasswordInput{
        margin-top: 5%;

    }
.change_info_box2 .emailInput{
    margin-top: 1%;
}
.change_info_box2 .passwordInput{
    margin-top: 1%;
}
.change_info_box2 .bankCardNumInput{
    margin-top: 1%;
}
.btn{
    margin-top: 5%;
    width: 25%;
}
.change_info_contianer_top{
    border-radius:10px;
    display: inline-block;
    height: 15%;
    width: 100%;
    background: #268eff;

}
    .change_info_contianer_top_end{
        margin-top: 10px;
    }
</style>
