import { API_STAFF } from "@/constants/api-url";
import axios from "axios";

export const getStaff = async () => {
    const response = await axios.get(`${API_STAFF}`);
    return response.data;
};

export const getOneStaff = async (id: number) => {
    const response = await axios.get(`${API_STAFF}/${id}`);
    return response.data;
};
