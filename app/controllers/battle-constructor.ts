import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BattleConstructorController extends Controller {
  queryParams = ['mode']
  @tracked mode = 'people';

  @action setMode(mode: string) {
    this.mode = mode;
  }
}
