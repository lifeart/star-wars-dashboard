import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import StoreService from '@ember-data/store';

export default class UiBattleListComponent extends Component {
  @service('store') store!: StoreService;
  get battles() {
    return this.store.peekAll('battle').toArray().sortBy('date').reverse();
  }
}
