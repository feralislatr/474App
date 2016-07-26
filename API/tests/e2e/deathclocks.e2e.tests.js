'use strict';

describe('Deathclocks E2E Tests:', function () {
  describe('Test Deathclocks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/deathclocks');
      expect(element.all(by.repeater('deathclock in deathclocks')).count()).toEqual(0);
    });
  });
});
