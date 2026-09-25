import axios from "axios";
import type { Member } from "../types/members";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMembers = async (): Promise<Member[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/members`
  );

  return response.data;
};