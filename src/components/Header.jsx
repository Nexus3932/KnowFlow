import './scss/Header.scss';
import {Button, Input, InputGroup, InputRightElement, useToast, useDisclosure} from '@chakra-ui/react';
import { AiTwotoneAppstore } from "react-icons/ai";
import { AiTwotoneBell } from "react-icons/ai";
import { AiTwotoneTrophy } from "react-icons/ai";
import { GiDeathStar } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useSearch } from '../context/SearchContext';
import { http } from '../utils/request';
import '../font.css';
import AskQuestionModal from './AskQuestionModal';

const Header = ()=> {
    const { 
        searchQuery, 
        setSearchQuery, 
        setIsSearching, 
        setSearchResults,
        setIsLoading
    } = useSearch();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // 处理搜索输入变化
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 搜索相似问题
    const searchSimilarQuestions = async () => {
        if (!searchQuery.trim()) return;
        
        try {
            setIsSearching(true);
            setIsLoading(true);
            
            // 设置超时处理
            const timeoutId = setTimeout(() => {
                toast({
                    title: "请求超时",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
                setIsLoading(false);
                // 超时后请求最新的10个问题
                fetchLatestQuestions();
            }, 10000);
            
            const response = await http.get(`/similar-questions/search?question=${encodeURIComponent(searchQuery)}&limitNum=10`);
            
            // 清除超时计时器
            clearTimeout(timeoutId);
            
            if (response.code === 200) {
                // 从响应中提取问题列表
                const questions = response.data.questions.map(item => item.question);
                setSearchResults(questions || []);
            } else {
                // 如果请求失败，设置为空数组
                setSearchResults([]);
            }
        } catch (error) {
            console.error('搜索相似问题失败:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 获取最新的问题列表
    const fetchLatestQuestions = async () => {
        try {
            setIsSearching(false);
            const response = await http.get('/questions/list?limitNum=10');
            if (response.code === 200) {
                // 重置搜索状态，回到普通问题列表
                setSearchQuery('');
                setIsSearching(false);
                setSearchResults([]);
            }
        } catch (error) {
            console.error('获取最新问题列表失败:', error);
        }
    };

    // 按回车键搜索
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchSimilarQuestions();
        }
    };

    return (
        <div className={'header'}>
            <div className={'header-inner'}>
                <div className={'header-inner-left'}>
                    <GiDeathStar className={'header-icon-idea'}></GiDeathStar>
                    <span style={{fontFamily: "'pacifico', sans-serif"}}>KnowFlow</span>
                    <InputGroup className="header-search-group">
                        <Input 
                            className={'header-Input'} 
                            placeholder={'搜索问题...'} 
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                        />
                        <InputRightElement>
                            <FaSearch
                                cursor="pointer"
                                onClick={searchSimilarQuestions}
                                color="#333"
                            />
                        </InputRightElement>
                    </InputGroup>
                </div>
                <div className={'header-inner-right'}>
                    <Button onClick={onOpen}>我要提问</Button>
                    <AiTwotoneBell className={'small-icon'} />
                    <AiTwotoneTrophy className={'small-icon'} />
                    <AiTwotoneAppstore className={'small-icon home-icon'} />
                </div>
            </div>
            
            <AskQuestionModal isOpen={isOpen} onClose={onClose} />
        </div>
    )
}

export default Header;