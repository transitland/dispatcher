import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  color: computed(function(){
    return '#000';
  }),
  onestop_id: '',
  actions: {
    editEntityAdded: function(addEvent) {
      this.sendAction('editEntityAdded', addEvent.target, this.get('onestop_id'));
    }
  }
});
