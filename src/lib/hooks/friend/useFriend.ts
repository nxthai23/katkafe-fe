"use client";
import { getFriendList } from "@/requests/friend";
import { useFriendStore } from "@/stores/friend/friendStore";
import { FriendListResponse } from "@/types/friend";
import { useEffect, useState } from "react";

export const useFetchFriends = () => {
  const [friends, setFriends] = useState<FriendListResponse>();

  const fetchFriends = async () => {
    try {
      const response = await getFriendList();
      setFriends(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return { friends, fetchFriends };
};
