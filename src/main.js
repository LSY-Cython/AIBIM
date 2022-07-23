// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Bus from './bus'
import io from 'socket.io-client'

Vue.use(ElementUI)
axios.defaults.baseURL = 'http://127.0.0.1:5000'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.prototype.$bus = Bus // 定义事件总线传递消息
Vue.prototype.$socket = io('http://127.0.0.1:5000')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
