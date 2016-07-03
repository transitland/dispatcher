import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    issueClicked: function(issue) {
      this.store.unloadAll('route-stop-pattern');
      this.store.unloadAll('stop');
      this.set('model.selectedIssue', issue);
      var rsps = [];
      var stops = [];
      issue.get('entities_with_issues').forEach(function(entity){
        if (entity.onestop_id.split('-')[0] === 'r') {
          rsps.push(entity.onestop_id);
        }
        else if (entity.onestop_id.split('-')[0] === 's') {
          stops.push(entity.onestop_id);
        }
      });
      rsps = this.store.query('route-stop-pattern', {onestop_id: rsps.join(',')});
      stops = this.store.query('stop', {onestop_id: stops.join(',')});
      this.set('model.issueRouteStopPatterns', rsps);
      this.set('model.issueStops', stops);
    }
  }
});
