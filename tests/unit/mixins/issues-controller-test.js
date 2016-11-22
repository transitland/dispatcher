import Ember from 'ember';
import IssuesControllerMixin from 'dispatcher/mixins/issues-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | issues controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesControllerObject = Ember.Object.extend(IssuesControllerMixin);
  let subject = IssuesControllerObject.create();
  assert.ok(subject);
});
