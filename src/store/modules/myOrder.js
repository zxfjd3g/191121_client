import {reqOrderInfo} from '@/api'

const state = {
  orderInfo:{}
}

const mutations = {
  RECEIVE_ORDER_INFO (state,orderInfo){
    state.orderInfo=orderInfo
  }
}

const actions = {
  //获取订单信息
  async getOrderInfo({commit},{page,limit}){
    const result=await reqOrderInfo({page,limit});
    if(result.code===200){
      commit('RECEIVE_ORDER_INFO',result.data)
    }
  }
}

const getters = {

}


export default {
    state,
    actions,
    mutations,
    getters
}