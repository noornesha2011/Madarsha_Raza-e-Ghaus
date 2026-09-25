import api from "./axios";
import type {
  DonorDashboardResponse,
  DonorProfileResponse,
} from "../types/dashboard";

export const getDonorDashboard = async () => {
  const token = localStorage.getItem("access_token");

  const response = await api.get<DonorDashboardResponse>(
    "/donor/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDonorProfile = async (): Promise<DonorProfileResponse> => {
  const response = await api.get<DonorProfileResponse>(
    "/donors/profile"
  );

  return response.data;
};
