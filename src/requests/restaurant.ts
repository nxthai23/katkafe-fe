import { API_RESTAURANT } from "@/constants/api-url";
import axios from "axios";

export const getRestaurant = async () => {
    const response = await axios.get(`${API_RESTAURANT}`);
    return response.data;
};

export const deleteOneStaffOfRestaurant = async (id: number) => {
    const response = await axios.delete(`${API_RESTAURANT}/staff/${id}`);
    return response.data;
};
