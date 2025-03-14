import { Button } from "@chakra-ui/react";

function TagsSection() {
  return (
    <div className="app-tags">
      <div>
        <span>
          已关注的标签<span>(最多5个)</span>
        </span>{" "}
        <span>编辑</span>
      </div>
      <div>
        <p>关注标签来筛选你的问题列表</p>
        <Button colorScheme="blue" size="sm">
          关注一个标签
        </Button>
      </div>
    </div>
  );
}

export default TagsSection;
