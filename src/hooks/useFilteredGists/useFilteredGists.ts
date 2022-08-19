import { useAppSelector } from '@/redux';
import { Gist } from '@/redux/apis/githubAPI/types';

/**
 * Takes a list of gists and filters them based on the search term in the gistSearch state
 * @param data the list of gists to filter
 * @returns the filtered list of gists
 */
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
