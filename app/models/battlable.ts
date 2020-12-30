import Model from '@ember-data/model';
export default class BattlableModel extends Model {
  declare public battleValue: number;
  declare public name: string;
  get wins(): number {
    return this.store.peekAll('battle').filterBy('winner', this).length;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'battlable': BattlableModel;
  }
}
