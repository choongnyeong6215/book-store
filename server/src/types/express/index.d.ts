import { IBookResponse, IPagination } from "../../models/books.model";
import { IPayload } from "../jwt";

declare module "express" {
  interface Request {
    payload?: IPayload;
  }
  interface Response {
    books?: IBookResponse[];
    pagination?: IPagination;
  }
}
