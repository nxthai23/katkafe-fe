import { API_CATDEAL } from "@/constants/api-url";
import axios from "axios";

export const getCatDeals = async () => {
    const response = await axios.get(`${API_CATDEAL}`);
    return response.data;
};
