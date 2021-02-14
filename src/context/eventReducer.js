import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        value: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.value = action.payload;
        },
        clearEvents: (state) => {
            state.value = [];
        }
    }
})

export const { setEvents, clearEvents } = eventsSlice.actions;

export const selectEvents = state => state.events.value;

export default eventsSlice.reducer;