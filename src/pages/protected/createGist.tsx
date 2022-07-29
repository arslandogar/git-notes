import { GistForm } from '@/components';
import { useCreateGistMutation } from '@/features/api/githubAPI';
import { AppLayout } from '@/layouts';

export const CreateGist = () => {
  const [createGist, { isLoading }] = useCreateGistMutation();
  return (
    <AppLayout>
      <GistForm onSubmitForm={createGist} isLoading={isLoading} />
    </AppLayout>
  );
};
