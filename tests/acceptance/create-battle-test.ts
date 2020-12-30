import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { selectChoose } from 'ember-power-select/test-support/helpers'

module('Acceptance | create battle', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / for peoples', async function(assert) {
    await visit('');

    assert.equal(currentURL(), '/battle-constructor');

    assert.dom('[data-test-link]').exists({count: 2});

    await selectChoose('[data-test-select-1]', '.ember-power-select-option', 1);
    await selectChoose('[data-test-select-2]', '.ember-power-select-option', 2);

    await click('[data-test-create-button]')

    assert.dom('[data-test-link]').exists({count: 3});
  });

  test('visiting / for starships', async function(assert) {
    await visit('');

    assert.equal(currentURL(), '/battle-constructor');

    await click('[data-test-mode="starship"]');

    assert.equal(currentURL(), '/battle-constructor?mode=starship');


    assert.dom('[data-test-link]').exists({count: 2});

    await selectChoose('[data-test-select-1]', '.ember-power-select-option', 1);
    await selectChoose('[data-test-select-2]', '.ember-power-select-option', 2);

    await click('[data-test-create-button]')

    assert.dom('[data-test-link]').exists({count: 3});
  });


  test('visiting / for mixed', async function(assert) {
    await visit('');

    assert.equal(currentURL(), '/battle-constructor');

    await click('[data-test-mode="mixed"]');

    assert.equal(currentURL(), '/battle-constructor?mode=mixed');

    assert.dom('[data-test-link]').exists({count: 2});

    await selectChoose('[data-test-select-1]', '.ember-power-select-option', 1);
    await selectChoose('[data-test-select-2]', '.ember-power-select-option', 2);

    await click('[data-test-create-button]')

    assert.dom('[data-test-link]').exists({count: 3});
  });


});
