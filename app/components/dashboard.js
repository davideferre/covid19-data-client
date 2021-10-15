import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardComponent extends Component {
  @service dataTrends;

  @tracked trendsData;
  @tracked chartData;

  constructor() {
    super(...arguments);
    // let _oDate = new Date();
    // _oDate.setDate(_oDate.getDate() - 1);
    // let _sFrom = _oDate.toISOString().split('T')[0];
    // let _sTo = new Date().toISOString().split('T')[0];
    let _sFrom = '2021-04-16';
    let _sTo = '2021-04-17';
    this.dataTrends
      .getNation(_sFrom, _sTo)
      .then((data) => {
        this.trendsData = data;
      })
      .catch(() => {
        this.trendsData = [];
      });
    // _oDate = new Date();
    // _oDate.setFullYear(_oDate.getFullYear() - 1);
    // _sFrom = _oDate.toISOString().split('T')[0];
    _sFrom = '2020-04-17';
    this.dataTrends
      .getNation(_sFrom, _sTo)
      .then((data) => {
        this.chartData = data;
      })
      .catch(() => {
        this.chartData = [];
      });
  }
}
