import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer.js';
import eventsReducer from './eventReducer.js';

const store = configureStore({ reducer: {
    users: userReducer,
    events: eventsReducer
} });

export default store;