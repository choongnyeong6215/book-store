import { httpClient } from "./https";

interface IAddCartItemsParams {
  bookId: number;
  quantity: number;
}

export const addCartItems = async (params: IAddCartItemsParams) => {
  const response = await httpClient.post(`/carts`, params);

  return response.data;
};
