import { getAchievements } from "@/requests/quest/achievement";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useAchievementStore } from "@/stores/quest/achievementStore";

export const useFetchAchievements = () => {
  const [setAchievements] = useAchievementStore((state) => [
    state.setAchievements,
  ]);
  const [show, hide] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const fetchAchievements = async () => {
    try {
      show()
      const response = await getAchievements();
      setAchievements(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide()
    }
  };

  return {
    fetchAchievements,
  };
};
