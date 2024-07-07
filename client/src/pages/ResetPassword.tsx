import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { IJoinInfo, JoinStyle } from "@/pages/Join";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { resetPassword, resetRequest } from "@/api/auth.api";
import { useAlert } from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [isRequestResetPassword, setIsRequestResetPassword] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinInfo>();

  const handleRequestRestPassword = (data: IJoinInfo) => {
    if (isRequestResetPassword) {
      // 초기화
      resetPassword(data).then(() => {
        showAlert("비밀번호가 초기화 되었습니다.");
        navigate("/login");
      });
    } else {
      // 초기화 요청
      resetRequest(data).then(() => setIsRequestResetPassword(true));
    }
  };

  return (
    <JoinStyle>
      <form onSubmit={handleSubmit(handleRequestRestPassword)}>
        <fieldset>
          <InputText
            inputType="text"
            placeholder="비밀번호 초기화할 이메일을 입력해주세요"
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
        {isRequestResetPassword && (
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
        )}
        <fieldset>
          <Button type="submit" size="medium" schema="primary">
            {isRequestResetPassword ? "비밀번호 초기화" : "초기화 요청"}
          </Button>
        </fieldset>
      </form>
    </JoinStyle>
  );
};

export default ResetPassword;
