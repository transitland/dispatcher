import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  classNames: ['table-responsive'],
  selectableModels: Ember.computed('models', function () {
    return this.get('models').map(function (model) {
      return Ember.ObjectProxy.create({
        content: model,
        isSelected: true
      });
    });
  }),
  selectedModels: Ember.computed('selectableModels.@each.isSelected', function() {
    return this.get('selectableModels').filterBy('isSelected', true);
  }),
  anyModelsSelected: Ember.computed.notEmpty('selectedModels'),
  allModelsSelected: Ember.computed('selectedModels.[]', function() {
    return (this.get('selectedModels.length') === this.get('models.length')) && (this.get('models.length') > 0);
  }),
  actions: {
    selectNone: function () {
      this.get("selectableModels").forEach(function (model) {
        model.set("isSelected", false);
      });
    },
    selectAll: function () {
      this.get("selectableModels").forEach(function (model) {
        model.set("isSelected", true);
      });
    }
  }
});
