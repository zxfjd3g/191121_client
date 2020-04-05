import {reqPayOrderInfo,reqPayStatus} from '@/api'

const state = {
  payOrderInfo: {}
}

const mutations = {
  RECEIVE_PAY_ORDER_INFO (state,payOrderInfo){
    state.payOrderInfo=payOrderInfo
  }
}

const actions = {
  //获取支付订单ID
  async getPayOrderInfo({commit},orderId){
    const result=await reqPayOrderInfo(orderId);
    if(result.code===200){
      commit('RECEIVE_PAY_ORDER_INFO',result.data)
    }
  },
  //查询订单支付状态
  async queryPayStatus({commit},orderId){
    const result=await reqPayStatus(orderId);
    if(result.code===200){
      console.log('支付成功')
      return Promise.resolve(result.message)
    }else{
      return Promise.reject(result.message)
    }
  }
}

const getters = {
  
}

export default {
  state,
  mutations,
  actions,
  getters
}