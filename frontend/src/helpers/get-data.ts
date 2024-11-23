import { apiClient } from "../services/apiClient"

export const getProfileDetails = async () => {
    const endPoint = "/api/v1/user/profile-details";
    const res = await apiClient.get(endPoint);
    return res.data;
}