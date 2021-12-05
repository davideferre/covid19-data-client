import Route from '@ember/routing/route';

import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service serviceWorkerUpdateNotify;

  beforeModel() {
    let _oAppConfig = getOwner(this).resolveRegistration('config:environment');
    if (_oAppConfig.environment === 'production') {
      this.serviceWorkerUpdateNotify.on('update', () => {
        window.location.reload();
      });
    }
  }
}
