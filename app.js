const express = require("express");
const app = express();
const uesrRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const categoryRouter = require("./routes/categories");
const likeRouter = require("./routes/likes");
const cartRouter = require("./routes/carts");
const orderRouter = require("./routes/orders");
require("dotenv").config();

app.use(express.json());
app.use("/users", uesrRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`server is running on ${process.env.PORT} port`)
);
