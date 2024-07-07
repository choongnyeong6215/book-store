import { ICartItems } from "@/models/cartItems.model";
import { httpClient } from "@/api/https";

interface IAddCartItemsParams {
  bookId: number;
  quantity: number;
}

export const addCartItems = async (params: IAddCartItemsParams) => {
  const response = await httpClient.post(`/carts`, params);

  return response.data;
};

export const fetchCartItems = async () => {
  const response = await httpClient.get<ICartItems[]>("/carts");

  return response.data;
};

export const deleteCartItems = async (cartItemId: number) => {
  const response = await httpClient.delete(`/carts/${cartItemId}`);

  return response.data;
};
