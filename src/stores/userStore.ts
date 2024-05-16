import { postLogin } from "@/requests/login";
import { UserType } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa kiểu State và Actions
type State = {
  jwt: string | null;
  user: UserType | null;
};

type Actions = {
  login: (body: any) => Promise<void>;
  clear: () => void;
  setUser: (user: UserType | null) => void;
};

// Khởi tạo giá trị mặc định cho state
const defaultStates: State = {
  jwt: null,
  user: null,
};

// Tạo store sử dụng Zustand
export const useUserStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...defaultStates,
      login: async (body) => {
        const response = await postLogin(body);
        if (!response) {
          return;
        }
        set({
          jwt: response.jwt,
          user: response.user,
        });
        return response.user;
      },
      clear: () => {
        set(defaultStates);
      },
      setUser: (user) => set({ user }),
    }),
    { name: "userStore" }
  )
);
