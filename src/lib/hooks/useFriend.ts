"use client";
import { getFriends } from "@/requests/friend";
import { useFriendStore } from "@/stores/friendStore";

export const useFetchFriends = () => {
  const [setFriends] = useFriendStore((state) => [state.setFriends]);

  const fetchFriends = async () => {
    try {
      const response = await getFriends();
      setFriends(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchFriends,
  };
};
