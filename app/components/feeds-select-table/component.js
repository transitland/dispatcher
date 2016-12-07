import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    feedClicked: function(feed) {
      this.sendAction('feedClicked', feed);
    }
  }
});
