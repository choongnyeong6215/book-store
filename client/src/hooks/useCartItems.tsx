import { useEffect, useState } from "react";
import { ICartItems } from "../models/cartItems.model";
import { deleteCartItems, fetchCartItems } from "../api/cartItems.api";

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deletCartItem = (cartItemId: number) => {
    deleteCartItems(cartItemId).then(() => {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== cartItemId));
    });
  };

  useEffect(() => {
    fetchCartItems().then((item) => {
      setCartItems(item);
      setIsEmpty(item.length === 0);
    });
  }, []);

  return { cartItems, isEmpty, deletCartItem };
};
