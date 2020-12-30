import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';

module('Integration | Component | ui/battle', function(hooks) {
  setupRenderingTest(hooks);

  test('it able to show winner for people', async function(assert) {
    const store = this.owner.lookup('service:store');

    const model = run(() => store.createRecord('battle', {
      battlables: [
        store.createRecord('people', { id: 1, mass: 11, name: 'Luke' }),
        store.createRecord('starship', { id: 2, crew: 10, name: 'Star' })
      ]
    }));

    this.set('model', model);

    await render(hbs`<Ui::Battle @model={{this.model}} />`);

    assert.dom('[data-test-link]').exists();

    assert.dom('[data-test-winner-name]').hasText('Luke');

    assert.dom('[data-test-battle-uid="1_Luke"] [data-test-wins]').hasText('1');
    assert.dom('[data-test-battle-uid="1_Luke"] [data-test-looses]').hasText('0');
    assert.dom('[data-test-battle-uid="1_Luke"] [data-test-battles]').hasText('1');

    assert.dom('[data-test-battle-uid="2_Star"] [data-test-wins]').hasText('0');
    assert.dom('[data-test-battle-uid="2_Star"] [data-test-looses]').hasText('1');
    assert.dom('[data-test-battle-uid="2_Star"] [data-test-battles]').hasText('1');
  });

  test('it able to show winner for starship', async function(assert) {
    const store = this.owner.lookup('service:store');

    const model = run(() => store.createRecord('battle', {
      battlables: [
        store.createRecord('people', { id: 1, mass: 11, name: 'Luke' }),
        store.createRecord('starship', { id: 2, crew: 12, name: 'Star' })
      ]
    }));

    this.set('model', model);

    await render(hbs`<Ui::Battle @model={{this.model}} />`);

    assert.dom('[data-test-link]').exists();

    assert.dom('[data-test-winner-name]').hasText('Star');

    assert.dom('[data-test-battle-uid="1_Luke"] [data-test-wins]').hasText('0');
    assert.dom('[data-test-battle-uid="1_Luke"] [data-test-looses]').hasText('1');
    assert.dom('[data-test-battle-uid="1_Luke"] [data-test-battles]').hasText('1');

    assert.dom('[data-test-battle-uid="2_Star"] [data-test-wins]').hasText('1');
    assert.dom('[data-test-battle-uid="2_Star"] [data-test-looses]').hasText('0');
    assert.dom('[data-test-battle-uid="2_Star"] [data-test-battles]').hasText('1');
  });
});
