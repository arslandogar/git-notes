import { store } from '@/redux';

import { authReducer, login, logout } from '../authSlice';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as any)).toEqual({
      isAuthenticated: false,
      status: 'idle',
    });
  });

  it('should handle login', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ token: 'token' }) })
        ) as jest.Mock
      );

    await store.dispatch(login('code'));
    expect(store.getState().auth).toEqual({
      isAuthenticated: true,
      status: 'idle',
    });
  });

  it('should handle logout', () => {
    expect(authReducer(undefined, logout())).toEqual({
      isAuthenticated: false,
      status: 'idle',
    });
  });
});
