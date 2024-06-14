import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";
import { BuyBody, Item } from "@/types/item";

export const getItems = async () => {
  const response = await katAxios.get<Item[]>(`${BASE_URL}/shops`);
  return response.data;
};

export const buyItem = async (body: BuyBody) => {
  const response = await katAxios.post(`${BASE_URL}/shops/buy-item`, body);
  return response.data;
};
