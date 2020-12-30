import { attr } from '@ember-data/model';
import BattlableModel from './battlable';

export default class StarshipModel extends BattlableModel {
  @attr('number') crew!: number;
  get battleValue() {
    return this.crew;
  }

  @attr('string') consumables!: string;
  @attr('string') manufacturer!: string;
  @attr('string') model!: string;
  @attr('string') name!: string;
  @attr('string') starshipClass!: string;
  @attr('string') maxAtmospheringSpeed!: string;

  @attr('number') cargoCapacity!: number;
  @attr('number') costInCredits!: number;
  @attr('number') hyperdriveRating!: number;
  @attr('number') length!: number;
  @attr('number') passengers!: number;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'starship': StarshipModel;
  }
}
