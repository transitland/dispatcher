import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  click: function() {
    this.toggleProperty('feed.isSelected');
  }
});
