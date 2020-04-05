<template>
  <!--list-content-->
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-show="category">{{category}}</li>
          <li class="with-x" v-show="option.trademark">{{option.trademark}}<i @click="removeOption('trademark')">×</i>
          </li>
          <li class="with-x" v-for="(prop,index) in option.props" :key="prop">{{prop}}
            <i @click="removePorp(index)">×</i></li>
        </ul>
      </div>
      <!--selector-->
      <SearchSelector :setProps="setProps" :setTrademark="setTrademark" />
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{active:option.order.includes('1')}" @click="setSort('hot')">
                <a href="#">综合</a>
              </li>
              <li>
                <a href="#">销量</a>
              </li>
              <li>
                <a href="#">新品</a>
              </li>
              <li>
                <a href="#">评价</a>
              </li>
              <li>
                <a href="#" :class="{active:option.order==='2:asc'}" @click="setSort('2:asc')">价格⬆</a>
              </li>
              <li>
                <a href="#" :class="{active:option.order==='2:desc'}" @click="setSort('2:desc')">价格⬇</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="`${good.title}-${good.id}`">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="`/detail/${good.id}`">
                    <img :src="good.defaultImg"/>
                  </router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{ good.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <router-link :to="`/detail/${good.id}`">{{good.title}}</router-link>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a href="javascript:" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                  <a href="javascript:" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Pagination
          :page-config="{
            total: list.total,
            pageSize: list.pageSize,
            pageNo: currentPage,
            showPageNo: 5
          }"
          @changeCurrentPage="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapState
  } from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: "Search",
    data() {
      return {
        option: {
          order: "1:desc",
          props: [],
          pageNo: 1,
          pageSize: 10
        },
        currentPage: 1
      }
    },

    mounted() {
      this.option = {
        ...this.option,
        ...this.$route.query,
        ...this.$route.params,
      };
      //设置事件总线,防止在Search页面再次点击搜索按钮无效
      this.$bus.$on('setKeyWord', this.setKeyWord)
      this.getList()
    },

    computed: {
      category() {
        return this.option.categoryName || this.option.keyword
      },
      ...mapGetters(["goodsList"]),
      ...mapState({
        list: state => state.search.list
      })

    },

    watch: {
      $route (value) {
        this.option = {
          ...this.option,
          ...value.query,
          ...value.params,
        }
        this.getList()
      }
    },

    methods: {

      getList() {
        this.$store.dispatch('getList', this.option)
      },
      setKeyWord(keyword) {
        this.option.keyword = keyword
        this.getList()
      },
      setProps(propsId, newProps) {
        let oldProps = this.option.props
        let isRepeat = false
        propsId = "" + propsId
        oldProps = oldProps.map((item) => {
          const result = item.split(":")[0] === propsId
          isRepeat = result ? result : isRepeat
          return result ? newProps : item
        })
        if (!isRepeat) {
          this.option.props = [...oldProps, newProps]
        } else {
          this.option.props = oldProps
        }
        this.getList()
      },
      setTrademark(tmId, tmName) {
        this.option = {
          ...this.option,
          trademark: `${tmId}:${tmName}`
        }
        this.getList()
      },
      removePorp(index) {
        this.option.props.splice(index, 1)
        this.getList()
      },
      removeOption(attr) {
        if (attr === "category") {
          if (this.option.categoryName) {
            this.option.category1Id = ""
            this.option.category2Id = ""
            this.option.category3Id = ""
            this.option.categoryName = ""
          } else {
            this.option.keyword = ""
          }
        } else {
          this.option[attr] = ""
        }
        this.getList()
      },
      setSort(value) {
        if (value === "hot") {
          if (this.option.order.includes('asc')) {
            this.option.order = "1:desc"
          } else {
            this.option.order = "1:asc"
          }
        } else {
          this.option.order = value
        }
        this.getList()
      },
      handleCurrentChange(currentPage) {
        this.option.pageNo = currentPage
        this.getList()
      },
    },

    components: {
      SearchSelector,
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }

      .hot-sale {
        margin-bottom: 5px;
        border: 1px solid #ddd;

        .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 21px;
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          margin: 0;
          padding: 5px 0 5px 15px;
        }

        .hot-list {
          padding: 15px;

          ul {
            display: flex;

            li {
              width: 25%;
              height: 100%;

              .list-wrap {

                .p-img,
                .price,
                .attr,
                .commit {
                  padding-left: 15px;
                }

                .p-img {
                  img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                  }
                }

                .attr {
                  width: 85%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                }

                .price {
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .commit {
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                }
              }
            }
          }
        }
      }
    }
  }
</style>