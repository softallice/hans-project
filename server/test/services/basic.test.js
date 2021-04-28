const assert = require('assert');
const app = require('../../src/app');

describe('\'basic\' service', () => {
  it('registered the service', () => {
    const service = app.service('basic');

    assert.ok(service, 'Registered the service');
  });
});
