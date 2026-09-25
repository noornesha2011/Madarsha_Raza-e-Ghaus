import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
interface Donor {
    id: number;
    name: string;
    email: string;
    monthly_amount: number;
}
interface authState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    donor: Donor | null;
}
const initialState: authState = {
    isAuthenticated: Boolean(
        localStorage.getItem("access_token")
    ),
    loading: false,
    error: null,
    donor: null
}
const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginSuccess: (state, action: PayloadAction<Donor>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.donor = action.payload;
            state.error = null;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.donor = null;
            state.error = null;
        }
    }
})
export const {
    loginStart,
    loginFailure,
    loginSuccess,
    logout,
} = authSlice.actions;
export default authSlice.reducer;
