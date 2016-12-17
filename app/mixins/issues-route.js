import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    issue_type: {
      refreshModel: true
    }
  },
  model: function(params) {
    let category = this.get('category');
    params['category'] = category;
    let issues = this.store.query('issue', params, { reload: true });
    let adapter = this.get('store').adapterFor('issues');
    let issue_categories_url = adapter.urlPrefix()+'/issues/categories';
    let promise = adapter.ajax(issue_categories_url, 'get', {});
    return Ember.RSVP.hash({
      issues: issues,
      issueTypes: promise.then(function(response){ return response[category]; })
    });
  }
});
