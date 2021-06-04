import EmberRouter from '@ember/routing/router';
import config from 'covid19-data-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('storico-nazionale');
  this.route('regions', { path: '/regions/:region' });
});
