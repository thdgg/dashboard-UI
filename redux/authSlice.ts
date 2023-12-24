import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../config.ts";

const { BASE_URL, SECURITY_PORT, usePort } = config;
const composedUrl:string = usePort ?  `${BASE_URL}:${SECURITY_PORT}` : `${BASE_URL}`;
interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    status: 'idle',
    error: null,
};

export const authenticate = createAsyncThunk(
    'auth/authenticate',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const authString = btoa(`${email}:${password}`);
            const response = await axios.get(composedUrl + "/jwt", {
                headers: {
                    Authorization: `Basic ${authString}`,
                    "Content-Type": "application/json"
                },
            });
            console.log(response.data);
            return response.data; // The expected response is a JWT token
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authenticate.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token; // Update this path according to your API response
        });
        builder.addCase(authenticate.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
        });
    },
});

export default authSlice.reducer;
