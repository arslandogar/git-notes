import { createOAuthAppAuth } from '@octokit/auth-oauth-app';

export const auth = createOAuthAppAuth({
  clientType: 'oauth-app',
  clientId: '5d79469f3db4e6023fc2',
  clientSecret: '39fb6ed3e12669983dec020bf36db283c6be53be',
});
