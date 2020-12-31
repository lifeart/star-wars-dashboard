import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | happy path', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('');

    assert.equal(currentURL(), '/battle-constructor');

    await click('[data-test-link]');

    assert.equal(currentURL(), '/battle/2');

    await click('[data-test-create-battle-link]');

    assert.equal(currentURL(), '/battle-constructor');

    await click('[data-test-battlable-link]');

    assert.equal(currentURL(), '/battlable/2');

    await click('[data-test-create-battle-link]');

    assert.equal(currentURL(), '/battle-constructor');

  });
});
