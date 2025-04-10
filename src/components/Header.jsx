import './scss/Header.scss';
import {Button, Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import { AiTwotoneAppstore } from "react-icons/ai";
import { AiTwotoneBell } from "react-icons/ai";
import { AiTwotoneTrophy } from "react-icons/ai";
import { GiDeathStar } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useSearch } from '../context/SearchContext';
import { http } from '../utils/request';
import '../font.css';

const Header = ()=> {
    const { 
        searchQuery, 
        setSearchQuery, 
        setIsSearching, 
        setSearchResults 
    } = useSearch();

    // 处理搜索输入变化
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 搜索相似问题
    const searchSimilarQuestions = async () => {
        if (!searchQuery.trim()) return;
        
        try {
            setIsSearching(true);
            const response = await http.get(`/similar-questions/search?question=${encodeURIComponent(searchQuery)}&limitNum=10`);
            if (response.code === 200) {
                setSearchResults(response.data || []);
            }
        } catch (error) {
            console.error('搜索相似问题失败:', error);
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
                    <Button>我要提问</Button>
                    <AiTwotoneBell className={'small-icon'} />
                    <AiTwotoneTrophy className={'small-icon'} />
                    <AiTwotoneAppstore className={'small-icon home-icon'} />
                </div>
            </div>
        </div>
    )
}

export default Header;