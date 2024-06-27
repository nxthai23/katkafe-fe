import { claimReferralRankReward, getRanks } from "@/requests/rank";
import { useRankStore } from "@/stores/rank/rankStore";
import { ClaimReferralRankRewardRequest } from "@/types/friend";

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

  const claimRankReward = async (body: ClaimReferralRankRewardRequest) => {
    try {
      const response = await claimReferralRankReward(body);
      return response;
    } catch (error) {
      console.error("Error claiming", error);
    }
  };

  return {
    fetchRanks,
    claimRankReward,
  };
};
