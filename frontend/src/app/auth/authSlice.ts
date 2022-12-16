import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../utils/types';
import { RootState } from '../store';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as User | null
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
