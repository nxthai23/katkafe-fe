"use client";
import { getFriends } from "@/requests/friend";
import { useFriendStore } from "@/stores/friend/friendStore";
import friendsData from "@/mock-data/friends.json";

export const useFetchFriends = () => {
  const [setFriends] = useFriendStore((state) => [state.setFriends]);

  const fetchFriends = async () => {
    try {
      // const response = await getFriends();
      setFriends(friendsData.friends);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchFriends,
  };
};
