import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { githubAPI } from '@/features/api/githubAPI';
import authReducer from '@/features/auth/authSlice';
import { gistAPI } from '@/features/gist/gistAPI';
import gistSearchReducer from '@/features/gistSearch/gistSearchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gistSearch: gistSearchReducer,
    [gistAPI.reducerPath]: gistAPI.reducer,
    [githubAPI.reducerPath]: githubAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gistAPI.middleware).concat(githubAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
