import JSONAPISerializer from '@ember-data/serializer/json-api';
import Model from '@ember-data/model';
import Store from '@ember-data/store';
import { underscore } from '@ember/string';

export default class ApplicationSerializer extends JSONAPISerializer {
  normalizeResponse(_store: Store, _primaryModelClass: Model, payload: any) {
    payload.data = payload.results;
    payload.meta = {
      count: payload.count,
      next: payload.next,
      previous: payload.previous
    }
    payload.links = {
      next: payload.next
    }
    return super.normalizeResponse(...arguments);
  }
  keyForAttribute(attr: string) {
    return underscore(attr);
  }
  modelName = 'unknown';
  _normalizeResourceHelper(resourceHash: any) {
    const item = {
      id: resourceHash.url.split('/').filter((el: string)=> el.length).pop(),
      type: this.modelName,
      attributes: {
        ... resourceHash
      }
    }
    return super._normalizeResourceHelper(item);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    'application': ApplicationSerializer;
  }
}
