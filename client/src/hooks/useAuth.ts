import { login, resetPassword, resetRequest, signUp } from "@/api/auth.api";
import { IJoinInfo } from "@/pages/Join";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();
  const [isRequestResetPassword, setIsRequestResetPassword] = useState(false);

  const userLogin = (data: IJoinInfo) => {
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

  const userSignup = (data: IJoinInfo) => {
    signUp(data).then(() => {
      showAlert(`${data.email.split("@")[0]}님 안녕하세요!`);

      navigate("/login");
    });
  };

  const userResetPassword = (data: IJoinInfo) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화 되었습니다.");
      navigate("/login");
    });
  };

  const userResetRequestPassword = (data: IJoinInfo) => {
    resetRequest(data).then(() => setIsRequestResetPassword(true));
  };

  return {
    userLogin,
    userSignup,
    isRequestResetPassword,
    userResetPassword,
    userResetRequestPassword,
  };
};
