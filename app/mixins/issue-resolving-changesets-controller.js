import Ember from 'ember';

export default Ember.Mixin.create({

  applyMessage: {

  },

  closeMessage: {

  },

  applyingSpinner: false,

  showChangeset: false,

  getChanges: function() {

  },

  pollChangesetApply: function(url, applicationAdapter) {
    var self = this;
    applicationAdapter.ajax(url, 'post').then(function(response){
      if (response.status === 'complete') {
        self.set('applyMessage', {show: true, status: response.status, newIssues: [], message: 'Successfully resolved issue ' + self.get('model.selectedIssue.id') });
      }
      else if (response.status === 'error') {
        self.set('applyMessage', {show: true, status: response.status, message: 'Error resolving issue ' + self.get('model.selectedIssue.id') + '. ' + response.errors});
      }
      else {
        Ember.run.later(self.pollChangesetApply.bind(self, url, applicationAdapter), 5000);
      }
    }).catch(function(error){
      self.set('applyMessage', {show: true, status: 'error', message: 'Error resolving issue ' + self.get('model.selectedIssue.id') + '. ' + error.errors.map(function(e){ return e.message}).join('. ')});
    });
  },

  actions: {
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    saveChangeset: function(apply) {
      var self = this;
      return this.model.changeset.save()
        .then(function(changeset) {
          self.set('applyingSpinner', true);
          return changeset.apply_async();
        }).then(function(response) {
          self.set('applyingSpinner', false);
          self.set('showChangeset', false);
          self.set('applyMessage', {show: true, status: response.status, newIssues: [], message: 'Applying changeset to resolve issue ' + self.get('model.selectedIssue.id') });
        }).catch(function(error) {

        });
    },
    toggleApplyMessage: function() {
      this.set('applyMessage.show', false);
      if (this.get('applyMessage').status === 'complete') {
        let queryParamsObject = this.queryParamsObject();
        this.transitionToRoute('issues.route-geometry.index', { queryParams: queryParamsObject });
      }
      if (this.get('applyMessage').status === 'queued') {
        var applicationAdapter = this.store.adapterFor('changeset');
        var modelUrl = applicationAdapter.buildURL('changeset', this.get('model.changeset.id'));
        var applyUrl = modelUrl + '/apply_async';
        this.pollChangesetApply(applyUrl, applicationAdapter);
      }
      if (this.get('applyMessage').status === 'error') {
        // clean the changeset, but leave edits.
        let changeset = this.store.createRecord('changeset', {
          notes: 'Issue resolution:'
        });
        changeset.get('change_payloads').createRecord();
        this.set('model.changeset', changeset);
      }
    },
    closeDialog: function() {
      this.set('closeMessage', {show: true, message: 'Close issue ' + this.get('model.selectedIssue.id')});
    },
    closeIssue: function() {
      this.model.selectedIssue.set('open', false);
      var self = this;
      this.model.selectedIssue.save().then(function(){
        self.set('closeMessage.show', false);
        let queryParamsObject = self.queryParamsObject();
        self.transitionToRoute('issues.route-geometry.index', { queryParams: queryParamsObject });
      }).catch(function(error){
        self.set('closeMessage', {show: true, error: true, message: 'Error closing issue ' + self.get('model.selectedIssue.id') + '. ' + error.message});
      });
    },
    toggleCloseMessage: function() {
      this.set('closeMessage.show', false);
    }
  }
});
