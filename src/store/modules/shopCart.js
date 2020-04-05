import {
  reqShopCartList,
  reqCheckCart,
  reqDeleteCart
} from '@/api/index'

const state = {
  shopCartList: []
}

const mutations = {
  RECEIVE_SHOPCART_LIST(state, shopCartList) {
    state.shopCartList = shopCartList
  }
}

const actions = {
  //获取购物车列表
  async getShopCartList({
    commit
  }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit('RECEIVE_SHOPCART_LIST', result.data)
    }
  },
  //切换商品的选中状态
  async checkCart({
    commit
  }, {
    skuId,
    isChecked
  }) {
    //checkbox框返回是布尔值,通过*1进行隐式转换为数字
    const result = await reqCheckCart(skuId, isChecked * 1);
    if (result.code !== 200) {
      alert('更新选中状态失败')
    }
  },
  //从购物车中删除商品
  async deleteCart({
    commit
  }, skuId) {
    const result = await reqDeleteCart(skuId);
    if (result.code !== 200) {
      alert('删除商品失败')
    }
  }
}

const getters = {
  total(state) {
    const sumPrice = state.shopCartList.reduce((pre, good) => {
      const {
        skuPrice,
        skuNum,
        isChecked
      } = good;
      return pre + (isChecked * 1 ? good.skuPrice * skuNum : 0);
    }, 0)
    return sumPrice;
  },
  selectedTotal(state) {
    const sum = state.shopCartList.reduce((pre, good) => {
      const {
        isChecked,
        skuNum
      } = good;
      return pre + (isChecked * 1 ? skuNum : 0);
    }, 0)
    return sum;
  },
  selectedArr(state) {
    const arr = state.shopCartList.filter((good) => {
      return good.isChecked;
    })
    return arr;
  }
}



export default {
  state,
  mutations,
  actions,
  getters
}