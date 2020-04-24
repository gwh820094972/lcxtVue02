<template>
<div class="footer_containter">
    <div class="footer_box">
        <div class="footer_left">
            <img src="../../assets/logo.png" height="25" width="25"/>
            <span class="name">XX理财 | </span>
            <a href="javascript:;"><span>关于XX理财</span></a>
            <span class="other">| Copyright © XX版权所有 | 投资有风险，购买需谨慎</span>
            <div class="contactUsBox">
                <p class="contactUs">
                    <i class="contactUsImg"></i>
                    <strong class="contact-txt">联系客服</strong>
                </p>
                <div class="tel">
                    <div class="tel-num">电话: XXXXXX</div>
                </div>
            </div>
        </div>
        <div class="footer_right"></div>
    </div>
</div>
</template>

<script>
    export default {
        name: "HomeFooter"
    }
</script>

<style scoped>
.footer_containter{
    margin-top: 3%;
    width: 100%;
    height: 100px;

}
    .footer_box{
        width: 80%;
        /*background: #7783fa;*/
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
    }
    .footer_left{
        position: relative;
        height: 100px;
        color:#606266;
        font-size: 12px;
    }
.footer_left img{
    margin-top: 37px;
    margin-left: 23px;
}
.footer_left .name {

    position: absolute;
    top: 40px;
    left: 55px;

}
.footer_left a{
    color:#606266;
    position: absolute;
    top: 40px;
    left: 105px;

}
.footer_left a{
   text-decoration: none;
}
  .other{
      position: absolute;
      top: 40px;
      left: 174px;
  }
  .contactUsBox{
      position: absolute;
      width: 130px;
      height: 50px;
      position: absolute;
      /*background: #4afaf8;*/
      top: 15px;
      right: 8px;
  }
.contact-txt{
   position: absolute;
    top: 16px;
    left: 30px;
    font-weight: bold;
    font-size: 0.9rem;

}
.tel-num{
    font-size: 14px;
    color:#606266;
    margin-top: -8px;
    margin-left: 4px;

}
    .contactUsImg{
        display: inline-block;
        height: 26px;
        width: 26px;
        background:url("../../assets/img/e212a7fdaff90a72a8d7497b687d5328_index-sf6e01cb16f.c034d6d6.png") 0 0 no-repeat;
        /*background-position: -255px -276px;*/
    }
</style>
