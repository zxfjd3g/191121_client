import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 声明使用插件
Vue.use(VueRouter)

/* 
问题: 编程式路由跳转到当前路径且param参数没有变化时会抛出 NavigationDuplicated 的错误
解决: 
  方案1: 指定跳转成功的回调函数, 如: this.$router.push/replace('/search/xxx', () => {})
  方案2: 修正Vue原型上的push和replace方法
*/

/* 2.1. 指定成功回调的onResolve默认值为空函数 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolve = () => {}, onReject) {
  return originalPush.call(this, location, onResolve, onReject)
}

/* 2.2. catch处理错误*/
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onResolve, onReject) {
  return originalReplace.call(this, location, onResolve, onReject).catch(err => {
    // 可以选择打印一下
    // console.log(err)
  })
}

// 向外默认暴露路由器对象
const router = new VueRouter({
  mode: 'history', // 没有#的模式
  routes, // 注册所有路由
  scrollBehavior: () => ({y: 0}), // 跳转路由自动滑到最上面
})

// 需要进行登陆检查所有路由路径的数组
const checkPaths = ['/trade', '/center/myorder', '/pay']

// 注册全局前置拦截器: 检查是否已经登陆
router.beforeEach((to, from, next) => {
  // 如果是必须登陆的路由, 但没有登陆, 直接跳转到登陆页面
  if (checkPaths.indexOf(to.path)!==-1) {
    if (!store.getters.userInfo.token) {
      return next(`/login?redirect=${to.path}`) // 携带需要目标路径用于登陆后自动跳转
    }
  }
  // 放行
  next()
})


export default router