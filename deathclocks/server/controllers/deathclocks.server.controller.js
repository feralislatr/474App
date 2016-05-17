'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Deathclock = mongoose.model('Deathclock'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Deathclock
 */
exports.create = function(req, res) {
  var deathclock = new Deathclock(req.body);
  deathclock.user = req.user;

  deathclock.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deathclock);
    }
  });
};

/**
 * Show the current Deathclock
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var deathclock = req.deathclock ? req.deathclock.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  deathclock.isCurrentUserOwner = req.user && deathclock.user && deathclock.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(deathclock);
};

/**
 * Update a Deathclock
 */
exports.update = function(req, res) {
  var deathclock = req.deathclock ;

  deathclock = _.extend(deathclock , req.body);

  deathclock.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deathclock);
    }
  });
};

/**
 * Delete an Deathclock
 */
exports.delete = function(req, res) {
  var deathclock = req.deathclock ;

  deathclock.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deathclock);
    }
  });
};

/**
 * List of Deathclocks
 */
exports.list = function(req, res) { 
  Deathclock.find().sort('-created').populate('user', 'displayName').exec(function(err, deathclocks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deathclocks);
    }
  });
};

/**
 * Deathclock middleware
 */
exports.deathclockByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Deathclock is invalid'
    });
  }

  Deathclock.findById(id).populate('user', 'displayName').exec(function (err, deathclock) {
    if (err) {
      return next(err);
    } else if (!deathclock) {
      return res.status(404).send({
        message: 'No Deathclock with that identifier has been found'
      });
    }
    req.deathclock = deathclock;
    next();
  });
};
