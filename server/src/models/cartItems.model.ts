export interface ICartItemRequestBody {
  bookId: number;
  quantity: number;
}

export interface ISelectedCartItem {
  selectedCartItems?: number[];
}
