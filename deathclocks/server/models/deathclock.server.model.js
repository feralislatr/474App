'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Deathclock Schema
 */
var DeathclockSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Deathclock name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Deathclock', DeathclockSchema);
