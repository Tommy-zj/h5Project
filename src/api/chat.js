import service from '../utils/request'

export const chatList = params => {
  return service.get('chat/list', { params: params })
}

export const getMessage = params => {
  return service.get('chat/gainInfo', { params: params })
}

export const editCtime = params => {
  return service.get('chat/edit', { params: params })
}
