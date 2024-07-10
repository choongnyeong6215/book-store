import { useLocation } from 'react-router-dom';
import { fetchBooks } from '@/api/books.api';
import { QUERYSTRING } from '@/constants/queryString';
import { LIMIT } from '@/constants/pagination';
import { useQuery } from '@tanstack/react-query';

export const useBooks = () => {
  const location = useLocation();

  const { data, isLoading: isBooksLoading } = useQuery({
    queryKey: ['books', location.search],
    queryFn: () => {
      const params = new URLSearchParams(location.search);

      return fetchBooks({
        categoryId: params.get(QUERYSTRING.CATEGORYID)
          ? Number(params.get(QUERYSTRING.CATEGORYID))
          : undefined,
        isNewRelease: params.get(QUERYSTRING.ISNEWRELASE) ? true : undefined,
        currentPage: params.get(QUERYSTRING.CURRENTPAGE)
          ? Number(params.get(QUERYSTRING.CURRENTPAGE))
          : 1,
        listNum: LIMIT,
      });
    },
  });

  return {
    books: data?.books,
    pagination: data?.pagination,
    isEmpty: data?.books.length === 0,
    isBooksLoading,
  };
};
