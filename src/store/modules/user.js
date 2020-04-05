import * as storageUtils from '@/utils/storageUtils'
import { reqLogin, reqLogout, reqRegister } from '@/api'

const state = {
  userInfo: {},
  userTempId: ''
}

const mutations = {
  RECEIVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },

  RESET_USER_INFO(state) {
    state.userInfo = {}
  },

  RECEIVE_USER_TEMP_ID (state, userTempId) {
    state.userTempId = userTempId
  }
}

const actions = {
  async login({
    commit
  }, {
    callback,
    ...data
  }) {
    const result = await reqLogin(data)
    if (result.code === 200) {
      const userInfo = result.data
      storageUtils.saveUserInfo(userInfo)
      commit('RECEIVE_USER_INFO', userInfo)
      callback && callback()
    } else {
      callback && callback(result.message || '登陆失败')
    }
  },
  async register ({
    commit
  }, {
    callback,
    ...data
  }) {
    const result = await reqRegister(data)
    if (result.code === 200) {
      callback('')
    } else {
      callback(result.data || '注册失败, 请重新注册')
    }
  },

  async userLogout({commit}) {
    const result = await reqLogout();
    if (result.code === 200) {
      storageUtils.removeUserInfo()
      commit('RESET_USER_INFO')
    }
  },

  autoLogin({ commit }) {
    const userInfo = storageUtils.getUserInfo()
    if(userInfo){
      commit('RECEIVE_USER_INFO', userInfo);
    }
  }
}

export default {
  state,
  actions,
  mutations
}