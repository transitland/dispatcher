import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Helper.extend({
  typeDescription: service('issue-type-desc'),
  compute(params) {
    return this.get('typeDescription').typeDescription(params[0]);
  }
});
