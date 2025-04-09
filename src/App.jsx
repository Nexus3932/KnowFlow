import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
// 导入其他页面组件
import "./App.css";

// 创建主题配置
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box className="app-container" height="100%" position="relative">
            <Header />
            <List />

            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/home" replace />} />
              {/* 捕获所有未匹配的路由，重定向到首页 */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>

            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
