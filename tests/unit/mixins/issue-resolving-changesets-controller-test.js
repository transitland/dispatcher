import Ember from 'ember';
import IssueResolvingChangesetsControllerMixin from 'dispatcher/mixins/issue-resolving-changesets-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | issue resolving changesets controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssueResolvingChangesetsControllerObject = Ember.Object.extend(IssueResolvingChangesetsControllerMixin);
  let subject = IssueResolvingChangesetsControllerObject.create();
  assert.ok(subject);
});
