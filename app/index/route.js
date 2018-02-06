import Route from '@ember/routing/route';

export default Route.extend({
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
