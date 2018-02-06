import Ember from 'ember';
import PaginatedSortableControllerMixin from '../../../mixins/paginated-sortable-controller';
import { module, test } from 'qunit';
import Object from '@ember/object';

module('Unit | Mixin | paginated controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedSortableControllerObject = Object.extend(PaginatedSortableControllerMixin);
  let subject = PaginatedSortableControllerObject.create();
  assert.ok(subject);
});
