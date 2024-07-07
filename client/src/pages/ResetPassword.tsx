import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { IJoinInfo, JoinStyle } from "@/pages/Join";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

const ResetPassword = () => {
  const {
    isRequestResetPassword,
    userResetPassword,
    userResetRequestPassword,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinInfo>();

  const handleRequestRestPassword = (data: IJoinInfo) => {
    isRequestResetPassword
      ? userResetPassword(data)
      : userResetRequestPassword(data);
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
