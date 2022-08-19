import { Octokit } from 'octokit';

import storage from '@/utils/storage';

export const octokit = new Octokit();

export interface RequestOptions {
  /**
   * Request method.
   */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /**
   * Request URL.
   */
  url: string;
  /**
   * Request parameters.
   */
  params?: object;
}

/**
 * Make a request to the GitHub API using parameters defined in the RequestOptions.
 */
export const request = async (arg: RequestOptions) => {
  const token = storage.getToken();
  const response = await octokit.request({
    headers: {
      Authorization: token ? `token ${token}` : undefined,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    method: arg.method,
    url: arg.url,
    ...arg.params,
  });
  return response;
};
