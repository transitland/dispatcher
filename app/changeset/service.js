import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Service.extend({
  store: service(),
  currentUser: service(),
  enabledForModels: ['feed'], // TODO: expand to operators next
  createChangesetPayloadFromLocalEdits: function() {
    let payload = {changes: this.getChanges()};
    return payload;
  },
  getChanges: function() {
    var entities = [];
    this.enabledForModels.map((modelName) => {
      entities = entities.concat(this.get('store').peekAll(modelName).filter(function(e) { return e.get('hasDirtyAttributes'); }));
    });
    return entities.map(function(e) {
      var ret = {};
      ret['action'] = 'createUpdate';
      ret[e.entityType()] = e.toChange();
      return ret;
    });
  },
});
