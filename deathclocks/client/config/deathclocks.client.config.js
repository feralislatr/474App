(function () {
  'use strict';

  angular
    .module('deathclocks')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Deathclocks',
      state: 'deathclocks',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'deathclocks', {
      title: 'List Deathclocks',
      state: 'deathclocks.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'deathclocks', {
      title: 'Create Deathclock',
      state: 'deathclocks.create',
      roles: ['user']
    });
  }
})();
