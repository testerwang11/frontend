import request from '@/utils/request'

export function addGlobalVar(data) {
  return request({
    method: 'post',
    url: '/globalVar/add',
    data
  })
}

export function updateGlobalVar(data) {
  return request({
    method: 'post',
    url: '/globalVar/update',
    data
  })
}

export function getGlobalVarList(params) {
  return request({
    method: 'post',
    url: '/globalVar/list',
    params
  })
}

export function deleteGlobalVar(globalVarId) {
  return request({
    method: 'delete',
    url: '/globalVar/' + globalVarId
  })
}

export function queryEnvList() {
  return request({
    method: 'get',
    url: '/env/list'
  })
}

export function getNameById(id) {
  return request({
    method: 'get',
    url: '/env/getNameById?envId='+id
  })
}
