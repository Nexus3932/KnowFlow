import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { http } from '../utils/request';
import { useAuth } from '../context/AuthContext';

const AskQuestionModal = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: []
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTagChange = (e) => {
    setCurrentTag(e.target.value);
  };
  
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title.trim()) {
      tempErrors.title = '题目不能为空';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: '请先登录',
        description: '提问前请先登录您的账号',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // 模拟提交问题到后端
        const response = await http.post('/api/questions', formData);
        
        if (response.data && response.data.success) {
          toast({
            title: '提问成功',
            description: '您的问题已成功发布',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          // 重置表单并关闭模态框
          setFormData({ title: '', description: '', tags: [] });
          onClose();
        } else {
          throw new Error(response.data?.message || '提问失败');
        }
      } catch (error) {
        console.error('提问失败:', error);
        toast({
          title: '提问失败',
          description: error.message || '发布问题时出现错误，请稍后重试',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>发布问题</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <FormControl isInvalid={!!errors.title} mb={4} isRequired>
            <FormLabel>问题标题</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="请输入您的问题标题"
            />
            {errors.title && (
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>问题描述 (可选)</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="详细描述您的问题，可以帮助他人更好地理解和回答"
              rows={5}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>添加标签</FormLabel>
            <InputGroup>
              <Input
                value={currentTag}
                onChange={handleTagChange}
                onKeyDown={handleKeyDown}
                placeholder="输入标签后按回车添加"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={addTag}>
                  添加
                </Button>
              </InputRightElement>
            </InputGroup>
            
            {formData.tags.length > 0 && (
              <Box mt={2}>
                <HStack spacing={2} wrap="wrap">
                  {formData.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      m={1}
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => removeTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
              </Box>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isSubmitting}>
            发布问题
          </Button>
          <Button onClick={onClose}>取消</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AskQuestionModal; 