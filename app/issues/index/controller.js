import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import Controller from '@ember/controller';
import PaginatedSortableController from 'dispatcher/mixins/paginated-sortable-controller';

export default Controller.extend(PaginatedSortableController, {
  selectedFeed: '',

  hasNextPage: computed("model.feeds.meta.next", function() {
    if (isPresent(this.get('model.feeds.meta.next'))) {
      return true;
    } else {
      return false;
    }
  }),

  actions: {
    feedClicked: function(feed) {
      let feed_id = feed === null ? '' : feed.get('onestop_id');
      this.set('selectedFeed', feed_id);
    }
  }
});
