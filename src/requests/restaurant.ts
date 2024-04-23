import { API_RESTAURANT } from "@/constants/api-url";
import axios from "axios";

export const getRestaurant = async () => {
    const response = await axios.get(`${API_RESTAURANT}`);
    return response.data;
};
