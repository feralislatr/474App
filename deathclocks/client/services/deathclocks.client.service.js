//Deathclocks service used to communicate Deathclocks REST endpoints
(function () {
  'use strict';

  angular
    .module('deathclocks')
    .factory('DeathclocksService', DeathclocksService);

  DeathclocksService.$inject = ['$resource'];

  function DeathclocksService($resource) {
    return $resource('api/deathclocks/:deathclockId', {
      deathclockId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
