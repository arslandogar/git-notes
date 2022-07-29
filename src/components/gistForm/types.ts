import { GistDTO } from '@/features/api/types';

export type GistFile = {
  key: string;
  content: string;
};

export type FormData = {
  description: string;
  public: boolean;
  files: GistFile[];
};

export interface Props {
  gistId?: string;
  onSubmitForm: (data: GistDTO) => void;
  isLoading?: boolean;
  defaultValues?: FormData;
}
