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
        flashMessages.success("Import level updated on feed version!");
        // TODO: force a reload of the feed model
      }).catch(function(error) {
        flashMessages.danger(`Error(s) updating import level on feed version: ${error.message}`);
      }).finally(function() {
        self.set('dropDownExpanded', false);
      });
    },
    enqueue: function(importLevel) {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.get('feedVersion').enqueue(importLevel)
      .then( () => {
        flashMessages.success('Successfully enqueued feed version for import!');
      }).catch( (e) => {
        flashMessages.danger(`Error enqueuing feed version for import: ${e.message}`);
      });
    }
  }
});
