import styled from "styled-components";
import { IBookDetail } from "../../models/books.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface ILikeButtonProps {
  book: IBookDetail;
  onClick: () => void;
}

const LikeButton = ({ book, onClick }: ILikeButtonProps) => {
  return (
    <LikeButtonStyle
      size="medium"
      schema={book.liked === 1 ? "like" : "normal"}
      onClick={onClick}
      $liked={book.liked as number}
    >
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
};

const LikeButtonStyle = styled(Button)<{ $liked: number }>`
  display: flex;
  gap: 6px;

  svg {
    background-color: transparent;
    fill: ${({ $liked }) => ($liked === 1 ? "white" : "black")};
  }
`;

export default LikeButton;
