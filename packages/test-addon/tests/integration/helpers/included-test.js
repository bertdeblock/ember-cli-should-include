import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | included', function (hooks) {
  setupRenderingTest(hooks);

  test('included', async function (assert) {
    await render(hbs`{{included "input"}}`);

    assert.dom().hasText('input');
  });
});
