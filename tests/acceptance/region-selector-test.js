import { module, test } from 'qunit';
import { visit, currentURL, select, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | region selector', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / selecting a region and returning to index', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    await select('[data-test-region-selector]', '1');
    await settled();
    assert.strictEqual(currentURL(), '/regions/1');
    await select('[data-test-region-selector]', '-1');
    await settled();
    assert.strictEqual(currentURL(), '/');
  });
});
