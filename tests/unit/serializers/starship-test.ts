import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import StarshipSerializer from 'star-wars-dashboard/serializers/starship';
import PeopleSerializer from 'star-wars-dashboard/serializers/people';
import StoreService from '@ember-data/store';

module('Unit | Serializer | starship', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('starship');

    assert.ok(serializer);
  });

  test('it support starwars api', function(assert) {
    let store: StoreService = this.owner.lookup('service:store');
    let people = store.modelFor('starship');
    let serializer: PeopleSerializer = store.serializerFor('starship');
    const inputPayload = {
      results: [
        { url: 'https://foo/4/', name: 'Star' }
      ],
      count: 1,
      next: null,
      previous: null
    }
    const result = serializer.normalizeResponse(store, people, inputPayload, null, 'query');
    assert.deepEqual(result,
      {
        "count": 1,
        "data": [
          {
            "attributes": {
              "name": "Star"
            },
            "id": "4",
            "relationships": {},
            "type": "starship"
          }
        ],
        "links": {
          "next": null
        },
        "meta": {
          "count": 1,
          "next": null,
          "previous": null
        },
        "next": null,
        "previous": null,
        "results": [
          {
            "name": "Star",
            "url": "https://foo/4/"
          }
        ]
    });
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = run(() => store.createRecord('starship', {}));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

  test('it has correct modelName', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer: StarshipSerializer = store.serializerFor('starship');

    assert.equal(serializer.modelName, 'starship');
  });
});
