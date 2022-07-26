import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GistSearchState {
  value: string;
}

const initialState: GistSearchState = {
  value: '',
};

export const gistSearchSlice = createSlice({
  name: 'gistSearch',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = gistSearchSlice.actions;

export default gistSearchSlice.reducer;
