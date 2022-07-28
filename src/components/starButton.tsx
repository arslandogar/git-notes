import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useStarGistMutation, useIsStarredGistQuery } from '@/features/api/githubAPI';

import { IconButton } from './iconButton';

interface Props {
  gistId: string;
  color?: 'primary' | 'blue';
  showText?: boolean;
}

export const StarButton: FC<Props> = ({ gistId, color, showText }) => {
  const [starGist, starGistResult] = useStarGistMutation();
  const { data } = useIsStarredGistQuery(gistId);

  useEffect(() => {
    console.log(starGistResult);
    if (starGistResult.isSuccess) {
      toast.success('Gist starred successfully');
    }
    if (starGistResult.isError) {
      toast.error('Failed to star gist');
    }
  }, [starGistResult]);

  return (
    <IconButton
      onClick={() => {
        starGist(gistId);
      }}
      icon={`fa-${data ? 'solid' : 'regular'} fa-star`}
      color={color}
      text={showText ? 'Star' : undefined}
      isLoading={starGistResult.isLoading}
    />
  );
};
