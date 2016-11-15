import Ember from 'ember';

export default Ember.Controller.extend({
  getChanges: function() {
    var ret = {};
    ret['action'] = 'createUpdate';
    ret['issuesResolved'] = [1];
    ret['feed'] = { url: '' };
    return [ret];
  }
});
