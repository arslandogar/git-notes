import { FC } from 'react';

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
