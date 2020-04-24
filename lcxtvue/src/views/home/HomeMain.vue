<template>
    <div class="main_containter">
        <div class="main_box">
            <div class="headMask">
                <div class="headMaskBox">
                    <div class="title1">XX理财</div>
                    <div class="title2">
<!--                        <svg class="icon" aria-hidden="true">-->
<!--                            <use xlink:href="#icon-qiandai1"></use>-->
<!--                        </svg>-->
                        <i class="el-icon-coin"></i>
                        <div class="my-wallet">我的余额：</div>
                    </div>
                    <a href="javascript:;">
                        <div @click="myWalletshow=!myWalletshow" v-show="myWalletshow===false" class="title3">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yanjing1"></use>
                            </svg>
                            <span class="hide">**</span>
                        </div>
                        <div @click="myWalletshow=!myWalletshow" v-show="myWalletshow===true" class="title4">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yanjing"></use>
                            </svg>
                            <span class="show">{{this.$store.state.userInfo.balance}}￥</span>
                        </div>
                    </a>
                </div>

            </div>
            <div class="main_head">
                <div class="block">
                    <span class="demonstration"></span>
                    <el-carousel height="400px" >
                        <el-carousel-item v-for="(item,key) in images" :key="key">
                            <img :src=item alt="" height="400px" width="100%">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
<!--        是否登录弹窗-->
        <transition name="fade">
        <div v-show="this.$store.state.popup" class="popup">请先登录</div>
        </transition>
        <div class="main_mid">
            <div class="recomment_product_head">
                <i class="tuijimg">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jian"></use>
                    </svg>
                </i>
                <h3 class="hot-text">今日推荐</h3>
                <div class="hot-text2">灵活 · 高收益</div>
                <a href="javascript:;"><div @click="moreMethod" class="more">更多理财产品></div></a>
            </div >
            <div class="recomment_product_body"></div>
            <div class="recomment_product_body1">
                <h3 class="product_lock">锁定期{{tuijianList[0]['lockTerm']}}天</h3>
                <p class="product_name">{{tuijianList[0].name}}</p>
                <span class="income_data">
                        <p class="product_rate"> {{tuijianList[0].rewardRate}}</p>
                    <em>%</em>
                    </span>
                <p class="annualizedRate">近七日年化率</p>
                <p class="productInfo">起投金额: {{tuijianList[0].thresholdAmount}}￥</p>
                <transition name="my">
                    <div class="recomment_button_box">
                        <a  href="javascript:;">
                            <div class="recomment_button_content">
                                <p class="recomment_button_text" @click="apply(tuijianList[0])">立即抢购</p>
                            </div>
                        </a>
                    </div>
                </transition>
            </div>
            <div class="recomment_product_body2">
                <h3 class="product_lock">锁定期<span>{{tuijianList[1]['lockTerm']}}</span>天</h3>
                <p class="product_name">{{tuijianList[1].name}}</p>
                <span class="income_data">
                        <p class="product_rate">{{tuijianList[1].rewardRate}}</p>
                    <em>%</em>
                    </span>
                <p class="annualizedRate">近七日年化率</p>
                <p class="productInfo">起投金额： {{tuijianList[1].thresholdAmount}}￥</p>
                <div class="recomment_button_box">
                    <a class="recomment_button_content_a" href="javascript:;">
                        <transition>
                            <div class="recomment_button_content">
                                <p class="recomment_button_text" @click="apply(tuijianList[1])" >立即抢购</p>
                            </div>
                        </transition>
                    </a>

                </div>

            </div>
            <div class="recomment_product_body3">
                <h3 class="product_lock">锁定期<span>{{tuijianList[2]['lockTerm']}}</span>天</h3>
                <p class="product_name">{{tuijianList[2].name}}</p>
                <span class="income_data">
                        <p class="product_rate">{{tuijianList[2].rewardRate}}</p>
                    <em>%</em>
                    </span>
                <p class="annualizedRate">近七日年化率</p>
                <p class="productInfo">起投金额： {{tuijianList[2].thresholdAmount}}￥</p>
                <div class="recomment_button_box">
                    <a class="recomment_button_content_a" href="javascript:;">
                        <transition>
                            <div class="recomment_button_content">
                                <p class="recomment_button_text" @click="apply(tuijianList[2])">立即抢购</p>
                            </div>
                        </transition>
                    </a>

                </div>


            </div>
            <div class="recomment_product_body4">
                <h3 class="product_lock">锁定期<span>{{tuijianList[3]['lockTerm']}}</span>天</h3>
                <p class="product_name">{{tuijianList[3].name}}</p>
                <span class="income_data">
                        <p class="product_rate">{{tuijianList[3].rewardRate}}</p>
                    <em>%</em>
                    </span>
                <p class="annualizedRate">近七日年化率</p>
                <p class="productInfo">起投金额： {{tuijianList[3].thresholdAmount}}￥</p>
                <div class="recomment_button_box">
                    <a class="recomment_button_content_a" href="javascript:;">
                        <transition>
                            <div class="recomment_button_content">
                                <p class="recomment_button_text" @click="apply(tuijianList[3])">立即抢购</p>
                            </div>
                        </transition>
                    </a>

                </div>


            </div>
        </div>
        <div class="main_tail">
            <div class="tail_box">
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

                <div class="tail_body">
                    <div class="product_title_box">
                        <span>基金名称/编号</span>
                        <span>收益率</span>
                        <span>锁定期</span>
                        <span>起投资金</span>
                        <span>投资步长</span>
                        <span>更新时间</span>
                        <span>操作</span>
                    </div>
                    <div  v-for="(item,index) in productList" class="product_content_box" :key="index">
                        <span>
                            <div class="procuct_name">{{item.name}}</div>
                            <div class="procuct_id">{{item.id}}</div>
                        </span>
                        <span>{{item.rewardRate}}</span>
                        <span>{{item.lockTerm}}</span>
                        <span>{{item.thresholdAmount}}</span>
                        <span>{{item.stepAmount}}</span>
                        <span>{{item.updateAt}}</span>
                        <span @click="apply(productList[index])"> <a href="javascript:;">购买</a></span>
                    </div>
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
                    <div v-show="!this.productListnotNull" class="productListisNull">没有查询到该产品</div>
                </div>
            </div>
        </div>
