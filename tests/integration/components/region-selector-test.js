import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | region-selector', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders italian regions selector', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RegionSelector />`);

    assert.dom('[data-test-region-option]').exists({ count: 22 });
  });
});
