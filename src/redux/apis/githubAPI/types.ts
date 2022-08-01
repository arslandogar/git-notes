import { octokit } from '@/lib/octokit';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

type GistArray = AsyncReturnType<typeof octokit.rest.gists.listPublic>['data'];

export type Gist = ArrayElement<GistArray>;

export type GistDTO = {
  gist_id?: string;
  description: string;
  files: { [key: string]: { content: string } };
  public: boolean;
};

export type Profile = AsyncReturnType<typeof octokit.rest.users.getAuthenticated>['data'];

export type ErrorResponse = {
  status: number;
  message: string | undefined;
};
