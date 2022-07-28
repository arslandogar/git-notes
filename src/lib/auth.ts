import { createOAuthAppAuth } from '@octokit/auth-oauth-app';

export const auth = createOAuthAppAuth({
  clientType: 'oauth-app',
  clientId: process.env.REACT_APP_GITHUB_CLIENT_ID as string,
  clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET as string,
});
