import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { gistAPI } from '@/features/gist/gistAPI';
import gistSearchReducer from '@/features/gistSearch/gistSearchSlice';

export const store = configureStore({
  reducer: {
    gistSearch: gistSearchReducer,
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
