import service from '../utils/request'

export const toLogin = params => {
  return service.post('register/phoneLogin', params).then(res => res)
}

export const register = params => {
  return service.post('mechanic/phoneAdd', params).then(res => res)
}
