import {reqList} from '@/api'

const state = {
  list:[]
}

const mutations = {
  RECEIVE_LIST (state,list){
    state.list=list
  }
}

const actions = {
  //获取筛选后的产品列表
  async getList({commit},option){
    const searchParam={...option};
    //删除对象中的空属性
    for (const key in searchParam) {
      if (!searchParam.hasOwnProperty(key)||(typeof searchParam[key]==="string"&&!searchParam[key].trim())) {
        delete searchParam[key]
      }
    }
    const result=await reqList(searchParam);
    if(result.code===200){
      commit('RECEIVE_LIST',result.data)
    }
  }
}
const getters = {
  trademarkList(state){
    return state.list.trademarkList||[];
  },
  attrsList(state){
    return state.list.attrsList||[];
  },
  goodsList(state){
    return state.list.goodsList||[];
  }
}

export default {
    state,
    actions,
    mutations,
    getters
}