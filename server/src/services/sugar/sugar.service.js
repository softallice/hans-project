// Initializes the `sugar` service on path `/sugar`
const { Sugar } = require('./sugar.class');
const createModel = require('../../models/sugar.model');
const hooks = require('./sugar.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sugar', new Sugar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sugar');

  service.hooks(hooks);
};
