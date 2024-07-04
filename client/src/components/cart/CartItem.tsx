import styled from "styled-components";
import { ICartItems } from "../../models/cartItems.model";
import Button from "../common/Button";
import Title from "../common/Title";
import { formatNumber } from "../../utils/format";
import CheckIconButton from "./CheckIconButton";
import { useMemo } from "react";
import { useAlert } from "../../hooks/useAlert";

interface ICartItemProps {
  cartItem: ICartItems;
  checkedItems: number[];
  onCheck: (cartItemId: number) => void;
  onDelete: (CartItemId: number) => void;
}

const CartItem = ({
  cartItem,
  checkedItems,
  onCheck,
  onDelete,
}: ICartItemProps) => {
  const isChecked = useMemo(() => {
    return checkedItems.includes(cartItem.id);
  }, [checkedItems, cartItem.id]);
  const { showConfirm } = useAlert();

  const handleCheck = () => {
    onCheck(cartItem.id);
  };

  const handleDelete = () => {
    // 삭제 체크
    showConfirm("장바구니에서 삭제하시겠습니까?", () => onDelete(cartItem.id));
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size="medium" color="text">
            {cartItem.title}
          </Title>
          <p className="summary">{cartItem.summary}</p>
          <p className="price">{formatNumber(cartItem.price)} 원</p>
          <p className="quantity">{cartItem.quantity} 권</p>
        </div>
      </div>
      <Button size="medium" schema="normal" onClick={handleDelete}>
        삭제
      </Button>
    </CartItemStyle>
  );
};

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      padding: 0 0 8px 0;
    }
  }
`;

export default CartItem;
