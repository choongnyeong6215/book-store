import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IBook } from "../models/books.model";
import { IPagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<IBook[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalBooksQuantity: 0,
  });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    fetchBooks({
      categoryId: params.get(QUERYSTRING.CATEGORYID)
        ? Number(params.get(QUERYSTRING.CATEGORYID))
        : undefined,
      isNewRelease: params.get(QUERYSTRING.ISNEWRELASE) ? true : undefined,
      currentPage: params.get(QUERYSTRING.CURRENTPAGE)
        ? Number(params.get(QUERYSTRING.CURRENTPAGE))
        : 1,
      listNum: LIMIT,
    }).then((response) => {
      setBooks(response.books);
      setPagination(response.pagination);
      setIsEmpty(response.books.length === 0);
    });
  }, [location.search]);

  return { books, pagination, isEmpty };
};
