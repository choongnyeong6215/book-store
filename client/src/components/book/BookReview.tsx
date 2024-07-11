import { IBookReviewItem, TBookReviewItemWrite } from "@/models/reviews.model";
import styled from "styled-components";
import BookReviewItem from "./BookReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface IBookReviewProps {
  reviews: IBookReviewItem[];
  onAdd: (data: TBookReviewItemWrite) => void;
}

const BookReview = ({ reviews, onAdd }: IBookReviewProps) => {
  console.log(reviews);

  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default BookReview;
