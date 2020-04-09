import ajax from './ajax'
import mockAjax from './mockAjax'

//首页Home接口
export const reqBaseCategoryList = ()=> ajax.get('/product/getBaseCategoryList')
export const reqBanners = ()=> mockAjax.get('/banners')
export const reqFloors = ()=> mockAjax.get('/floors')

//详情Detail接口
export const reqDetailInfo = (skuId)=>ajax.get(`/item/${skuId}`)
export const reqAddToCart = (params)=>ajax.post(`/cart/addToCart${params}`)

//搜索Search接口
export const reqProductList = (searchParam)=>ajax.post(`/list`,searchParam)

//购物车ShopCart接口
export const reqShopCartList = ()=>ajax.get(`/cart/cartList`)
export const reqCheckCart = (skuId,isChecked)=>ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
export const reqDeleteCart = (skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)

//登录Login接口
export const reqLogin = (userInfo)=>ajax.post(`/user/passport/login`,userInfo)
export const reqLogout = ()=>ajax.get(`/user/passport/logout`)
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)

//订单确认页Trade接口
export const reqTradeInfo = ()=>ajax.get(`/order/auth/trade`)
export const reqSubmitOrder = (orderInfo,tradeNo)=>ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,orderInfo)

//支付Pay接口
export const reqPayOrderInfo = (orderId)=>ajax.get(`/payment/weixin/createNative/${orderId}`)
export const reqWXNotify = ()=>ajax.post(`/payment/weixin/notify`)
export const reqPayStatus = (orderId)=>ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

//我的订单MyOrder接口
export const reqOrderInfo = ({page,limit})=>ajax.get(`/order/auth/${page}/${limit}`);