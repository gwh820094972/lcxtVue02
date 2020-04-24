<template>
    <div class="help_center_container">
        <div class="help_center_box">
            <div class="help_left">
                <router-link to="/helpCenter/helpCenterCom1">
                <el-menu
                        :class="sign===1?'active':''"
                        default-active="2"
                        class="el-menu-vertical-demo">
                    <el-menu-item class="navigationText" index="2" @click="exchangeSign(1)">
                        <span :class="sign===1?'navigationTextSpan2':'navigationTextSpan1'" slot="title">常见问题</span>
                    </el-menu-item>
                </el-menu>
            </router-link>
                <router-link to="/helpCenter/helpCenterCom2">
                    <el-menu    :class="sign===2?'active':''"
                                default-active="2"
                                class="el-menu-vertical-demo">
                        <el-menu-item class="navigationText" index="2" @click="exchangeSign(2)">
                            <span  :class="sign===2?'navigationTextSpan2':'navigationTextSpan1'" slot="title">关于银行</span>
                        </el-menu-item>
                    </el-menu>
                </router-link>
            </div>
            <div class="help_center">
                <div class="help_center_top">

                </div>
                <div class="help_center_mid">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div class="help_right">
                <div class="help_right_top">
                    联系客服
                </div>
            <div class="help_right_mid">
                <i class="el-icon-phone"></i>  99999
            </div>
            <div class="help_right_end">
                <i class="el-icon-timer"></i>   工作时间：09:00-22:00
            </div>
        </div>


    </div>

</template>

<script>
    export default {
        name: "HelpCenter",
        data(){
            return{
                sign:0,
            }
        },
        methods:{
            exchangeSign(newSign){
                this.sign=newSign;
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .help_center_container{
        width: 100%;
        height: 900px;
        background: #eaecef;
    }
    .help_center_box{
        display: inline-block;
        position: relative;
        margin-top: 2%;
        margin-left: 5%;
        width: 74%;
        height: 95%;
        display: inline-block;
        background: white;
    }
    .help_left{
        overflow: hidden;
        display: inline-block;
        width: 22%;
        height: 100%;
        border: 1px solid #eaecef;
    }
    .help_left a{
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
    .help_center{
        overflow: hidden;
        display: inline-block;
        width: 77%;
        height: 100%;
    }
    .help_right{
        margin-top: 2%;
        vertical-align: top;
        display: inline-block;
        width: 18%;
        background: white;
        height: 18%;
        margin-left: 0.5%;
    }
    .help_right_top{
        margin: 0 auto;
        margin-top: 7%;
        font-weight: bold;
        color: #69696a;
        width: 85%;
        height: 20%;
        border-bottom: 1px solid #eaecef;
    }
    .help_right_mid{
        margin: 0 auto;
        margin-top: 6%;
        width: 85%;
        height: 20%;
        font-size: 1.5rem   ;
        color: #228bff;
    }
    .help_right_end{
        margin: 0 auto;
        margin-top: 6%;
        width: 85%;
        height: 20%;
        font-size: .9rem   ;
        color: #999999;
    }
    .el-icon-phone{
        color: #228bff;
        font-size: 1.2rem   ;
    }

    .el-icon-timer{
        color: #228bff;
        font-size: 1.2rem   ;
    }
    .help_center_top{
        width: 95%;
        height: 12%;
        margin: 0 auto;
        border-radius: 10px;
        margin-top: 5%;
        background: url("../../../assets/img/理财/helper_center_banner.ce404639.jpg") no-repeat;
        background-size: contain;
    }
    .help_center_mid{

    }
</style>
