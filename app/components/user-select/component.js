import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleFocus(select) {
      select.actions.open();
    }
  }
});
