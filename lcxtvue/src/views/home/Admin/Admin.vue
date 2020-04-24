<template>
    <div class="admin_container">
        <div class="admin_box">
            <div v-show="logoutVisible " class="prompt">
                <p >确定要退出？</p>
                <div style="text-align: right; margin: 10%">
                    <el-button size="mini" type="text"  @click="logoutVisible = false">取消</el-button>
                    <el-button type="primary" size="mini"  @click="logoutMethod">确定</el-button>
                </div>
            </div>
            <div class="admin_left">
                <el-menu
                        :class="sign===1?'active':''"
                        default-active="2"
                        class="el-menu-vertical-demo">
                    <el-menu-item class="navigationText" index="2" @click="exchangeSign(1)">
                        <i class="el-icon-menu"></i>
                        <span :class="sign===1?'navigationTextSpan2':'navigationTextSpan1'" slot="title">管理产品</span>
                    </el-menu-item>
                </el-menu>
                <el-menu
                        :class="sign===3?'active':''"
                        default-active="3"
                        class="el-menu-vertical-demo">
                    <el-menu-item class="navigationText" index="3" @click=" logout">
                        <i class="el-icon-refresh-left"></i>
                        <span :class="sign===3?'navigationTextSpan2':'navigationTextSpan1'" slot="title">退出登录</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="admin_right">
                <div class="tail_header">
                    <div class="product_list_img">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jinrong-copy-copy"></use>
                        </svg>
                    </div>
                    <h3 class="product_text">产品列表</h3>
                    <div class="tail_header_search">
                        <input @keyup.enter="searchKeyup" class="search_text" type="text" v-model="searchById" placeholder="请输入基金代码/名称">
                        <a href="javascript:;">
                            <div class="search_btn" @click="searchByIdMethod">
                                <svg class="icon" aria-hidden="true">
                                    <use class="btn_icon" xlink:href="#icon-sousuo-copy"></use>
                                </svg>
                            </div>
                        </a>
                    </div>

                    <div class="advanced_search">
                        <div class="input">
                            <input  class="reware_rate_search" type="text" placeholder="收益率不小于" v-model="advancedSearchInfo.rewardRate">
                            <input class="lock_search" type="text" placeholder="锁定期不大于" v-model="advancedSearchInfo.lockTerm">
                            <input class="threshold_search" type="text" placeholder="起投金额不大于" v-model="advancedSearchInfo.threshold">
                            <input class="step_amount_search" type="text" placeholder="投资步长不大于" v-model="advancedSearchInfo.stepAmount">
                        </div>

                        <a @click="advancedSearch" href="javascript:;">
                            <div class="advance_search_btn" @click="searchByIdMethod">
                                <div class="advanced_search_title">
                                    <div>高级检索</div>
                                    <svg class="icon" aria-hidden="true">
                                        <use class="btn_icon" xlink:href="#icon-sousuo-copy"></use>
                                    </svg>
                                </div>

                            </div>
                        </a>
                    </div>
                    <a @click="getProductList" href="javascript:;"><div class="all">全部</div></a>
                </div>
                <div class="form">
                    <el-table
                            :data="productList"
                            style="width: 100%">
                        <el-table-column
                                label="产品编号"
                                prop="id">
                        </el-table-column>
                        <el-table-column
                                label="产品名称"
                                prop="name">
                        </el-table-column>
                        <el-table-column
                                label="收益率%"
                                prop="rewardRate">
                        </el-table-column>
                        <el-table-column
                                label="起投金额(元)"
                                prop="thresholdAmount">
                        </el-table-column>
                        <el-table-column
                                label="投资步长(元)"
                                prop="stepAmount">
                        </el-table-column>

                        <el-table-column
                                label="锁定期(天)"
                                prop="lockTerm">
                        </el-table-column>
                        <el-table-column
                                label="更新时间"
                                prop="updateAt">
                        </el-table-column>

                        <el-table-column
                                align="right">
                            <template slot="header"  slot-scope="scope">
                                <div @click="addProduct" class="addBtn">添加</div>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                <el-button
                                        class="deleteBtn"
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)"> <span>Delete</span></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
<!--                //分页-->
                <a v-show="this.productListnotNull" href="javascript:;">
                    <div class="page_box">
                        <div class="totalProduct" >共{{this.totalProduct}}条记录</div>
                        <div class="nextPage" @click="changePageBtns(1)" v-show="this.currentPage+1!==this.totalPages">下一页 ></div>
                        <div v-show="this.totalPages!==this.currentPage+1" class="totalPage" @click="changePageBtns(totalPages-1)">{{this.totalPages}}</div>
                        <div v-show="this.currentPage !== (this.totalPages-2)&&this.currentPage !== (this.totalPages-1)" class="other">...</div>
                        <div  v-show="this.currentPage+3<this.totalPages" @click="changePageBtns(2)" class="currentPage+2">{{this.currentPage+3}}</div>
                        <div  v-show="this.currentPage+2<this.totalPages" @click="changePageBtns(1)" class="currentPage+1">{{this.currentPage+2}}</div>
                        <div class="currentPage">{{this.currentPage+1}}</div>
                        <div v-show="this.currentPage!==0" @click="changePageBtns(-1)" class="currentPage-1">{{this.currentPage}}</div>
                        <div @click="changePageBtns(-1)" v-show="this.currentPage!==0" class="prePage">< 上一页</div>
                    </div>
                </a>
            </div>
        </div>
