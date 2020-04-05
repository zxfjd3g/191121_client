<template>
  <div class="swiper-container" ref="swiper" :style="{width, height}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  export default {
    name: "Carousel",
    
    props: {
      width: Number, 
      height: Number,
      carouselList: Array
    },

    watch: {
      carouselList: {
        handler () {
          // 没有数据, 直接结束
          if (this.carouselList.length===0) return
          // 延迟到界面更新后创建swiper对象
          this.$nextTick(() => {
            new Swiper(this.$refs.swiper, {
              // 循环轮播
              loop: true,
              
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        },
        immediate: true, // 初始立即执行一次
      }
    },
  }
</script>

<style  lang="less" scoped>

</style>
