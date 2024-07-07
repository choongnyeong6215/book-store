import { IJoinInfo, JoinStyle } from "./Join";
import InputText from "@/components/common/InputText";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { login } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { storeLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinInfo>();

  const handleLogin = (data: IJoinInfo) => {
    login(data).then(
      (response) => {
        // 로그인 정보 저장
        storeLogin(response.token);

        showAlert(`${data.email.split("@")[0]}님 안녕하세요!`);
        navigate("/");
      },
      (error) => {
        showAlert("아이디, 비밀번호를 다시 확인해주세요.");
      }
    );
  };

  return (
    <JoinStyle>
      <form onSubmit={handleSubmit(handleLogin)}>
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
            로그인
          </Button>
        </fieldset>
        <div className="info">
          <Link to="/reset">비밀번호 초기화</Link>
        </div>
      </form>
    </JoinStyle>
  );
};

export default Login;
