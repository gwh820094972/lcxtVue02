<template>
    <div v-if="applyShow" class="apply_container">
        <div class="titleText">
           <div class="thresholdText"> 起投金额：{{curClickProductInfo.threshold_amount}}￥</div>
            <div class="stepText">投资步长：{{curClickProductInfo.step_amount}}￥</div>
        </div>
        <el-row class="demo-autocomplete">
            <el-col :span="12"   class="amount">
                <el-autocomplete
                        prefix-icon="el-icon-coin"
                        class="inline-input"
                        v-model="applyAmount"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入购买金额￥"
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
        <el-input placeholder="请输入密码" v-model="passwordInput" show-password class="password" prefix-icon="el-icon-lock"></el-input>
        <el-alert
                class="passwordTip"
                :title=title2
                :type=type2
                :closable="false"
                show-icon>

        </el-alert>
        <div class="btns">
            <el-button v-show="!applyDetermine" type="danger" class="a"  @click="apply">申购</el-button>
            <el-button v-show="!applyDetermine"  class="b" @click="cancelApply">取消</el-button>
            <el-button v-show="applyDetermine" type="success" class="c" @click="determinelApply">确定</el-button>

        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        name: "Apply",
        data() {
            return {
                applyDetermine:false,
                title1:"请确保申购的金额大于或等于起投金额,且大于部分为投资步长的整数倍",
                title2:"请输入密码",
                type1:'info',
                type2:'info',
                restaurants: [],
                applyAmount:'',
                passwordInput: '',
                currentProductInfo:{
                    //产品id
                    productId:'',
                    //产品name
                    productName:'',
                    //产品投资步长
                    productStept:'',
                    //产品起投金额
                    productThreshold:'1',
                    //购买金额
                    productAmount:0,
                    //订单拥有者用户Id
                    chanUserId:'',

                    orderId:'',
                    createAt:'',
                },
            };
        },
        props:['applyShow'],
        methods: {
            querySearch(queryString, cb) {
                if(this.curClickProductInfo.threshold_amount> 0&& this.curClickProductInfo.step_amount>0){
                    this.restaurants = this.loadAll();
                }
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
                    { "value": this.curClickProductInfo.threshold_amount+''},
                    { "value": 1*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},
                    { "value": 2*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},
                    { "value": 3*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},
                    { "value": 4*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},
                    { "value": 5*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},
                    { "value": 10*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},
                    { "value": 20*this.curClickProductInfo.step_amount+(this.curClickProductInfo.threshold_amount)+''},

                ];
            },
            handleSelect(item) {
                console.log(item);
            },
            //将申购金额存入vuex中
            vuexgetCurProductAmount(){
                this.$store.commit('getCurProductAmount',this.applyAmount);
                this.$emit('applyAmount');
            },
           apply(){
               this.type1='info';
                if(this.curClickProductInfo.step_amount>0){
                    if(this.applyAmount >= this.curClickProductInfo.threshold_amount&&
                        (this.applyAmount-this.curClickProductInfo.threshold_amount)%this.curClickProductInfo.step_amount===0){
                       this.applyMethod();
                    }else {
                        this.type1="error";
                        this.title1= "请确保申购的金额大于等于起投金额,且大于部分为投资步长的整数倍"
                    }
                }else {
                    if(this.applyAmount >= this.curClickProductInfo.threshold_amount){
                        this.applyMethod();
                    }else {
                        this.type1="error";
                        this.title1= "请确保申购的金额大于等于起投金额,且大于部分为投资步长的整数倍"
                    }
                }

            },
            async applyMethod(){
                this.title1="可以购买的金额";
                this.type1="success";
                this.vuexgetCurProductAmount();
                let data = this.$getCode(sessionStorage.getItem('token'));
                const result = await this.$http.post('api2/seller/order/apply?amount='+this.applyAmount,
                    {
                        "chanUserId": this.userInfo.id,
                        "amount": this.applyAmount,
                        "productId": this.curClickProductInfo.productId,
                        "productName": this.curClickProductInfo.productName,
                        "productLockTerm": this.curClickProductInfo.productLockTerm,
                    },
                    {headers:{
                            'authId':"1000",
                            'sign':data,
                            'token': sessionStorage.getItem('token'),
                            'password':this.passwordInput
                        }
                    });
                if(result.status===200&&result.data==="用户密码不正确"){
                    // console.log('申购成功');
                    console.log(result.data);
                    this.title2="用户密码不正确"
                    this.type2="error";
                }else if(result.status===200&&result.data!=="用户密码不正确"&&result.data!=="用户金额不足请充值后操作"){
                    console.log(result);
                    this.title2="申购成功"
                    this.type2="success";
                    this.applyDetermine=true;
                    // const timer = setTimeout(()=>{
                    //     this.$emit("applyShow",false)
                    //     clearTimeout(timer);
                    //     //重置表单
                    //     this.resetForm();
                    // },800)
                }else if(result.status===200&&result.data==="用户金额不足请充值后操作"){
                    this.type2="error";
                    this.title2="用户金额不足请充值后操作";
                    this.type1="success";
                }
            },
            cancelApply(){
                this.$emit('applyShow',false);
                //重置表单
                this.resetForm()
            },
            determinelApply(){
                this.applyDetermine=false;
                this.cancelApply()
            },
            //重置表单
            resetForm(){
                        this.title1="请确保申购的金额大于或等于起投金额,且大于部分为投资步长的整数倍";
                        this.title2="请输入密码";
                        this.applyAmount='';
                        this.type1='info';
                        this.type2='info';
                        this.passwordInput='';
            }

        },
        mounted() {
            this.currentProductInfo.productAmount = this.curClickProductInfo.threshold_amount;
                // this.restaurants = this.loadAll();

        },
        computed:{
            ...mapState(['curClickProductInfo','userInfo'])
        },
        watch:{
            applyAmount(newVal){
                if(this.applyAmount!==""){
                    if(this.curClickProductInfo.step_amount>0){
                        if(newVal >= this.curClickProductInfo.threshold_amount&&
                            (newVal-this.curClickProductInfo.threshold_amount)%this.curClickProductInfo.step_amount===0){
                            this.title1="可以购买的金额";
                            this.type1='success';
                        }else {
                            this.title1="请确保申购的金额大于或等于起投金额,且大于部分为投资步长的整数倍",
                                this.type1='error';
                        }
                    }else {
                        if (newVal >= this.curClickProductInfo.threshold_amount) {
                            this.title1 = "可以购买的金额";
                            this.type1 = 'success';
                        }else {
                            this.title1="请确保申购的金额大于或等于起投金额,且大于部分为投资步长的整数倍",
                                this.type1='error';
                        }
                    }
                }

            }
        }

    }
</script>

<style scoped>
.apply_container{
    background: #88bfff;
    z-index: 1010;
    height: 300px;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
}

.titleText{
    margin-top: 6%;
    display: flex;
   width: 80%;
    height: 8%;
    justify-content: space-around;
    margin-left: 10%;
}
.titleText .thresholdText{
    display: inline-block;
}
.titleText .stepText{
    display: inline-block;
}
.amount{
    /*width:225px;*/
    margin-top: 2%;
    width:70%;
    margin-left: 15%;
}
.inline-input{
    width:100%;
    background: #bce1ff;

}
 .password{
     width:70%;
     margin-top: 1%;
     margin-left: 15%;
 }
.btns{
    margin: 0 auto;
    width: 70%;
    margin-top: 3%;
    display: flex;
    justify-content: space-around;
}

.btns .a{
    width: 100px;
}
.btns .b{
    width: 100px;
}
.btns .c{
    width: 100px;
    margin-right: 10px;
}
.amountTip{
        margin-top: 1%;
        font-size: 6px;
        width: 70%;
        margin-left: 15%;
        height: 35px;
    }
.passwordTip{
    margin-top: 1%;
    width: 70%;
    margin-left: 15%;
    height: 35px;

}

</style>
