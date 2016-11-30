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
        self.set('applyMessage', {show: true, status: response.status, newIssues: [], message: 'Successfully resolved issue ' + resolvingIssue.id });
      }
      else if (response.status === 'error') {
        self.set('applyMessage', {show: true, status: response.status, message: 'Error resolving issue ' + resolvingIssue.id + '. ' + response.errors});
      }
      else {
        Ember.run.later(self.pollChangesetApply.bind(self, url, applicationAdapter), 5000);
      }
    }).catch(function(error){
      self.set('applyMessage', {show: true, status: 'error', message: 'Error resolving issue ' + resolvingIssue.id + '. ' + error.errors.map(function(e){ return e.message}).join('. ')});
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
        }).catch(function(error) {

        });
    },
    toggleApplyMessage: function() {
      this.set('applyMessage.show', false);
      if (this.get('applyMessage').status === 'complete') {
        let queryParamsObject = this.queryParamsObject();
        this.transitionToRoute(this.index_route, { queryParams: queryParamsObject });
      }
      if (this.get('applyMessage').status === 'queued') {
        var applicationAdapter = this.store.adapterFor('changeset');
        var modelUrl = applicationAdapter.buildURL('changeset', this.get('model.changeset.id'));
        var applyUrl = modelUrl + '/apply_async';
        this.pollChangesetApply(this.model.selectedIssue, applyUrl, applicationAdapter);
      }
      if (this.get('applyMessage').status === 'error') {
        // clean the changeset, but leave edits.
        this.cleanChangeset();
      }
    },
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
  }
});
