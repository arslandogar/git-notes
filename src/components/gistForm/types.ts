import { GistDTO } from '@/redux/apis/githubAPI/types';

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
  /**
   * The gist to edit. If not provided, a new gist will be created.
   * If provided, the gist will be updated.
   */
  gistId?: string;
  /**
   * The callback to be called when the form is submitted.
   */
  onSubmitForm: (data: GistDTO) => void;
  /**
   * Is the form being submitted?
   */
  isLoading?: boolean;
  /**
   * Default values for the form.
   */
  defaultValues?: FormData;
}
