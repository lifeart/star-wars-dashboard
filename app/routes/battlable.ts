import Route from '@ember/routing/route';

export default class BattlableRoute extends Route {
  model() {
    this.transitionTo('battle-constructor');
  }
}
