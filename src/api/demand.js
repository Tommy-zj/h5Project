import service from '../utils/request'

export const addDemand = params => {
  return service.post('request/add', params).then(res => res)
}

export const pageListDemand = params => {
  return service.get('request/wechatRequest', { params: params })
}
