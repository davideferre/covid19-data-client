import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class StoricoNazionaleRoute extends Route {
  @service store;

  async model() {
    let _aNationData;
    try {
      _aNationData = await this.store.findAll('nation');
    } catch {
      _aNationData = [];
    }
    let _nTamponiOld = 0;
    let _nIncrementoTamponiOld = 0;
    let _nDecedutiOld = 0;
    let _nTerapiaIntensivaOld = 0;
    let _aData = [];
    _aNationData.forEach((oData) => {
      if (oData.tamponi) {
        oData['incremento_tamponi'] = oData.tamponi - _nTamponiOld;
        if (oData.incremento_tamponi > _nIncrementoTamponiOld) {
          oData['trend_tamponi'] = '+';
        } else if (oData.incremento_tamponi === _nIncrementoTamponiOld) {
          oData['trend_tamponi'] = '=';
        } else {
          oData['trend_tamponi'] = '-';
        }
        _nIncrementoTamponiOld = oData.incremento_tamponi;
        _nTamponiOld = oData.tamponi;
      }
      if (oData.deceduti) {
        oData['incremento_deceduti'] = oData.deceduti - _nDecedutiOld;
        _nDecedutiOld = oData.deceduti;
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
      }
      _aData.unshift(oData);
    });
    return _aData;
  }
}
