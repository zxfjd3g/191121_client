import { reqDetailInfo, reqAddToCart } from '@/api'

const state = {
  detailInfo:{}
}

const mutations = {
  RECEIVE_DETAIL_INFO (state,detailInfo){
    state.detailInfo=detailInfo
  }
}

const actions = {
  async getDetailInfo({commit},skuId){
    const result=await reqDetailInfo(skuId)
    if(result.code===200){
      commit('RECEIVE_DETAIL_INFO',result.data)
    }
  },
  
  async addToCart({commit},{skuId,skuNum,cb}){
    const result=await reqAddToCart(`/${skuId}/${skuNum}`)
    if(result.code===200){
      cb&&cb()
    }else{
      alert('商品添加失败')
    }
  }
}

const getters = {
  skuImageList(state){
    const skuInfo=state.detailInfo.skuInfo
    return skuInfo?skuInfo.skuImageList:[]
  },
  skuInfo(state){
    const skuInfo=state.detailInfo.skuInfo
    return skuInfo?skuInfo:{}
  },
  spuSaleAttrList(state){
    const spuSaleAttrList=state.detailInfo.spuSaleAttrList
    return spuSaleAttrList?spuSaleAttrList:{}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}