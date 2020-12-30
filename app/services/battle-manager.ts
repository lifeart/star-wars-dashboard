import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import BattlableModel from 'star-wars-dashboard/models/battlable';
import { inject as service } from '@ember/service';
import StoreService from '@ember-data/store';
export default class BattleManagerService extends Service {
  @service('store') store!: StoreService;
  @tracked candidates: BattlableModel[] = [];
  addCandidate(candidateModel: BattlableModel) {
    this.candidates = [...this.candidates, candidateModel];
  }
  removeCandidate(candidateModel: BattlableModel) {
    this.candidates = this.candidates.filter((el)=> el !== candidateModel);
  }
  createBattle(name = 'default battle') {
    this.store.createRecord('battle', {
      id: (this.store.peekAll('battle').length as number) + 1,
      battlables: this.candidates,
      name
    });
    this.candidates = [];
  }
}


// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'battle-manager': BattleManagerService;
  }
}
