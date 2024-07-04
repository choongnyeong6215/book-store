import { ICategory } from "../models/categories.model";
import { httpClient } from "./https";

export const fetchCategory = async () => {
  const response = await httpClient.get<ICategory[]>("/categories");

  return response.data;
};
