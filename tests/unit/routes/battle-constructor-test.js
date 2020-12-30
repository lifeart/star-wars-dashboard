import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | battle-constructor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:battle-constructor');
    assert.ok(route);
  });
});
