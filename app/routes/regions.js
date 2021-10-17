import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class RegionsRoute extends Route {
  @service dataTrends;

  async model(params) {
    if (isEmpty(params.period)) {
      params.period = '30';
    }
    if (params.period === 'all') {
      params.period = null;
    }
    return this.dataTrends.getRegion(params.region, params.period);
  }
}
