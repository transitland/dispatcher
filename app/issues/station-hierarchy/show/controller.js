import Ember from 'ember';
import IssuesController from 'dispatcher/mixins/issues-controller';
import IssuesResolvingChangesetController from 'dispatcher/mixins/issues-resolving-changeset-controller';
import IssuesCloseController from 'dispatcher/mixins/issues-close-controller';

export default Ember.Controller.extend(IssuesController,
                                       IssuesResolvingChangesetController,
                                       IssuesCloseController, {
    rootRoute: 'issues.station-hierarchy',

    postSuccessTransition: function() {
     let queryParamsObject = this.queryParamsObject();
     this.transitionToRoute(this.rootRoute + '.index', { queryParams: queryParamsObject });
    },

    postCloseTransition: function() {
     let queryParamsObject = this.queryParamsObject();
     this.transitionToRoute(this.rootRoute + '.index', { queryParams: queryParamsObject });
    },

    getChanges: function() {
     var entities = [];
     entities = entities.concat(this.store.peekAll('stop-station').filter(function(e) { return e.get('hasDirtyAttributes'); }));
     entities = entities.concat(this.store.peekAll('stop-platform').filter(function(e) { return e.get('hasDirtyAttributes'); }));
     entities = entities.concat(this.store.peekAll('stop-egress').filter(function(e) { return e.get('hasDirtyAttributes'); }));
     var self = this;
     return entities.map(function(e) {
       var ret = {};
       ret['action'] = 'createUpdate';
       ret['issuesResolved'] = [parseInt(self.model.selectedIssue.id)];
       ret[e.entityType()] = e.toChange();
       return ret;
     });
    },
});
