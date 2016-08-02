import Ember from 'ember';

export default Ember.Controller.extend({
  selectedFeed: '',
  actions: {
    changeFeed(select) {
    },
    onFocus(select) {
      this.set('selectedFeed', select.highlighted.id);
      select.actions.open();
    }
  }
});
