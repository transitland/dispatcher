import Ember from 'ember';
import IssuesCloseControllerMixin from 'dispatcher/mixins/issues-close-controller';
import { module, test } from 'qunit';
import Object from '@ember/object';

module('Unit | Mixin | issues close controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesCloseControllerObject = Object.extend(IssuesCloseControllerMixin);
  let subject = IssuesCloseControllerObject.create();
  assert.ok(subject);
});
