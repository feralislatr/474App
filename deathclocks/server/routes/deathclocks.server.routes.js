'use strict';

/**
 * Module dependencies
 */
var deathclocksPolicy = require('../policies/deathclocks.server.policy'),
  deathclocks = require('../controllers/deathclocks.server.controller');

module.exports = function(app) {
  // Deathclocks Routes
  app.route('/api/deathclocks').all(deathclocksPolicy.isAllowed)
    .get(deathclocks.list)
    .post(deathclocks.create);

  app.route('/api/deathclocks/:deathclockId').all(deathclocksPolicy.isAllowed)
    .get(deathclocks.read)
    .put(deathclocks.update)
    .delete(deathclocks.delete);

  // Finish by binding the Deathclock middleware
  app.param('deathclockId', deathclocks.deathclockByID);
};
