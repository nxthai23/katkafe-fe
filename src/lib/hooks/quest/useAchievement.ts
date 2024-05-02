import { getAchievements } from "@/requests/quest/achievement";
import { useAchievementStore } from "@/stores/quest/achievementStore";

export const useFetchAchievements = () => {
  const [setAchievements] = useAchievementStore((state) => [
    state.setAchievements,
  ]);

  const fetchAchievements = async () => {
    try {
      const response = await getAchievements();
      setAchievements(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchAchievements,
  };
};
