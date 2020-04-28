import { request } from 'umi';
const crypto = require("crypto"); //node自带的密码加密
export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  let md5 = crypto.createHash("md5");
  params.password = md5.update(params.password).digest("hex");
  return request<API.LoginStateType>('/api/users/addUserAction', {
    method: 'POST',
    params: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
