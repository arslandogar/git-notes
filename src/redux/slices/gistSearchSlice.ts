import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GistSearchState {
  value: string;
}

const initialState: GistSearchState = {
  value: '',
};

const gistSearchSlice = createSlice({
  name: 'gistSearch',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { reducer: gistSearchReducer } = gistSearchSlice;
export const { setValue } = gistSearchSlice.actions;
