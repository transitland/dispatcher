import Ember from 'ember';

/* The only purpose of this controller is to set default query parameters */
export default Ember.Controller.extend({
  lat: 37.78990,
  lng: -122.39310,
  zoom: 14,
  getChanges: function() {
    var entities = [];
    entities = entities.concat(this.store.peekAll('stop-station').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    entities = entities.concat(this.store.peekAll('stop-platform').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    entities = entities.concat(this.store.peekAll('stop-egress').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    return entities.map(function(e) {
      var ret = {};
      ret['action'] = 'createUpdate';
      ret[e.entityType()] = e.toChange();
      return ret;
    });
  },
  actions: {
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    saveChangeset: function(apply) {
      const flashMessages = Ember.get(this, 'flashMessages');
      var self = this;
      return this.model.changeset.save()
        .then(function(changeset) {
          return changeset.apply()
        }).then(function(changeset) {
          flashMessages.success(`Changeset created & applied`);
          self.set('showChangeset', false);
        }).catch(function(error) {
          flashMessages.danger(`Error(s) updating change payload: ${error.message}`);
        });
    },
    setBounds: function() {
      this.set('bbox', this.get('bounds').toBBoxString());
    }
  }
});
