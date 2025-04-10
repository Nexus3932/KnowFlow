/**
 * 服务器配置文件
 * 可以根据不同环境配置不同的服务器地址
 */

// 开发环境服务器地址
const DEV_SERVER_URL = 'http://localhost:8080';

// 测试环境服务器地址
const TEST_SERVER_URL = 'http://test-api.example.com';

// 生产环境服务器地址
const PROD_SERVER_URL = 'http://api.example.com';

// 根据当前环境选择服务器地址
let SERVER_URL = DEV_SERVER_URL;

// 判断当前环境
if (process.env.NODE_ENV === 'production') {
  SERVER_URL = PROD_SERVER_URL;
} else if (process.env.NODE_ENV === 'test') {
  SERVER_URL = TEST_SERVER_URL;
}

export default {
  // 当前服务器地址
  SERVER_URL,
  
  // 各环境服务器地址
  DEV_SERVER_URL,
  TEST_SERVER_URL,
  PROD_SERVER_URL,
  
  // API版本
  API_VERSION: 'v1',
  
  // 超时时间（毫秒）
  TIMEOUT: 10000
}; 