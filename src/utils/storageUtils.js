import store from 'store'
import UUID from 'uuidjs'
import _store from '@/store'

const USER_INFO_KEY = 'user_info_key'
const USER_TEMP_ID_KEY = 'user_temp_id_key'

export function saveUserInfo (user) {
  store.set(USER_INFO_KEY, user)
}

export function getUserInfo() {
  return store.get(USER_INFO_KEY) || {}
}

export function removeUserInfo() {
  store.remove(USER_INFO_KEY)
}

export function getUserTempId() {
  let userTempId = _store.getters.userTempId
  if (!userTempId) {
    userTempId = store.get(USER_TEMP_ID_KEY)
    if (!userTempId) {
      userTempId = UUID.generate()
      store.set(USER_TEMP_ID_KEY, userTempId)
    }
    _store.commit('RECEIVE_USER_TEMP_ID', userTempId)
  }
  return userTempId
}

