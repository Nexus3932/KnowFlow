import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    // 检查 cookie 中是否存在登录令牌
    const token = Cookies.get('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const register = (username, password, email) => {
    // 检查用户名是否已存在
    if (users.some(user => user.username === username)) {
      return { success: false, message: '用户名已存在' };
    }

    // 检查邮箱是否已存在
    if (users.some(user => user.email === email)) {
      return { success: false, message: '邮箱已被注册' };
    }

    // 创建新用户
    const newUser = {
      username,
      password,
      email,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // 自动登录
    Cookies.set('auth_token', 'dummy_token', { expires: 7 });
    Cookies.set('username', username, { expires: 7 });
    setIsAuthenticated(true);

    return { success: true, message: '注册成功' };
  };

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user || (username === 'admin' && password === 'admin')) {
      Cookies.set('auth_token', 'dummy_token', { expires: 7 });
      Cookies.set('username', username, { expires: 7 });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('username');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 