import Ember from 'ember';
import IssuesCloseControllerMixin from 'dispatcher/mixins/issues-close-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | issues close controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesCloseControllerObject = Ember.Object.extend(IssuesCloseControllerMixin);
  let subject = IssuesCloseControllerObject.create();
  assert.ok(subject);
});
