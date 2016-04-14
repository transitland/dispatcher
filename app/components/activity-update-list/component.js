import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['list-group'],
  currentlyFiltering: Ember.computed.or('filterByFeedOnestopId', 'filterByChangesetId'),
  possibleChangesetsToFilterBy: Ember.computed('activityUpdates', function() {
    return this.get('activityUpdates')
               .filterBy('entity_type', 'changeset')
               .mapBy('entity_id')
               .uniq();
  }),
  possibleFeedsToFilterBy: Ember.computed('activityUpdates', function() {
    return this.get('activityUpdates')
               .filterBy('entity_type', 'feed')
               .mapBy('entity_id')
               .uniq();
  })
});
