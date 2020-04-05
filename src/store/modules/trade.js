import { reqTradeInfo, reqSubmitOrder } from '@/api'

const state = {
  tradeInfo: {}
}

const mutations = {
  RECEIVE_TRADE_INFO (state,tradeInfo){
    state.tradeInfo=tradeInfo
  }
}

const actions = {
  //获取订单确认页面所需数据
  async getTradeInfo({commit}){
    const result=await reqTradeInfo();
    if(result.code===200){
      commit('RECEIVE_TRADE_INFO',result.data)
    }
  },
  //提交订单
  async submitOrder({commit},{orderInfo,tradeNo}){
    const result=await reqSubmitOrder(orderInfo,tradeNo);
    if(result.code===200){
      return result.data;
    }else{
      alert('提交订单失败,请稍后重试')
      return result.message
    }
  }
}

const getters = {
  userAddressList(state){
    return state.tradeInfo.userAddressList || [];
  },
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || [];
  }
}


export default {
    state,
    mutations,
    actions,
    getters
}