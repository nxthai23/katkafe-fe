import { API_RANK } from "@/constants/api-url";
import { Rank } from "@/types/rank";
import axios from "axios";

export const getRanks = async () => {
  const response = await axios.get(`${API_RANK}`);
  return response.data;
};
