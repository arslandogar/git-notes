import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import {
  useStarGistMutation,
  useUnStarGistMutation,
  useIsStarredGistQuery,
} from '@/features/api/githubAPI';

import { IconButton } from './iconButton';

interface Props {
  gistId: string;
  color?: 'primary' | 'blue';
  showText?: boolean;
}

export const StarButton: FC<Props> = ({ gistId, color, showText }) => {
  const [starGist, starGistResult] = useStarGistMutation();
  const [unStarGist, unStarGistResult] = useUnStarGistMutation();
  const { data } = useIsStarredGistQuery(gistId);

  // console.log('start data', data);

  useEffect(() => {
    const { isSuccess, isError } = starGistResult;
    if (isSuccess) {
      toast.success('Gist starred successfully');
    }
    if (isError) {
      toast.error('Failed to star gist');
    }
  }, [starGistResult]);

  useEffect(() => {
    const { isSuccess, isError } = unStarGistResult;
    if (isSuccess) {
      toast.success('Gist unstarred successfully');
    }
    if (isError) {
      toast.error('Failed to unstar gist');
    }
  }, [unStarGistResult]);

  const isLoading = starGistResult.isLoading || unStarGistResult.isLoading;

  return (
    <IconButton
      onClick={() => {
        data ? unStarGist(gistId) : starGist(gistId);
      }}
      icon={`fa-${data ? 'solid' : 'regular'} fa-star`}
      color={color}
      text={showText ? 'Star' : undefined}
      isLoading={isLoading}
    />
  );
};