<!--        //编辑框-->
        <div v-if="editShow" class="edit">
            <div class="edit_box">

                <el-input  prefix-icon="el-icon-top" placeholder="请输入收益率%" class="rewardInput" v-model="rewardInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=rewardInputTitle
                        :type=rewardType
                        show-icon>
                </el-alert>
                <el-input prefix-icon="el-icon-lock" placeholder="请输入锁定期(天)" class="lockTermInput" v-model="lockTermInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=lockTermTitle
                        :type=lockTermType
                        show-icon>
                </el-alert>
                <el-input  prefix-icon="el-icon-coin" placeholder="请输入起投金额￥" class="thresholdAmountInput" v-model="thresholdAmountInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=thresholdAmountTitle
                        :type=thresholdAmountType
                        show-icon>
                </el-alert>
                <el-input  prefix-icon="el-icon-coin" placeholder="请输入投资步长￥" class="stepAmountInput" v-model="stepAmountInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=stepAmountTitle
                        :type=stepAmountType
                        show-icon>
                </el-alert>
                <div class="editBtns">
                    <el-button @click="modifyProduct"  v-show="isReq"  type="primary">修改</el-button>
                    <el-button @click="cancelEdit"  class=""  v-show="isReq"  type="">取消</el-button>
                    <el-button @click="determineEdit"   v-show="!isReq"  type="primary">确定</el-button>
                </div>

            </div>
        </div>
<!--        添加框-->
        <div v-if="addShow" class="addProduct">
            <div class="addProduct_box">
                <el-input size="small" prefix-icon="el-icon-link" placeholder="请输产品编号" class="productIdInput" v-model="productIdInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=productIdTitle
                        :type=productIdType
                        show-icon>
                </el-alert>
                <el-input size="small" prefix-icon="el-icon-collection-tag" placeholder="请输入产品名称" class="productNameInput" v-model="productNameInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=productNameTip
                        :type=productNameType
                        show-icon>
                </el-alert>
                <el-input size="small" prefix-icon="el-icon-top" placeholder="请输入收益率%" class="rewardInput" v-model="rewardInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=rewardInputTitle
                        :type=rewardType
                        show-icon>
                </el-alert>
                <el-input size="small" prefix-icon="el-icon-lock" placeholder="请输入锁定期(天)" class="lockTermInput" v-model="lockTermInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=lockTermTitle
                        :type=lockTermType
                        show-icon>
                </el-alert>
                <el-input  size="small" prefix-icon="el-icon-coin" placeholder="请输入起投金额￥" class="thresholdAmountInput" v-model="thresholdAmountInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=thresholdAmountTitle
                        :type=thresholdAmountType
                        show-icon>
                </el-alert>
                <el-input  size="small" prefix-icon="el-icon-coin" placeholder="请输入投资步长￥" class="stepAmountInput" v-model="stepAmountInput" ></el-input>
                <el-alert
                        class="productTip"
                        :title=stepAmountTitle
                        :type=stepAmountType
                        show-icon>
                </el-alert>
                <div class="addProductBtns">
                    <el-button @click="addProductMethod"  v-show="isReq"  type="primary">添加</el-button>
                    <el-button @click="cancelAdd"  class=""  v-show="isReq"  type="">取消</el-button>
                    <el-button @click="determineEdit"   v-show="!isReq"  type="primary">确定</el-button>
                </div>

            </div>
        </div>
