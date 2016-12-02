import Ember from 'ember';

export default Ember.Mixin.create({
  getChanges: function() {

  },
  emptyChangeset: function() {
    let changeset = this.store.createRecord('changeset', {
      notes: 'Issue resolution:'
    });
    changeset.get('change_payloads').createRecord();
    this.set('model.changeset', changeset);
  },
  pollChangesetApply: function(resolvingIssue, url, applicationAdapter) {
    var self = this;
    applicationAdapter.ajax(url, 'post').then(function(response){
      if (response.status === 'complete') {
        self.set('applyMessage', { show: true, status: response.status, newIssues: [], message: 'Successfully resolved issue ' + resolvingIssue.id });
      }
      else if (response.status === 'queued') {
        Ember.run.later(self.pollChangesetApply.bind(self, resolvingIssue, url, applicationAdapter), 2000);
      }
      else if (response.status === 'error') {
        self.set('applyMessage', {show: true, status: response.status, newIssues: response.errors, message: 'Error resolving issue ' + resolvingIssue.id + '. ' + response.errors});
        // clean the changeset, but leave edits.
        self.emptyChangeset();
      }
      else {
        Ember.run.later(self.pollChangesetApply.bind(self, resolvingIssue, url, applicationAdapter), 2000);
      }
    }).catch(function(error){
      self.set('applyMessage', {show: true, status: 'error', message: 'Error resolving issue ' + resolvingIssue.id + '. ' + error.errors.map(function(e){ return e.message}).join('. ')});
      // clean the changeset, but leave edits.
      self.emptyChangeset();
    });
  },

  actions: {
    saveChangeset: function() {
      var self = this;
      return self.model.changeset.save()
        .then(function(changeset) {
          self.set('applyingSpinner', true);
          return changeset.apply_async();
        }).then(function(response) {
          self.set('applyingSpinner', false);
          self.set('showChangeset', false);
          self.set('applyMessage', { show: true, status: response.status, newIssues: [], message: 'Applying changeset to resolve issue ' + self.model.selectedIssue.id });
          var applicationAdapter = self.store.adapterFor('changeset');
          var modelUrl = applicationAdapter.buildURL('changeset', self.get('model.changeset.id'));
          var applyUrl = modelUrl + '/apply_async';
          self.pollChangesetApply(self.model.selectedIssue, applyUrl, applicationAdapter);
        }).catch(function(error) {

        });
    },
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    closeApplyMessage: function() {
      let queryParamsObject = this.queryParamsObject();
      this.transitionToRoute(this.root_route + '.index', { queryParams: queryParamsObject });
    }
  }
});
