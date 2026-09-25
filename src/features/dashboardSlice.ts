import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import {
  getDonorDashboard,
  getDonorProfile,
} from "../api/dashboardApi";

import type {
  DonorDashboardResponse,
  DonorProfileResponse,
} from "../types/dashboard";

interface DashboardState {
  data: DonorDashboardResponse | null;
  profile: DonorProfileResponse | null;
  loading: boolean;
  profileLoading: boolean;
  error: string | null;
  profileError: string | null;
}

const initialState: DashboardState = {
  data: null,
  profile: null,
  loading: false,
  profileLoading: false,
  error: null,
  profileError: null,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ detail?: string }>(error)) {
    return error.response?.data?.detail || error.message || fallback;
  }

  return error instanceof Error ? error.message : fallback;
};

export const fetchDashboard = createAsyncThunk<
  DonorDashboardResponse,
  void,
  { rejectValue: string }
>("dashboard/fetchDashboard", async (_, thunkAPI) => {
  try {
    return await getDonorDashboard();
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error, "Failed to load dashboard"));
  }
});

export const fetchDonorProfile = createAsyncThunk<
  DonorProfileResponse,
  void,
  { rejectValue: string }
>("dashboard/fetchDonorProfile", async (_, thunkAPI) => {
  try {
    return await getDonorProfile();
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error, "Failed to load profile"));
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboard(state) {
      state.data = null;
      state.profile = null;
      state.error = null;
      state.profileError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchDashboard.fulfilled,
        (state, action: PayloadAction<DonorDashboardResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Unable to load dashboard";
      })

      // Profile
      .addCase(fetchDonorProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })

      .addCase(
        fetchDonorProfile.fulfilled,
        (
          state,
          action: PayloadAction<DonorProfileResponse>
        ) => {
          state.profileLoading = false;
          state.profile = action.payload;
        }
      )

      .addCase(fetchDonorProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError =
          action.payload || "Unable to load profile";
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
