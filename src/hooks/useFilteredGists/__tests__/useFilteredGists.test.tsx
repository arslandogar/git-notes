import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { MOCK_GISTS } from '@/__mocks__/responses';
import { store } from '@/redux';
import { setValue } from '@/redux/slices';

import { useFilteredGists } from '../useFilteredGists';

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

describe('useFilteredGists', () => {
  beforeEach(() => {
    store.dispatch(setValue(''));
  });

  it('should return empty array when no gists', () => {
    const { result } = renderHook(() => useFilteredGists(), {
      wrapper: ReduxProvider,
    });
    expect(result.current).toEqual([]);
  });

  it('should return all gists when search value is empty', () => {
    const { result } = renderHook(() => useFilteredGists(MOCK_GISTS), {
      wrapper: ReduxProvider,
    });
    expect(result.current.length).toEqual(MOCK_GISTS.length);
  });

  it('should return empty array when no gists are not found matching the search', () => {
    store.dispatch(setValue('not-found'));
    const { result } = renderHook(() => useFilteredGists(MOCK_GISTS), {
      wrapper: ReduxProvider,
    });
    expect(result.current).toEqual([]);
  });

  it('should return gists matching the search', () => {
    store.dispatch(setValue('An example of Apache Calcite using HSQLDB'));
    const { result } = renderHook(() => useFilteredGists(MOCK_GISTS), {
      wrapper: ReduxProvider,
    });
    expect(result.current.length).toEqual(1);
  });

  it('should ignore case when searching for gists', () => {
    store.dispatch(setValue('an example of apache calcite using hsqldb'));
    const { result } = renderHook(() => useFilteredGists(MOCK_GISTS), {
      wrapper: ReduxProvider,
    });
    expect(result.current.length).toEqual(1);
  });
});
