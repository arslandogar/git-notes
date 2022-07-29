import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { GistForm } from '@/components';
import { GistFile } from '@/components/gistForm/types';
import { useUpdateGistMutation, useGistQuery } from '@/features/api/githubAPI';
import { AppLayout } from '@/layouts';

export const EditGist = () => {
  const params = useParams<{ gistId: string }>();
  const { data: gist, isLoading } = useGistQuery(params.gistId as string);
  const [createGist, { isLoading: isCreating }] = useUpdateGistMutation();

  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [files, setFiles] = useState<GistFile[]>([]);

  useEffect(() => {
    if (gist) {
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
    }
  }, [gist]);

  return (
    <AppLayout isLoading={isLoading || isLoadingFiles}>
      <GistForm
        gistId={gist?.id}
        onSubmitForm={createGist}
        isLoading={isCreating}
        defaultValues={{
          public: gist?.public ?? false,
          description: gist?.description ?? '',
          files,
        }}
      />
    </AppLayout>
  );
};
