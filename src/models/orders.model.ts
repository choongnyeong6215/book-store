import { ISelectedCartItem } from "./cartItems.model";

export interface IDelivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface IOrderRequestBody {
  cartItemIds: ISelectedCartItem[];
  delivery: IDelivery;
  representativeBookTitle: string;
  totalQuantity: string;
  totalPrice: string;
}
