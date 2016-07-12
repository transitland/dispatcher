import Ember from 'ember';

/* The only purpose of this controller is to set default query parameters */
export default Ember.Controller.extend({
  lat: 37.78990,
  lng: -122.39310,
  zoom: 14,
  actions: {
    showChangeset: function(changes) {
      var changes = this.store.peekAll('stop-station')
        .filter(function(stop) {
          return stop.get('hasDirtyAttributes')
        })
        .map(function(stop) {
          return stop.toChange();
        });
      var payload = {
        changes: changes.map(function(change){return {action: 'createUpdate', stop: change}})
      }
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    saveChangeset: function() {
      this.model.changeset.save();
    },
  }
});
