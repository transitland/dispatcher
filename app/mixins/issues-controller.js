import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: ['feed_onestop_id', 'open', 'issue_type', 'per_page'],

  issue_type: '',

  feed_onestop_id: '',

  open: true,

  per_page: '∞',

  getChanges: function() {

  },

  queryParamsObject: function() {
    var queryParams = {};
    var self = this;
    this.get('queryParams').forEach(function(param) { queryParams[param] = self.get(param);  });
    return queryParams;
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
    issueClicked: function() {

    },
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
    typeChanged: function(selected) {
      this.set('issue_type', selected);
    },
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    toggleCloseMessage: function() {
      this.set('closeMessage.show', false);
    },
  }
});
