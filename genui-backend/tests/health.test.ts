import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import HttpStatusCodes from '#src/common/constants/HttpStatusCodes.ts';

import { agent } from './support/agent.ts';

// ========================================================================= //
//                                   TESTS                                   //
// ========================================================================= //

describe('App', () => {
  it('should return 404 for an unknown route.', async () => {
    const res = await agent.get('/api/nope');
    assert.equal(res.status, HttpStatusCodes.NOT_FOUND);
  });
});
