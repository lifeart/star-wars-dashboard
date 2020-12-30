import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui/battle-manager/button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Ui::BattleManager::Button data-test-btn>Foo</Ui::BattleManager::Button>`);

    assert.dom('[data-test-btn]').hasText('Foo');
  });

  test('it able to switch classes', async function(assert) {

    this.set('mode', 'foo');

    await render(hbs`<Ui::BattleManager::Button @mode="foo" @activeMode={{this.mode}} data-test-btn>Foo</Ui::BattleManager::Button>`);

    assert.dom('[data-test-btn]').hasClass('btn-primary');

    this.set('mode', 'bar');

    assert.dom('[data-test-btn]').hasClass('btn-default');
  });

  test('it support event emitting', async function(assert) {

    assert.expect(1);

    this.set('onClick', () => {
      assert.ok('clicked');
    });

    await render(hbs`<Ui::BattleManager::Button @onClick={{this.onClick}} data-test-btn>Foo</Ui::BattleManager::Button>`);

    await click('[data-test-btn]');
  });
});
