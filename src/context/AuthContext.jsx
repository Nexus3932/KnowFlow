import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    const rememberMe = Cookies.get('remember_me');
    if (token && rememberMe === 'true') {
      setIsAuthenticated(true);
    } else if (!rememberMe && token) {
      // 如果没有记住我但有token，清除所有认证相关cookie
      logout();
    }
    setIsLoading(false);
  }, []);

  const register = async (username, password, email) => {
    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          passwordHash: password,
          email,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Cookies.set('auth_token', data.token, { expires: 7 });
        Cookies.set('username', username, { expires: 7 });
        setIsAuthenticated(true);
        return { success: true, message: '注册成功' };
      } else {
        return { success: false, message: data.message || '注册失败' };
      }
    } catch (error) {
      console.error('注册错误:', error);
      return { success: false, message: '注册失败，请稍后重试' };
    }
  };

  const login = async (username, password, rememberMe = false) => {
    try {
      // ===== 临时测试账号逻辑 - 开发完成后删除开始 =====
      if (username === 'admin' && password === 'admin') {
        const expiresIn = rememberMe ? 7 : 1;
        Cookies.set('auth_token', 'admin_token', { expires: expiresIn });
        Cookies.set('username', 'admin', { expires: expiresIn });
        Cookies.set('remember_me', rememberMe.toString(), { expires: expiresIn });
        setIsAuthenticated(true);
        return { success: true };
      }
      // ===== 临时测试账号逻辑 - 开发完成后删除结束 =====

      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          passwordHash: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const expiresIn = rememberMe ? 7 : 1;
        Cookies.set('auth_token', data.token, { expires: expiresIn });
        Cookies.set('username', username, { expires: expiresIn });
        Cookies.set('remember_me', rememberMe.toString(), { expires: expiresIn });
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message || '登录失败' };
      }
    } catch (error) {
      console.error('登录错误:', error);
      return { success: false, message: '登录失败，请稍后重试' };
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('username');
    Cookies.remove('remember_me');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null; // 或者返回一个加载指示器
  }

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