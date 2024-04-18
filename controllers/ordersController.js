const mysql = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

const addOrder = async (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  // db connection
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Bookstore",
    dateStrings: true,
  });

  // deliveries
  const sql = `INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)`;
  const values = [delivery.address, delivery.receiver, delivery.contact];

  const [results] = await conn.query(sql, values);

  const deliveryId = results.insertId;

  // orders
  // newDeliveryQuery = `INSERT INTO orders (book_title, total_price, total_quantity, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
  // values = [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId];

  // conn.query(newDeliveryQuery, values, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end();
  //   }

  //   orderId = results.insertId;
  // });

  // // orderedBook
  // newDeliveryQuery = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  // values = [];

  // items.forEach((item) => {
  //   values.push([orderId, item.bookId, item.quantity]);
  // });

  // conn.query(newDeliveryQuery, [values], (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(StatusCodes.BAD_REQUEST).end();
  //   }

  //   return res.status(StatusCodes.OK).json(results);
  // });
};

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

module.exports = {
  addOrder,
  getOrders,
  getOrderDetail,
};
