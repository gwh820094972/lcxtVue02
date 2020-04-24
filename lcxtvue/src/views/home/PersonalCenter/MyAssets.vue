<template>
    <div class="my_assets_contianer">
        <div v-show="visible" class="prompt">
            <p :class="{nor:isNor,error:isError,success:isSuccess}">{{promptText}}</p>
            <div style="text-align: right; margin: 10%">
                <el-button size="mini" type="text" v-show="visible1" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" v-show="visible1" @click="redeem">确定</el-button>
                <el-button type="primary" size="mini" v-show="visible2" @click="reset">确定</el-button>
            </div>
        </div>
        <div class="my_assets_contianer_top">
            <div class="my_assets_contianer_top_top">
                总资产（元）
            </div>
            <div class="my_assets_contianer_top_end">
                <span>￥</span>
                <span >{{this.$store.state.userInfo.balance}}</span>
            </div>

        </div>
        <div class="my_assets_contianer_end">
            <el-tabs type="border-card" class="table" >
                <el-tab-pane label="我的订单" class="table1" >
<!--                    表单-->
                    <div  class="orderForm">
                        <el-table
                                row-key="1"
                                :data="orderListApplyTemp"
                                style="width: 100%">
                            <el-table-column
                                    label="Date"
                                    prop="createAt">
                            </el-table-column>
                            <el-table-column
                                    label="产品名称"
                                    prop="productName">
                            </el-table-column>
                            <el-table-column
                                    label="订单金额(元)"
                                    prop="amount">
                            </el-table-column>
                            <el-table-column
                                    label="锁定期(天)"
                                    prop="productLockTerm">
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    prop="orderType">
                            </el-table-column>
                            <el-table-column
                                    align="right">
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                            v-model="searchApply"
                                            size="mini"
                                            placeholder="按产品名搜索"/>
                                </template>

                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="getCurOrderListApply(orderListApplyTemp[scope.$index])">
                                        赎回
                                    </el-button>
                                </template>

                            </el-table-column>
                        </el-table>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="历史订单"class="table2">

                   <!-- 表单-->
                    <div  class="orderForm">
                        <el-table
                                :data="orderListRedeemTemp"
                                style="width: 100%">
                            <el-table-column
                                    label="Date"
                                    prop="createAt">
                            </el-table-column>
                            <el-table-column
                                    label="产品名称"
                                    prop="productName">
                            </el-table-column>
                            <el-table-column
                                    label="购买金额(元)"
                                    prop="amount">
                            </el-table-column>
                            <el-table-column
                                    label="锁定期(天)"
                                    prop="productLockTerm">
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    prop="orderType">
                            </el-table-column>
                            <el-table-column
                                    align="right">
                                <template slot="header" slot-scope="scope">
                                    <el-input
                                            v-model="searchRedeem"
                                            size="mini"
                                            placeholder="按产品名搜索"/>
                                </template>
                                <template slot-scope="scope">
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </el-tab-pane>
            </el-tabs>
        </div>

    </div>

</template>

