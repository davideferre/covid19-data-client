import Controller from '@ember/controller';

import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked appVersion;
  @tracked appVersionShort;

  constructor() {
    super(...arguments);
    let _oConfig = getOwner(this).resolveRegistration('config:environment');
    this.appVersion = _oConfig.APP.version;
    this.appVersionShort = this.appVersion.split('+')[0];
  }
}
