"use client";
import { getUser } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";
import userData from "@/mock-data/user.json";

export const useFetchUser = () => {
  const [setUser] = useUserStore((state) => [state.setUser]);

  const fetchUser = async () => {
    try {
      // const response = await getUser();
      setUser(userData.user);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchUser,
  };
};
