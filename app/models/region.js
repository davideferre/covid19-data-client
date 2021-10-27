import Model, { attr } from '@ember-data/model';

export default class RegionModel extends Model {
  @attr('date') time;
  @attr('string', { defaultValue: 0 }) denominazione_regione;
  @attr('string', { defaultValue: 0 }) codice_regione;
  @attr('number', { defaultValue: 0 }) nuovi_positivi;
  @attr('number', { defaultValue: 0 }) variazione_totale_positivi;
  @attr('number', { defaultValue: 0 }) terapia_intensiva;
  @attr('number', { defaultValue: 0 }) ingressi_terapia_intensiva;
  @attr('number', { defaultValue: 0 }) deceduti;
  @attr('number', { defaultValue: 0 }) tamponi;
  @attr('number', { defaultValue: 0 }) trend_nuovi_positivi;
  @attr('number', { defaultValue: 0 }) incremento_tamponi;
  @attr('number', { defaultValue: 0 }) trend_tamponi;
  @attr('number', { defaultValue: 0 }) incremento_deceduti;
  @attr('number', { defaultValue: 0 }) trend_deceduti;
  @attr('number', { defaultValue: 0 }) variazione_terapia_intensiva;
  @attr('number', { defaultValue: 0 }) tasso_positivi;
  @attr('number', { defaultValue: 0 }) trend_tasso_positivi;
}
