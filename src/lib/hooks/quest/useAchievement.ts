import { getAchievements } from "@/requests/quest/achievement";
import { useAchievementStore } from "@/stores/quest/achievementStore";
import achievementsData from "@/mock-data/achievements.json";

export const useFetchAchievements = () => {
  const [setAchievements] = useAchievementStore((state) => [
    state.setAchievements,
  ]);

  const fetchAchievements = async () => {
    try {
      // const response = await getAchievements();
      setAchievements(achievementsData.achievements);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchAchievements,
  };
};
