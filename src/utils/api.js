import { http, setBaseURL } from './request';

// API接口URL前缀
const API_PREFIX = '/api';

// 配置服务器地址的方法
export const configureServer = (serverUrl) => {
  setBaseURL(serverUrl);
};

// 示例API方法
export const exampleApi = {
  // 获取列表数据
  getList: (params) => http.get(`${API_PREFIX}/list`, params),
  
  // 获取详情数据
  getDetail: (id) => http.get(`${API_PREFIX}/detail/${id}`),
  
  // 创建数据
  create: (data) => http.post(`${API_PREFIX}/create`, data),
  
  // 更新数据
  update: (id, data) => http.put(`${API_PREFIX}/update/${id}`, data),
  
  // 删除数据
  delete: (id) => http.delete(`${API_PREFIX}/delete/${id}`)
};

// 用户相关API
export const userApi = {
  // 登录
  login: (data) => http.post(`${API_PREFIX}/user/login`, data),
  
  // 注册
  register: (data) => http.post(`${API_PREFIX}/user/register`, data),
  
  // 获取用户信息
  getUserInfo: () => http.get(`${API_PREFIX}/user/info`),
  
  // 更新用户信息
  updateUserInfo: (data) => http.put(`${API_PREFIX}/user/update`, data),
  
  // 退出登录
  logout: () => http.post(`${API_PREFIX}/user/logout`)
};

export default {
  configureServer,
  exampleApi,
  userApi
}; 