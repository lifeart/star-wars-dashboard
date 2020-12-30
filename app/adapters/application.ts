import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class Application extends JSONAPIAdapter {
  namespace = 'api';
  host = 'https://swapi.dev';
  get headers() {
    return {
      accept: 'application/json'
    }
  }
  _buildURL(modelName: string, id: string) {
    return super._buildURL(modelName, id) + '/';
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    'application': Application;
  }
}
