import { IBookReviewItem } from "@/models/reviews.model";
import { formatDate } from "@/utils/format";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

interface IBookReviewItemProps {
  review: IBookReviewItem;
}

const Star = (props: Pick<IBookReviewItem, "score">) => {
  return (
    <span className="star">
      {Array.from({ length: props.score }).map((_, index) => (
        <FaStar key={index} />
      ))}
    </span>
  );
};

const BookReviewItem = ({ review }: IBookReviewItemProps) => {
  return (
    <BookReviewItemStyle>
      <header className="header">
        <div>
          <span>{review.userName}</span>
          <Star score={review.score} />
        </div>
        <div>{formatDate(review.createdAt, "YYYY년 MM월 DD일")}</div>
      </header>
      <div className="content">
        <p>{review.content}</p>
      </div>
    </BookReviewItemStyle>
  );
};

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .star {
    padding: 0 0 0 8px;
    svg {
      fill: ${({ theme }) => theme.color.primary};
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;
  }

  .content {
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

export default BookReviewItem;
