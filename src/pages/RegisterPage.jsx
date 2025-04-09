import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  Button,
  Link,
  Text,
  Box,
  FormErrorMessage,
  useDisclosure,
  ChakraProvider,
  VStack,
} from "@chakra-ui/react";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isOpen } = useDisclosure({ defaultIsOpen: true });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "用户名不能为空";
    if (!formData.email) tempErrors.email = "邮箱不能为空";
    if (!formData.password) tempErrors.password = "密码不能为空";
    if (formData.password.length < 6) tempErrors.password = "密码长度至少为6位";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "两次输入的密码不一致";
    }
    if (!formData.email.includes('@')) tempErrors.email = "请输入有效的邮箱地址";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await register(formData.username, formData.password, formData.email);
        if (result.success) {
          navigate('/home');
        } else {
          setErrors({ general: result.message });
        }
      } catch (error) {
        console.error("注册失败:", error);
        setErrors({ general: "注册失败，请稍后重试" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ChakraProvider>
      <Modal
        isOpen={isOpen}
        onClose={() => {}}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">创建新账户</ModalHeader>

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
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel htmlFor="username">用户名</FormLabel>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                  />
                  {errors.username && (
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">邮箱</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="请输入邮箱"
                  />
                  {errors.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
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

                <FormControl isInvalid={!!errors.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">确认密码</FormLabel>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="请再次输入密码"
                  />
                  {errors.confirmPassword && (
                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  colorScheme="blue"
                  width="full"
                  type="submit"
                  isLoading={isLoading}
                  mt={4}
                >
                  {isLoading ? "注册中..." : "注册"}
                </Button>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Text>
              已有账号?{" "}
              <Link color="blue.500" href="/login">
                立即登录
              </Link>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default RegisterPage; 