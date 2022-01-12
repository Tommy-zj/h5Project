import service from '../utils/request'
export const getSort = params => {
  return service.get('sort/listOnlyFont', { params: params })
}

export const addProduct = params => {
  return service.post('product/add', params).then(res => res)
}

export const getPersonProduct = params => {
  return service.get('product/findPersonProduct', { params: params })
}
