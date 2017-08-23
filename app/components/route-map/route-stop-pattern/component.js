import Ember from 'ember';

export default Ember.Component.extend({
  color: Ember.computed(function(){
    return '#000';
  }),
  onestop_id: '',
  actions: {
    editEntityAdded: function(addEvent) {
      this.sendAction('editEntityAdded', addEvent.target, this.get('onestop_id'));
    }
  }
});
