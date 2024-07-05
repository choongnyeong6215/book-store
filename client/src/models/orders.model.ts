export interface IDelivery {
  address: string;
  receiver: string;
  contact: string;
}

// 주문서
export interface IOrderSheet {
  cartItemIds: number[];
  delivery: IDelivery;
  representativeBookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface IOrder {
  id: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

// 주문 상세내역
export interface IOrderDetail {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface IOrderDetailItem extends IOrder {
  detail?: IOrderDetail[];
}
