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
