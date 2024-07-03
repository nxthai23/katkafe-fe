import { getUserBoosts } from "@/requests/boost/user-boost";
import { useUserBoostsStore } from "@/stores/boost/userBoostsStore";

export const useFetchUserBoosts = () => {
  const [setUserBoosts] = useUserBoostsStore((state) => [state.setUserBoosts]);

  const fetchUserBoosts = async () => {
    try {
      const response = await getUserBoosts();
      setUserBoosts(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchUserBoosts,
  };
};
