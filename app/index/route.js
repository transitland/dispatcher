import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    changeset: {
      refreshModel: true
    },
    feed: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.query('activity-update', params);
  }
});
