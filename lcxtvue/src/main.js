import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入字体图标
import './assets/css/font_1713848_z7nwla18ka/iconfont.css'
//导入字体图标Symbol引用方式
import './assets/css/font_1713848_z7nwla18ka/iconfont'
//导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
//导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

//导入签名
import jsrsasign from 'jsrsasign'

//组件跳转进度条
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
//数据加载进度条
axios.interceptors.request.use(
    config => {
      NProgress.start() // 设置加载进度条(开始..)
      return config
    },
    error => {
      return Promise.reject(error)
    }
)
// axios响应拦截器
axios.interceptors.response.use(
    function(response) {
      NProgress.done() // 设置加载进度条(结束..)
      return response
    },
    function(error) {
      return Promise.reject(error)
    }
)
//签名方法
Vue.prototype.$getCode = function(newStr){
  // 创建RSAKey对象
  var rsa = new jsrsasign.RSAKey();
  //因为后端提供的是pck#8的密钥对，所以这里使用 KEYUTIL.getKey来解析密钥
  var k = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMMlfdmxxIAkxtJD\n" +
      "MbiC5NkBBUgZJJ4beC9SjXH6GcxboVwVc5j9BBg4W8OSsOa+56Y7uJ3/NB/QXLaT\n" +
      "Shj17ld1xJIzEkd3FpI/6drmHIivdG1DOdpGg9aKIR457oVK3X0Ki5N0Wg8ctSnm\n" +
      "6GQOhsbPWELcW030badPccLvVX7HAgMBAAECgYEAj6IPwGR8mkj3Yhl9Bi6pnCOJ\n" +
      "LKj877aOPl6Hp2WLCYRD/w/29pr8IYuR1yAoPp4yyILafsgxKF1ncCZ2+mpBUytZ\n" +
      "VFpIG+cXG+O+sjM0K3CKvdsk+wgj4VSGeC60AKn0Wqx0QhhX2Csbw7MDpIOZKqko\n" +
      "Y1m9kYawUQOxFo7+DwkCQQDiQMVcq41d/yIiaH5x0PdDI281WunYuJiBkvLC1+Z2\n" +
      "/+aE2MPb6vaidN1yDBWjt1paq3NiBr7IMcD98dt3bBD7AkEA3M28P94OiIvoh4yc\n" +
      "0HpiVvxuihXIOK+ZrL46NnkbsafdqlQiVfD2sqqTL47qOlucL7VpHlpWWnGpmBmO\n" +
      "CvgXpQJBAJryJLdsPSpMWcIasc2cgFmYYMa3dkKXWMoUKvDJDuocInCESs3HQhTL\n" +
      "2AQMxp0SKmzB0gkl+W38tOC0y8ojVhUCQAf2FxKKdCWyPbkddc4Ci6ctROMPs/9v\n" +
      "PXBAD6NFLJ10OwbYL8C/hnWctt/hHErsYK5LsTWZ9kEelgnY6gk1Ns0CQQCrpdm1\n" +
      "3Oa0/79PEaOCLXRXNZi1uY21vnM3GSZ9ohV4CAA7NMLkl6vhOyniDMzJ+BlpYmHi\n" +
      "gJyCAefsN+n4fLoQ";
  // 将密钥转码
  rsa = jsrsasign.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----"+k+"-----END PRIVATE KEY-----");
  // 创建Signature对象，设置签名编码算法
  var sig = new jsrsasign.KJUR.crypto.Signature({"alg": "SHA1withRSA"});
  // 初始化
  sig.init(rsa)
  // 传入待加密字符串
  sig.updateString(newStr+"")
  // 生成密文
  var sign = jsrsasign.hextob64(sig.sign());
  // 对加密后内容进行URI编码
  // sign = encodeURIComponent(sign);
  //把参数与密文拼接好，返回
  // var params = newStr+'&sign='+sign;
  // return params
  return sign
}


//挂载到Vue的原型对象上，这样可以用this.$http直接访问到axios
Vue.prototype.$http = axios
// axios.defaults.baseURL = '/api'
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
