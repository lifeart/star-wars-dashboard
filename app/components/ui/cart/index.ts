import Component from '@glimmer/component';
import BattlableModel from 'star-wars-dashboard/models/battlable';

interface UiCartArgs {
  model: BattlableModel;
}

const EXCLUDED_ATTRIBUTES = ['name'];

export default class UiCart extends Component<UiCartArgs> {
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
          value: model[name as keyof BattlableModel] ?? 'N/A'
        })
      }
    });
    return fields;
  }
}
