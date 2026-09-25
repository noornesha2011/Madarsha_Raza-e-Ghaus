import api from "./axios";

export type RegisterPayload = {
  name: string;
  email: string;
  mobile: string;
  monthly_amount: string;
  password: string;
  address: string;
};

type RegisterResponse = {
  message?: string;
  detail?: string;
  donor_id?: number;
};

export type LoginPayload = {
  donor_id: number;
  password: string;
};

export type LoginResponse = {
  access_token?: string;
  token?: string;
  donor?: {
    id: number;
    name: string;
    email?: string;
    monthly_amount?: number;
  };
};

export async function registerDonor(payload: RegisterPayload) {
  const response = await api.post<RegisterResponse>("/auth/register", payload);
  return response.data;
}

export async function loginDonor(payload: LoginPayload) {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
}
