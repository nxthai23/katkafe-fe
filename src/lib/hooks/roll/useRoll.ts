import { getRolls } from "@/requests/roll";
import { useRollStore } from "../../../stores/roll/rollStore";
import rollsData from "@/mock-data/rolls.json";

export const useFetchRolls = () => {
  const [setRolls] = useRollStore((state) => [state.setRolls]);

  const fetchRolls = async () => {
    try {
      // const response = await getRolls();
      setRolls(rollsData.rolls);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRolls,
  };
};
