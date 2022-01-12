import service from '../utils/request'

export const modifyMyInfo = params => {
  return service.post('mechanic/edit', params).then(res => res)
}

export const getCollect = params => {
  return service.get('collect/pagelist', { params: params })
}

export const getShopByShopId = params => {
  return service.get('product/getShopByShopId', { params: params })
}

export const isCollect = params => {
  return service.get('collect/find', { params: params })
}

export const deleteApi = params => {
  return service.get('collect/delete', { params: params })
}

export const addApi = params => {
  return service.post('collect/add', params).then(res => res)
}

export const removeApi = params => {
  return service.get('collect/remove', { params: params })
}
