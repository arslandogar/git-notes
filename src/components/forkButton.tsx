import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useForkGistMutation } from '@/features/api/githubAPI';

import { IconButton } from './iconButton';

interface Props {
  gistId: string;
  color?: 'primary' | 'blue';
  showText?: boolean;
}

export const ForkButton: FC<Props> = ({ color = 'primary', showText, gistId }) => {
  const [forkGist, forkGistResult] = useForkGistMutation();

  useEffect(() => {
    if (forkGistResult.isSuccess) {
      toast.success('Gist forked successfully');
    }
    if (forkGistResult.isError) {
      toast.error('Failed to fork gist');
    }
  }, [forkGistResult]);

  return (
    <IconButton
      onClick={() => {
        forkGist(gistId);
      }}
      icon="fas fa-code-fork"
      color={color}
      text={showText ? 'Fork' : undefined}
      isLoading={forkGistResult.isLoading}
    />
  );
};