<!--        申购界面-->
        <Apply :applyShow="applyShow" @applyShow="applyShowMethod" ></Apply>
    </div>
</template>
<script>
    import Apply from "../../components/Apply";
    import {mapState} from 'vuex';
    // import img1 from '../../assets/img/理财/d-pro01.jpg'
    export default {
        name: "HomeMain",
        data(){
            return{
                advancedSearchInfo:{
                    rewardRate:'',
                    lockTerm:'',
                    threshold:'',
                    stepAmount:'',
                },
                applyPassword:'123456',
                applyShow:false,
                // popup:false,
                currentProductInfo:{
                    //产品id
                    productId:'',
                    //产品name
                    productName:'',
                    //购买金额
                    productAmount:0,
                    //订单拥有者用户Id
                    chanUserId:'',
                    lockTerm:0,

                    orderId:'',
                    createAt:'',
                },
                productList:[],
                currentPage:0,
                totalPages:0,
                totalProduct: 0,
                searchById:'',
                pageBtns:0,
                productListnotNull:true,
                tuijianList:[],
                myWallet:'1000',
                myWalletshow:false,
                // img:[img1]
                images:[require('../../assets/img/wallhaven-751658.jpg'),
                    require('../../assets/img/wallhaven-749402.jpg'),
                    require('../../assets/img/wallhaven-753349.jpg'),
                    require('../../assets/img/wallhaven-751658.jpg'),
                ],
                tuijianImages:[require('../../assets/img/理财/d-pro01.jpg'),
                    require('../../assets/img/理财/d-pro02.jpg'),
                    require('../../assets/img/理财/d-pro03.jpg'),
                    require('../../assets/img/理财/d-pro04.jpg'),
                ],
            }
        },
        methods:{
            async getProductList(){
              const result = await this.$http.get('api1/manager/products');
              this.productList = result.data.content;
             this.currentPage = result.data.number;
              this.totalProduct = result.data.totalElements;
              this.totalPages = result.data.totalPages;

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
            moreMethod(){
                document.documentElement.scrollTop=975;
            },
            async gettuijian(){
                const result = await this.$http.get('api1/manager/products/recommend?lockTerm=7&minRewardRate=3.5&pageNum=0&pageSize=10& thresholdAmount=100&stepAmount=10');
                   this.tuijianList = result.data.content.slice(0,4);
            },
            apply(curClickProductInfo){
                if(this.$store.state.userInfo.token==''){
                    const timer = null;
                    clearTimeout(timer);
                    document.documentElement.scrollTop=0;//不需要加单位
                    // this.popup=!this.popup;
                    this.$store.commit('exchangePopup');
                    setTimeout(()=>{
                        this.$store.commit('exchangePopup');
                        clearTimeout(timer);
                    },1000)
                }else {
                    //存入当前点击的产品信息到vuex中
                    this.curProductInfo(curClickProductInfo);
                    this.applyShow=true;

                }

            },
            //完善当前选中产品的信息,存入vuex中
            curProductInfo(curClickProductInfo){
                    this.currentProductInfo.productName = curClickProductInfo.name;
                    this.currentProductInfo.productId = curClickProductInfo.id;
                    //写入Vuex中
                this.$store.commit('getCurProductStepAmount',curClickProductInfo.stepAmount);
                this.$store.commit('getCurProductThresholdAmount',curClickProductInfo.thresholdAmount);
                this.$store.commit('getCurProductId',curClickProductInfo.id);
                this.$store.commit('getCurProductName',curClickProductInfo.name);
                this.$store.commit('getCurProductLockTerm',curClickProductInfo.lockTerm);

            },
            async advancedSearch(){
                const result =await this.$http.get('api1/manager/products/recommend?lockTerm='+this.advancedSearchInfo.lockTerm+'&minRewardRate='+this.advancedSearchInfo.rewardRate+'&thresholdAmount='+this.advancedSearchInfo.threshold+'&stepAmount='+this.advancedSearchInfo.stepAmount);
                // console.log(result.data.content);
                   this.productList = result.data.content;
                this.currentPage = result.data.number;
                this.totalProduct = result.data.totalElements;
                this.totalPages = result.data.totalPages;
            },
            applyShowMethod(data){
                this.applyShow=data;
            }
        },
        mounted() {
            this.gettuijian();
            this.getProductList();

        },
        computed:{
            ...mapState(["userInfo"])
        },
        components:{
            Apply
        }
    }
 </script>

<style scoped>
.main_containter{
    overflow: hidden;
    margin-top: 0px;
    position: relative;
    width: 100%;
    height: 1720px ;
    background: #e3e3e3;
}
.main_box{
    overflow: hidden;
    width: 90%;
    /*background: #55c3cc;*/
    margin: 0 auto;
    position: relative;
}
    .main_head{
        overflow: hidden;
        width: 100%;
        height: 400px;
        margin-top: 20px;
        border-radius: 5px;
        /*background: #4afaf8;*/
    }
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}
.headMask{
    margin-top: 1.7%;
    display: inline-block;
    z-index: 100;
    position: absolute;
    /*background: #000;*/
    /*opacity: 0.2;*/
    background: rgba(0,0,0,0.2);
    width: 40%;
    height: 400px;
    border-radius: 5px;
    right: 0;
    user-select: none;
}
.headMaskBox{
    position: relative;
}
.headMaskBox a{
text-decoration: none
}
.headMask .title1{
    opacity: 1;
    z-index: 101;
    color: white;
    font-size: 3.5rem;
    margin-top: 70px  ;
    margin-left: 28%;

}
.headMask .title2 {
     opacity: 0.8;
     z-index: 101;
     color: white;
     font-size: 2rem;
     margin-top: 25px  ;
    margin-left: 28%;
 }
