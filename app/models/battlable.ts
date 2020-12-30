import Model from '@ember-data/model';
export default class BattlableModel extends Model {
  declare public battleValue: number;
  declare public name: string;
  get wins(): number {
    return this.battles.filterBy('winner', this).length;
  }
  get battles() {
    return this.store.peekAll('battle').filter((battle) => {
      return battle.battlables.includes(this);
    });
  }
  get looses() {
    return this.battles.length - this.wins;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'battlable': BattlableModel;
  }
}
