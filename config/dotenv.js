/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function (env) {
  return {
    clientAllowedKeys: ['API_BASE_URL', 'API_NAMESPACE'],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), `.env-${env}`),
  };
};
