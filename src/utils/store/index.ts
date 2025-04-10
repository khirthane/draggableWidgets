// store.ts
import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './slices/widgetSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
