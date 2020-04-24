<template>
    <div class="help_Center_com1_container">
        <el-collapse v-model="activeName" accordion class="el-collapse">
            <el-collapse-item title="我没有携带U盾或UKey或网银盾，请问我能使用网上银行专业版吗?" name="1">
                <div>答：没有携带U盾或UKey或网银盾是不能使用网银专业版支付的；如果您的申购额度小于5万元，可以使用微信支付；</div>
            </el-collapse-item>
            <el-collapse-item title="网上银行支付必须使用我在理财通绑定的安全卡吗？" name="2">
                <div>答：不是必须的，您可以使用目前支持14家银行的任意一家。</div>
            </el-collapse-item>
            <el-collapse-item title="在电脑版理财通每天最多能买多少？" name="5">
                <div>答：买入金额只要满足银行卡限额即可（该限制为银行方面限制），每个银行限额不一样。</div>
            </el-collapse-item>
            <el-collapse-item title="电脑版理财通支持哪些浏览器？" name="3">
                <div>答：建议使用IE内核浏览器上电脑版理财通，因为绝大部分银行控件在非IE内核（如Chrome，Firefox，Safari）无法加载，以下列举了支持电脑版理财通的IE内核浏览器。

                    另外，强烈建议你使用QQ浏览器，经过测试，QQ浏览器可以尽可能避免网银支付过程中出现的问题。

                    QQ浏览器下载地址：http://browser.qq.com/</div>
            </el-collapse-item>
            <el-collapse-item title="保险理财是保险吗？" name="4">
                <div>答：理财通上的保险理财产品主要功能是资产增值，部分产品如光大永明投连险才兼有保障功能。理财通上面的保险产品风险低，收益稳健，在理财通是比较受用户欢迎的投资理财产品。</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "HelpCenterCom1",
        data() {
            return {
                activeName: '1'
            };
        }
    }
</script>

<style scoped>
    .help_Center_com1_container{
        width: 90%;
        margin:0 auto;
        margin-top: 10%;
    }
</style>
