import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Course from "./components/Course";
import {ChakraProvider, extendTheme, withDelay} from '@chakra-ui/react';
import Header from "./components/Header.jsx";
import List from './components/List.jsx'
import Questions from "./components/Questions.jsx";
import Footer from './components/Footer.jsx'
import {Button} from "@chakra-ui/react";
import './App.css'

// 创建主题配置
const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            100: "#f7fafc",
            900: "#1a202c",
        },
    }
})

function App() {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <div className={'app-container'} style={{height: '100%', position: 'relative'}}>
                    <Header></Header>
                    <List></List>
                    <div className={'main-body'}>
                        <div>
                            <span>全部问题</span>
                            <ul>
                                <li>最新</li>
                                <li>活跃</li>
                                <li>热门</li>
                                <li>评分</li>
                                <li>未回答</li>
                                <li>推荐</li>
                            </ul>
                        </div>
                        <div>
                            <Questions></Questions>
                        </div>
                    </div>
                    <div className={'app-tags'}>
                        <div>
                            <span>已关注的标签<span>(最多5个)</span></span> <span>编辑</span>
                        </div>
                        <div>
                            <p>关注标签来筛选你的问题列表</p>
                            <Button className={'app-tags-button'} colorScheme='blue' size='sm'>关注一个标签</Button>
                        </div>
                    </div>
                    <div className={'app-hot-questions'}>
                     <div>
                            <span>热门问题</span>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <p>What is a tag?</p>
                                    <p>1个回答</p>
                                </li>
                                <li>
                                    <p>What is reputation and how do I earn them?</p>
                                    <p>1个回答</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Footer></Footer>
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <Link to="/">首页</Link>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <Link to="/course">课程</Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                    {/*<Routes>*/}
                    {/*    <Route exact path="/" Component={Home}></Route>*/}
                    {/*    <Route path="/course" Component={Course}></Route>*/}
                    {/*</Routes>*/}
                </div>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;