import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';

import { request, RequestOptions } from '@/lib/octokit';

import { ErrorResponse } from './types';

export const githubBaseQuery: BaseQueryFn<
  RequestOptions, // Args
  unknown, // Result
  ErrorResponse, // Error
  { successMessage?: string; failureMessage?: string } | undefined, // DefinitionExtraOptions
  any // Meta
> = async (arg, _, extraOptions) => {
  try {
    const response = await request(arg);
    if (extraOptions && extraOptions.successMessage) {
      toast.success(extraOptions.successMessage);
    }
    return { data: response.data ? response.data : true };
  } catch (error: any) {
    if (extraOptions && extraOptions.failureMessage) {
      toast.error(extraOptions.failureMessage);
    }
    const response = error.response;
    if (response) {
      return { error: { status: response.status, message: response.data.message } };
    }
    return { error: { status: 500, message: 'Unknown Error' } };
  }
};
