import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock' // 加载mock接口模块
import Carousel from './components/Carousel'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'

Vue.config.productionTip = false

// 注册全局组件
Vue.component('Carousel', Carousel)
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)

new Vue({
  beforeCreate () { 
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router, // 注册路由器
  store, // 配置vuex的store
}).$mount('#app')


