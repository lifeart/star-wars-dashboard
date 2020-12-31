import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | battle', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:battle');
    assert.ok(route);
  });
});
