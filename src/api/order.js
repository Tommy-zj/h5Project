import service from '../utils/request'
export const getOrder = params => {
  return service.get('orders/list', { params: params })
}

export const toOrder = params => {
  return service.post('orders/add', params).then(res => res)
}
