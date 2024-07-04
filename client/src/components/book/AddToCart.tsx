import styled from "styled-components";
import { IBookDetail } from "../../models/books.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import React, { useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface IAddToCartProps {
  book: IBookDetail;
}

const AddToCart = ({ book }: IAddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const showAlert = useAlert();
  const { addCart, cartAdded } = useBook(book.id.toString());

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity < 2) {
      showAlert("최소 1개 이상 장바구니에 담을 수 있습니다.");
      setQuantity(1);
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChangeQuantity}
        />
        <Button size="medium" schema="normal" onClick={handleIncreaseQuantity}>
          +
        </Button>
        <Button size="medium" schema="normal" onClick={handleDecreaseQuantity}>
          -
        </Button>
      </div>
      <Button size="medium" schema="primary" onClick={() => addCart(quantity)}>
        장바구니 담기
      </Button>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/carts">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
};

interface IAddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<IAddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  .added {
    position: absolute;
    right: 0;
    top: 90px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? "1" : "0")};

    p {
      padding: 0 0 8px 0;
      margin: 0;
      background-color: transparent;
    }

    a {
      background-color: transparent;
    }
  }
`;

export default AddToCart;
