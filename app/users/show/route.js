import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params) {
    return this.store.find('user', params['user_id']);
  },
});
