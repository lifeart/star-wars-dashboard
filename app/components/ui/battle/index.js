import Component from '@glimmer/component';

export default class UiBattleComponent extends Component {
  get date() {
    return new Intl.DateTimeFormat().format(this.args.model.date);
  }
}
