import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | region-selector', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders italian regions selector', async function (assert) {
    await render(hbs`<RegionSelector />`);

    assert.dom('[data-test-region-option]').exists({ count: 22 });
    assert.dom('[data-test-region-option="-1"]').hasText('-Seleziona regione-');
    assert.dom('[data-test-region-option="1"]').hasText('Piemonte');
    assert.dom('[data-test-region-option="11"]').hasText('Marche');
    assert.dom('[data-test-region-option="22"]').hasText('P.A. Trento');
  });
});
