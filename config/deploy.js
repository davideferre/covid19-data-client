/* eslint-env node */
'use strict';

module.exports = (deployTarget) => {
  var ENV = {};

  if (deployTarget === 'production') {
    ENV['build'] = {
      environment: 'production',
    };

    ENV['simply-ssh'] = {
      connection: {
        host: process.env.SSH_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        privateKey: process.env.SSH_KEY,
      },
      dir: process.env.DESTINATION_DIR,
      keep: 2,
    };
  }

  return ENV;
};
