import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel'],
  isSuccessful: Ember.computed('feedVersionImport.success', function() {
    var success = this.get('feedVersionImport').get('success');
    if (success === true) {
      return 'panel-success';
    } else if (success === false) {
      return 'panel-danger';
    } else {
      return 'panel-default';
    }
  })
});
