import ApplicationSerializer from './application';

export default class PeopleSerializer extends ApplicationSerializer {
  modelName = 'people';
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    'people': PeopleSerializer;
  }
}
