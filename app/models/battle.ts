import Model, { hasMany } from '@ember-data/model';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';
import BattlableModel from './battlable';

export default class BattleModel extends Model  {
  date = new Date();
  @hasMany('battlable', { polymorphic: true, async: false }) battlables!: DS.SyncHasMany<BattlableModel>;
  get winner(): BattlableModel | null {
    if (this.battlables.length == 0) {
      return null;
    }
    if (this.battlables.length < 2) {
      return this.battlables[0];
    }
    const sortedItems =  this.battlables.toArray().sort((itemA: BattlableModel, itemB: BattlableModel)=> {
      return itemB.battleValue - itemA.battleValue;
    });
    return sortedItems[0];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'battle': BattleModel;
  }
}
