import fly from '@/utils/request.js'

// 获取商品列表
export const getGoodsList = (data) => fly.get('/goods/search', data)
