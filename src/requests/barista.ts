import { API_BARISTA } from "@/constants/api-url";
import axios from "axios";

export const getBaristas = async () => {
  const response = await axios.get(`${API_BARISTA}`);
  return response.data;
};