<script>


    export default {
        name: "MyAssets",
        data(){
            return{
                searchApply: '',
                searchRedeem: '',
                orderList:[],
                orderListApply:[],
                orderListRedeem:[],
                orderListApplyTemp:[],
                orderListRedeemTemp:[],
                temp:[],
                curApplyProductName:'',
                curRedeemProductName:'',
                visible: false,
                visible1: false,
                visible2: false,
                curOrderListApply:{},
                promptText:'确定要赎回订单操作吗？',
                isNor:true,
                isError:false,
                isSuccess:false,

            }
        },

        methods:{
            async getOrderList(url, config){
                let data = this.$getCode(sessionStorage.getItem('token'));
                const result = await this.$http.get('api2/seller/order/searchByOwnerId',
                    {
                    headers: {
                        'authId': "1000",
                        'sign': data,
                        'token': sessionStorage.getItem('token')
                             }
                      })
                this.orderList = result.data;
                this.filterOrderList(this.orderListApply,this.orderListRedeem,this.orderList)
            },
            //处理数据
            filterOrderList(orderListApply,orderListRedeem,orderList){
                orderList.filter((value)=>{
                    if(value.orderType==="REDEEM"){
                        value.orderType='已赎回'
                        value.createAt =value.createAt.slice(0,10)
                        orderListRedeem.push(value);

                    }else {
                        value.createAt =value.createAt.slice(0,10)
                        value.orderType='已申购'
                        orderListApply.push(value);
                    }
                })
                this.orderListApplyTemp=orderListApply;
                this.orderListRedeemTemp=orderListRedeem;

            },
            getCurOrderListApply(curOrder){
                this.curOrderListApply=curOrder;
                console.log(this.curOrderListApply);
                this.visible=true;
                this.visible1=true;
            },
            async redeem(){
                let data = this.$getCode(sessionStorage.getItem('token'));
                const result = await this.$http.post('api2/seller/order/redeem?redeemAmount='+this.curOrderListApply.amount+'&orderId='+this.curOrderListApply.orderId,
                    {},  {
                        headers: {
                            'authId': "1000",
                            "token":sessionStorage.getItem('token'),
                            'sign': data
                        }
                    })
                this.visible2=true;
                this.visible1=false;
                console.log(result.data);
                if(result.data==="订单赎回成功"){
                    this.promptText="订单赎回成功"
                    this.isSuccess=true;
                    this.orderListRedeem.push(this.curOrderListApply);
                   for(var i = 0;i < this.orderListApply.length;i++){
                        if(this.orderListApply[i].orderId===this.curOrderListApply.orderId){
                            this.orderListApply.splice(i,1);
                        }
                    }
                    for(var j = 0;j < this.orderListApplyTemp.length;j++){
                        if(this.orderListApplyTemp[j].orderId===this.curOrderListApply.orderId){
                            this.orderListApplyTemp.splice(j,1);
                        }
                    }
                    // this.orderListApplyTemp=this.orderListApply;
                    this.orderListRedeemTemp=this.orderListRedeem;
                }else if(result.data==="未过锁定期，无法赎回"){
                    this.promptText="未过锁定期,无法赎回"
                    this.isError=true;
                    this.isSuccess=false
                }
            },
            reset(){
                    this.isNor=true;
                    this.isError=false;
                    this.isSuccess=false;
                    this.promptText='确定要赎回订单操作吗？';
                    this.visible=false;
                    this.visible2=false;

            }
        },
        mounted() {
            this.getOrderList();
        },
        watch:{
            searchApply(newValue){
                var temp=[];
                this.orderListApply.filter((value)=>{
                    if(value.productName===newValue){
                       temp.push(value)
                    }else if(value=!newValue){
                       temp=this.orderListApply
                    }
                })
                 this.orderListApplyTemp=temp;
            },
            searchRedeem(newValue){
                var temp=[];
                this.orderListRedeem.filter((value)=>{
                    if(value.productName===newValue){
                        temp.push(value)
                    }else if(value=!newValue){
                        temp=this.orderListRedeem
                    }
                })
                this.orderListRedeemTemp=temp;
            }
        }

    }
</script>

<style scoped>
    .my_assets_contianer{
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    .my_assets_contianer_top{
        border-radius:10px;
        display: inline-block;
        height: 15%;
        width: 100%;
        background: #268eff;

    }
    .my_assets_contianer_end{
        display: inline-block;
        margin-top: 1%;
        height: 84%;
        width: 100%;
    }
    .my_assets_contianer_top_top{
        margin-top: 3.5%;
        margin-left: 7%;
        color: white;
        font-weight: bold;
    }
    .my_assets_contianer_top_end{
        margin-top: 1%;
        margin-left: 7%;
        color: white;
        font-size: 1.2rem;
        text-decoration: none;
        font-weight: bolder;
    }
    .my_assets_contianer_top_end span:nth-child(2){
        margin-top: 2%;
        margin-left: 1%;
        color: white;
        font-size: 2rem;
    }
    .table{
        width: 100%;
        height: 100%;
    }
    .orderForm{
        width: 90%;
        margin: 0 auto;
        margin-top: 2%;
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
    .nor{
        color: rgba(38, 5, 1, 0.8);
    }
    .error{
        color: #fa200b;
    }
    .success{
        color: rgba(29, 174, 30, 0.94);
    }
</style>
