import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['feed', 'changeset'],
  feed: null,
  changeset: null
});
