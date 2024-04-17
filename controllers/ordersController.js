const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

let deliveryId = 4;
let orderId = 3;

const addOrder = (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  // deliveries
  let newDeliveryQuery = `INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)`;
  let values = [delivery.address, delivery.receiver, delivery.contact];

  conn.query(newDeliveryQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    deliveryId = results.insertId;

    return res.status(StatusCodes.OK).json(results);
  });

  // orders
  newDeliveryQuery = `INSERT INTO orders (book_title, total_price, total_quantity, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
  values = [firstBookTitle, totalQuantity, totalPrice, userId, deliveryId];

  conn.query(newDeliveryQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    orderId = results.insertId;
    console.log(orderId);

    return res.status(StatusCodes.OK).json(results);
  });

  // orderedBook
  newDeliveryQuery = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

  values = [];

  items.forEach((item) => {
    values.push([orderId, item.bookId, item.quantity]);
  });

  conn.query(newDeliveryQuery, [values], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    orderId = results.insertId;
    console.log(orderId);

    return res.status(StatusCodes.OK).json(results);
  });
};

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

module.exports = {
  addOrder,
  getOrders,
  getOrderDetail,
};
