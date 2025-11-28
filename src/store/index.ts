import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import announcementsReducer from './slices/announcementsSlice';
import bookingsReducer from './slices/bookingsSlice';
import forumReducer from './slices/forumSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    announcements: announcementsReducer,
    bookings: bookingsReducer,
    forum: forumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
