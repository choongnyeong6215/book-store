import styled from "styled-components";
import { useCategories } from "@/hooks/useCategories";
import Button from "@/components/common/Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { QUERYSTRING } from "@/constants/queryString";

const BooksFilter = () => {
  const { categories } = useCategories();
  const [serachParams, setSearchParams] = useSearchParams();
  const [isActive, setISActive] = useState(false);

  const handleCategory = (categoryId: number | null) => {
    const newSearchParams = new URLSearchParams(serachParams);

    if (categoryId === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORYID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORYID, categoryId.toString());
      setISActive(true);
    }

    setSearchParams(newSearchParams);
  };

  const handleNewRelase = () => {
    const newSearchParams = new URLSearchParams(serachParams);

    if (newSearchParams.get(QUERYSTRING.ISNEWRELASE)) {
      newSearchParams.delete(QUERYSTRING.ISNEWRELASE);
    } else {
      newSearchParams.set(QUERYSTRING.ISNEWRELASE, "true");
    }

    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {categories.map((category) => (
          <Button
            size="medium"
            schema={category.isActive ? "primary" : "normal"}
            key={category.categoryId}
            onClick={() => handleCategory(category.categoryId)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
      <div className="newRelease">
        <Button
          size="medium"
          schema={serachParams.get("isNewRelase") ? "primary" : "normal"}
          onClick={handleNewRelase}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
