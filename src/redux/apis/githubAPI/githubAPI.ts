import { createApi } from '@reduxjs/toolkit/query/react';

import { request } from '@/lib/octokit';

import { githubBaseQuery } from './githubBaseQuery';
import { Profile, Gist, GistDTO } from './types';

const GISTS_PER_PAGE = 12;

export const githubAPI = createApi({
  reducerPath: 'gitHub',
  baseQuery: githubBaseQuery,
  tagTypes: [
    'CurrentUser',
    'Users',
    'UserGists',
    'StarredGists',
    'PublicGists',
    'GistItems',
    'GistStars',
    'GistForksCount',
  ],
  endpoints: (builder) => ({
    currentUser: builder.query<Profile, undefined>({
      query: () => ({ method: 'GET', url: '/user' }),
      providesTags: ['CurrentUser'],
    }),

    user: builder.query<Profile, string>({
      query: (username) => ({ method: 'GET', url: '/users/{username}', params: { username } }),
      providesTags: (result, error, username) => [{ type: 'Users', id: username }],
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
      invalidatesTags: (result, error, id) => [{ type: 'GistForksCount', id }, 'UserGists'],
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
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }, 'StarredGists'],
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
      invalidatesTags: (result, error, id) => [{ type: 'GistStars', id }, 'StarredGists'],
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
      invalidatesTags: ['PublicGists', 'UserGists'],
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
      invalidatesTags: ['PublicGists', 'UserGists'],
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
      invalidatesTags: (result, error, id) => [
        { type: 'GistItems', id },
        'PublicGists',
        'UserGists',
        'StarredGists',
      ],
      extraOptions: {
        successMessage: 'Gist deteleted successfully',
        failureMessage: 'Failed to delete gist',
      },
    }),

    countForks: builder.query<number, string>({
      async queryFn(id) {
        try {
          const response = await request({
            method: 'GET',
            url: '/gists/{gist_id}/forks',
            params: { gist_id: id },
          });
          return { data: response.data.length };
        } catch (error) {
          return { data: 0 };
        }
      },
      providesTags: (result, error, id) => [{ type: 'GistForksCount', id }],
    }),
  }),
});

export const {
  useCurrentUserQuery,
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
  useCountForksQuery,
} = githubAPI;
