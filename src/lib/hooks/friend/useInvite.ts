("use client");
import { getInvites } from "@/requests/invite";
import { useInviteStore } from "../../../stores/friend/InviteStore";

export const useFetchInvites = () => {
  const [setInvites] = useInviteStore((state) => [state.setInvites]);

  const fetchInvites = async () => {
    try {
      const response = await getInvites();
      setInvites(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchInvites,
  };
};
