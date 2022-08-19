import { FC } from 'react';

import { useForkGistMutation, useCountForksQuery } from '@/redux/apis';

import { IconButton } from './iconButton';

interface Props {
  /**
   * Gist to fork
   */
  gistId: string;
  /**
   * Color of the button
   * @default 'primary'
   */
  color?: 'primary' | 'blue';
  /**
   * If true, the button will have the text "Fork"
   */
  showText?: boolean;
}

/**
 * A button that forks a gist and displays the number of forks
 */
export const ForkButton: FC<Props> = ({ color = 'primary', showText, gistId }) => {
  const { data: countForks } = useCountForksQuery(gistId);
  const [forkGist, forkGistResult] = useForkGistMutation();

  return (
    <IconButton
      onClick={() => {
        forkGist(gistId);
      }}
      icon="fas fa-code-fork"
      color={color}
      text={showText ? `Fork` : undefined}
      count={countForks}
      isLoading={forkGistResult.isLoading}
    />
  );
};
