import RESTAdapter from '@ember-data/adapter/rest';

import { getOwner } from '@ember/application';

export default class ApplicationAdapter extends RESTAdapter {
  host;
  namespace;

  constructor() {
    super(...arguments);
    let _oAppConfig =
      getOwner(this).resolveRegistration('config:environment').APP;
    this.host = _oAppConfig.apiBaseUrl;
    this.namespace = _oAppConfig.apiNamespace;
  }
}
