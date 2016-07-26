(function () {
  'use strict';

  describe('Deathclocks Route Tests', function () {
    // Initialize global variables
    var $scope,
      DeathclocksService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DeathclocksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DeathclocksService = _DeathclocksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('deathclocks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/deathclocks');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DeathclocksController,
          mockDeathclock;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('deathclocks.view');
          $templateCache.put('modules/deathclocks/client/views/view-deathclock.client.view.html', '');

          // create mock Deathclock
          mockDeathclock = new DeathclocksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Deathclock Name'
          });

          //Initialize Controller
          DeathclocksController = $controller('DeathclocksController as vm', {
            $scope: $scope,
            deathclockResolve: mockDeathclock
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:deathclockId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.deathclockResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            deathclockId: 1
          })).toEqual('/deathclocks/1');
        }));

        it('should attach an Deathclock to the controller scope', function () {
          expect($scope.vm.deathclock._id).toBe(mockDeathclock._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/deathclocks/client/views/view-deathclock.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DeathclocksController,
          mockDeathclock;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('deathclocks.create');
          $templateCache.put('modules/deathclocks/client/views/form-deathclock.client.view.html', '');

          // create mock Deathclock
          mockDeathclock = new DeathclocksService();

          //Initialize Controller
          DeathclocksController = $controller('DeathclocksController as vm', {
            $scope: $scope,
            deathclockResolve: mockDeathclock
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.deathclockResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/deathclocks/create');
        }));

        it('should attach an Deathclock to the controller scope', function () {
          expect($scope.vm.deathclock._id).toBe(mockDeathclock._id);
          expect($scope.vm.deathclock._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/deathclocks/client/views/form-deathclock.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DeathclocksController,
          mockDeathclock;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('deathclocks.edit');
          $templateCache.put('modules/deathclocks/client/views/form-deathclock.client.view.html', '');

          // create mock Deathclock
          mockDeathclock = new DeathclocksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Deathclock Name'
          });

          //Initialize Controller
          DeathclocksController = $controller('DeathclocksController as vm', {
            $scope: $scope,
            deathclockResolve: mockDeathclock
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:deathclockId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.deathclockResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            deathclockId: 1
          })).toEqual('/deathclocks/1/edit');
        }));

        it('should attach an Deathclock to the controller scope', function () {
          expect($scope.vm.deathclock._id).toBe(mockDeathclock._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/deathclocks/client/views/form-deathclock.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
