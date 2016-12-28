import Ember from 'ember';

export default Ember.Helper.extend({
  typeDescription: Ember.inject.service('issue-type-desc'),
  compute(params) {
    return this.get('typeDescription').typeDescription(params[0]);
  }
});
