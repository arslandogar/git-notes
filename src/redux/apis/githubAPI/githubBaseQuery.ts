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
    const response = error.response;
    const errorMessage = response?.data?.message || error.message;
    if (extraOptions && extraOptions.failureMessage) {
      toast.error(errorMessage ? errorMessage : extraOptions.failureMessage);
    }
    if (response) {
      return { error: { status: response.status, message: errorMessage } };
    }
    return { error: { status: 500, message: 'Unknown Error' } };
  }
};
