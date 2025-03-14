import { useState } from "react";
import "../components/scss/LoginPage.scss";

function LoginPage() {
  // 状态管理
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 表单验证
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "用户名不能为空";
    if (!formData.password) tempErrors.password = "密码不能为空";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        // 这里应该添加实际的登录API调用
        console.log("登录信息:", formData);
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("登录成功!");
      } catch (error) {
        console.error("登录失败:", error);
        setErrors({ general: "登录失败，请检查用户名和密码" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>欢迎登录</h1>

        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名或邮箱</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名或邮箱"
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">记住我</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              忘记密码?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "登录中..." : "登录"}
          </button>
        </form>

        <div className="social-login">
          <p>或通过以下方式登录</p>
          <div className="social-icons">
            <button className="social-icon wechat">微信</button>
            <button className="social-icon weibo">微博</button>
            <button className="social-icon qq">QQ</button>
          </div>
        </div>

        <div className="register-link">
          <p>
            还没有账号? <a href="/register">立即注册</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
