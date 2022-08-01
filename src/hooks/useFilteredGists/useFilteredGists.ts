import { useAppSelector } from '@/redux';
import { Gist } from '@/redux/apis/githubAPI/types';

export const useFilteredGists = (data?: Gist[]) => {
  const searchValue = useAppSelector((state) => state.gistSearch.value);

  if (data === undefined) {
    return [];
  }

  return data.filter((gist) => {
    const { id, description } = gist;
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return (
      id.toLowerCase().includes(lowerCaseSearchValue) ||
      (description && description.toLowerCase().includes(lowerCaseSearchValue))
    );
  });
};
