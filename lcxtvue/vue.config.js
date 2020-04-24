module.exports = {
    devServer :{
        open :true,
        port :8888,

        //配置代理，解决跨域的问题，这是/api等于http://localhost:8882
        proxy :{
    "/api2":{
        target: 'http://localhost:8882',   //要访问的目标网站，//代理接口
        changeOrigin: true,
        pathRewrite: {
            '^/api2': '/'     // ''//这里理解成用‘/’代替target里面的地址，后面组件中我们掉接口时直接用api代替
            // 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/user/add’即可
        }
    },
     "/api1":{
         target: 'http://localhost:8881',   //要访问的目标网站，//代理接口
         changeOrigin: true,
         pathRewrite: {
             '^/api1': '/'     //在 ajax 的 url 中加了前缀 '/api'，要将前缀 '/api2' 转为 '/'。
         }
     }
}

    }
}
