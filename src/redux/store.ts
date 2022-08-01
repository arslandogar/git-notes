import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { githubAPI } from './apis';
import { authReducer, gistSearchReducer } from './slices';

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
