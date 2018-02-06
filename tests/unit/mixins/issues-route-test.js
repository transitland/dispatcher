import Ember from 'ember';
import IssuesRouteMixin from 'dispatcher/mixins/issues-route';
import { module, test } from 'qunit';
import Object from '@ember/object';

module('Unit | Mixin | issues route');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesRouteObject = Object.extend(IssuesRouteMixin);
  let subject = IssuesRouteObject.create();
  assert.ok(subject);
});
