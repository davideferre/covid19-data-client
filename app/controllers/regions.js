import Controller from '@ember/controller';

import { tracked } from '@glimmer/tracking';

export default class RegionsController extends Controller {
  queryParams = ['period'];
  @tracked period = '30';
}
