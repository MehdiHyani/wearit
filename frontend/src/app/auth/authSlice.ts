import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload;
            state.user = user;
        },
        logout: (state) => {
            state.user = null;
            return state;
        }
    }
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
