import axios from 'axios';

// 创建配置文件，方便后续修改服务器地址
const config = {
  baseURL: 'http://localhost:8080', // 默认服务器地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
};

// 创建axios实例
const request = axios.create(config);

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 统一处理响应数据
    const res = response.data;
    return res;
  },
  error => {
    // 统一处理错误响应
    console.error('响应错误：', error);
    // 可以根据错误状态码做不同处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权处理
          break;
        case 404:
          // 资源不存在处理
          break;
        case 500:
          // 服务器错误处理
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// 更改服务器地址的方法
export const setBaseURL = (url) => {
  request.defaults.baseURL = url;
};

// 导出基本请求方法
export const http = {
  get: (url, params) => request.get(url, { params }),
  post: (url, data) => request.post(url, data),
  put: (url, data) => request.put(url, data),
  delete: (url, params) => request.delete(url, { params }),
  // 支持自定义配置的请求
  request: (config) => request(config)
};

export default request; 