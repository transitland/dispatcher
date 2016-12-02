import Ember from 'ember';
// this really extends collapsable-panel

export default Ember.Component.extend({
    classNames: ['panel'],
    classNameBindings: ['panelClass'],
    panelClass: 'panel-default',
    show: false,
    issue: null
    actions: {
      issueClicked: function(issue) {
        this.toggleProperty("show");
        this.sendAction("issueClicked", issue);
      }
    }
});
