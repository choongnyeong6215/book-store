import styled from "styled-components";
import BookItem from "./BookItem";
import { IBook } from "../../models/books.model";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QUERYSTRING } from "../../constants/queryString";
import { TViewMode } from "./BooksViewSwitcher";

interface IBooksListProps {
  books: IBook[];
}

const BooksList = ({ books }: IBooksListProps) => {
  const [view, setView] = useState<TViewMode>("grid");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as TViewMode);
    }
  }, [location.search]);

  return (
    <BooksListStyle view={view}>
      {books.map((book) => (
        <BookItem book={book} view={view} key={book.id} />
      ))}
    </BooksListStyle>
  );
};

interface IBookListStyleProps {
  view: TViewMode;
}

const BooksListStyle = styled.div<IBookListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;
