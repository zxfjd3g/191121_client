import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'

const state = {
  baseCategoryList: [], // 所有分类的数组
  banners: [], // 广告位轮播数据的数组
  floors: [], // 所有楼层数据的数组
}

const mutations = {
  /* 
  接收分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.baseCategoryList = list.slice(0, list.length-2)
  },

  /* 
  接收广告轮播列表
  */
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners
  },

  /* 
  接收楼层列表
  */
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },
}

const actions = {
  //异步获取首页所有分类
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
    }
  },

  //异步获取广告位轮播数据
  async getBanners({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit('RECEIVE_BANNERS', result.data)
    }
  },

  //异步获取所有楼层数据
  async getFloors({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
    }
  },
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}