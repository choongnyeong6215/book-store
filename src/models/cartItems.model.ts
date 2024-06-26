export interface ICartItemRequestBody {
  bookId: string;
  quantity: string;
}

export interface ISelectedCartItem {
  selectedCartItems?: string[];
}
