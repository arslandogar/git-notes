import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { octokit } from '@/lib/octokit';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

const gistBaseQuery: BaseQueryFn<
  number, // Args
  unknown, // Result
  { reason: string }, // Error
  { withToken?: boolean }, // DefinitionExtraOptions
  { timestamp: number } // Meta
> = (arg) => {
  return octokit.rest.gists.listPublic({
    per_page: 12,
    page: arg,
  });
};

type Gist = AsyncReturnType<typeof octokit.rest.gists.listPublic>['data'];

export const gistAPI = createApi({
  reducerPath: 'gists',
  baseQuery: gistBaseQuery,
  tagTypes: ['Gist'],
  endpoints: (builder) => ({
    publicGists: builder.query<Gist, number>({
      query: (page: number) => page,
      providesTags: (result, error, page) => [{ type: 'Gist', page }],
    }),
  }),
});

export const { usePublicGistsQuery } = gistAPI;
