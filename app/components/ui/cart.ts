import Component from '@glimmer/component';
import BattlableModel from 'star-wars-dashboard/models/battlable';
import { inject as service } from '@ember/service';
import BattleManagerService from 'star-wars-dashboard/services/battle-manager';
import { action } from '@ember/object';

interface UiCartArgs {
  model: BattlableModel;
}

const EXCLUDED_ATTRIBUTES = ['name'];

export default class UiCart extends Component<UiCartArgs> {
  @service('battle-manager') battleManager!: BattleManagerService;
  get isCandidate() {
    return this.battleManager.candidates.includes(this.model);
  }
  get model() {
    return this.args.model;
  }
  get modelFields() {
    const fields: { name: string, value: unknown }[] = [];
    const model = this.model;
    model.eachAttribute((name: string) => {
      if (!EXCLUDED_ATTRIBUTES.includes(name)) {
        fields.push({
          name,
          value: model[name as keyof BattlableModel]
        })
      }
    });
    return fields;
  }
  @action toggleBattle() {
    if (this.isCandidate) {
      this.battleManager.removeCandidate(this.model);
    } else {
      this.battleManager.addCandidate(this.model);
    }
  }
}
