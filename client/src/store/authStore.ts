import { create } from "zustand";

interface ISoreState {
  isLogin: boolean;
  storeLogin: (token: string) => void;
  storeLogOut: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");

  return token;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create<ISoreState>((set) => ({
  isLogin: getToken() ? true : false,
  storeLogin: (token: string) => {
    set({ isLogin: true });
    setToken(token);
  },
  storeLogOut: () => {
    set({ isLogin: false });
    removeToken();
  },
}));
