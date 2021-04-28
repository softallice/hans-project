const assert = require('assert');
const app = require('../../src/app');

describe('\'pressure\' service', () => {
  it('registered the service', () => {
    const service = app.service('pressure');

    assert.ok(service, 'Registered the service');
  });
});
