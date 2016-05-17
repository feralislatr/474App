(function () {
  'use strict';

  // Deathclocks controller
  angular
    .module('deathclocks')
    .controller('DeathclocksController', DeathclocksController);

  DeathclocksController.$inject = ['$scope', '$state', 'Authentication', 'deathclockResolve'];

  function DeathclocksController ($scope, $state, Authentication, deathclock) {
    var vm = this;

    vm.authentication = Authentication;
    vm.deathclock = deathclock;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Deathclock
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.deathclock.$remove($state.go('deathclocks.list'));
      }
    }

    // Save Deathclock
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deathclockForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.deathclock._id) {
        vm.deathclock.$update(successCallback, errorCallback);
      } else {
        vm.deathclock.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('deathclocks.view', {
          deathclockId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
