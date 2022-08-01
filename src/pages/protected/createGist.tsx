import { GistForm } from '@/components';
import { AppLayout } from '@/layouts';
import { useCreateGistMutation } from '@/redux/apis';

export const CreateGist = () => {
  const [createGist, { isLoading }] = useCreateGistMutation();
  return (
    <AppLayout>
      <GistForm onSubmitForm={createGist} isLoading={isLoading} />
    </AppLayout>
  );
};
