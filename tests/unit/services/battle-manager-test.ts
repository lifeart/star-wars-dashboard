import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import BattleManagerService from 'star-wars-dashboard/services/battle-manager';

module('Unit | Service | battle-manager', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:battle-manager');
    assert.ok(service);
  });

  test('it able to add candidate', function(assert) {
    let service: BattleManagerService = this.owner.lookup('service:battle-manager');
    assert.equal(service.candidates.length, 0);
    let model = this.owner.lookup('service:store').createRecord('battlable');
    service.addCandidate(model);
    assert.equal(service.candidates.length, 1);
  });

  test('it able to remove candidate', function(assert) {
    let service: BattleManagerService = this.owner.lookup('service:battle-manager');
    assert.equal(service.candidates.length, 0);
    let model = this.owner.lookup('service:store').createRecord('battlable');
    service.addCandidate(model);
    assert.equal(service.candidates.length, 1);
    service.removeCandidate(model);
    assert.equal(service.candidates.length, 0);
  });


  test('it able to create battle', function(assert) {
    let service: BattleManagerService = this.owner.lookup('service:battle-manager');
    assert.equal(service.candidates.length, 0);
    let model = this.owner.lookup('service:store').createRecord('battlable');
    service.addCandidate(model);
    assert.equal(service.candidates.length, 1);
    const battle = service.createBattle();
    assert.equal(battle.name, 'default battle');
    assert.equal(service.candidates.length, 0);
  });

  test('it able to create battle with custom name', function(assert) {
    let service: BattleManagerService = this.owner.lookup('service:battle-manager');
    assert.equal(service.candidates.length, 0);
    let model = this.owner.lookup('service:store').createRecord('battlable');
    service.addCandidate(model);
    assert.equal(service.candidates.length, 1);
    const battle = service.createBattle('foo');
    assert.equal(battle.name, 'foo');
    assert.equal(service.candidates.length, 0);
  });

});
