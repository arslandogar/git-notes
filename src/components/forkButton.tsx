import { FC } from 'react';

import { useForkGistMutation, useCountForksQuery } from '@/redux/apis';

import { IconButton } from './iconButton';

interface Props {
  gistId: string;
  color?: 'primary' | 'blue';
  showText?: boolean;
}

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
