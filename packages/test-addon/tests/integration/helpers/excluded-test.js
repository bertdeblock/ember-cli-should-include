import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Helper | excluded', function (hooks) {
  setupRenderingTest(hooks);

  test('excluded', function (assert) {
    assert.notOk(this.owner.hasRegistration('helper:excluded'));
  });
});
