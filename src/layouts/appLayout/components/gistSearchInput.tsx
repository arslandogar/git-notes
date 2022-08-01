import { useAppDispatch, useAppSelector } from '@/redux';
import { setValue } from '@/redux/slices';

export const GistSearchInput = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.gistSearch.value);

  return (
    <div className="form-control">
      <div className="relative">
        <input
          type="text"
          id="searchGists"
          className="input bg-primary placeholder-white text-white border-white md:input-lg"
          placeholder="Search Notes..."
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
          required
        />
        <div className="flex absolute inset-y-0 right-4 items-center pl-3 pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </div>
      </div>
    </div>
  );
};
