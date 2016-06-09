import Ember from 'ember';

export default Ember.Component.extend({
  perPageOptions: [
    50,
    100,
    500,
    1000,
    '∞'
  ]
});
