import Model, { attr } from '@ember-data/model';

export default class NationModel extends Model {
    @attr('date') time;
    @attr('number') nuovi_positivi;
    @attr('number') variazione_totale_positivi;
    @attr('number') terapia_intensiva;
    @attr('number') ingressi_terapia_intensiva;
    @attr('number') deceduti;
    @attr('number') tamponi;
}
