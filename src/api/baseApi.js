import service from '../utils/request'

export const getCarousel = params => {
  return service.get('carousel/pagelist.action', {
    params: params
  })
}

export const getCategory = params => {
  return service.get('sort/list')
}

export const getRequest = params => {
  return service.get('request/pagecount', {
    params: params
  })
}

export const getMerchanic = params => {
  return service.get('mechanic/pagecount', {
    params: params
  })
}

export const getRecommend = params => {
  return service.get('product/recommend', {
    params: params
  })
}

export const getShopExtra = params => {
  return service.get('product/productExtra', {
    params: params
  })
}

export const getShopBysort = params => {
  return service.get('product/pagelist', {
    params: params
  })
}

export const imgUpload = params => {
  return service.post('up/upload', params).then(res => res)
}

export const getIndexData = params => {
  return service.get('base/index-data', {
    params: params
  })
}

export const logout = params => {
  return service.get('register/logout', {
    params: params
  })
}
