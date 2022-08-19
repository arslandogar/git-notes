import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';

import { request, RequestOptions } from '@/lib/octokit';

import { ErrorResponse } from './types';

/**
 * Base query function for the GitHub API. Handles requests to the GitHub API.
 */
export const githubBaseQuery: BaseQueryFn<
  RequestOptions, // Args
  unknown, // Result
  ErrorResponse, // Error
  { successMessage?: string; failureMessage?: string } | undefined, // DefinitionExtraOptions
  any // Meta
> = async (arg, _, extraOptions) => {
  const { successMessage, failureMessage } = extraOptions || {};
  try {
    const response = await request(arg);
    if (successMessage) {
      toast.success(successMessage);
    }
    return { data: response.data ? response.data : true };
  } catch (error: any) {
    const response = error.response;
    const errorMessage = response?.data?.message || error.message || failureMessage;
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (response) {
      return { error: { status: response.status, message: errorMessage } };
    }
    return { error: { status: 500, message: 'Unknown Error' } };
  }
};
