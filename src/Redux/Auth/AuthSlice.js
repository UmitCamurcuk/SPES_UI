import { createSlice } from '@reduxjs/toolkit';
import { saveStateToLocalStorage } from '../../Storage/Localstorage';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            // action.payload, action creator'a geçirilen parametre
            state.user = action.payload;
            saveStateToLocalStorage('token', action.payload.token);
            saveStateToLocalStorage('user', action.payload.userInfo);
        },
        logout: (state) => {
            saveStateToLocalStorage('token', null);
            saveStateToLocalStorage('user', null);
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;