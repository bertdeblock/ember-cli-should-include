import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | included-nested', function (hooks) {
  setupRenderingTest(hooks);

  test('included-nested', async function (assert) {
    await render(hbs`<IncludedNested />`);

    assert.ok(true);
  });
});
