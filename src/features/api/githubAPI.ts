import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { request, RequestOptions } from '@/lib/octokit';

import { Profile, Gist, GistDTO, ErrorResponse } from './types';

const githubBaseQuery: BaseQueryFn<
  RequestOptions, // Args
  unknown, // Result
  ErrorResponse, // Error
  any, // DefinitionExtraOptions
  any // Meta
> = async (arg) => {
  try {
    const response = await request(arg);
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
  tagTypes: ['User', 'Gists', 'PublicGists', 'GistStars'],
  endpoints: (builder) => ({
    getUser: builder.query<Profile, undefined>({
      query: () => ({ method: 'GET', url: '/user', params: undefined }),
      providesTags: ['User'],
    }),

    publicGists: builder.query<Gist[], number>({
      query: (page) => ({
        method: 'GET',
        url: '/gists/public',
        params: { per_page: 12, page },
      }),
      providesTags: (result, error, page) => [{ type: 'PublicGists', id: page }],
    }),

    gist: builder.query<Gist, string>({
      query: (id) => ({
        method: 'GET',
        url: '/gists/{gist_id}',
        params: { gist_id: id },
      }),
      providesTags: (result, error, id) => [{ type: 'Gists', id }],
    }),

    isStarredGist: builder.query<boolean, string>({
      async queryFn(id) {
        try {
          await request({
            method: 'GET',
            url: '/gists/{gist_id}/star',
            params: { gist_id: id },
          });
          return { data: true };
        } catch (error) {
          return { data: false };
        }
      },
      providesTags: (result, error, id) => [{ type: 'GistStars', id }],
    }),

    forkGist: builder.mutation<boolean, string>({
      query: (id) => ({
        method: 'POST',
        url: '/gists/{gist_id}/forks',
        params: { gist_id: id },
      }),
    }),

    starGist: builder.mutation<boolean, string>({
      query: (id) => ({
        method: 'PUT',
        url: '/gists/{gist_id}/star',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }],
    }),

    unStarGist: builder.mutation<boolean, string>({
      query: (id) => ({
        method: 'DELETE',
        url: '/gists/{gist_id}/star',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }],
    }),

    createGist: builder.mutation<Gist, GistDTO>({
      query: (data) => ({
        method: 'POST',
        url: '/gists',
        params: data,
      }),
      invalidatesTags: ['PublicGists'],
    }),

    updateGist: builder.mutation<Gist, GistDTO>({
      query: (data) => ({
        method: 'PATCH',
        url: '/gists/{gist_id}',
        params: data,
      }),
      invalidatesTags: ['PublicGists'],
    }),

    deleteGist: builder.mutation<Gist, string>({
      query: (id) => ({
        method: 'DELETE',
        url: '/gists/{gist_id}',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => ['PublicGists', { type: 'Gists', id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  usePublicGistsQuery,
  useGistQuery,
  useIsStarredGistQuery,
  useForkGistMutation,
  useStarGistMutation,
  useUnStarGistMutation,
  useCreateGistMutation,
  useUpdateGistMutation,
  useDeleteGistMutation,
} = githubAPI;
