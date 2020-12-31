import beautifyAttributeName from 'star-wars-dashboard/utils/beautify-attribute-name';
import { module, test } from 'qunit';

module('Unit | Utility | beautify-attribute-name', function() {

  // TODO: Replace this with your real tests.
  test('it works', function(assert) {
    const cases = {
      'fooBar': 'foo bar',
      'FooBar': 'foo bar'
    };
    for (const [key, value] of Object.entries(cases)) {
      assert.equal(beautifyAttributeName(key), value);
    }
  });
});
