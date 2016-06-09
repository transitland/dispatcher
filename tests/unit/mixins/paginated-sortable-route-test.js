import Ember from 'ember';
import PaginatedSortableRouteMixin from '../../../mixins/paginated-sortable-route';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated route');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedSortableRouteObject = Ember.Object.extend(PaginatedSortableRouteMixin);
  let subject = PaginatedSortableRouteObject.create();
  assert.ok(subject);
});
