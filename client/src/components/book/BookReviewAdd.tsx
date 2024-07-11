import { TBookReviewItemWrite } from "@/models/reviews.model";
import Button from "@components/common/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IBookReviewAddProps {
  onAdd: (data: TBookReviewItemWrite) => void;
}

const BookReviewAdd = ({ onAdd }: IBookReviewAddProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBookReviewItemWrite>();

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea
            {...register("content", { required: "리뷰 내용을 입력해주세요" })}
          ></textarea>
          {errors.content && (
            <p className="error-text">{errors.content.message}</p>
          )}
        </fieldset>
        <div className="submit">
          <fieldset>
            <select
              {...register("score", { required: true, valueAsNumber: true })}
            >
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>
          </fieldset>
          <Button size="medium" schema="primary">
            작성하기
          </Button>
        </div>
      </form>
    </BookReviewAddStyle>
  );
};

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 12px;
      flex-direction: column;
      justify-content: end;

      .error-text {
        color: red;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      resize: none;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border-radius: ${({ theme }) => theme.color.border};
      padding: 12px;
    }

    .submit {
      display: flex;
      justify-content: end;
      gap: 12px;
    }
  }
`;

export default BookReviewAdd;