<!--        提示框-->
        <div v-show="visible" class="prompt">
            <p :class="{nor:isNor,error:isError,success:isSuccess}">{{promptText}}</p>
            <div style="text-align: right; margin: 10%">
                <el-button size="mini" type="text" v-show="visible1" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" v-show="visible1" @click="deleteMethod">确定</el-button>
                <el-button type="primary" size="mini" v-show="visible2" @click="reset">确定</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "admin",
        data(){
            return{
                editShow:false,
                addShow:false,
                isReq:true,
                productNameInput:'',
                rewardInput:'',
                thresholdAmountInput:'',
                stepAmountInput:'',
                productIdInput:'',
                rewardInput:"",
                lockTermInput:'',
                productNameTip:'请输入产品名称',
                productNameType:'info',
                newPasswordType:'info',
                thresholdAmountTitle:'请输入起投金额￥',
                thresholdAmountType:'info',
                rewardInputTitle:'请输入收益率%',
                rewardType:'info',
                stepAmountTitle:"请输入投资步长￥",
                stepAmountType:'info',
                productIdTitle:'请输入产品编号',
                productIdType:'info',
                lockTermTitle:'请输入锁定期(天)',
                lockTermType:"info",
                advancedSearchInfo:{
                    rewardRate:'',
                    lockTerm:'',
                    threshold:'',
                    stepAmount:'',
                },
                productList:[],
                currentPage:0,
                totalPages:0,
                totalProduct: 0,
                searchById:'',
                sign:1,
                visible:false,
                logoutVisible:false,
                search:'',
                pageBtns:0,
                productListnotNull:true,
                promptText:'确定要删除该产品吗？',
                isNor:true,
                isError:false,
                isSuccess:false,
                visible: false,
                visible1: false,
                visible2: false,
                curProductId:0,
                curProduct:{},
                tableData: [{
                    id: '001',
                    name: '金融1号',
                    thresholdAmount: '50',
                    stepAmount:'10',
                    lockTerm:0,
                    rewardRate:'3.86',
                    createAt:'2016-02-11',
                    updateAt:'2016-03-11',

                }]
            }
        },
        methods:{
            exchangeSign(newSign){
                this.sign=newSign;
            },
            logout(){
                this.sign=3;
                this.logoutVisible=true;

            },
            logoutMethod(){
                this.logoutVisible=false;
                sessionStorage.clear();
                this.$router.push('/').catch(err => {err});
                this.$router.go(0)
            },
            handleEdit(index, row) {
                this.curProductId=index;
                this.editShow=true;
                this.curProduct=row;
                this.productIdInput = this.curProduct.id;
                this.productNameInput=this.curProduct.name;
                this.thresholdAmountInput=this.curProduct.thresholdAmount;
                this.stepAmountInput=this.curProduct.stepAmount;
                this.lockTermInput=this.curProduct.lockTerm;
                this.rewardInput=this.curProduct.rewardRate;
                // console.log(index, row);
                // console.log(row);
            },
            handleDelete(index, row) {
               this.curProductId=index;
                this.visible=true;
                this.visible1=true;
                this.curProduct=row

             //    console.log(result);
                // console.log(index, row);
                // console.log(row);
            },
            async getProductList(){
                const result = await this.$http.get('api1/manager/products');
                this.productList = result.data.content;
                this.currentPage = result.data.number;
                this.totalProduct = result.data.totalElements;
                this.totalPages = result.data.totalPages;
                this.productList=result.data.content;
                // console.log(result.data.content)
                // console.log(this.totalPages);
            },
            async getPageBtns(){
                {
                    const result = await this.$http.get('api1/manager/products?pageNum='+this.pageBtns);
                    this.productList = result.data.content;
                    this.currentPage = result.data.number;
                    this.totalProduct = result.data.totalElements;
                    this.totalPages = result.data.totalPages;

                }
            },
            changePageBtns(num){
                this.pageBtns+=num
                // console.log(this.pageBtns);
                this.getPageBtns();
            },
            async searchByIdMethod(){
                if( this.searchById!==''){
                    const result1 = await this.$http.get('api1/manager/products/'+this.searchById);
                    const result2 = await this.$http.get('api1/manager/products/findByName?name='+this.searchById);
                    this.productList = [];
                    if ( result1.data !=='' ){
                        this.currentPage = 0;
                        this.totalPages = 1,
                            this.totalProduct = 1;
                        this.productList.push(result1.data);
                        // console.log(result1);
                    }
                    if(result2.data !==''){
                        this.currentPage = 0;
                        this.totalPages = 1,
                            this.totalProduct = 1;
                        this.productList.push(result2.data);
                    }
                    if(this.productList.length===0) {
                        this.productListnotNull=false;
                    }else {
                        this.productListnotNull=true;
                    }
                }
            },
            searchKeyup(){
                this.searchByIdMethod();
            },
            async advancedSearch(){
                const result =await this.$http.get('api1/manager/products/recommend?lockTerm='+this.advancedSearchInfo.lockTerm+'&minRewardRate='+this.advancedSearchInfo.rewardRate+'&thresholdAmount='+this.advancedSearchInfo.threshold+'&stepAmount='+this.advancedSearchInfo.stepAmount);
                // console.log(result.data.content);
                this.productList = result.data.content;
                this.currentPage = result.data.number;
                this.totalProduct = result.data.totalElements;
                this.totalPages = result.data.totalPages;
            },
            deleteMethod(){
                this.visible1=false;
                this.visible2=true;
                this.deleteProduct(this.curProduct);

            },
            async deleteProduct(product){
                let data = this.$getCode(this.$store.state.userInfo.authority);
                const result =await this.$http.delete('api1/manager/products/'+product.id,{
                    headers:{
                        'author':this.$store.state.userInfo.authority,
                        'authId': "1000",
                        'sign': data
                    }
                })
                console.log(result.data);
                if (result.status===200){
                    this.promptText="产品已经删除";
                    this.isSuccess=true;
                    this.isSuccess=true ;
                    for(var i = 0;i < this.productList.length;i++){
                        if(this.productList[i].id===this.curProduct.id){
                            this.productList.splice(i,1);
                        }
                    }
                }

            },
            async modifyProduct(){
                if(this.rewardInput===''){
                    this.rewardInputTitle='收益率不可为空';
                    this.rewardType='error';
                }
                if(this.lockTermInput===''){
                    this.lockTermTitle='锁定期不可为空';
                    this.lockTermType='error';
                }
                if(this.stepAmountInput===''){
                    this.stepAmountTitle='投资步长不可为空';
                    this.stepAmountType='error';
                }
                if(this.thresholdAmountInput===''){
                    this.thresholdAmountTitle='起投金额不可为空';
                    this.thresholdAmountType='error';
                }
                if(this.thresholdAmountInput!==''&&this.stepAmountInput!==''&&this.lockTermInput!==''&&this.rewardInput!==''){
                    let data = this.$getCode(this.$store.state.userInfo.authority);
                    const result =await this.$http.post('api1/manager/products/modify',
                        {
                            "id": this.productIdInput,
                            "name":  this.productNameInput,
                            "thresholdAmount": this.thresholdAmountInput,
                            "stepAmount": this.stepAmountInput,
                            "lockTerm":  this.lockTermInput,
                            "rewardRate": this.rewardInput,
                            "status": "AUDITING",
                            "memo": "null"
                        },{
                            headers:{
                                'Content-Type':'application/json',
                                'author':this.$store.state.userInfo.authority,
                                'authId': "1000",
                                'sign': data
                            }
                        })
                    if(result.status===200){
                        this.getProductList();
                        this.rewardInputTitle='收益率修改成功';
                        this.rewardType='success';
                        this.lockTermTitle='锁定期修改成功';
                        this.lockTermType='success';
                        this.stepAmountTitle='投资步长修改成功';
                        this.stepAmountType='success';
                        this.thresholdAmountTitle='起投金额修改成功';
                        this.thresholdAmountType='success';
                        this.isReq=!this.isReq;
                    }
                }


            },
            determineEdit(){
                this.productIdTitle='请输入产品编码';
                this.productIdType='info';
                this.productNameTip='请输入产品名称';
                this.productNameType='info';
                this.rewardInputTitle='请输入收益率%';
                this.rewardType='info';
                this.lockTermTitle='请输入锁定期(天)';
                this.lockTermType='info';
                this.stepAmountTitle='请输入投资步长￥';
                this.stepAmountType='info';
                this.thresholdAmountTitle='请输入起投金额￥';
                this.thresholdAmountType='info';
                this.isReq=!this.isReq;
                this.editShow=false;
                this.addShow=false;
            },
            reset(){
                this.isNor=true;
                this.isError=false;
                this.isSuccess=false;
                this.promptText='确定要删除该产品吗？';
                this.visible=false;
                this.visible2=false;

            },
            cancelEdit(){
                this.editShow=false;
            },
            addProduct(){
                this.addShow=true;
                this.productNameInput=''
                this.rewardInput=''
                this.thresholdAmountInput=''
                this.stepAmountInput=''
                this.productIdInput=''
                this.rewardInput=""
                this.lockTermInput=''
            },
            async addProductMethod(){
                if(this.productIdInput===''){
                    this.productIdTitle='产品编号不可为空';
                    this.productIdType='error';
                }
                if(this.productNameInput===''){
                    this.productNameTip='产品名称不可为空';
                    this.productNameType='error';
                }
                if(this.rewardInput===''){
                    this.rewardInputTitle='收益率不可为空';
                    this.rewardType='error';
                }
                if(this.lockTermInput===''){
                    this.lockTermTitle='锁定期不可为空';
                    this.lockTermType='error';
                }
                if(this.thresholdAmountInput===''){
                    this.thresholdAmountTitle='起投金额不可为空';
                    this.thresholdAmountType='error';
                }
                if(this.stepAmountInput===''){
                    this.stepAmountTitle='投资步长不可为空';
                    this.stepAmountType='error';
                }
                if(this.productIdInput!==''&&this.productNameInput!==''&&this.rewardInput!==''&&this.lockTermInput!==''&&
                    this.thresholdAmountInput!==''&&this.stepAmountInput!==''){
                    const result = await this.$http.post('api1/manager/products',
                    {
                        "id": this.productIdInput,
                        "name":  this.productNameInput,
                        "thresholdAmount": this.thresholdAmountInput,
                        "stepAmount": this.stepAmountInput,
                        "lockTerm":  this.lockTermInput,
                        "rewardRate": this.rewardInput,
                        "status": "AUDITING",
                        "memo": "null"
                    },{
                        headers:{
                            'Content-Type':'application/json',
                                'authId': "1000",
                                'sign': "DysFAPmDCHN6Al54HuSbt+cT5W+7gNfNWI02iCz5lqc33o2z/fmESbXA0CGNuWS2vCgkrDB5kZV3y7+nWuQBYJGw476xYl3D8s9V0MnC7qFdefYrY97pniN5uOzcyawBHR9q+5Puz+dj6zj39y5g8nqKG2SSz2L94381eiLYIf8"
                        }
                    })
                    console.log(result.data);
                    if(result.status===200&&result.data==='添加成功'){
                        this.productNameTip='可以使用的产品名称';
                        this.productNameType='success';
                        this.productIdTitle='可以使用的产品编号';
                        this.productIdType='success';
                        this.rewardInputTitle='可以使用的收益率';
                        this.rewardType='success';
                        this.lockTermTitle='可以使用的锁定期';
                        this.lockTermType='success';
                        this.stepAmountTitle='可以使用的投资步长';
                        this.stepAmountType='success';
                        this.thresholdAmountTitle='可以使用的起投金额';
                        this.thresholdAmountType='success';
                        this.getProductList();
                        this.isReq=!this.isReq;
                    }else if(result.status===200&&result.data==='该产品编号已经存在，请更换其他编号'){
                        this.productIdTitle='该产品编号已经存在，请更换其他编号';
                        this.productIdType='error';
                        this.productNameTip='请输入产品名称';
                        this.productNameType='info';
                    }else if(result.status===200&&result.data==='该产品名称已经存在，请更换其他名称'){
                        this.productNameTip='该产品名称已经存在，请更换其他名称';
                        this.productNameType='error';
                        this.productIdTitle='请输入产品编号';
                        this.productIdType='info';
                    }
                }

            },

            cancelAdd(){
                this.determineEdit();
                this.isReq=!this.isReq;
            },
        },
        mounted() {
            this.getProductList();
        }
    }
