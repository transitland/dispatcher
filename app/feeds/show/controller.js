import Ember from 'ember';

export default Ember.Controller.extend({
  selected: false,

  getChanges: function() {
    var ret = {};
    ret['action'] = 'createUpdate';
    ret['issuesResolved'] = [1];
    ret['feed'] = { url: '' };
    return [ret];
  },

  actions: {
    issueClicked: function() {
      this.set('selected', !this.get('selected'));
    }
  }
});
