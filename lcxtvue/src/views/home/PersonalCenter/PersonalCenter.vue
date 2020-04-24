<template>
    <div class="personal_center_container">
        <div class="personal_center_box">
            <div v-show="visible" class="prompt">
                <p >确定要退出？</p>
                <div style="text-align: right; margin: 10%">
                    <el-button size="mini" type="text"  @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini"  @click="logoutMethod">确定</el-button>
                </div>
            </div>
            <div class="personal_center_left">
                    <router-link to="/personalCenter/myAssets">
                        <el-menu
                                :class="sign===1?'active':''"
                                default-active="2"
                                class="el-menu-vertical-demo">
                            <el-menu-item class="navigationText" index="2" @click="exchangeSign(1)">
                                <i class="el-icon-wallet"></i>
                                <span :class="sign===1?'navigationTextSpan2':'navigationTextSpan1'" slot="title">我的资产</span>
                            </el-menu-item>
                        </el-menu>
                    </router-link>
                    <router-link to="/personalCenter/changeInfo">
                        <el-menu    :class="sign===2?'active':''"
                                    default-active="2"
                                    class="el-menu-vertical-demo">
                            <el-menu-item class="navigationText" index="2" @click="exchangeSign(2)">
                                <i class="el-icon-user"></i>
                                <span  :class="sign===2?'navigationTextSpan2':'navigationTextSpan1'" slot="title">更改信息</span>
                            </el-menu-item>
                        </el-menu>
                    </router-link>

                    <el-menu
                            :class="sign===3?'active':''"
                            default-active="3"
                            class="el-menu-vertical-demo">
                        <el-menu-item class="navigationText" index="3" @click="logout">
                            <i class="el-icon-refresh-left"></i>
                            <span :class="sign===3?'navigationTextSpan2':'navigationTextSpan1'" slot="title">退出登录</span>
                        </el-menu-item>
                    </el-menu>

            </div>
            <div class="personal_center_right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalCenter",
        data(){
            return{
                sign:0,
                visible:false
            }
        },
        methods:{
            exchangeSign(newSign){
                this.sign=newSign;
            },
            logout(){
                  this.sign=3;
                this.visible=true;

            },
            logoutMethod(){
                this.visible=false;
                sessionStorage.clear();
                this.$router.push('/').catch(err => {err});
                this.$router.go(0)
            }
        },
    }
</script>

<style scoped>
    .personal_center_container{
        overflow: hidden;
        width: 100%;
        background: #eaecef;
        height: 900px;
    }
    .personal_center_box{
        overflow: hidden;
        width: 94%;
        margin: 0 auto;
        margin-top: 2%;
        height: 95%;
        background: #eaecef;
    }
    .personal_center_left a{
        text-decoration: none;
    }
    .el-menu-vertical-demo{
        border-bottom: 1px solid #eaecef;
        height: 80px;
    }
    .navigationText {
        height: 100%;
        font-size: 1.3rem ;
        text-align: start;
        width: 100%;
        line-height: 80px;
    }
    .navigationTextSpan1{
        margin-left: 20px;
        color: #505050;
    }
    .navigationTextSpan2{
        margin-left: 20px;
        color: #228bff;
    }
    .active{
        border-left: 4px solid #228bff;
    }
.personal_center_left{
    overflow: hidden;
    display: inline-block;
    height: 100%;
    border: 1px solid #eaecef;
    width: 25%;
    background: white;
}
    .personal_center_right{
        display: inline-block;
        margin-left: 1%;
        height: 100%;
        width: 73.5%;
        /*background: #88bfff;*/
    }
    .prompt{
        border-radius: 10px;
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        position: fixed;
        width: 25%;
        height: 25%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: white;
        z-index: 100;
    }
    .prompt p{
        margin-top: 10%;
        text-align: center;
    }

</style>
