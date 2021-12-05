'use strict';

module.exports = function (environment) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  if (environment !== 'production') {
    return {};
  }

  return {
    name: 'Dati COVID 19 Italia',
    short_name: 'COVID19 Italian data',
    description: 'Riepilogo dei dati COVID 19 in Italia',
    start_url: 'index.html',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'it-IT',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        sizes: '512x512',
        src: '/assets/icons/maskable_icon_x512.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/assets/icons/maskable_icon_x512.png',
        type: 'image/png',
      },
    ],
    ms: {
      tileColor: '#fff',
    },
  };
};
