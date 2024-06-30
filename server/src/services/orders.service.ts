import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db/dbConnection";
import { IDelivery } from "../models/orders.model";
import { ISelectedCartItem } from "../models/cartItems.model";
import { snakeToCamel } from "../utils/format";

export const insertOrder = async (
  userId: string,
  cartItemIds: ISelectedCartItem[],
  delivery: IDelivery,
  representativeBookTitle: string,
  totalQuantity: string,
  totalPrice: string
) => {
  const conn = await pool.getConnection();

  try {
    // deliveries
    const insertDeliveryQuery = `
        INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)
    `;
    const insertDeliveryValues = [
      delivery.address,
      delivery.receiver,
      delivery.contact,
    ];

    const [insertDeliveryResult] = await conn.execute<ResultSetHeader>(
      insertDeliveryQuery,
      insertDeliveryValues
    );

    const newDeliveryId = insertDeliveryResult.insertId;

    // orders
    const insertOrderQuery = `
        INSERT INTO orders (book_title, total_price, total_quantity, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)
    `;
    const insertOrderValues = [
      representativeBookTitle,
      totalPrice,
      totalQuantity,
      userId,
      newDeliveryId,
    ];

    const [insertOrderResult] = await conn.execute<ResultSetHeader>(
      insertOrderQuery,
      insertOrderValues
    );

    const newOrderId = insertOrderResult.insertId;

    // orderedBook
    const placeholders = cartItemIds.map((cartItemId) => "?").join(",");

    // 장바구니 중 주문 상품
    const findOrderItemsQuery = `
      SELECT book_id, quantity
      FROM cartItems
      WHERE id IN (${placeholders})
    `;

    const [findOrderItemsResult] = await conn.execute<RowDataPacket[]>(
      findOrderItemsQuery,
      cartItemIds
    );

    const newOrderRows: (string | number)[][] = [];

    findOrderItemsResult.forEach((orderItem) => {
      newOrderRows.push([newOrderId, orderItem.book_id, orderItem.quantity]);
    });

    const insertOrderedBookQuery = `
      INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?
    `;

    const [insertOrderedBookResult] = await conn.query<ResultSetHeader>(
      insertOrderedBookQuery,
      [newOrderRows]
    );

    // 주문 상품 장바구니에서 삭제
    const deletOrderItemsFromCartsQuery = `
        DELETE
        FROM cartItems
        WHERE id IN (${placeholders})
    `;

    const [deletOrderItemsFromCartsResult] = await conn.query<ResultSetHeader>(
      deletOrderItemsFromCartsQuery,
      cartItemIds
    );

    return deletOrderItemsFromCartsResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findOrders = async (userId: string) => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        SELECT o.id, o.created_at, d.address, d.receiver, d.contact, o.book_title, o.total_quantity, o.total_price
        FROM orders o
        LEFT JOIN deliveries d
        ON o.delivery_id = d.id
        WHERE o.user_id = ?
    `;
    const values = [userId];
    
    const [result] = await conn.execute<RowDataPacket[]>(sql, values);

    const camelCaseResult = snakeToCamel(result);

    return camelCaseResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findOrderDetail = async (userId: string, orderId: string) => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        SELECT b.id, b.title, b.author, b.price, ob.quantity
        FROM orderedBook ob
        LEFT join books b
        ON ob.book_id = b.id
        LEFT JOIN orders o
        ON ob.order_id = o.id
        WHERE ob.order_id = ?
        AND o.user_id = ?
    `;
    const values = [orderId, userId];

    const [result] = await conn.execute<RowDataPacket[]>(sql, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
