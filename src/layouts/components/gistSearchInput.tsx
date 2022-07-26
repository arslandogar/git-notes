import { Input } from '@/components';
import { setValue } from '@/features/gistSearch/gistSearchSlice';
import { useAppDispatch, useAppSelector } from '@/store';

export const GistSearchInput = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.gistSearch.value);

  return (
    <div className="form-control">
      <Input
        value={value}
        onChange={(val) => dispatch(setValue(val))}
        placeholder="Search Notes..."
        rightIcon="text-white fa-solid fa-bars"
      />
    </div>
  );
};