</script>

<style scoped>
.admin_container{
    overflow: hidden;
    width: 100%;
    background: #eaecef;
    height: 1300px;
}
.admin_box{
    overflow: hidden;
    width: 94%;
    margin: 0 auto;
    margin-top: 1.8%;
    height: 95%;
    background: #eaecef;
}
.admin_left a{
    text-decoration: none;
    overflow: hidden;
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
.admin_left{
    overflow: hidden;
    display: inline-block;
    height: 100%;
    border: 1px solid #eaecef;
    width: 25%;
    background: white;
}
.admin_right{
    overflow: hidden;
    display: inline-block;
    margin-left: 1%;
    height: 100%;
    width: 73.5%;
    background:white;
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
.form{
    margin: 0 auto;
    overflow: hidden;
    height: 78%;
    width: 90%;
    margin-top: 6%;

}
    .deleteBtn{
        margin-top: 5px;
        width: 52px;
    }
.deleteBtn span{
   margin-left: -6px;

}
.addBtn{
    margin-left: 25px;
    color:white;
    font-size: 0.8rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    height: 30px;
    line-height: 30px;
    width: 54px;
    background: #6892ff;
    box-sizing: border-box;
    }

.addBtn:hover{
   cursor: pointer;
    background: #95c8ff;

}
.addBtn:active{
    border: 1px solid #bce1ff;
}
.page_box{
    width: 80%;
    height: 40px;
    margin: 0 auto;
    margin-top: 20px;

}
.page_box div{
    align-items: end;
    display: inline-block;
    border:1px solid #e6e6e6;
    line-height: 40px;
    width: 40px;
    text-align: center;
    float: right;
    color: #5e5e5e;

}
.page_box .prePage{
    width: 80px;
}
.page_box .nextPage{
    width: 80px;
}
.page_box .totalProduct{
    width: 100px;
}
.tail_header{
    width: 90%;
    height: 50px;
    /*background: #88bfff;*/
    margin: 0 auto;
    margin-top: 3%;
}
.tail_header_search{
    position: relative;
    height: 50px;
    display: inline-block;
    float: right;
    margin-top: 12px;
    margin-right: 20px;
}
.tail_header_search  .search_text{
    float: left;
    width:220px;
    height: 30px;
}
.tail_header_search .search_btn{
    float: left;
    height: 36px;
    width: 36px;
    background: #fa214c;
    font-size: 1.2rem;
}
.tail_header_search .search_btn:active{
    background: #fa0c13;

}
.tail_header_search .search_btn svg{
    margin: 3px ;
}
.icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-left: -7px;
}
.product_list_img{
    display: inline-block;
    margin-top: 12px;
    margin-left: 20px;
    font-size: 1rem;
    text-shadow: 3px 3px 6px rgba(0,0,0,.2);

}
.product_text{
    display: inline-block;
    margin: 0 0 0 8px;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 3px 3px 6px rgba(0,0,0,.2);
    color: #475669;
}
.advanced_search{
    position: relative;
    /*background: #4afaf8;*/
    width: 100%;
    font-size: 1.2rem;
    color: #475669;
    border-bottom: 0.5px solid rgba(0,0,0,0.4) ;
    height: 65px;
}
.advanced_search .advance_search_btn {
    position: absolute;
    line-height: 50px;
    display: inline-block;
    height: 36px;
    width: 116px;
    text-align: center;
    line-height: 36px;
    background: #fa214c;
    color: white;
    right: 78px;
    font-size: 0.9rem;
    top:17px
}
.advance_search_btn:active{
    background: #fa0c13;

}
.advanced_search .advance_search_btn div{
    display: inline-block;
    padding-right: 17px;
    width: 80px;
}
.advance_search_btn svg{
    position: absolute;
    font-size: 1.2rem;
    margin-top: -32px;
    right: 3px;
}
.advanced_search .input{
    position: absolute;
    left: 0%;
    width: 100%;
    height: 60px;
}
.advanced_search .input input{
    margin-top: 10px;
    width: 17%;
    height: 30px;
    display: inline-block;
    margin-left: 27px;
}
.advanced_search .input{
    position: absolute;
    left: 0%;
    width: 100%;
}
.advanced_search .input input{
    margin-top: 20px;
    width: 17%;
    height: 25px;
    display: inline-block;
    margin-left: 8px;
}
.all{
    position: absolute;
    background: #fa214c;
    width: 50px;
    height: 35px;
    color: white;
    text-align: center;
    line-height: 35px;
    right:104px;
    top:188px;
}
.all:active{
    background: #fa0c13;

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
.edit{
    z-index: 1000;
    border-radius:10px ;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: fixed;
    left: 60%;
    top: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 85%;
    width: 35%;
    background: #eaecef;
}
.edit_box{
    width: 80%;
    margin: 0 auto;
    margin-top: 9%;
}
.edit_box el-alert {
    height: 10px;
}
.edit_box .rewardInput{
    margin-top: 1%;
}
.edit_box .thresholdAmountInput{
    margin-top: 1%;
}
.edit_box .stepAmountInput{
    margin-top: 1%;
}
    .productTip{
        height: 30px;
    }
    .editBtns{
        margin: 0 auto;
        width: 80%;
        margin-top: 7%;
        display: flex;
        justify-content: space-around;
    }
.success{
    color: rgba(29, 174, 30, 0.94);
}
.addProduct{
    z-index: 1000;
    border-radius:10px ;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: fixed;
    left: 60%;
    top: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    height: 94%;
    width: 35%;
    background: #eaecef;
}
.addProduct_box{
    width: 80%;
    margin: 0 auto;
    margin-top: 7%;
}
.addProduct_box .rewardInput{
    margin-top: 1%;
}
.addProduct_box .thresholdAmountInput{
    margin-top: 1%;
}
.addProduct_box .stepAmountInput{
    margin-top: 1%;
}
.addProductBtns{
    margin: 0 auto;
    width: 80%;
    margin-top: 7%;
    display: flex;
    justify-content: space-around;
}
</style>
