import Service, { inject as service } from '@ember/service';

import { isEmpty } from '@ember/utils';

export default class DataTrendsService extends Service {
  @service store;

  async getNation(iLimit) {
    let _aNationData;
    try {
      if (isEmpty(iLimit)) {
        _aNationData = await this.store.findAll('nation');
      } else {
        _aNationData = await this.store.query('nation', {
          limit: iLimit,
        });
      }
    } catch (oError) {
      _aNationData = [];
    }
    return this._getTrends(_aNationData);
  }

  async getRegion(sRegionCode, sLimit) {
    let _aRegionQueryParams = {};
    if (!isEmpty(sRegionCode)) {
      _aRegionQueryParams['region'] = sRegionCode;
    }
    if (!isEmpty(sLimit)) {
      _aRegionQueryParams['limit'] = sLimit;
    }
    let _aRegionData;
    try {
      _aRegionData = await this.store.query('region', _aRegionQueryParams);
    } catch (oError) {
      _aRegionData = [];
    }
    return this._getTrends(_aRegionData);
  }

  _getTrends(aData) {
    let _nNuoviPositiviOld;
    let _nTamponiOld;
    let _nIncrementoTamponiOld;
    let _nDecedutiOld;
    let _nIncrementoDecedutiOld;
    let _nTerapiaIntensivaOld;
    let _nTassoPositiviOld;
    let _aData = [];
    aData.forEach((oData) => {
      if (oData.nuovi_positivi) {
        if (isEmpty(_nNuoviPositiviOld)) {
          oData['trend_nuovi_positivi'] = null;
        } else {
          oData['trend_nuovi_positivi'] =
            oData.nuovi_positivi - _nNuoviPositiviOld;
        }
        _nNuoviPositiviOld = oData.nuovi_positivi;
      }
      if (oData.tamponi) {
        if (isEmpty(_nTamponiOld)) {
          oData['incremento_tamponi'] = null;
          oData['trend_tamponi'] = null;
        } else {
          oData['incremento_tamponi'] = oData.tamponi - _nTamponiOld;
          oData['trend_tamponi'] =
            oData.incremento_tamponi - _nIncrementoTamponiOld;
        }
        _nIncrementoTamponiOld = oData.incremento_tamponi;
        _nTamponiOld = oData.tamponi;
      }
      if (oData.deceduti) {
        if (isEmpty(_nDecedutiOld)) {
          oData['incremento_deceduti'] = null;
          oData['trend_deceduti'] = null;
        } else {
          oData['incremento_deceduti'] = oData.deceduti - _nDecedutiOld;
          oData['trend_deceduti'] =
            oData.incremento_deceduti - _nIncrementoDecedutiOld;
        }
        _nDecedutiOld = oData.deceduti;
        _nIncrementoDecedutiOld = oData.incremento_deceduti;
      }
      if (oData.terapia_intensiva) {
        if (isEmpty(_nTerapiaIntensivaOld)) {
          oData['variazione_terapia_intensiva'] = null;
        } else {
          oData['variazione_terapia_intensiva'] =
            oData.terapia_intensiva - _nTerapiaIntensivaOld;
        }
        _nTerapiaIntensivaOld = oData.terapia_intensiva;
      }
      if (oData.nuovi_positivi && oData.incremento_tamponi) {
        oData['tasso_positivi'] =
          Math.floor(
            (oData.nuovi_positivi / oData.incremento_tamponi) * 10000
          ) / 100;
        if (oData.tasso_positivi < 0) {
          oData['tasso_positivi'] = 0;
        }
        if (isEmpty(_nTassoPositiviOld)) {
          oData['trend_tasso_positivi'] = 0;
        } else {
          oData['trend_tasso_positivi'] =
            oData.tasso_positivi - _nTassoPositiviOld;
        }
        _nTassoPositiviOld = oData.tasso_positivi;
      }
      _aData.unshift(oData);
    });
    return _aData;
  }
}
