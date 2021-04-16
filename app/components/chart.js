import Component from '@glimmer/component';

import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

export default class ChartComponent extends Component {
  chart;
  chartCanvas;
  chartData;
  chartOptions;

  constructor() {
    super(...arguments);
    Chart.register(...registerables);
  }

  onRender(oElement, oParameters) {
    let _self = oParameters[0];
    _self.chartCanvas = oElement;
    _self._drawChart();
  }

  onUpdate(oElement, oParameters) {
    let _self = oParameters[0];
    _self.chartCanvas = oElement;
    _self._drawChart();
  }

  _drawChart() {
    let _aModelData = [];
    let _sDataKey = this.args.dataKey;
    let _aLabels = [];
    this.args.data.forEach((oData) => {
      _aLabels.push(oData.time);
      _aModelData.push({ x: oData.time, y: oData[_sDataKey] });
    });
    let _aDataset = {
      label: this.args.label,
      backgroundColor: this.args.color,
      borderColor: this.args.color,
      data: _aModelData,
    };
    this.chartData = {
      labels: _aLabels,
      datasets: [_aDataset],
    };
    this._createChartElement();
  }

  _createChartElement() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.chart = new Chart(this.chartCanvas, {
      type: this.args.type,
      data: this.chartData,
      options: this._getChartOptions(),
      plugins: [],
    });
  }

  _getChartOptions() {
    return {
      scales: {
        x: {
          type: 'time',
          time: {
            // Luxon format string
            tooltipFormat: 'dd/MM/yyyy',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'value',
          },
        },
      },
    };
  }
}
