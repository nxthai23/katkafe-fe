import { API_TASK } from "@/constants/api-url";
import axios from "axios";

export const getTasks = async () => {
  const response = await axios.get(`${API_TASK}`);
  return response.data;
};
