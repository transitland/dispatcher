import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['list-group'],
  currentlyFiltering: computed.or('filterByFeedOnestopId', 'filterByChangesetId'),
  possibleChangesetsToFilterBy: computed('activityUpdates', function() {
    return this.get('activityUpdates')
               .filterBy('entity_type', 'changeset')
               .mapBy('entity_id')
               .uniq();
  }),
  possibleFeedsToFilterBy: computed('activityUpdates', function() {
    return this.get('activityUpdates')
               .filterBy('entity_type', 'feed')
               .mapBy('entity_id')
               .uniq();
  })
});
