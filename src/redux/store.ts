import { tasksApi } from '@/features/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filterSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
