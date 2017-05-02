import Ember from 'ember';

export default Ember.Mixin.create({
  getSelectableModels: function() {
    return this.get('models')
  },
  selectableModelDefault: true,
  selectableModels: Ember.computed(function () {
    let def = this.selectableModelDefault;
    return this.getSelectableModels().map(function (model) {
      return Ember.ObjectProxy.create({
        content: model,
        isSelected: def
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
