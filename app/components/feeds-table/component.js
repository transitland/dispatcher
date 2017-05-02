import Ember from 'ember';
import SelectableModelComponent from 'dispatcher/mixins/selectable-model-component';

export default Ember.Component.extend(SelectableModelComponent, {
  session: Ember.inject.service(),
  classNames: ['table-responsive'],
  getSelectableModels: function() {
    return this.get('feeds');
  },
  selectableModelDefault: false,
  actions: {
    enqueueSelectedFeedsForImport: function(importLevel) {
      const flashMessages = Ember.get(this, 'flashMessages');
      let importPromises = this.get('selectedFeeds').map(function(feed) {
        return feed.content.enqueue(importLevel);
      });
      Ember.RSVP.allSettled(importPromises).then( () => {
        flashMessages.add({
          message: 'Successfully enqueued latest versions of feed(s) for import!',
          type: 'success',
          sticky: true
        });
      }).catch( (e) => {
        flashMessages.add({
          message: `Error enqueuing feed(s) for import: ${e.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
