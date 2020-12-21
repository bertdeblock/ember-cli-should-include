import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | excluded-nested', function (hooks) {
  setupRenderingTest(hooks);

  test('excluded-nested', function (assert) {
    assert.notOk(this.owner.hasRegistration('component:excluded-nested'));
  });
});
