import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    issue_type: {
      refreshModel: true
    }
  }
});
