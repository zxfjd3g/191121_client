<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShow=true" @mouseleave="hideCategorys">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isShow && baseCategoryList.length>0">
          <div class="all-sort-list2" @click="toSearch">
            <div class="item" v-for="(bc, index) in baseCategoryList" :key="bc.categoryId"
              :class="{item_on: currentIndex===index}" @mouseenter="showChildCategorys(index)">
              <h3>
                <a href="javascript:" :data-categoryName="bc.categoryName" :data-category1Id="bc.categoryId">{{bc.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2, index) in bc.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="javascript:" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import _ from 'lodash'
import throttle from 'lodash/throttle'
const showList = ['/'] // 直接显示一级列表的所有路径的数组
export default {
  name: 'TypeNav',

  data() {
    return {
      isShow: false, // 是否显示一级分类列表
      currentIndex: -1 // 当前一级分类的下标
    };
  },

  mounted() {
    // 通过showList文件控制侧边导航栏是否显示
    this.isShow = showList.includes(this.$route.path)
  },

  computed: {
    ...mapState({
      // 读取vuex中的分类列表数据
      baseCategoryList: state => state.home.baseCategoryList
    })
  },

  methods: {
    /* 
    利用lodash进行函数防抖处理
    对lodash进行按需引入打包
    */
    // showChildCategorys: _.throttle(function (index) {
    showChildCategorys: throttle(function (index) {
      // console.log('showChildCategorys', index)
      // 指定新的当前一级分类下标
      this.currentIndex = index
    }, 200, {leading: false}), // 指定间隔时间为200ms, 第一个事件不立即触发

    // showChildCategorys(index) {
    //   console.log('showChildCategorys', index)
    //   this.currentIndex = index
    // },

    /* 
    隐藏分类列表
    */
    hideCategorys() {
      // 重置当前一级分类下标
      this.currentIndex = -1
      // 如果当前默认是不需要显示一级分类列表, 隐藏它
      if (!showList.includes(this.$route.path)) {
        this.isShow = false
      }
    },

    /* 
    点击某个分类项跳转到search路由
    */
    toSearch (event) { // 只绑定的一个点击监听
      // console.dir(event.target)
      // 得到所有标签上的data自定义属性
      const dataset = event.target.dataset
      // console.log('dataset', dataset)
      // 取出自定义属性值
      const {categoryname, category1id, category2id, category3id} = dataset

      //if (event.target.tagName==='A') { // 如果点击的是a标签就可以跳转了
      if (categoryname) { // 必然点击的是分类项
        // 准备query参数对象
        const query = {categoryName: categoryname}
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 跳转路由, 并携带query参数
        const currentPath = this.$route.path
        // 如果当前就是搜索界面, replace方式再次跳转到搜索界面, 携带query参数
        if (currentPath.startsWith('/search')) {
          this.$router.replace({path: currentPath, query})
        } else { // 否则, push方式跳转到搜索界面, 携带query参数
          this.$router.push({path: '/search', query})
        }
        // 隐藏分类列表
        this.currentIndex = -1
        this.isShowFirst = false
      }
    },
  }
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      a:hover{
        text-decoration: none;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
