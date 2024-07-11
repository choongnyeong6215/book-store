export interface IBookReviewItem {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  score: number;
}

export type TBookReviewItemWrite = Pick<IBookReviewItem, "content" | "score">;
