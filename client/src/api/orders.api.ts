import { IOrder, IOrderDetail, IOrderSheet } from "../models/orders.model";
import { httpClient } from "./https";
import { resetPassword } from "./auth.api";

export const addOrder = async (orderData: IOrderSheet) => {
  const response = await httpClient.post("/orders", orderData);

  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<IOrder[]>("/orders");

  return response.data;
};

export const fetchOrderDetail = async (orderId: number) => {
  const response = await httpClient.get<IOrderDetail[]>(`/orders/${orderId}`);

  return response.data;
};
