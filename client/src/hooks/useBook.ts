import { useEffect, useState } from "react";
import { IBookDetail } from "../models/books.model";
import { fetchBook, likeddBook, unlikeddBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCartItems } from "../api/cartItems.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const { isLogin } = useAuthStore();
  const showAlert = useAlert();
  const [cartAdded, setCartAdded] = useState(false);

  const likeToggle = () => {
    // 로그인 체크
    if (!isLogin) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) return;

    if (book.liked === 1) {
      unlikeddBook(book.id).then(() => {
        setBook({
          ...book,
          liked: 0,
          likes: book.likes - 1,
        });
      });
    } else {
      likeddBook(book.id).then(() => {
        setBook({
          ...book,
          liked: 1,
          likes: book.likes + 1,
        });
      });
    }
  };

  const addCart = (quantity: number) => {
    if (!book) return;

    addCartItems({
      bookId: book.id,
      quantity,
    }).then(() => {
      setCartAdded(true);

      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    const bookDetail = fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  return { book, likeToggle, addCart, cartAdded };
};
