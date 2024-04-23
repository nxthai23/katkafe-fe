import { API_STAFF } from "@/constants/api-url";
import { Staff } from "@/types/common-types";
import axios from "axios";

export const getStaffs = async () => {
    const response = await axios.get<Staff[]>(`${API_STAFF}`);
    return response.data;
};

export const getOneStaff = async (id: number) => {
    const response = await axios.get(`${API_STAFF}/${id}`);
    return response.data;
};

export const deleteOneStaff = async (id: number) => {
    const response = await axios.delete(`${API_STAFF}/${id}`);
    return response.data;
};
