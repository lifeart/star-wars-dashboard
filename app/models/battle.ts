import Model, { hasMany, attr } from '@ember-data/model';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';
import BattlableModel from './battlable';

export default class BattleModel extends Model  {
  date = new Date();
  @attr('string', { defaultValue() { return 'Unknown Name'; }}) name!: string;
  @hasMany('battlable', { polymorphic: true, async: false }) battlables!: DS.SyncHasMany<BattlableModel>;
  get winner(): BattlableModel | null {
    const battlables = this.battlables.toArray();

    if (battlables.length == 0) {
      return null;
    }
    if (battlables.length < 2) {
      return battlables[0];
    }
    const sortedItems = battlables.sort((itemA: BattlableModel, itemB: BattlableModel)=> {
      return itemB.battleValue - itemA.battleValue;
    });

    const battleValue = sortedItems[0].battleValue;

    if (battlables.filterBy('battleValue', battleValue).length > 1) {
      // if battle values is same, first candidate won, because it's bravest
      return battlables.findBy('battleValue', battleValue) as BattlableModel;
    }

    return sortedItems[0];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'battle': BattleModel;
  }
}
