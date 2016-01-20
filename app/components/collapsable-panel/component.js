import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel'],
  classNameBindings: ['panelClass'],
  panelClass: 'panel-default',
  show: false,
  actions: {
    toggleCollapse: function() {
      this.toggleProperty("show");
    }
  }
});
