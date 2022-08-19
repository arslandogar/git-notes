import { FC } from 'react';

import { useStarGistMutation, useUnStarGistMutation, useIsStarredGistQuery } from '@/redux/apis';

import { IconButton } from './iconButton';

interface Props {
  /**
   * Gist to star (or unstar if it's already starred)
   */
  gistId: string;
  /**
   * Color of the button
   * @default 'primary'
   */
  color?: 'primary' | 'blue';
  /**
   * If true, the button will have the text "Star"
   */
  showText?: boolean;
}

/**
 * A button that stars a gist (or unstars it if it's already starred)
 */
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