.headMask .title2 .my-wallet{
    display: inline-block;
    margin-left: 2%;
    /*background: #000;*/
    transform: translate(0%,-9%);

}
.headMask .title3 {
    position: relative;
    opacity: 0.8;
    z-index: 101;
    color: white;
    font-size: 1.5rem;
    user-select: none;
    margin-top: 13.5px  ;
    /*margin-left:40%;*/
    /*transform: translate(-20%,0%);*/
    margin-left: 30%;
}
.title3 .hide{
   position: relative;
    font-size: 3rem;
    top:  15px;
    left: 15px;
}
.headMask .title4 {
    width: 100%;
    opacity: 0.8;
    z-index: 101;
    color: white;
    font-size: 1.5rem;
    margin-top: 32px  ;
    margin-left: 50%;
    transform: translate(-20%,0%);
    user-select: none;
}
.title4 .show{
    position: relative;
    top:  -2px;
    left: 15px;
}
    .main_mid{
        width: 90%;
        background: white;
        height: 420px;
        margin:0 auto;
        margin-top: 25px;
        border-radius: 5px;
        overflow: hidden;

    }
    .recomment_product_head{
        font-size: 20px;
        font-weight: 700;
        text-shadow: 6px 6px 12px rgba(245,47,62,.2);
        color: #475669;
        width: 100%;
        height: 50px;
        position: relative;
    }
.icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-left: -7px;
}
    .tuijimg{
        display: inline-block;
        margin-top: 12px;
        margin-left: 20px;
    }
    .hot-text{
        display: inline-block;
        margin: 0 0 0 8px;
        text-shadow: 3px 3px 6px rgba(0,0,0,.2);

    }
.hot-text2{
    display: inline-block;
    margin: 0 0 0 8px;
    font-size: 13px;
    font-weight: 400;
    text-shadow: 3px 3px 6px rgba(0,0,0,.2);

}
.more{
    color: #3282ff;
    margin: 17px 22px 0 0px;
    float: right;
    font-size: 14px;
    font-weight: 400;
    text-shadow: 3px 3px 6px rgba(0,0,0,.2);

}
.more:hover{
    color: #f52f3e;
}
.recomment_product_body p{
    position: relative;
    /*margin: 0 auto;*/
}
    .recomment_product_body1{
        overflow: hidden;
        display: inline-block;
        width: 22.5%;
        height:320px ;
        background: #ccc52d;
        margin: 10px 0 0 22px;
        background: url("../../assets/img/理财/d-pro01.jpg");
        background-size: cover;
    }
.recomment_product_body2{
    overflow: hidden;
    display: inline-block;
    width: 22.5%;

    height:320px ;
    background: #ccc52d;
    margin: 0 0 0 22px;
    background: url("../../assets/img/理财/d-pro02.jpg");
    background-size: cover;
}
.recomment_product_body3{
    overflow: hidden;
    display: inline-block;
    width: 22.5%;

    height:320px ;
    background: #ccc53d;
    margin: 0 0 0 22px;
    background: url("../../assets/img/理财/d-pro03.jpg");
    background-size: cover;
}
.recomment_product_body4{
    overflow: hidden;
    display: inline-block;
    width: 22.5%;

    height:320px ;
    background: #ccc52d;
    margin: 0 0 0 22px;
    background: url("../../assets/img/理财/d-pro04.jpg");
    background-size: cover;
}
.product_lock{
    text-align: center;
    width: 100%;
    color: #475669;
    margin: 15px 0 0 0;
    font-size: 1.5rem;

}
.product_name{
    text-align: center;
    width: 100%;
    color: #475669;
    margin: 10px 0 10px 0;
    font-size: 1rem;
}
.product_rate{
    display: inline-block;
    width: 73%;
    font-weight: bold;
    font-family: arial;
    color: #fa3709;
    text-shadow: 3px 6px 15px rgba(245,47,62,.4);
    font-size: 4rem;
    text-align:end;
    margin: 0;
}
em{
    display: inline-block;
    margin: 0 0 0 0;
    width: 27%;
    color: #fa3709;
    font-size: 1.5rem;
    font-weight: bold;


}

.annualizedRate{
    text-align: center;
    width: 100%;
    color: black;

    margin: 0;
}
.productInfo{
    text-align: center;
    width: 100%;
    color: black;
    font-size: 1.2rem;
}
    .recomment_button_box{
        width: 100%;
        height: 50px;
    }
