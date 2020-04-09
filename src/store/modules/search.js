import { reqProductList } from '@/api'

const state = {
  productList: {} // 包含搜索商品相关信息的对象   注意: 不是数组
}

const mutations = {
  /* 
  接收保存商品列表
  */
  RECEIVE_PRODUCT_LIST (state, productList){
    state.productList = productList
  }
}

const actions = {
  // 获取筛选后的产品列表
  async getProductList({commit}, options){
    const searchParams = {...options}
    // 删除参数对象中空串参数属性
    /* Object.keys(searchParams).forEach(key => {
      if (searchParams[key]==='') {
        delete searchParams[key]
      }
    }) */
    const result = await reqProductList(searchParams)
    if(result.code===200){
      commit('RECEIVE_PRODUCT_LIST',result.data)
    }
  }
}
const getters = {
  /* 
  商标列表
  */
  trademarkList(state){
    return state.productList.trademarkList || []
  },

  /* 
  属性列表
  */
  attrsList(state){
    return state.productList.attrsList || []
  },

  /* 
  商品列表
  */
  goodsList(state){
    return state.productList.goodsList || []
  }
}

export default {
    state,
    actions,
    mutations,
    getters
}
