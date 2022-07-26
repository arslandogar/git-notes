import { usePublicGistsQuery } from '@/features/gist/gistAPI';
import { useAppSelector } from '@/store';

export const useFilteredGists = (page: number) => {
  const searchValue = useAppSelector((state) => state.gistSearch.value);
  const { data } = usePublicGistsQuery(page);

  return data?.filter((gist) => {
    const { id, description } = gist;
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return (
      id.toLowerCase().includes(lowerCaseSearchValue) ||
      (description && description.toLowerCase().includes(lowerCaseSearchValue))
    );
  });
};
