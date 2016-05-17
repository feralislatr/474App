'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Deathclock = mongoose.model('Deathclock'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, deathclock;

/**
 * Deathclock routes tests
 */
describe('Deathclock CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Deathclock
    user.save(function () {
      deathclock = {
        name: 'Deathclock name'
      };

      done();
    });
  });

  it('should be able to save a Deathclock if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Deathclock
        agent.post('/api/deathclocks')
          .send(deathclock)
          .expect(200)
          .end(function (deathclockSaveErr, deathclockSaveRes) {
            // Handle Deathclock save error
            if (deathclockSaveErr) {
              return done(deathclockSaveErr);
            }

            // Get a list of Deathclocks
            agent.get('/api/deathclocks')
              .end(function (deathclocksGetErr, deathclocksGetRes) {
                // Handle Deathclock save error
                if (deathclocksGetErr) {
                  return done(deathclocksGetErr);
                }

                // Get Deathclocks list
                var deathclocks = deathclocksGetRes.body;

                // Set assertions
                (deathclocks[0].user._id).should.equal(userId);
                (deathclocks[0].name).should.match('Deathclock name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Deathclock if not logged in', function (done) {
    agent.post('/api/deathclocks')
      .send(deathclock)
      .expect(403)
      .end(function (deathclockSaveErr, deathclockSaveRes) {
        // Call the assertion callback
        done(deathclockSaveErr);
      });
  });

  it('should not be able to save an Deathclock if no name is provided', function (done) {
    // Invalidate name field
    deathclock.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Deathclock
        agent.post('/api/deathclocks')
          .send(deathclock)
          .expect(400)
          .end(function (deathclockSaveErr, deathclockSaveRes) {
            // Set message assertion
            (deathclockSaveRes.body.message).should.match('Please fill Deathclock name');

            // Handle Deathclock save error
            done(deathclockSaveErr);
          });
      });
  });

  it('should be able to update an Deathclock if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Deathclock
        agent.post('/api/deathclocks')
          .send(deathclock)
          .expect(200)
          .end(function (deathclockSaveErr, deathclockSaveRes) {
            // Handle Deathclock save error
            if (deathclockSaveErr) {
              return done(deathclockSaveErr);
            }

            // Update Deathclock name
            deathclock.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Deathclock
            agent.put('/api/deathclocks/' + deathclockSaveRes.body._id)
              .send(deathclock)
              .expect(200)
              .end(function (deathclockUpdateErr, deathclockUpdateRes) {
                // Handle Deathclock update error
                if (deathclockUpdateErr) {
                  return done(deathclockUpdateErr);
                }

                // Set assertions
                (deathclockUpdateRes.body._id).should.equal(deathclockSaveRes.body._id);
                (deathclockUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Deathclocks if not signed in', function (done) {
    // Create new Deathclock model instance
    var deathclockObj = new Deathclock(deathclock);

    // Save the deathclock
    deathclockObj.save(function () {
      // Request Deathclocks
      request(app).get('/api/deathclocks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Deathclock if not signed in', function (done) {
    // Create new Deathclock model instance
    var deathclockObj = new Deathclock(deathclock);

    // Save the Deathclock
    deathclockObj.save(function () {
      request(app).get('/api/deathclocks/' + deathclockObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', deathclock.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Deathclock with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/deathclocks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Deathclock is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Deathclock which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Deathclock
    request(app).get('/api/deathclocks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Deathclock with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Deathclock if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Deathclock
        agent.post('/api/deathclocks')
          .send(deathclock)
          .expect(200)
          .end(function (deathclockSaveErr, deathclockSaveRes) {
            // Handle Deathclock save error
            if (deathclockSaveErr) {
              return done(deathclockSaveErr);
            }

            // Delete an existing Deathclock
            agent.delete('/api/deathclocks/' + deathclockSaveRes.body._id)
              .send(deathclock)
              .expect(200)
              .end(function (deathclockDeleteErr, deathclockDeleteRes) {
                // Handle deathclock error error
                if (deathclockDeleteErr) {
                  return done(deathclockDeleteErr);
                }

                // Set assertions
                (deathclockDeleteRes.body._id).should.equal(deathclockSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Deathclock if not signed in', function (done) {
    // Set Deathclock user
    deathclock.user = user;

    // Create new Deathclock model instance
    var deathclockObj = new Deathclock(deathclock);

    // Save the Deathclock
    deathclockObj.save(function () {
      // Try deleting Deathclock
      request(app).delete('/api/deathclocks/' + deathclockObj._id)
        .expect(403)
        .end(function (deathclockDeleteErr, deathclockDeleteRes) {
          // Set message assertion
          (deathclockDeleteRes.body.message).should.match('User is not authorized');

          // Handle Deathclock error error
          done(deathclockDeleteErr);
        });

    });
  });

  it('should be able to get a single Deathclock that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Deathclock
          agent.post('/api/deathclocks')
            .send(deathclock)
            .expect(200)
            .end(function (deathclockSaveErr, deathclockSaveRes) {
              // Handle Deathclock save error
              if (deathclockSaveErr) {
                return done(deathclockSaveErr);
              }

              // Set assertions on new Deathclock
              (deathclockSaveRes.body.name).should.equal(deathclock.name);
              should.exist(deathclockSaveRes.body.user);
              should.equal(deathclockSaveRes.body.user._id, orphanId);

              // force the Deathclock to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Deathclock
                    agent.get('/api/deathclocks/' + deathclockSaveRes.body._id)
                      .expect(200)
                      .end(function (deathclockInfoErr, deathclockInfoRes) {
                        // Handle Deathclock error
                        if (deathclockInfoErr) {
                          return done(deathclockInfoErr);
                        }

                        // Set assertions
                        (deathclockInfoRes.body._id).should.equal(deathclockSaveRes.body._id);
                        (deathclockInfoRes.body.name).should.equal(deathclock.name);
                        should.equal(deathclockInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Deathclock.remove().exec(done);
    });
  });
});
