import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-default'],
  classNameBindings: ['isSelected:active'],
  action: 'click',
  isSelected: Ember.computed('attr', function() {
    if (this.get('attr') === this.get('value')) {
      return true;
    } else {
      return false;
    }
  }),
  click: function() {
    this.set('attr', this.get('value'));
  }
});
