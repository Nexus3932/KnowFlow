// src/pages/HomePage.jsx
import QuestionFilters from "../components/QuestionFilters";
import Questions from "../components/Questions";
import TagsSection from "../components/TagsSection";
import HotQuestions from "../components/HotQuestions";
import { Box, Flex } from "@chakra-ui/react";

function HomePage() {
  return (
    <Flex direction="column">
      <Box className="main-body">
        <QuestionFilters />
        <Questions />
      </Box>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <TagsSection />
        <HotQuestions />
      </Flex>
    </Flex>
  );
}

// 可以添加其他页面组件
export default HomePage;
