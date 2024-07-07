import { useEffect, useState } from "react";
import { IOrderDetailItem } from "@/models/orders.model";
import { fetchOrderDetail, fetchOrders } from "@/api/orders.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrderDetailItem[]>([]);
  const [selectedOrderedItemId, setSelectedOrderedItemId] = useState<
    number | null
  >(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrderedItem = (orderId: number) => {
    fetchOrderDetail(orderId).then((orderDetail) => {
      setSelectedOrderedItemId(orderId);

      if (orders.filter((order) => order.id === orderId)[0].detail) {
        setSelectedOrderedItemId(orderId);

        return;
      }

      setOrders(
        orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              detail: orderDetail,
            };
          }

          return order;
        })
      );
    });
  };

  return { orders, selectedOrderedItemId, selectOrderedItem };
};
