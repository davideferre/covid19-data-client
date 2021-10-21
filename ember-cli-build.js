'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const isProduction = EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // add extra paths here for components/controllers which include tailwind classes
      './app/index.html',
      './app/templates/**/*.hbs',
      './app/components/**/*.hbs',
    ],
    safelist: ['bg-green-500', 'bg-red-500', 'bg-yellow-500'],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
};

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./app/tailwind/config.js'),
          ...(isProduction ? [purgeCSS] : []),
        ],
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('node_modules/chart.js/dist/chart.min.js', {
    using: [{ transformation: 'amd', as: 'chart.js' }],
  });
  app.import(
    'node_modules/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.min.js',
    {
      using: [{ transformation: 'amd', as: 'chartjs-adapter-date-fns' }],
    }
  );

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack);
};
