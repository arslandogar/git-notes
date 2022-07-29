import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import { useDeleteGistMutation } from '@/features/api/githubAPI';

import { IconButton } from './iconButton';

interface Props {
  gistId: string;
}

export const DeleteButton: FC<Props> = ({ gistId }) => {
  const [deleteGist, deleteGistResult] = useDeleteGistMutation();

  useEffect(() => {
    if (deleteGistResult.isSuccess) {
      toast.success('Gist deleted successfully');
    }
    if (deleteGistResult.isError) {
      toast.error('Failed to delete gist');
    }
  }, [deleteGistResult]);

  return (
    <IconButton
      onClick={() => {
        deleteGist(gistId);
      }}
      icon="fa-solid fa-trash-can"
      color="blue"
      text="Delete"
      isLoading={deleteGistResult.isLoading}
    />
  );
};
