import Ember from 'ember';
import { inject } from '@ember/service';

export default Ember.Helper.extend({
  typeDescription: inject.service('issue-type-desc'),
  compute(params) {
    return this.get('typeDescription').typeDescription(params[0]);
  }
});
