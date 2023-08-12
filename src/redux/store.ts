import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './api/bookApi';
import { userApi } from './api/userApi';
import bookReducer from './features/bookSlice';
import userReducer from './features/userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
