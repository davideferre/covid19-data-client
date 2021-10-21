import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class StoricoNazionaleRoute extends Route {
  @service dataTrends;

  async model() {
    return this.dataTrends.getNation();
  }
}
