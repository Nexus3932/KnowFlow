import { useState } from "react";
import { 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";

function TagsSection() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [followedTags, setFollowedTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [availableTags] = useState([
    "JavaScript", "React", "Vue", "Angular", "Node.js", 
    "Python", "Java", "TypeScript", "CSS", "HTML", 
    "数据库", "算法", "前端", "后端", "移动开发", 
    "UI设计", "DevOps", "人工智能", "区块链", "安全"
  ]);
  const toast = useToast();

  const handleFollowTag = (tag) => {
    if (followedTags.includes(tag)) {
      setFollowedTags(followedTags.filter(t => t !== tag));
    } else {
      if (followedTags.length >= 5) {
        toast({
          title: "最多关注5个标签",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      setFollowedTags([...followedTags, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setFollowedTags(followedTags.filter(t => t !== tag));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="app-tags">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontWeight="medium">
          已关注的标签<Text as="span" fontSize="sm" color="gray.500" ml={1}>(最多5个)</Text>
        </Text>
        <Text 
          color="blue.400" 
          cursor="pointer" 
          fontSize="sm"
          onClick={toggleEditMode}
        >
          {isEditing ? "完成" : "编辑"}
        </Text>
      </Flex>
      
      {followedTags.length > 0 ? (
        <>
          <Wrap spacing={2} mb={2}>
            {followedTags.map((tag) => (
              <WrapItem key={tag}>
                <Tag size="md" borderRadius="full" colorScheme="blue" variant="solid">
                  <TagLabel>{tag}</TagLabel>
                  {isEditing && (
                    <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                  )}
                </Tag>
              </WrapItem>
            ))}
            {followedTags.length < 5 && !isEditing && (
              <WrapItem>
                <Tag 
                  size="md" 
                  borderRadius="full" 
                  colorScheme="blue" 
                  variant="solid" 
                  cursor="pointer"
                  onClick={onOpen}
                >
                  <TagLabel>关注一个标签</TagLabel>
                </Tag>
              </WrapItem>
            )}
          </Wrap>
        </>
      ) : (
        <Box mb={4}>
          <Text color="gray.500" fontSize="sm" mb={2}>关注标签来筛选你的问题列表</Text>
          <Tag 
            size="md" 
            borderRadius="full" 
            colorScheme="blue" 
            variant="solid"
            cursor="pointer"
            onClick={onOpen}
          >
            <TagLabel>关注一个标签</TagLabel>
          </Tag>
        </Box>
      )}

      {/* 标签选择模态框 */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>选择你感兴趣的标签</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Wrap spacing={2}>
              {availableTags.map((tag) => (
                <WrapItem key={tag}>
                  <Tag 
                    size="md" 
                    borderRadius="full" 
                    variant={followedTags.includes(tag) ? "solid" : "outline"}
                    colorScheme="blue"
                    cursor="pointer"
                    onClick={() => handleFollowTag(tag)}
                  >
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TagsSection;
