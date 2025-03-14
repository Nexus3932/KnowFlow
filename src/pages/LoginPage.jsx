import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Link,
  Text,
  Flex,
  HStack,
  Box,
  FormErrorMessage,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";

function LoginPage() {
  // Modal状态管理 - 默认打开，且不允许关闭
  const { isOpen, onOpen } = useDisclosure({ defaultIsOpen: true });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

        // 登录成功，设置状态
        setIsLoggedIn(true);
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
    <ChakraProvider>
      <Modal
        isOpen={isOpen && !isLoggedIn}
        onClose={() => {}} // 空函数防止模态框关闭
        closeOnOverlayClick={false} // 禁止点击背景关闭
        closeOnEsc={false} // 禁止Esc键关闭
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">欢迎登录</ModalHeader>

          <ModalBody pb={6}>
            {errors.general && (
              <Box
                p={3}
                mb={4}
                bg="red.50"
                color="red.500"
                borderRadius="md"
                textAlign="center"
              >
                {errors.general}
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errors.username} mb={4}>
                <FormLabel htmlFor="username">用户名或邮箱</FormLabel>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="请输入用户名或邮箱"
                />
                {errors.username && (
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password} mb={4}>
                <FormLabel htmlFor="password">密码</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>

              <Flex justify="space-between" mb={4}>
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  isChecked={formData.rememberMe}
                  onChange={handleChange}
                >
                  记住我
                </Checkbox>
                <Link color="blue.500" href="/forgot-password">
                  忘记密码?
                </Link>
              </Flex>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isLoading}
                mb={4}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>

            <Box textAlign="center" mt={4}>
              <Text mb={2}>或通过以下方式登录</Text>
              <HStack spacing={4} justify="center">
                <Button colorScheme="green" variant="outline" size="sm">
                  微信
                </Button>
                <Button colorScheme="red" variant="outline" size="sm">
                  微博
                </Button>
                <Button colorScheme="blue" variant="outline" size="sm">
                  QQ
                </Button>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Text>
              还没有账号?{" "}
              <Link color="blue.500" href="/register">
                立即注册
              </Link>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 登录成功后显示主应用内容 */}
      {isLoggedIn && (
        <Box p={5}>
          <Text fontSize="xl">您已成功登录！</Text>
          <Text mt={2}>现在您可以访问网站的所有内容</Text>
          {/* 这里可以放置应用的主要内容 */}
        </Box>
      )}
    </ChakraProvider>
  );
}

export default LoginPage;
