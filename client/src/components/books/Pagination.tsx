import styled from "styled-components";
import { IPagination } from "../../models/pagination.model";
import { LIMIT } from "../../constants/pagination";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

interface IPaginationProps {
  pagination: IPagination;
}

const Pagination = ({ pagination }: IPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, totalBooksQuantity } = pagination;
  const pages: Number = Math.ceil(totalBooksQuantity / LIMIT);

  const handlePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.CURRENTPAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      <ol>
        {Array(pages)
          .fill(0)
          .map((_, index) => (
            <li key={index}>
              <Button
                size="small"
                schema={currentPage === index + 1 ? "primary" : "normal"}
                onClick={() => handlePage(index + 1)}
              >
                {index + 1}
              </Button>
            </li>
          ))}
      </ol>
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: ceneter;
  padding: 24px 0;

  ol {
    display: flex;
    gap: 8px;
  }
`;

export default Pagination;
