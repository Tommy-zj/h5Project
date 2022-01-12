import service from '../utils/request'

export const modifyMyInfo = params => {
  return service.post('mechanic/edit', params).then(res => res)
}

export const getSkill = params => {
  return service.get('skill/listAll')
}

export const getPersonTags = params => {
  return service.get('skill/getPersonTags', { params: params })
}

export const setPersonTags = params => {
  return service.post('skill/addSkill', params).then(res => res)
}

export const getPerson = params => {
  return service.get('skill/getPerson', { params: params })
}
