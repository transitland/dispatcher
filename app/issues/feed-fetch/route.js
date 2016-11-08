import Ember from 'ember';
import IssuesRoute from 'dispatcher/mixins/issues-route';

export default Ember.Route.extend(IssuesRoute, {
  issueTypes: ['all', 'feed_fetch_invalid_url',
              'feed_fetch_invalid_zip',
              'feed_fetch_invalid_response',
              'feed_fetch_invalid_source']
});
