// 전체 도서
export interface IBook {
  id: number;
  title: string;
  img: number;
  categoryId: number;
  form: string;
  isbn: number;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  pubDate: string;
  likes: number;
}

// 개별 도서
export interface IBookDetail extends IBook {
  categoryName: string;
  liked?: number;
}
