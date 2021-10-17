import Controller from '@ember/controller';

import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  queryParams = ['period'];
  @tracked period = '30';
}
