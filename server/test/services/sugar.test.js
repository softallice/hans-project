const assert = require('assert');
const app = require('../../src/app');

describe('\'sugar\' service', () => {
  it('registered the service', () => {
    const service = app.service('sugar');

    assert.ok(service, 'Registered the service');
  });
});
