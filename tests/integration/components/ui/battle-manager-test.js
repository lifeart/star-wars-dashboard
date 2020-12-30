import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';
import { selectChoose } from 'ember-power-select/test-support/helpers'


module('Integration | Component | ui/battle-manager', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    const store = this.owner.lookup('service:store');

    assert.equal(store.peekAll('battle').length, 0);

    this.setProperties({
      setMode: () => {
        // NOOP
      },
      people: [
        run(() => store.createRecord('people', { id: 1, name: 'Luke' })),
        run(() => store.createRecord('people', { id: 2, name: 'R2D2' }))
      ],
      starships: []
    })

    await render(hbs`<Ui::BattleManager
      @starships={{this.starships}}
      @people={{this.people}}
      @mode="people"
      @setMode={{this.setMode}} />`);

    assert.dom('[data-test-alert]').exists();

    assert.dom('[data-test-create-button]').hasAttribute('disabled');

    assert.dom('[data-test-name]').hasValue('');

    await selectChoose('[data-test-select-1]', '1# Luke');

    assert.dom('[data-test-name]').hasValue('Luke VS ...');

    await selectChoose('[data-test-select-2]', '2# R2D2');

    assert.dom('[data-test-name]').hasValue('Luke VS R2D2');

    assert.dom('[data-test-create-button]').hasNoAttribute('disabled');

    assert.dom('[data-test-alert]').doesNotExist();

    await fillIn('[data-test-name]', '');

    assert.dom('[data-test-alert]').exists();

    assert.dom('[data-test-create-button]').hasAttribute('disabled');

    await fillIn('[data-test-name]', 'Mega Battle!');

    await click('[data-test-create-button]');

    assert.equal(store.peekAll('battle').length, 1);

  });
});
