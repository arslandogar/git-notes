import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { githubAPI } from '@/features/api/githubAPI';
import authReducer from '@/features/auth/authSlice';
import gistSearchReducer from '@/features/gistSearch/gistSearchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gistSearch: gistSearchReducer,
    [githubAPI.reducerPath]: githubAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
