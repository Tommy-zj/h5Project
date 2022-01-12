import service from '../utils/request'

export const deleteApi = params => {
  return service.get('history/delete', { params: params })
}

export const historyAddApi = params => {
  return service.post('history/add', params).then(res => res)
}

export const getHistory = params => {
  return service.get('history/pagelist', { params: params })
}
