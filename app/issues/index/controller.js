import Ember from 'ember';

export default Ember.Controller.extend({
  selectedFeed: '',
  actions: {
    onFocus(select) {
      this.set('selectedFeed', select.highlighted.id);
      select.actions.open();
    }
  }
});
