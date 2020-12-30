import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { typeInSearch, clickTrigger } from 'ember-power-select/test-support/helpers'



module('Integration | Component | ui/battle-manager/generic-mode', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    assert.expect(4);

    this.setProperties({
      firstItem: null,
      secondItem: null,
      models: [
        {name: 'foo', id: 1},
        {name: 'boo', id: 2}
      ],
      addFirstBattleItem: (item) => {
        assert.ok('firstItemClicked');
        assert.equal(item, this.models[0])
      },
      addSecondBattleItem: (item) => {
        assert.ok('secondItemClicked');
        assert.equal(item, this.models[1])
      }
    })

    await render(hbs`<Ui::BattleManager::GenericMode
      @firstItem={{this.firstItem}}
      @secondItem={{this.secondItem}}
      @models={{this.models}}
      @addFirstBattleItem={{this.addFirstBattleItem}}
      @addSecondBattleItem={{this.addSecondBattleItem}}
    />`);


    await clickTrigger('[data-test-select-1]');

    await typeInSearch('foo');

    await click('.ember-power-select-option');


    await clickTrigger('[data-test-select-2]');

    await typeInSearch('boo');

    await click('.ember-power-select-option');
  });
});
