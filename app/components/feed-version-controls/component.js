import Ember from 'ember';

export default Ember.Component.extend({
  dropDownExpanded: false,
  actions: {
    toggleDropDownExpanded: function() {
      this.toggleProperty('dropDownExpanded');
    },
    setAsActiveFeedVersion: function() {
      alert('TODO: make this work on the Datastore back-end!');
    },
    changeImportLevel: function(importLevel) {
      var self = this;
      var feedVersion = this.get('feedVersion');
      const flashMessages = Ember.get(this, 'flashMessages');
      feedVersion.set('import_level', importLevel);
      feedVersion.save().then(function() {
        flashMessages.add({
          message: "Import level updated on feed version!",
          type: 'success',
          sticky: true
        });
        // TODO: force a reload of the feed model
      }).catch(function(error) {
        flashMessages.add({
          message: `Error(s) updating import level on feed version: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      }).finally(function() {
        self.set('dropDownExpanded', false);
      });
    },
    enqueue: function(importLevel) {
      var self = this;
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.enqueue(importLevel)
      .then( () => {
        flashMessages.add({
          message: 'Successfully enqueued feed version for import!',
          type: 'success',
          sticky: true
        });
      }).catch( (e) => {
        flashMessages.add({
          message: `Error enqueuing feed version for import: ${e.message}`,
          type: 'danger',
          sticky: true
        });
      }).finally(function() {
        self.set('dropDownExpanded', false);
      });
    }
  }
});
