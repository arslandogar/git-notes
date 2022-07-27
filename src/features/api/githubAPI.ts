import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { octokit } from '@/lib/octokit';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

const githubBaseQuery: BaseQueryFn<
  { method: 'GET' | 'POST'; url: string; params: object | undefined }, // Args
  unknown, // Result
  { reason: string }, // Error
  any, // DefinitionExtraOptions
  any // Meta
> = (arg) => {
  return octokit.request({
    method: arg.method,
    url: arg.url,
    params: arg.params,
  });
};

type Profile = AsyncReturnType<typeof octokit.rest.users.getAuthenticated>['data'];
type Gist = AsyncReturnType<typeof octokit.rest.gists.listPublic>['data'];

export const githubAPI = createApi({
  reducerPath: 'gitHub',
  baseQuery: githubBaseQuery,
  tagTypes: ['User', 'Gists'],
  endpoints: (builder) => ({
    getUser: builder.query<Profile, undefined>({
      query: () => ({ method: 'GET', url: '/user', params: undefined }),
      providesTags: [{ type: 'User' }],
    }),
    publicGists: builder.query<Gist, number>({
      query: (page: number) => ({
        method: 'GET',
        url: '/gists/public',
        params: { per_page: 12, page },
      }),
      providesTags: (result, error, page) => [{ type: 'Gists', page }],
    }),
  }),
});

export const { useGetUserQuery, usePublicGistsQuery } = githubAPI;
