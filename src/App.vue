<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',

  mounted () {

    // 发送自动登陆的请求
    this.$store.dispatch('autoLogin')
    // 异步获取所有分类列表数据(只用获取一次)
    this.$store.dispatch('getBaseCategoryList')
  },

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
