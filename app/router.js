import EmberRouter from '@ember/routing/router';
import config from 'star-wars-dashboard/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('battle', { path: 'battle/:battle_id' });
  this.route('battle-constructor');
  this.route('battlable', { path: 'battlable/:battlable_id' });
});
