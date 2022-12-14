import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { GistForm, ErrorFallback } from '@/components';
import { GistFile } from '@/components/gistForm/types';
import { AppLayout } from '@/layouts';
import { useUpdateGistMutation, useGistQuery, useCurrentUserQuery } from '@/redux/apis';

export const EditGist = () => {
  const params = useParams<{ gistId: string }>();
  const { data: gist, isLoading: isLoadingGist } = useGistQuery(params.gistId as string);
  const { data: currentUser } = useCurrentUserQuery(undefined);
  const [updateGist, { isLoading: isUpdating }] = useUpdateGistMutation();

  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [files, setFiles] = useState<GistFile[]>([]);

  useEffect(() => {
    if (!gist) return;

    const setFilesFromGist = async () => {
      try {
        const files: GistFile[] = await Promise.all(
          Object.keys(gist.files).map(async (key) => {
            const file = gist.files[key];
            const fileObject = { key: file.filename as string, content: '' };
            if (file.raw_url) {
              const fileContent = await fetch(file.raw_url).then((res) => res.text());
              fileObject.content = fileContent;
            }
            return fileObject;
          })
        );
        setFiles(files);
      } catch {
        toast.error("Couldn't load files from gist");
      } finally {
        setIsLoadingFiles(false);
      }
    };
    setFilesFromGist();
  }, [gist]);

  const isLoading = isLoadingGist || isLoadingFiles;

  if (!isLoading && currentUser?.login !== gist?.owner?.login) {
    return <ErrorFallback message="You don't have permission to edit this gist" />;
  }

  return (
    <AppLayout isLoading={isLoading}>
      <GistForm
        gistId={gist?.id}
        onSubmitForm={updateGist}
        isLoading={isUpdating}
        defaultValues={{
          public: gist?.public ?? false,
          description: gist?.description ?? '',
          files,
        }}
      />
    </AppLayout>
  );
};
