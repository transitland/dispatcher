import Ember from 'ember';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Ember.Controller.extend(PaginatedSortableController, {
  selectedFeed: '',

  hasNextPage: Ember.computed("model.feeds.meta.next", function() {
    if (Ember.isPresent(this.get('model.feeds.meta.next'))) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    feedClicked: function(feed) {
      this.set('selectedFeed', feed.get('onestop_id'));
    }
  }
});
