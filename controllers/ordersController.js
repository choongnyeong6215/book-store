const mysql = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  // db connection
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookstore",
    dateStrings: true,
  });

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  try {
    // deliveries
    const newDeliveryQuery = `INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)`;

    const [deliveriseRes] = await conn.execute(newDeliveryQuery, [
      delivery.address,
      delivery.receiver,
      delivery.contact,
    ]);

    const deliveryId = deliveriseRes.insertId;

    // orders
    const newOrdersquery = `INSERT INTO orders (book_title, total_price, total_quantity, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;

    const [ordersRes] = await conn.execute(newOrdersquery, [
      firstBookTitle,
      totalQuantity,
      totalPrice,
      userId,
      deliveryId,
    ]);

    const orderId = ordersRes.insertId;

    // 주문할 상품 데이터 추출
    const toOrderQuery = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    const [orderItems, fields] = await conn.query(toOrderQuery, [items]);

    // orderedBook
    const newOrderedBookQuery = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    const values = [];

    orderItems.forEach((orderItem) => {
      values.push([orderId, orderItem.book_id, orderItem.quantity]);
    });

    const orderedBookRes = await conn.query(newOrderedBookQuery, [values]);

    // 주문 상품 장바구니에서 삭제
    const deleteCartItemsRes = await deleteCartItems(conn, items);

    return res.status(StatusCodes.OK).json(deleteCartItemsRes);
  } catch (err) {
    console.log(err);
  }
};

// 주문 상품 장바구니에서 삭제
const deleteCartItems = async (conn, items) => {
  try {
    const deleteCartItemsQuery = `DELETE FROM cartItems WHERE id IN (?)`;
    return await conn.query(deleteCartItemsQuery, [items]);
  } catch (err) {
    console.log(err);
  }
};

const getOrders = async (req, res) => {
  // db connection
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookstore",
    dateStrings: true,
  });

  try {
    const orderByUsers = `
      select o.id, o.created_at, d.address, d.receiver, d.contact, o.book_title, o.total_price, o.total_quantity
      from orders o
      left join deliveries d
      on o.delivery_id = d.id;`;

    const [rows, fields] = await conn.query(orderByUsers);

    return res.status(StatusCodes.OK).json(rows);
  } catch (err) {
    console.log(err);
  }
};

const getOrderDetail = async (req, res) => {
  // db connection
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookstore",
    dateStrings: true,
  });

  try {
    const { id } = req.params;

    const getOrderDetailQuery = `
      SELECT b.id, b.title, b.author, b.price, o.quantity
      FROM orderedBook o
      LEFT JOIN books b
      ON o.book_id = b.id
      WHERE o.id = ?`;

    const [rows, fields] = await conn.query(getOrderDetailQuery, id);

    return res.status(StatusCodes.OK).json(rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addOrder,
  getOrders,
  getOrderDetail,
};
