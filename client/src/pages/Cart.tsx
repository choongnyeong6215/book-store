import styled from "styled-components";
import Title from "@/components/common/Title";
import CartItem from "@/components/cart/CartItem";
import { useCartItems } from "@/hooks/useCartItems";
import { useMemo, useState } from "react";
import NotExist from "@/components/common/NotExist";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "@/components/cart/CartSummary";
import Button from "@/components/common/Button";
import { useAlert } from "@/hooks/useAlert";
import { IOrderSheet } from "@/models/orders.model";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { showAlert, showConfirm } = useAlert();
  const naviate = useNavigate();

  const { cartItems, deletCartItem, isEmpty } = useCartItems();

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (cartItemId: number) => {
    if (checkedItems.includes(cartItemId)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== cartItemId)
      );
    } else {
      setCheckedItems([...checkedItems, cartItemId]);
    }
  };

  const handleItemDelete = (cartItemId: number) => {
    deletCartItem(cartItemId);
  };

  const totalBooksQuantity = useMemo(() => {
    return cartItems.reduce((totalQuantity, cartItem) => {
      if (checkedItems.includes(cartItem.id)) {
        return totalQuantity + cartItem.quantity;
      }
      return totalQuantity;
    }, 0);
  }, [cartItems, checkedItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((totalPrice, cartItem) => {
      if (checkedItems.includes(cartItem.id)) {
        return totalPrice + cartItem.quantity * cartItem.price;
      }
      return totalPrice;
    }, 0);
  }, [checkedItems, checkedItems]);

  const handleOrder = () => {
    if (!checkedItems.length) {
      showAlert("주문할 상품을 선택해주세요.");
      return;
    }

    // 주문서 작성으로 이동
    const orderSheet: Omit<IOrderSheet, "delivery"> = {
      cartItemIds: checkedItems,
      totalPrice,
      totalQuantity: totalBooksQuantity,
      representativeBookTitle: cartItems[0].title,
    };

    showConfirm("주문하시겠습니까?", () => {
      naviate("/orders", { state: orderSheet });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>

            <div className="summary">
              <CartSummary
                totalBooksQuantity={totalBooksQuantity}
                totalPrice={totalPrice}
              />
              <Button size="medium" schema="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
      </CartStyle>
      {isEmpty && (
        <NotExist
          title="장바구니가 비었습니다."
          icon={<FaShoppingCart />}
          description={<>장바구니를 채워보세요</>}
        />
      )}
    </>
  );
};

const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export default Cart;
