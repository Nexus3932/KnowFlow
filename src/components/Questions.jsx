import './scss/Questions.scss';
import {AiFillLike} from 'react-icons/ai';
import {MdMessage} from 'react-icons/md';
import {TiEye} from 'react-icons/ti';
import {Button, Box, Text, Heading, Divider, Avatar, VStack, Flex, Spinner, Center} from '@chakra-ui/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { http } from '../utils/request';
import { useSearch } from '../context/SearchContext';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loadingAnswers, setLoadingAnswers] = useState(false);
    const [currentLimit, setCurrentLimit] = useState(10); // 当前加载的问题数量
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);
    const loadingRef = useRef(null);
    
    // 使用SearchContext
    const { 
        searchQuery, 
        isSearching, 
        searchResults, 
        setSearchQuery, 
        setIsSearching, 
        setSearchResults,
        isLoading
    } = useSearch();

    const pageSize = 10; // 每次新增加载的问题数量

    // 清除搜索，返回普通问题列表
    const clearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        setSearchResults([]);
        fetchQuestions(true);
    };

    const fetchQuestions = async (isInitial = false) => {
        try {
            if (isInitial) {
                setLoading(true);
                // 初始加载不传参数，使用后端默认的10个问题
                const response = await http.get('/questions/list');
                if (response.code === 200) {
                    const fetchedQuestions = response.data || [];
                    setQuestions(fetchedQuestions);
                    setHasMore(fetchedQuestions.length === pageSize);
                    setCurrentLimit(pageSize);
                }
            } else {
                setLoadingMore(true);
                // 加载更多时，增加limitNum参数，请求更多问题
                const newLimit = currentLimit + pageSize;
                const response = await http.get(`/questions/list?limitNum=${newLimit}`);
                if (response.code === 200) {
                    const fetchedQuestions = response.data || [];
                    
                    // 如果返回的问题数量没有增加，说明没有更多数据了
                    if (fetchedQuestions.length <= questions.length) {
                        setHasMore(false);
                    } else {
                        setQuestions(fetchedQuestions);
                        setCurrentLimit(newLimit);
                    }
                }
            }
        } catch (error) {
            console.error('获取问题列表失败:', error);
        } finally {
            if (isInitial) {
                setLoading(false);
            } else {
                setLoadingMore(false);
            }
        }
    };

    // 初始加载问题
    useEffect(() => {
        fetchQuestions(true);
    }, []);

    // 监听搜索结果的变化
    useEffect(() => {
        if (isSearching && searchResults.length > 0) {
            // 直接使用搜索结果更新问题列表
            setQuestions(searchResults);
            // 设置为没有更多数据，禁用无限滚动
            setHasMore(false);
        }
    }, [isSearching, searchResults]);

    // 配置交叉观察器以实现无限滚动
    const lastQuestionElementRef = useCallback(node => {
        if (loading || loadingMore || !hasMore || isSearching) return;
        
        if (observerRef.current) observerRef.current.disconnect();
        
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !isSearching) {
                fetchQuestions();
            }
        }, { threshold: 0.1 });
        
        if (node) observerRef.current.observe(node);
    }, [loading, loadingMore, hasMore, isSearching]);

    // 获取问题的回答
    const fetchAnswers = async (qid) => {
        try {
            setLoadingAnswers(true);
            const response = await http.get(`/answers/list/questions/by/qid?qid=${qid}`);
            if (response.code === 200) {
                setAnswers(response.data || []);
            }
        } catch (error) {
            console.error('获取回答列表失败:', error);
        } finally {
            setLoadingAnswers(false);
        }
    };

    // 处理问题点击
    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        fetchAnswers(question.qid);
    };

    // 返回问题列表
    const handleBackToList = () => {
        setSelectedQuestion(null);
        setAnswers([]);
    };

    // 计算时间差
    const getTimeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diff = now - past;
        
        // 转换为分钟
        const minutes = Math.floor(diff / (1000 * 60));
        if (minutes < 60) return `${minutes}分钟`;
        
        // 转换为小时
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}小时`;
        
        // 转换为天
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}天`;
        
        // 转换为月
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}个月`;
        
        // 转换为年
        const years = Math.floor(months / 12);
        return `${years}年`;
    };

    if (loading) {
        return <div className={'questions'}>加载中...</div>;
    }

    // 显示问题详情和回答
    if (selectedQuestion) {
        return (
            <div className={'questions'}>
                <Box mb={4}>
                    <Button size="sm" onClick={handleBackToList} mb={2}>返回问题列表</Button>
                    <Heading as="h3" size="md" style={{ wordBreak: 'break-word' }}>{selectedQuestion.title}</Heading>
                    {selectedQuestion.description && (
                        <Box mt={2} mb={3}>
                            <Text 
                                fontSize="sm" 
                                color="gray.700"
                                style={{ wordBreak: 'break-word' }}
                                dangerouslySetInnerHTML={{ __html: selectedQuestion.description }}
                            />
                        </Box>
                    )}
                    <Box fontSize="sm" color="gray.600" mb={2}>
                        提问于 {getTimeAgo(selectedQuestion.createdAt)} 前
                        · <AiFillLike className={'question-icon'} /> {selectedQuestion.starCount || 0} 个点赞
                    </Box>
                    <Divider my={3} />
                </Box>

                <Box>
                    <Heading as="h4" size="sm" mb={3}>回答 ({answers.length})</Heading>
                    {loadingAnswers ? (
                        <Box p={3}>加载回答中...</Box>
                    ) : answers.length === 0 ? (
                        <Box p={3} bg="gray.50" borderRadius="md">暂无回答</Box>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {answers.map((answer) => (
                                <Box key={answer.aid} p={3} borderWidth="1px" borderRadius="md">
                                    <Flex alignItems="center" mb={2}>
                                        <Avatar size="sm" mr={2} name={answer.username || "匿名用户"} />
                                        <Text fontWeight="bold">{answer.username || "匿名用户"}</Text>
                                        <Text fontSize="sm" color="gray.500" ml={2}>
                                            {getTimeAgo(answer.createdAt)} 前
                                        </Text>
                                    </Flex>
                                    <Text 
                                        dangerouslySetInnerHTML={{ __html: answer.content }}
                                    />
                                    <Flex mt={2} fontSize="sm" color="gray.500">
                                        <Box mr={3}>
                                            <AiFillLike /> {answer.starCount || 0}
                                        </Box>
                                    </Flex>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </Box>
            </div>
        );
    }

    // 显示问题列表
    return (
        <div className={'questions'}>
            {/* 显示搜索状态和清除按钮 */}
            {isSearching && (
                <Flex justifyContent="space-between" mb={4} alignItems="center">
                    <Text fontSize="sm">搜索结果: "{searchQuery}"</Text>
                    <Button size="xs" onClick={clearSearch}>返回所有问题</Button>
                </Flex>
            )}

            {/* 显示搜索加载状态 */}
            {isLoading ? (
                <Center py={6}>
                    <VStack spacing={4}>
                        <Spinner size="xl" color="blue.500" thickness="4px" />
                        <Text>正在搜索中，请稍候...</Text>
                    </VStack>
                </Center>
            ) : loading ? (
                <Center py={6}>
                    <Spinner size="md" />
                </Center>
            ) : questions.length === 0 ? (
                <Box p={4} textAlign="center" color="gray.500">
                    {isSearching ? '没有找到相关问题' : '暂无问题'}
                </Box>
            ) : (
                <ul>
                    {questions.map((question, index) => {
                        // 如果是最后一个元素，添加ref用于无限滚动检测
                        const isLastElement = index === questions.length - 1;
                        
                        return (
                            <li 
                                key={question.qid} 
                                ref={isLastElement && !isSearching ? lastQuestionElementRef : null}
                            >
                                <span 
                                    className={'question-name'} 
                                    onClick={() => handleQuestionClick(question)}
                                    style={{ 
                                        cursor: 'pointer',
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '100%'
                                    }}
                                >
                                    {question.title}
                                </span>
                                {question.description && (
                                    <Box mt={1} mb={2}>
                                        <Text 
                                            fontSize="sm" 
                                            color="gray.600"
                                            className="question-description"
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}
                                            dangerouslySetInnerHTML={{ __html: question.description }}
                                        />
                                    </Box>
                                )}
                                <div className={'questions-info'}>
                                    <span className={'user'}>
                                        匿名用户
                                    </span>
                                    ·提问于
                                    <span className={'question-time'}>
                                        {getTimeAgo(question.createdAt)}
                                    </span>
                                    前
                                    &nbsp;
                                    <AiFillLike className={'question-icon'}></AiFillLike>
                                    <span className={'like-number'}>{question.starCount}</span>
                                    个点赞
                                    &nbsp;
                                    <MdMessage className={'question-icon'}></MdMessage>
                                    <span>0</span>
                                    个回答
                                    &nbsp;
                                    <TiEye className={'question-icon'}></TiEye>
                                    <span>0</span>
                                    次浏览
                                </div>
                                <Button size={'xs'} style={{color: 'rgb(108, 135, 184)'}}>support</Button>
                            </li>
                        );
                    })}
                </ul>
            )}
            
            {loadingMore && (
                <Box py={4} textAlign="center">
                    <Spinner size="sm" />
                </Box>
            )}
              
            {!loading && !loadingMore && hasMore && !isSearching && questions.length > 0 && (
                <Box textAlign="center" my={4}>
                    <Button size="sm" onClick={() => fetchQuestions(false)}>
                        加载更多
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default Questions;
