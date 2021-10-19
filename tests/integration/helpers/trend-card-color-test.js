import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | trend-card-color', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders bg-yellow-500 with greater set to true', async function (assert) {
    this.set('trend', 0);
    this.set('isGreater', true);

    await render(hbs`{{trend-card-color this.trend isGreater=this.isGreater}}`);

    assert.dom(this.element).hasText('bg-yellow-500');
  });

  test('it renders bg-green-500 with greater set to true', async function (assert) {
    this.set('trend', 1);
    this.set('isGreater', true);

    await render(hbs`{{trend-card-color this.trend isGreater=this.isGreater}}`);

    assert.dom(this.element).hasText('bg-green-500');
  });

  test('it renders bg-red-500 with greater set to true', async function (assert) {
    this.set('trend', -1);
    this.set('isGreater', true);

    await render(hbs`{{trend-card-color this.trend isGreater=this.isGreater}}`);

    assert.dom(this.element).hasText('bg-red-500');
  });

  test('it renders bg-yellow-500 with greater set to false', async function (assert) {
    this.set('trend', 0);
    this.set('isGreater', false);

    await render(hbs`{{trend-card-color this.trend isGreater=this.isGreater}}`);

    assert.dom(this.element).hasText('bg-yellow-500');
  });

  test('it renders bg-green-500 with greater set to false', async function (assert) {
    this.set('trend', -1);
    this.set('isGreater', false);

    await render(hbs`{{trend-card-color this.trend isGreater=this.isGreater}}`);

    assert.dom(this.element).hasText('bg-green-500');
  });

  test('it renders bg-red-500 with greater set to false', async function (assert) {
    this.set('trend', 1);
    this.set('isGreater', false);

    await render(hbs`{{trend-card-color this.trend isGreater=this.isGreater}}`);

    assert.dom(this.element).hasText('bg-red-500');
  });
});
