import styled from "styled-components";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";

export interface IJoinInfo {
  email: string;
  password: string;
}

const Join = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinInfo>();

  const handleJoin = (data: IJoinInfo) => {
    signUp(data).then(() => {
      // 성공
      showAlert(`${data.email.split("@")[0]}님 안녕하세요!`);

      navigate("/login");
    });
  };

  return (
    <JoinStyle>
      <form onSubmit={handleSubmit(handleJoin)}>
        <fieldset>
          <InputText
            inputType="email"
            placeholder="아이디"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 형식을 입력해주세요.",
              },
            })}
          />
          {errors.email && (
            <p className="error-text">{errors.email?.message}</p>
          )}
        </fieldset>
        <fieldset>
          <InputText
            inputType="password"
            placeholder="패스워드"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 3,
                message: "비밀번호는 최소 3자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <p className="error-text">{errors.password?.message}</p>
          )}
        </fieldset>
        <fieldset>
          <Button type="submit" size="medium" schema="primary">
            회원가입
          </Button>
        </fieldset>
      </form>
    </JoinStyle>
  );
};

export const JoinStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: none;
    padding: 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 10px 0;
  }
`;

export default Join;
