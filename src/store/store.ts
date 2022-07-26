import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '@/features/counter/counterSlice';
import { gistAPI } from '@/features/gist/gistAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [gistAPI.reducerPath]: gistAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gistAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
