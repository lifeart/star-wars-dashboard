import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';

module('Integration | Component | ui/battle-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    const store = this.owner.lookup('service:store');

    this.set('battles', [
      run(() => store.createRecord('battle')),
      run(() => store.createRecord('battle'))
    ]);

    await render(hbs`<Ui::BattleList @battles={{this.battles}} />`);

    assert.dom('[data-test-battles-count]').hasText('2');
    assert.dom('[data-test-battle]').exists({count: 2});
  });
});
