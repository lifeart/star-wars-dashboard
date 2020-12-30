import { attr } from '@ember-data/model';
import BattlableModel from './battlable';

export default class PeopleModel extends BattlableModel {
  @attr('number') mass!: number;
  get battleValue() {
    return this.mass;
  }
  @attr('string') birthYear!: string;
  @attr('string') gender!: string;
  @attr('string') hairColor!: string;
  @attr('string') skinColor!: string;
  @attr('string') name!: string;
  @attr('number') height!: number;
}


// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'people': PeopleModel;
  }
}
