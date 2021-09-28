import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RegionSelectorComponent extends Component {
  @service router;

  @tracked regionsOptions = [
    { value: '1', label: 'Piemonte' },
    { value: '2', label: 'Valle d’Aosta' },
    { value: '3', label: 'Lombardia' },
    { value: '5', label: 'Veneto' },
    { value: '6', label: 'Friuli V.G' },
    { value: '7', label: 'Liguria' },
    { value: '8', label: 'Emilia Romagna' },
    { value: '9', label: 'Toscana' },
    { value: '10', label: 'Umbria' },
    { value: '11', label: 'Marche' },
    { value: '12', label: 'Lazio' },
    { value: '13', label: 'Abruzzi' },
    { value: '14', label: 'Molise' },
    { value: '15', label: 'Campania' },
    { value: '16', label: 'Puglia' },
    { value: '17', label: 'Basilicata' },
    { value: '18', label: 'Calabria' },
    { value: '19', label: 'Sicilia' },
    { value: '20', label: 'Sardegna' },
    { value: '21', label: 'P.A. Bolzano' },
    { value: '22', label: 'P.A. Trento' },
  ];

  @action
  onRegionChange(oEvent) {
    let _sNewRegion = oEvent.target.value;
    if (_sNewRegion !== '-1') {
      this.router.transitionTo(`/regions/${_sNewRegion}`);
    } else {
      this.router.transitionTo('/');
    }
  }
}
