import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | trend-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders trend title and label', async function (assert) {
    assert.expect(2);
    this.set('title', 'title');
    this.set('label', 'label');

    await render(
      hbs`<TrendCard @title={{this.title}} @label={{this.label}} />`
    );

    assert.dom('[data-test-title]').hasText('title');
    assert.dom('[data-test-label]').hasText('label');
  });

  test('it renders greater trend with greater option', async function (assert) {
    assert.expect(3);

    this.set('trend', 1);
    this.set('greater', true);

    await render(
      hbs`<TrendCard @trend={{this.trend}} @greater={{this.greater}} />`
    );

    assert.dom('[data-test-trend-greater]').exists();
    assert.dom('[data-test-trend-lower]').doesNotExist();
    assert.dom('[data-test-trend-greater]').hasClass('text-success');
  });

  test('it renders greater trend with lower option', async function (assert) {
    assert.expect(3);

    this.set('trend', 1);
    this.set('greater', false);

    await render(
      hbs`<TrendCard @trend={{this.trend}} @greater={{this.greater}} />`
    );

    assert.dom('[data-test-trend-greater]').exists();
    assert.dom('[data-test-trend-lower]').doesNotExist();
    assert.dom('[data-test-trend-greater]').hasClass('text-danger');
  });

  test('it renders lower trend with greater option', async function (assert) {
    assert.expect(3);

    this.set('trend', -1);
    this.set('greater', true);

    await render(
      hbs`<TrendCard @trend={{this.trend}} @greater={{this.greater}} />`
    );

    assert.dom('[data-test-trend-lower]').exists();
    assert.dom('[data-test-trend-greater]').doesNotExist();
    assert.dom('[data-test-trend-lower]').hasClass('text-danger');
  });

  test('it renders lower trend with lower option', async function (assert) {
    assert.expect(3);

    this.set('trend', -1);
    this.set('greater', false);

    await render(
      hbs`<TrendCard @trend={{this.trend}} @greater={{this.greater}} />`
    );

    assert.dom('[data-test-trend-lower]').exists();
    assert.dom('[data-test-trend-greater]').doesNotExist();
    assert.dom('[data-test-trend-lower]').hasClass('text-success');
  });

  test('it renders zero trend', async function (assert) {
    assert.expect(2);

    this.set('trend', 0);

    await render(hbs`<TrendCard @trend={{this.trend}}/>`);

    assert.dom('[data-test-trend-greater]').doesNotExist();
    assert.dom('[data-test-trend-lower]').doesNotExist();
  });
});
