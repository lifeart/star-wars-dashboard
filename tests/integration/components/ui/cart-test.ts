import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';

module('Integration | Component | ui/cart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders people model', async function(assert) {

    const store = this.owner.lookup('service:store');
    const model = run(() => store.createRecord('people', { name: 'foo' }));

    this.set('model', model);

    await render(hbs`<Ui::Cart @model={{this.model}} />`);

    assert.dom('[data-test-battlable-name]').hasText('foo');
    assert.dom('[data-test-field]').exists({count: 6});
  });

  test('it renders starship model', async function(assert) {

    const store = this.owner.lookup('service:store');
    const model = run(() => store.createRecord('starship', { name: 'foo' }));

    this.set('model', model);

    await render(hbs`<Ui::Cart @model={{this.model}} />`);

    assert.dom('[data-test-battlable-name]').hasText('foo');
    assert.dom('[data-test-field]').exists({count: 11});
  });


  test('it renders N/A for empty field value', async function(assert) {

    const store = this.owner.lookup('service:store');
    const model = run(() => store.createRecord('starship', { name: 'foo' }));

    this.set('model', model);

    await render(hbs`<Ui::Cart @model={{this.model}} />`);
    assert.dom('[data-test-value]').hasText('N/A');
  });
});
