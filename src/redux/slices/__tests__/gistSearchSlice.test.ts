import { gistSearchReducer, setValue } from '../gistSearchSlice';

describe('gistSearchSlice', () => {
  it('should return the initial state', () => {
    expect(gistSearchReducer(undefined, {} as any)).toEqual({
      value: '',
    });
  });

  it('should handle setValue', () => {
    expect(gistSearchReducer(undefined, setValue('test'))).toEqual({
      value: 'test',
    });
  });
});
