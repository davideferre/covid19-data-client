import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class RegionsRoute extends Route {
  @service dataTrends;

  async model(params) {
    return this.dataTrends.getRegion(params.region, 2);
  }
}
