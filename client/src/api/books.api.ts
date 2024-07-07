import { IBook, IBookDetail } from "@/models/books.model";
import { IPagination } from "@/models/pagination.model";
import { httpClient } from "@/api//https";

interface IFetchBookParmas {
  categoryId?: number;
  isNewRelease?: boolean;
  currentPage?: number;
  listNum?: number;
}

interface IFetchBooksResponse {
  books: IBook[];
  pagination: IPagination;
}

export const fetchBooks = async (params: IFetchBookParmas) => {
  try {
    const response = await httpClient.get<IFetchBooksResponse>("/books", {
      params: params,
    });

    return response.data;
  } catch (err) {
    return {
      books: [],
      pagination: {
        currentPage: 1,
        totalBooksQuantity: 0,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<IBookDetail>(`/books/${bookId}`);

  return response.data;
};

export const likeddBook = async (bookId: number) => {
  const response = await httpClient.post(`/likes/${bookId}`);

  return response.data;
};

export const unlikeddBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);

  return response.data;
};
