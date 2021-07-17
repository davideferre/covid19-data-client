import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | date-format', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders date', async function (assert) {
    this.set('inputValue', 'Fri Apr 09 2021 17:00:00 GMT+0200');

    await render(
      hbs`{{date-format this.inputValue language='it-IT' type='date'}}`
    );

    assert.equal(this.element.textContent.trim(), '09/04/2021');
  });

  test('it renders datetime', async function (assert) {
    this.set('inputValue', 'Fri Apr 09 2021 17:00:00 GMT+0200');

    await render(
      hbs`{{date-format this.inputValue language='it-IT' type='datetime'}}`
    );

    assert.equal(this.element.textContent.trim(), '09/04/2021, 17:00:00');
  });

  test('it does not renders with invalid date', async function (assert) {
    this.set('inputValue', 'test');

    await render(
      hbs`{{date-format this.inputValue language='it-IT' type='date'}}`
    );

    assert.equal(this.element.textContent.trim(), '');
  });
});
