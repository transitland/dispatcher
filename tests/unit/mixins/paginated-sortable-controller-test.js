import Ember from 'ember';
import PaginatedSortableControllerMixin from '../../../mixins/paginated-sortable-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedSortableControllerObject = Ember.Object.extend(PaginatedSortableControllerMixin);
  let subject = PaginatedSortableControllerObject.create();
  assert.ok(subject);
});
