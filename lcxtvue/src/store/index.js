import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      token:'',
      id:'',
      username:'',
      balance:null,
      bankCardNum:'',
      email:'',
      authority:'',
    },
    curClickProductInfo:{
      //产品id
      productId:'',
      //产品name
      productName:'',
      //购买金额
      productAmount:0,
      productLockTerm:0,

      //订单拥有者用户Id
      chanUserId:'',

      threshold_amount:'',
      step_amount:'',
      //
      orderId:'',
      createAt:'',
    },
    popup:false,
  },
  mutations: {
    getUserToken(state,token){
      state.userInfo.token=token;
    },
      getUserId(state,id){
        state.userInfo.id=id;
      },
      getUserUsername(state,username){
        state.userInfo.username=username;
      },
      getUserBalance(state,balance){
        state.userInfo.balance=balance;
      },
      getUserBankCardNum(state,bankCardNum){
        state.userInfo.bankCardNum=bankCardNum;
      },
      getUserEmail(state,email){
        state.userInfo.email=email;
      },
      getUserAuthority(state,authority){
        state.userInfo.authority=authority;
      },


    getCurProductId(state,productId){
      state.curClickProductInfo.productId=productId;
    },
    getCurProductLockTerm(state,productLockTerm){
      state.curClickProductInfo.productLockTerm=productLockTerm;
    },
    getCurProductName(state,productName){
      state.curClickProductInfo.productName=productName;
    },
    getCurProductAmount(state,productAmount){
      state.curClickProductInfo.productAmount=productAmount;
    },

    getCurProductThresholdAmount(state,threshold_amount){
      state.curClickProductInfo.threshold_amount=threshold_amount;
    },

    getCurProductStepAmount(state,step_amount){
      state.curClickProductInfo.step_amount=step_amount;
    },

    exchangePopup(state){
      state.popup=!state.popup;
    }
  },
  actions: {
  },
  modules: {
  }
})
