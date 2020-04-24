<template>
    <div class="recharge_container">
        <div class="titleText">
            <div class="thresholdText">当前账户绑定的银行卡号：{{this.$store.state.userInfo.bankCardNum.slice(0,3)}}***{{this.$store.state.userInfo.bankCardNum.slice(3,6)}}</div>
        </div>
        <el-row class="demo-autocomplete">
            <el-col :span="12"   class="amount">
                <el-autocomplete
                        prefix-icon="el-icon-coin"
                        class="inline-input"
                        v-model="rechargeAmount"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入充值金额￥"
                        @select="handleSelect"
                ></el-autocomplete>
            </el-col>
        </el-row>
        <el-alert class="amountTip"
                  :title=title1
                  :type=type1
                  :closable="false"
                  show-icon>
        </el-alert>
        <el-input placeholder="请输入银行卡密码" v-model="passwordInput" show-password class="password" prefix-icon="el-icon-lock"></el-input>
        <el-alert
                class="passwordTip"
                :title=title2
                :type=type2
                :closable="false"
                show-icon>

        </el-alert>
        <div class="btns">
            <el-button v-show="!rechargeDetermine" type="danger" class="a"  @click="recharge">充值</el-button>
            <el-button v-show="rechargeDetermine" type="success" class="c" @click="determinelRecharge">确定</el-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Recharge",
        data(){
            return{
                rechargeAmount:'',
                title1:"请输入充值金额",
                type1:'info',
                title2:"请输入银行卡密码",
                type2:'info',
                passwordInput:'',
                rechargeDetermine:false,
                bankCardNum:''
            }
        }
       ,
        methods:{ querySearch(queryString, cb) {
                    this.restaurants = this.loadAll();
                var restaurants = this.restaurants;
                var results = queryString ? [] : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": '100'},
                    { "value": '200'},
                    { "value": "500"},
                    { "value": '1000'},
                    { "value": '2000'},
                    { "value": '3000'},
                    { "value": '5000'},
                    { "value": '10000'},

                ];
            },
            handleSelect(item) {
                console.log(item);
            },
            recharge(){
                if (this.rechargeAmount===""||this.rechargeAmount<0){
                    this.title1="充值的金额应大于0￥";
                    this.type1='error';
                }else {
                    this.rechargeMethod()
                }

            },
           async rechargeMethod(){
               let data = this.$getCode(sessionStorage.getItem('token'));
               const result = await this.$http.put('api2/seller/user/recharge?amount='+this.rechargeAmount,
                    {},
                    {
                        headers:{
                            "authId":"1000",
                            "sign":data,
                            'token': sessionStorage.getItem('token'),
                            "CardNum":this.$store.state.userInfo.bankCardNum,
                            "CardPassword":this.passwordInput
                        }
                    })
                      if(result.status===200&&result.data==='银行卡金额不足无法充值'){
                          this.title1="银行卡金额不足无法充值";
                          this.type1='error';
                          this.title2="银行卡密码正确";
                          this.type2='success';
                      }else if(result.status===200&&result.data==='银行卡密码错误'){
                          this.title1="可以充值的金额";
                          this.type1='success';
                          this.title2="银行卡密码错误";
                          this.type2='error';
                      }else if(result.status===200&&result.data!=='银行卡金额不足无法充值'&&result.data!=='银行卡密码错误'){
                          this.title1="可以充值的金额";
                          this.type1='success';
                          this.title2="充值成功";
                          this.type2='success';
                          this.$store.commit("getUserBalance",result.data)
                          this.rechargeDetermine=true;

                      }
               console.log('用户账户余额为：'+result.data);

           },
            determinelRecharge(){
                this.rechargeDetermine=false;
                this.resetForm()
                this.rechargeAmount='';
            },
            resetForm(){
                this.rechargeAmount='';
                this.title1="请输入充值金额";
                this.type1='info';
                this.title2="请输入银行卡密码";
                this.type2='info';
                this.passwordInput='';



            }
        },
        mounted() {

        },
        watch:{
            rechargeAmount(newVal){
                if(newVal >0 && newVal!==''){
                    this.title1="可以充值的金额";
                    this.type1='success';
                }else {
                    this.title1="充值的金额应大于0";
                    this.type1='error';
                }
            }
        }
    }
</script>

<style scoped>
    .recharge_container{
        /*background: #88bfff;*/
        height: 445px;
        width: 400px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,0%);
        border-radius: 10px;
    }
    .titleText{
        margin-top: 10%;
        display: flex;
        width: 80%;
        height: 8%;
        justify-content: space-around;
        margin-left: 10%;
    }
    .amount{
        /*width:225px;*/
        margin-top: 2%;
        width:80%;
        margin-left: 10%;
    }
    .inline-input{
        width:100%;
        background: #bce1ff;

    }
    .password{
        width:80%;
        margin-top: 2%;
        margin-left: 10%;
    }
    .btns{
        margin: 0 auto;
        width: 80%;
        margin-top: 5%;
        display: flex;
        justify-content: space-around;
    }

    .btns .a{
        width: 100px;
    }
    .btns .c{
        width: 100px;
        margin-right: 10px;
    }
    .amountTip{
        margin-top: 2%;
        font-size: 6px;
        width: 80%;
        margin-left: 10%;
        height: 35px;
    }
    .passwordTip{
        margin-top: 2%;
        width: 80%;
        margin-left: 10%;
        height: 35px;

    }

</style>
