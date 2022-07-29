import { Octokit } from 'octokit';

import storage from '@/utils/storage';

export const octokit = new Octokit();

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  params: object | undefined;
}

export const request = async (arg: RequestOptions) => {
  const token = storage.getToken();
  const response = await octokit.request({
    headers: {
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      Authorization: token ? `token ${token}` : undefined,
    },
    method: arg.method,
    url: arg.url,
    ...arg.params,
  });
  return response;
};
