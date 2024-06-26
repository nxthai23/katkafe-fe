import { getRanks } from "@/requests/rank";
import { useRankStore } from "@/stores/rank/rankStore";

export const useFetchRanks = () => {
  const [setRanks, setCurrentRank, setTotalUsers] = useRankStore((state) => [
    state.setRanks,
    state.setCurrentRank,
    state.setTotalUsers,
  ]);

  const fetchRanks = async () => {
    try {
      const response = await getRanks();
      console.log("response", response);
      setRanks(response.topUsers);
      setCurrentRank(response.userRank[0]);
      setTotalUsers(response.totalUsers);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRanks,
  };
};
