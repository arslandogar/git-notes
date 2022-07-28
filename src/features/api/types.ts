import { octokit } from '@/lib/octokit';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type Profile = AsyncReturnType<typeof octokit.rest.users.getAuthenticated>['data'];
export type Gist = AsyncReturnType<typeof octokit.rest.gists.listPublic>['data'];

export type GistItem = ArrayElement<Gist>;

export type ErrorResponse = {
  status: number;
  message: string | undefined;
};
