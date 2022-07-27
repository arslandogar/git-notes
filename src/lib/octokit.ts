import { Octokit } from 'octokit';

import storage from '@/utils/storage';

export const octokit = new Octokit({
  auth: storage.getToken(),
});
