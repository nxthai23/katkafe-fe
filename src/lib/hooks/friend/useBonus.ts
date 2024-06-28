"use client";
import { getBonuses } from "@/requests/bonus";
import { useBonusStore } from "../../../stores/friend/bonusStore";
import { useLoadingStore } from "@/stores/LoadingStore";

export const useFetchBonuses = () => {
  const [setBonuses] = useBonusStore((state) => [state.setBonuses]);
  const [show, hide] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const fetchBonuses = async () => {
    try {
      show()
      const response = await getBonuses();
      setBonuses(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide()
    }
  };

  return {
    fetchBonuses,
  };
};
