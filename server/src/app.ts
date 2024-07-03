import express, { Application } from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router";
import categoriesRouter from "./routes/categories.router";
import booksRouter from "./routes/books.router";
import likesRouter from "./routes/likes.router";
import cartItemsRouter from "./routes/cartItems.router";
import orderRouter from "./routes/orders.router";
import { CorsOptions } from "cors";
import cors from "cors";

dotenv.config();

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// body-parsing
app.use(express.json());

// cors
app.use(cors(corsOptions));

// route handler
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/books", booksRouter);
app.use("/likes", likesRouter);
app.use("/carts", cartItemsRouter);
app.use("/orders", orderRouter);

app.listen(process.env.BASE_PORT || 8080, () =>
  console.log(`book-store is running on ${process.env.BASE_PORT} port`)
);
