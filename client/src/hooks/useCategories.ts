import { useEffect, useState } from "react";
import { fetchCategory } from "../api/categories.api";
import { ICategory } from "../models/categories.model";
import { useLocation } from "react-router-dom";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const location = useLocation();

  const setActive = () => {
    const params = new URLSearchParams(location.search);

    if (params.get("categoryId")) {
      setCategories((prev) => {
        return prev.map((category) => {
          return {
            ...category,
            isActive: category.categoryId === Number(params.get("categoryId")),
          };
        });
      });
    } else {
      setCategories((prev) => {
        return prev.map((category) => {
          return {
            ...category,
            isActive: false,
          };
        });
      });
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;

      // 전체 카테고리 추가
      const categoriesWithAll = [
        {
          categoryId: null,
          categoryName: "전체",
        },
        ...category,
      ];
      setCategories(categoriesWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { categories };
};
