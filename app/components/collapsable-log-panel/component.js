import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel'],
  classNameBindings: ['panelClass'],
  panelClass: 'panel-default',
  actions: {
    toggleCollapse: function() {
      this.$('.collapse').collapse('toggle');
    }
  }
});
