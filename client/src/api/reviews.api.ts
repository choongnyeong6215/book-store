import { IBookReviewItem, TBookReviewItemWrite } from "@/models/reviews.model";
import { requestHandler } from "./https";

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<IBookReviewItem[]>("get", `/reviews/${bookId}`);
};

interface IAddBookReviewResponse {
  message: string;
}

export const addBookReview = async (
  bookId: string,
  data: TBookReviewItemWrite
) => {
  return (await requestHandler)<IAddBookReviewResponse>(
    "post",
    `/reviews/${bookId}`
  );
};
