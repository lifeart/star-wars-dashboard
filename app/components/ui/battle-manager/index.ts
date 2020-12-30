import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import StoreService from '@ember-data/store';
import BattleManagerService from 'star-wars-dashboard/services/battle-manager';
import BattlableModel from 'star-wars-dashboard/models/battlable';

export default class UiBattleManagerComponent extends Component {
  @service('store') store!: StoreService;
  @service('battle-manager') battleManager!: BattleManagerService;

  @tracked battleName = '';

  @tracked firstItem: BattlableModel | null = null;
  @tracked secondItem: BattlableModel | null = null;

  get peoples() {
    return this.store.peekAll('people');
  }

  get starships() {
    return this.store.peekAll('starship');
  }

  get battlables(): BattlableModel[] {
    return [ ...this.peoples.toArray(), ...this.starships.toArray() ];
  }

  @action addFirstBattleItem(item: BattlableModel) {
    this.battleManager.removeCandidate(this.firstItem as BattlableModel);
    this.battleManager.addCandidate(item);
    this.firstItem = item;
  }

  @action addSecondBattleItem(item: BattlableModel) {
    this.battleManager.removeCandidate(this.secondItem as BattlableModel);
    this.battleManager.addCandidate(item);
    this.secondItem = item;
  }

  @action updateBattleName(event: { target: HTMLInputElement }) {
    this.battleName = event.target.value;
  }

  @action createBattle() {
    this.battleManager.createBattle(this.battleName);
  }

  get canCreateBattle() {
    return this.battleManager.candidates.length > 1;
  }
}
