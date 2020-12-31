import Route from '@ember/routing/route';

export default class BattleRoute extends Route {
  model() {
    // model hook should never been called in our case
    // only on page reload, and we don't store items, so, we redirect user to index
    return this.transitionTo('application.index');
  }
}
