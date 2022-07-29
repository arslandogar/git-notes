import { createApi } from '@reduxjs/toolkit/query/react';

import { request } from '@/lib/octokit';

import { githubBaseQuery } from './githubBaseQuery';
import { Profile, Gist, GistDTO } from './types';

const GISTS_PER_PAGE = 12;

export const githubAPI = createApi({
  reducerPath: 'gitHub',
  baseQuery: githubBaseQuery,
  tagTypes: ['User', 'UserGists', 'StarredGists', 'PublicGists', 'GistItems', 'GistStars'],
  endpoints: (builder) => ({
    user: builder.query<Profile, undefined>({
      query: () => ({ method: 'GET', url: '/user', params: undefined }),
      providesTags: ['User'],
    }),

    userGists: builder.query<Gist[], { username: string; page: number }>({
      query: (arg) => ({
        method: 'GET',
        url: '/users/{username}/gists',
        params: { per_page: GISTS_PER_PAGE, ...arg },
      }),
      providesTags: (result, error, arg) => [
        { type: 'UserGists', id: `${arg.username}/${arg.page}` },
      ],
    }),

    starredGists: builder.query<Gist[], number>({
      query: (page) => ({
        method: 'GET',
        url: '/gists/starred',
        params: { per_page: GISTS_PER_PAGE, page },
      }),
      providesTags: (result, error, page) => [{ type: 'StarredGists', id: page }],
    }),

    publicGists: builder.query<Gist[], number>({
      query: (page) => ({
        method: 'GET',
        url: '/gists/public',
        params: { per_page: GISTS_PER_PAGE, page },
      }),
      providesTags: (result, error, page) => [{ type: 'PublicGists', id: page }],
    }),

    gist: builder.query<Gist, string>({
      query: (id) => ({
        method: 'GET',
        url: '/gists/{gist_id}',
        params: { gist_id: id },
      }),
      providesTags: (result, error, id) => [{ type: 'GistItems', id }],
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
      extraOptions: {
        successMessage: 'Gist forked successfully',
        failureMessage: 'Failed to fork gist',
      },
    }),

    starGist: builder.mutation<boolean, string>({
      query: (id) => ({
        method: 'PUT',
        url: '/gists/{gist_id}/star',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }],
      extraOptions: {
        successMessage: 'Gist starred successfully',
        failureMessage: 'Failed to star gist',
      },
    }),

    unStarGist: builder.mutation<boolean, string>({
      query: (id) => ({
        method: 'DELETE',
        url: '/gists/{gist_id}/star',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }],
      extraOptions: {
        successMessage: 'Gist unstarred successfully',
        failureMessage: 'Failed to unstar gist',
      },
    }),

    createGist: builder.mutation<Gist, GistDTO>({
      query: (data) => ({
        method: 'POST',
        url: '/gists',
        params: data,
      }),
      invalidatesTags: ['PublicGists'],
      extraOptions: {
        successMessage: 'Gist created successfully',
        failureMessage: 'Failed to create gist',
      },
    }),

    updateGist: builder.mutation<Gist, GistDTO>({
      query: (data) => ({
        method: 'PATCH',
        url: '/gists/{gist_id}',
        params: data,
      }),
      invalidatesTags: ['PublicGists'],
      extraOptions: {
        successMessage: 'Gist updated successfully',
        failureMessage: 'Failed to update gist',
      },
    }),

    deleteGist: builder.mutation<Gist, string>({
      query: (id) => ({
        method: 'DELETE',
        url: '/gists/{gist_id}',
        params: { gist_id: id },
      }),
      invalidatesTags: (result, error, id) => ['PublicGists', { type: 'GistItems', id }],
      extraOptions: {
        successMessage: 'Gist deteleted successfully',
        failureMessage: 'Failed to delete gist',
      },
    }),
  }),
});

export const {
  useUserQuery,
  useUserGistsQuery,
  useStarredGistsQuery,
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
