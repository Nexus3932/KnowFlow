import './scss/Questions.scss';
import {AiFillLike} from 'react-icons/ai';
import {MdMessage} from 'react-icons/md';
import {TiEye} from 'react-icons/ti';
import {Button, Box, Text, Heading, Divider, Avatar, VStack, Flex} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { http } from '../utils/request';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loadingAnswers, setLoadingAnswers] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const response = await http.get('/questions/list');
                if (response.code === 200) {
                    setQuestions(response.data || []);
                }
            } catch (error) {
                console.error('获取问题列表失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

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
                    <Heading as="h3" size="md">{selectedQuestion.title}</Heading>
                    {selectedQuestion.description && (
                        <Box mt={2} mb={3}>
                            <Text 
                                fontSize="sm" 
                                color="gray.700"
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
            <ul>
                {questions.map((question) => (
                    <li key={question.qid}>
                        <span 
                            className={'question-name'} 
                            onClick={() => handleQuestionClick(question)}
                            style={{ cursor: 'pointer' }}
                        >
                            {question.title}
                        </span>
                        {question.description && (
                            <Box mt={1} mb={2}>
                                <Text 
                                    fontSize="sm" 
                                    color="gray.600"
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
                ))}
            </ul>
        </div>
    );
};

export default Questions;
