import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    offset: {
      refreshModel: true
    },
    per_page: {
      refreshModel: true
    }
  }
});
