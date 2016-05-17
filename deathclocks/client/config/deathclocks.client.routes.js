(function () {
  'use strict';

  angular
    .module('deathclocks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('deathclocks', {
        abstract: true,
        url: '/deathclocks',
        template: '<ui-view/>'
      })
      .state('deathclocks.list', {
        url: '',
        templateUrl: 'modules/deathclocks/client/views/list-deathclocks.client.view.html',
        controller: 'DeathclocksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deathclocks List'
        }
      })
      .state('deathclocks.create', {
        url: '/create',
        templateUrl: 'modules/deathclocks/client/views/form-deathclock.client.view.html',
        controller: 'DeathclocksController',
        controllerAs: 'vm',
        resolve: {
          deathclockResolve: newDeathclock
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Deathclocks Create'
        }
      })
      .state('deathclocks.edit', {
        url: '/:deathclockId/edit',
        templateUrl: 'modules/deathclocks/client/views/form-deathclock.client.view.html',
        controller: 'DeathclocksController',
        controllerAs: 'vm',
        resolve: {
          deathclockResolve: getDeathclock
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Deathclock {{ deathclockResolve.name }}'
        }
      })
      .state('deathclocks.view', {
        url: '/:deathclockId',
        templateUrl: 'modules/deathclocks/client/views/view-deathclock.client.view.html',
        controller: 'DeathclocksController',
        controllerAs: 'vm',
        resolve: {
          deathclockResolve: getDeathclock
        },
        data:{
          pageTitle: 'Deathclock {{ articleResolve.name }}'
        }
      });
  }

  getDeathclock.$inject = ['$stateParams', 'DeathclocksService'];

  function getDeathclock($stateParams, DeathclocksService) {
    return DeathclocksService.get({
      deathclockId: $stateParams.deathclockId
    }).$promise;
  }

  newDeathclock.$inject = ['DeathclocksService'];

  function newDeathclock(DeathclocksService) {
    return new DeathclocksService();
  }
})();
