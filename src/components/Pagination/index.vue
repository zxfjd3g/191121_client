<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total">
    <!--上一页-->
    <button @click="prePage" :disabled="currentPage === 1">上一页</button>
    <!-- 第1页 -->
    <button @click="changeCurrentPage(1)" v-if="startEnd.start>1">1</button>
    <!-- 省略号 -->
    <button :disabled="true" v-if="startEnd.start>2">···</button>
      <!-- 连续页码 -->
      <button 
        v-for="i in startEnd.end" 
        v-if=" i >= startEnd.start" 
        @click="changeCurrentPage(i)" 
        :class="{active: i===currentPage}" 
        :key="i">
        {{i}}
      </button>
    <!-- 省略号 -->
    <button :disabled="true" v-if="startEnd.end<pageTotal-1">···</button>
    <!-- 最后一页 -->
    <button @click="changeCurrentPage(pageTotal)" v-if="startEnd.end<pageTotal">{{pageTotal}}</button>
    <!--下一页-->
    <button @click="nextPage" :disabled="currentPage === pageTotal">下一页</button>
    <!-- 总记录数 -->
    <button :disabled="true" style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      // 分页配置
      pageConfig: {
        type: Object, 
        default() { // 指定默认值
          return {
            pageSize: 10,     //一页的数据条数
            pageNo: 0,        //当前页的索引
            total: 0,         //总的数据条数
            showPageNo: 8, // 显示的连续页码数
          }
        }
      }
    },
    
    data() {
      return {
        currentPage: 0 // 当前页码
      }
    },
    
    methods: {
      /* 上一页 */
      prePage(){
        this.currentPage -= 1
        this.$emit('changeCurrentPage',this.currentPage)
      },
      
      /* 下一页 */
      nextPage(){
        this.currentPage += 1
        this.$emit('changeCurrentPage',this.currentPage)
      },

      /* 指定当前页码 */
      changeCurrentPage(pageNo){
        console.log('+++', pageNo)
        this.currentPage = pageNo
        this.$emit('changeCurrentPage',this.currentPage)
      }
    },


    computed: {
      /* 总页数 */
      pageTotal(){
        const {total, pageSize} = this.pageConfig
        if(pageSize && total){
          return Math.ceil(total / pageSize)
        }else {
          return 0
        }
      },

      /* 需要显示的连续页码的开始和结束页码数 */
      startEnd () { // ={pageSize, showPageNo}
        const {currentPage, pageTotal, pageConfig: {showPageNo}} = this
        const arr = []
        let start = currentPage - Math.floor(showPageNo/2)
        if (start<1) {
          start = 1
        }
        let end = start + showPageNo - 1
        if (end>pageTotal) {
          end = pageTotal
          start = pageTotal - showPageNo + 1
          if (start<1) {
            start = 1
          }
        }

        return {start, end}
      }
    },

    created: function () {
      // 指定起始的当前页码
      this.currentPage = this.pageConfig.pageNo || 1
    }
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>