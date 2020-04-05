<template>
  <div class="spec-preview">
    <img :src="smallImg" />
    <div class="mask" ref="mask" @mousemove="move"></div>
    <div class="big">
      <img ref="bigImg" :src="bigImg" />
    </div>
    <div class="small" ref="small"></div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle'

  export default {
    name: "Zoom",

    data() {
      return {
        maskWidth: 0
      }
    },

    props: ['smallImg', 'bigImg'],

    methods: {
      move: throttle(function (event) {
        console.log('----')
        const {
          small,
          bigImg
        } = this.$refs
        const width = this.smallWidth / 2
        const maxLeft = this.maskWidth - this.smallWidth
        const maxTop = maxLeft
        let left = event.offsetX - width
        let top = event.offsetY - width
        left = left < 0 ? 0 : left
        left = left > maxLeft ? maxLeft : left
        top = top < 0 ? 0 : top
        top = top > maxTop ? maxTop : top


        small.style.left = left + "px"
        small.style.top = top + "px"

        bigImg.style.left = -left * 2 + "px"
        bigImg.style.top = -top * 2 + "px"
      }, 20)
    },
    mounted() {
      console.log('maskWidth', this.$refs.mask.offsetWidth)
      this.maskWidth = this.$refs.mask.offsetWidth
    },
    computed: {
      smallWidth() {
        return this.maskWidth / 2
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .small {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .mask:hover~.small,
    .mask:hover~.big {
      display: block;
    }
  }
</style>