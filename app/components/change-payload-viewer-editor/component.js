import Ember from 'ember';

export default Ember.Component.extend({
  editMode: false,
  jsonEditorMode: Ember.computed('editMode', function() {
    if (this.get('editMode')) {
      return 'code';
    } else {
      return 'view';
    }
  })
});
