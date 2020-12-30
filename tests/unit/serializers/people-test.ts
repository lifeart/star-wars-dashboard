import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import PeopleSerializer from 'star-wars-dashboard/serializers/people';
import StoreService from '@ember-data/store';

module('Unit | Serializer | people', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer: PeopleSerializer = store.serializerFor('people');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = run(() => store.createRecord('people', {}));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

  test('it support starwars api', function(assert) {
    let store: StoreService = this.owner.lookup('service:store');
    let people = store.modelFor('people');
    let serializer: PeopleSerializer = store.serializerFor('people');
    const inputPayload = {
      results: [
        { url: 'https://foo/4/', name: 'Luke' }
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
              "name": "Luke"
            },
            "id": "4",
            "relationships": {},
            "type": "people"
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
            "name": "Luke",
            "url": "https://foo/4/"
          }
        ]
    });
  });


  test('it has correct modelName', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer: PeopleSerializer = store.serializerFor('people');

    assert.equal(serializer.modelName, 'people');
  });
});
