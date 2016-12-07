import Ember from 'ember';
import IssuesResolvingChangesetControllerMixin from 'dispatcher/mixins/issues-resolving-changeset-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | issues resolving changeset controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesResolvingChangesetControllerObject = Ember.Object.extend(IssuesResolvingChangesetControllerMixin);
  let subject = IssuesResolvingChangesetControllerObject.create();
  assert.ok(subject);
});
