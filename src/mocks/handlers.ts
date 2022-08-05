import { rest } from 'msw';

import { MOCK_GISTS } from './responses';

export const handlers = [
  rest.get('https://api.github.com/gists/public', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_GISTS));
  }),
];
