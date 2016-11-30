import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';

export default Ember.Controller.extend(IssuesController, {
  index_route: 'issues.feed-fetch.index',
  show_route: 'issues.feed-fetch.show'
});
