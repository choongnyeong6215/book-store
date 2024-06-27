import { RowDataPacket } from "mysql2";

export interface IBookRequestQueryString {
  categoryId?: string;
  isNewRelease?: string;
  listNum?: string;
  currentPage?: string;
}

export interface IBookResponse {
  id: number;
  title: string;
  img: number;
  categoryId: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  pubDate: string;
  likes: number;
}

export interface IPagination {
  currentPage: number;
  totalBooksQunatity: number;
}

export interface IBookResponseWithPagination {
  books?: IBookResponse[];
  pagination?: IPagination;
}

export interface IsearchAllBooksResponse extends RowDataPacket, IBookResponse {}
