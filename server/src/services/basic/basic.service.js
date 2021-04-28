// Initializes the `basic` service on path `/basic`
const { Basic } = require('./basic.class');
const createModel = require('../../models/basic.model');
const hooks = require('./basic.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/basic', new Basic(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('basic');

  service.hooks(hooks);
};
