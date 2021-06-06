import Service from '@ember/service';

import { inject as service } from '@ember/service';

export default class DataTrendsService extends Service {
  @service store;

  async getNation() {
    let _aNationData;
    try {
      _aNationData = await this.store.findAll('nation');
    } catch {
      _aNationData = [];
    }
    return this._getTrends(_aNationData);
  }

  async getRegion(sRegionCode) {
    let _aRegionData;
    try {
      _aRegionData = await this.store.query('region', {
        region: sRegionCode,
      });
    } catch {
      _aRegionData = [];
    }
    return this._getTrends(_aRegionData);
  }

  _getTrends(aData) {
    let _nNuoviPositiviOld = 0;
    let _nTamponiOld = 0;
    let _nIncrementoTamponiOld = 0;
    let _nDecedutiOld = 0;
    let _nIncrementoDecedutiOld = 0;
    let _nTerapiaIntensivaOld = 0;
    let _nTassoPositiviOld = 0;
    let _aData = [];
    aData.forEach((oData) => {
      if (oData.nuovi_positivi) {
        oData['trend_nuovi_positivi'] =
          oData.nuovi_positivi - _nNuoviPositiviOld;
        _nNuoviPositiviOld = oData.nuovi_positivi;
      }
      if (oData.tamponi) {
        oData['incremento_tamponi'] = oData.tamponi - _nTamponiOld;
        oData['trend_tamponi'] =
          oData.incremento_tamponi - _nIncrementoTamponiOld;
        _nIncrementoTamponiOld = oData.incremento_tamponi;
        _nTamponiOld = oData.tamponi;
      }
      if (oData.deceduti) {
        oData['incremento_deceduti'] = oData.deceduti - _nDecedutiOld;
        _nDecedutiOld = oData.deceduti;
        oData['trend_deceduti'] =
          oData.incremento_deceduti - _nIncrementoDecedutiOld;
        _nIncrementoDecedutiOld = oData.incremento_deceduti;
      }
      if (oData.terapia_intensiva) {
        oData['variazione_terapia_intensiva'] =
          oData.terapia_intensiva - _nTerapiaIntensivaOld;
        _nTerapiaIntensivaOld = oData.terapia_intensiva;
      }
      if (oData.nuovi_positivi && oData.incremento_tamponi) {
        oData['tasso_positivi'] =
          Math.floor(
            (oData.nuovi_positivi / oData.incremento_tamponi) * 10000
          ) / 100;
        oData['trend_tasso_positivi'] =
          oData.tasso_positivi - _nTassoPositiviOld;
        _nTassoPositiviOld = oData.tasso_positivi;
      }
      _aData.unshift(oData);
    });
    return _aData;
  }
}
