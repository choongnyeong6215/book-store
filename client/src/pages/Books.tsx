import styled from "styled-components";
import Title from "@/components/common/Title";
import BooksFilter from "@/components/books/BooksFilter";
import BooksList from "@/components/books/BooksList";
import BookNotExist from "@/components/books/BookNotExist";
import Pagination from "@/components/books/Pagination";
import BooksViewSwitcher from "@/components/books/BooksViewSwitcher";
import { useBooks } from "@/hooks/useBooks";
import Loading from "@components/common/Loading";

const Books = () => {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();

  if (isEmpty) {
    return <BookNotExist />;
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        <Pagination pagination={pagination} />
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
`;

export default Books;
