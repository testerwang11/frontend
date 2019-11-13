import request from '@/utils/request'

export function addTestPlan(data) {
  return request({
    method: 'post',
    url: '/testPlan/add',
    data
  })
}

export function deleteTestPlan(testPlanId) {
  return request({
    method: 'delete',
    url: '/testPlan/' + testPlanId
  })
}

export function updateTestPlan(data) {
  return request({
    method: 'post',
    url: '/testPlan/update',
    data
  })
}

export function getTestPlanList(params) {
  return request({
    method: 'post',
    url: '/testPlan/list',
    params
  })
}

export function startJob(params) {
  return request({
    method: 'get',
    url: '/testPlan/startJob?testPlanId=' + params,
  })
}

export function stopJob(params) {
  return request({
    method: 'get',
    url: '/testPlan/stopJob?testPlanId=' + params,
    params
  })
}
