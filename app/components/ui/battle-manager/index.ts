import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import StoreService from '@ember-data/store';
import BattleManagerService from 'star-wars-dashboard/services/battle-manager';
import BattlableModel from 'star-wars-dashboard/models/battlable';

interface IUiBattleManagerComponentArgs {
  mode: string;
  setMode: () => void;
}
export default class UiBattleManagerComponent extends Component<IUiBattleManagerComponentArgs> {
  @service('store') store!: StoreService;
  @service('battle-manager') battleManager!: BattleManagerService;

  @tracked battleName = '';
  @tracked mode = 'people';

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

  get models() {
    if (this.mode === 'people') {
      return this.peoples;
    } else if (this.mode === 'starship') {
      return this.starships;
    } else {
      return this.battlables;
    }
  }

  @action addFirstBattleItem(item: BattlableModel) {
    this.battleManager.removeCandidate(this.firstItem as BattlableModel);
    this.battleManager.addCandidate(item);
    this.firstItem = item;
    this.autocompleteBattleName();
  }

  @action addSecondBattleItem(item: BattlableModel) {
    this.battleManager.removeCandidate(this.secondItem as BattlableModel);
    this.battleManager.addCandidate(item);
    this.secondItem = item;
    this.autocompleteBattleName();
  }

  @action updateBattleName(event: { target: HTMLInputElement }) {
    this.battleName = event.target.value;
  }

  @action createBattle() {
    this.battleManager.createBattle(this.battleName);
    this.resetState();
  }

  @action setMode(mode: string) {
    this.args.setMode(mode);
    this.resetState();
  }

  resetState() {
    this.firstItem = null;
    this.secondItem = null;
    this.battleName = '';
  }

  autocompleteBattleName() {
    this.battleName = [this.firstItem?.name ?? '...', this.secondItem?.name ?? '...'].join(' VS ');
  }

  get validationMessage() {
    if (!this.firstItem) {
      return 'First competitor should be selected';
    }
    if (!this.secondItem) {
      return 'Second competitor should be selected';
    }
    if (!this.battleName) {
      return 'Battle name should not be empty';
    }
    return false;
  }

  get canCreateBattle() {
    return this.battleManager.candidates.length > 1 && this.battleName;
  }
}
