import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
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
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box className="app-container" height="100%" position="relative">
          <Header />
          <List />

          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* 添加其他路由 */}
            {/* <Route path="/questions/:id" element={<QuestionDetail />} /> */}
            {/* <Route path="/tags" element={<TagsPage />} /> */}
          </Routes>

          <Footer />
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
