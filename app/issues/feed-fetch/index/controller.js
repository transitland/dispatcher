import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';

export default Ember.Controller.extend(IssuesController, {
  selected: false,

  actions: {
    issueClicked: function(issue) {
      var self = this;
      this.set('selected', !this.get('selected'));
      let queryParamsObject = self.queryParamsObject();
      this.transitionToRoute('issues.feed-fetch.show', issue.id, { queryParams: queryParamsObject });
    },
    typeChanged: function(selected) {
      var self = this;
      var orig_func = self._super;
      Ember.run.next(function(){
        orig_func.call(self, selected);
        let queryParamsObject = self.queryParamsObject();
        self.transitionToRoute('issues.feed-fetch.index', { queryParams: queryParamsObject });
      });
    }
  }
});
