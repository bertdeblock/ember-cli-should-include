import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | included-flat', function (hooks) {
  setupRenderingTest(hooks);

  test('included-flat', async function (assert) {
    await render(hbs`<IncludedFlat />`);

    assert.ok(true);
  });
});
