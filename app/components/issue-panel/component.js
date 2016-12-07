import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['panel'],
    classNameBindings: ['panelClass'],
    panelClass: 'panel-default',
    issue: null,
    actions: {
      issueClicked: function(issue) {
        this.sendAction("issueClicked", issue);
      }
    }
});
