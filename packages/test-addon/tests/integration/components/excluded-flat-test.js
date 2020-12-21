import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | excluded-flat', function (hooks) {
  setupRenderingTest(hooks);

  test('excluded-flat', function (assert) {
    assert.notOk(this.owner.hasRegistration('component:excluded-flat'));
  });
});
