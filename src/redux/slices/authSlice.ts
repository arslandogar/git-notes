import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import storage from '@/utils/storage';

interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  isAuthenticated: !!storage.getToken(),
  status: 'idle',
};

export const login = createAsyncThunk('auth/login', async (code: string) => {
  const response = await fetch(`http://localhost:9999/authenticate/${code}`);
  const { token } = await response.json();
  if (token) {
    storage.setToken(token);
    return true;
  }
  return Promise.reject(false);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      storage.clearToken();
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.status = 'idle';
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { reducer: authReducer } = authSlice;

export const { logout } = authSlice.actions;
