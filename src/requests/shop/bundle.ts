import { API_BUNDLE, BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";
import axios from "axios";

export const getBundles = async () => {
  const response = await axios.get(`${API_BUNDLE}`);
  return response.data;
};
