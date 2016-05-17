(function () {
  'use strict';

  angular
    .module('deathclocks')
    .controller('DeathclocksListController', DeathclocksListController);

  DeathclocksListController.$inject = ['DeathclocksService'];

  function DeathclocksListController(DeathclocksService) {
    var vm = this;

    vm.deathclocks = DeathclocksService.query();
  }
})();
