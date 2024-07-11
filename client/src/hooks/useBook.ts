import { useEffect, useState } from "react";
import { IBookDetail } from "@/models/books.model";
import { fetchBook, likeddBook, unlikeddBook } from "@/api/books.api";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "@/hooks/useAlert";
import { addCartItems } from "@/api/cartItems.api";
import { IBookReviewItem, TBookReviewItemWrite } from "@/models/reviews.model";
import { addBookReview, fetchBookReview } from "@/api/reviews.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<IBookReviewItem[]>([]);
  const { isLogin } = useAuthStore();
  const { showAlert } = useAlert();

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

    // 로그인 체크
    if (!isLogin) {
      showAlert("로그인이 필요합니다.");
      return;
    }

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

    fetchBook(bookId).then((book) => {
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

  const addReview = (data: TBookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReviews(reviews);
      // });

      showAlert(res?.message);
    });
  };

  return { book, likeToggle, addCart, cartAdded, reviews, addReview };
};