.recomment_button_content{
    width: 80%;
    height: 100%;
    background: rgba(255,255,255,0.8);
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 3px;
}

.recomment_button_content :hover{
    margin-top: -5px;
    background: rgba(255,255,255,0.7);
    border-radius: 3px;
    transition: .3s ease all;

}
 .recomment_button_text{
    text-align: center;
    line-height: 50px;
    font-size: 16px;
     color: #f52f3e;
     font-weight: 700;
}
.recomment_button_box a{
    text-decoration: none;
}
    .tail_box{
        width: 100%;
        background: #fff;
        height: 820px;
        margin-top: 25px;
        border-radius: 5px;
    }
    .tail_header{
        width: 80%;
        height: 50px;
        /*background: #88bfff;*/
        margin: 0 auto;
    }
    .product_list_img{
        display: inline-block;
        margin-top: 12px;
        margin-left: 20px;
        font-size: 1.5rem;
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
.advanced_search{
    position: relative;
    /*background: #4afaf8;*/
    width: 100%;
    font-size: 1.2rem;
    color: #475669;
    border-bottom: 0.5px solid rgba(0,0,0,0.4) ;
    height: 50px;
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
    right: 76px;
    font-size: 0.9rem;
    top:7px
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
}
.advanced_search .input input{
    margin-top: 10px;
    width: 17%;
    height: 25px;
    display: inline-block;
    margin-left: 27px;
}
.product_title_box{
    margin: 0 auto;
    margin-top: 50px;
    width: 80%;
     /*background: #7783fa;*/
    font-size: 1.2rem;
    color: #475669;
    border-bottom: 0.5px solid rgba(0,0,0,0.4) ;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content:space-around;
}

.product_content_box{
    margin: 0 auto;
    width: 80%;
    font-size: 1rem;
    border-bottom: 0.5px solid rgba(0,0,0,0.2) ;
    height: 60px;

}
.product_content_box span{
    vertical-align: top;
    text-align: center;
    display: inline-block;
    line-height: 60px;
    color: #5e5e5e;

}
.product_content_box:hover{
    background: #e3e3e3;

}
.product_content_box span:nth-child(1){
    width: 19%;
    margin: 0 auto;
}
.product_content_box span div:nth-child(1){
    line-height: 38px;
    color: #5e5e5e;
}
.product_content_box span div:nth-child(2){
    font-size: 13px;
    line-height: 22px;
    color: #a5a5a5;

}
.product_content_box span:nth-child(2){
    width: 13%;
    color: rgb(245, 47, 62)


}
.product_content_box span:nth-child(3){
    width: 13%;
    color: rgb(105, 205, 142)

}
.product_content_box span:nth-child(4){
    width: 15%;
    color: rgb(105, 205, 142)
}
.product_content_box span:nth-child(5){
    width: 14%;
    color: rgb(105, 205, 142)

}
.product_content_box span:nth-child(6){
     width: 15%;
    color: rgb(105, 205, 142)



}
.product_content_box span:nth-child(7){
    width: 10.5%;
    color: #5b9fe2;
}
.product_content_box span:nth-child(7) a{
    text-decoration: none;
    color: #5b9fe2;
}
.product_content_box span:nth-child(7) a:hover{
    color: #f52f3e;
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
.productListisNull{
    height: 200px;
    width: 80%;
    /*background: #88bfff;*/
    margin: 0 auto;
    line-height: 200px;
    font-size: 3rem;
    text-align: center;
    color: #5e5e5e;
}
    .popup{
        position: absolute;
        width: 30%;
        height: 250px;
        top:5%;
        left: 50%;
        transform: translate(-50%,0%);
        background: #000;
        z-index: 1005;
        border-radius: 9px;
        color: white;
        font-size: 3rem;
        line-height: 250px;
        text-align: center;
        opacity: 0.7;
        user-select: none;
        font-family: arial;

    }
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.all{
    position: absolute;
    background: #fa214c;
    width: 50px;
    height: 35px;
    color: white;
    text-align: center;
    line-height: 35px;
    right: 145px;
    top: 948px;
}
.all:active{
    background: #fa0c13;

}
</style>
