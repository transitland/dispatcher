import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    // close: function() {
    //   this.$('.modal').modal('hide');
    // }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});
