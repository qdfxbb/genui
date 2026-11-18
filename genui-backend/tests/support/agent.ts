import { before } from 'node:test';
import supertest, { type Test } from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';

import app from '#src/server.ts';

// ========================================================================= //
//                                   EXEC                                    //
// ========================================================================= //

let agent: TestAgent<Test>;

before(() => {
  agent = supertest.agent(app);
});

// ========================================================================= //
//                                  EXPORT                                   //
// ========================================================================= //

export { agent };
