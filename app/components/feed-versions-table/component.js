import Ember from 'ember';
import SelectableModelController from 'dispatcher/mixins/selectable-model-controller';

export default Ember.Component.extend(SelectableModelController, {
  session: Ember.inject.service(),
  classNames: ['table-responsive'],
  getSelectableModels: function() {
    return this.get('models')
  }
});
