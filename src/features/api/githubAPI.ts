import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { octokit } from '@/lib/octokit';
import storage from '@/utils/storage';

import { Profile, Gist, ErrorResponse } from './types';

const githubBaseQuery: BaseQueryFn<
  { method: 'GET' | 'POST' | 'PUT'; url: string; params: object | undefined }, // Args
  unknown, // Result
  ErrorResponse, // Error
  any, // DefinitionExtraOptions
  any // Meta
> = async (arg) => {
  try {
    const token = storage.getToken();
    const response = await octokit.request({
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        Authorization: token ? `token ${token}` : undefined,
      },
      method: arg.method,
      url: arg.url,
      ...arg.params,
    });
    return { data: response.data ? response.data : true };
  } catch (error: any) {
    const response = error.response;
    if (response) {
      return { error: { status: response.status, message: response.data.message } };
    }
    return { error: { status: 500, message: 'Unknown Error' } };
  }
};

export const githubAPI = createApi({
  reducerPath: 'gitHub',
  baseQuery: githubBaseQuery,
  tagTypes: ['User', 'Gists', 'GistStars'],
  endpoints: (builder) => ({
    getUser: builder.query<Profile, undefined>({
      query: () => ({ method: 'GET', url: '/user', params: undefined }),
      providesTags: ['User'],
    }),

    publicGists: builder.query<Gist, number>({
      query: (page: number) => ({
        method: 'GET',
        url: '/gists/public',
        params: { per_page: 1, page },
      }),
      providesTags: (result, error, page) => [{ type: 'Gists', id: page }],
    }),

    isStarredGist: builder.query<boolean, string>({
      query: (id: string) => ({
        method: 'GET',
        url: '/gists/{gist_id}/star',
        params: { gist_id: id },
      }),
      providesTags: (result, error, id) => [{ type: 'GistStars', id }],
    }),

    forkGist: builder.mutation<boolean, string>({
      query: (id: string) => ({
        method: 'POST',
        url: '/gists/{gist_id}/forks',
        params: { gist_id: id },
      }),
    }),

    starGist: builder.mutation<boolean, string>({
      query: (id: string) => ({
        method: 'PUT',
        url: '/gists/{gist_id}/star',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  usePublicGistsQuery,
  useIsStarredGistQuery,
  useForkGistMutation,
  useStarGistMutation,
} = githubAPI;
