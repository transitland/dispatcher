import Ember from 'ember';
import SelectableModelComponent from 'dispatcher/mixins/selectable-model-component';
import { inject } from '@ember/service';

export default Ember.Component.extend(SelectableModelComponent, {
  session: inject.service(),
  classNames: ['table-responsive'],
  sortKey: null,
  getSelectableModels: function() {
    return this.get('models')
  },
  actions: {
  }
});
