import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dashboard', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Dashboard />`);

    assert.dom('.card-subtitle').exists({ count: 4 });

    assert.dom('[data-test-label="Nuovi positivi"]').exists();
    assert.dom('[data-test-label="Tamponi"]').exists();
    assert.dom('[data-test-label="Tasso positivi"]').exists();
    assert.dom('[data-test-label="Deceduti"]').exists();
    assert.dom('[data-test-title="Terapie intensive"]').exists();
    assert.dom('[data-test-chart-title="Nuovi positivi"]').exists();
    assert.dom('[data-test-chart-title="Tasso positivi"]').exists();
    assert.dom('[data-test-chart-title="Terapie intensive"]').exists();
    assert.dom('[data-test-chart-title="Incremento deceduti"]').exists();
  });
});
