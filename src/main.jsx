import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureServer } from './utils/api';
import serverConfig from './config/serverConfig';

// 配置服务器地址
configureServer(serverConfig.SERVER_URL);

createRoot(document.getElementById('root')).render(
    <App />
    ,
)
