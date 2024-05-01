import { UserType } from "@/types/user";
import { create } from "zustand";

type User = {
  user: UserType;
};

type Actions = {
  setUser: (user: UserType) => void;
};

const defaultUser = {
  user: {
    id: "",
    name: "",
    imageUrl: "",
    balance: "",
    rank: "",
    guildId: "",
  },
};

export const useUserStore = create<User & Actions>((set, get) => ({
  ...defaultUser,
  setUser: (user: UserType) => {
    set({
      user,
    });
  },
}));
