import { FC } from 'react';

import { useDeleteGistMutation } from '@/redux/apis';

import { IconButton } from './iconButton';

interface Props {
  gistId: string;
}

export const DeleteButton: FC<Props> = ({ gistId }) => {
  const [deleteGist, deleteGistResult] = useDeleteGistMutation();

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
