// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state: { isLoading: boolean; }) => {
            state.isLoading = true;
        },
        loginSuccess: (state: { token: string; isLoading: boolean; error: null; }, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state: { error: string; isLoading: boolean; }, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.token = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const login = (email: string, password: string) => async (dispatch: any) => {
    dispatch(loginStart());
    try {
        const response = await axios.post('http://localhost:8080/jwt', { email, password });
        dispatch(loginSuccess(response.data.token));
    } catch (error: Error) {
        dispatch(loginFailure(error.response.data.message));
    }
};
