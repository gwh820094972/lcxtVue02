<template>
    <div class="help_Center_com1_container">
        <el-collapse v-model="activeName" accordion class="el-collapse">
            <el-collapse-item title="为什么网银密码输入框无法输入？" name="1">
                <div>答：这是因为没有安装控件，请先点击左侧提示下载并安装控件；安装完成后刷新页面或关闭再重新启动浏览器；输入框即可输入密码。</div>
            </el-collapse-item>
            <el-collapse-item title="使用中国银行进行网银支付的操作流程是啥？" name="2">
                <div>答：请点击查看：https://qian.qq.com/web/v3/guide/large_index.shtml</div>
            </el-collapse-item>
            <el-collapse-item title="中国银行如何开通网上银行？" name="5">
                <div>答：您需要携带本人有效身份证件亲临中国银行网点办理注册开通手续。网银开通时需使用一张长城电子借记卡，您可携带已有的借记卡，也可选择到柜台申请新的借记卡并开通新版网上银行。
                    温馨提示：为避免您多次往返银行，建议您将有效身份证件以及希望关联到网银的银行卡、存折等所有相关材料准备齐全，在柜台一次性完成网银用户注册、关联网银账户、申请动态口令牌等所有必要的手续。</div>
            </el-collapse-item>
            <el-collapse-item title="当您由于电脑设置不能正常使用网银时怎么办？" name="3">
                <div>答：建议您下载 个人客户E路护航网银安全组件 通过点击E路护航安全检测工具中的“一键修复”按键将您的电脑和浏览器配置到网银运行的最优环境。</div>
            </el-collapse-item>
            <el-collapse-item title="更多网友常见的问题" name="4">
                <div>答：请查看http://ebank.ccb.com/cn/ebank/wsyh_products_list.html</div>
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

