import {
  fetch
} from '@/utils/fetch';


export function loginIn(data) {
  return fetch({
    url: `/user/user/login`,
    method: "post",
    data
  });
}
export function queryUserAccessPHMModules(data) {
  return fetch({
    url: `/user/userProjectRole/queryUserAccessPHMModules`,
    method: 'post',
    data,
    isMenu: true
  })
}