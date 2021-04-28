// Initializes the `pressure` service on path `/pressure`
const { Pressure } = require('./pressure.class');
const createModel = require('../../models/pressure.model');
const hooks = require('./pressure.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pressure', new Pressure(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pressure');

  service.hooks(hooks);
};
