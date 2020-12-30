import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import StoreService from '@ember-data/store';
export default class BattleConstructorController extends Controller {
  @service('store') store!: StoreService;

  queryParams = ['mode']
  @tracked mode = 'people';

  @action setMode(mode: string) {
    this.mode = mode;
  }

  get battles() {
    return this.store.peekAll('battle').toArray().sortBy('date').reverse();
  }
}
