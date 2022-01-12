import service from '../utils/request'

export const deleteApi = params => {
  return service.get('adress/delete', { params: params })
}

export const getAdress = params => {
  return service.get('adress/pagelist', { params: params })
}
export const addApi = params => {
  return service.post('adress/add', params).then(res => res)
}

export const editApi = params => {
  return service.post('adress/edit', params).then(res => res)
}

export const addressDelete = params => {
  return service.get('adress/newDelete', { params: params })
}

export const findDefaultAddress = params => {
  return service.get('adress/findDefaultAddress', { params: params })
}
