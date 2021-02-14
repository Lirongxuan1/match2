import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        clearUser: (state) => {
            state.value = null;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = state => state.users.value;

export default userSlice.reducer;